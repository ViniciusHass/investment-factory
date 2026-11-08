'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { createRequire } = require('node:module')

const tools = process.env.CONTRACT_VALIDATION_TOOLS
if (!tools) {
  throw new Error('Set CONTRACT_VALIDATION_TOOLS to the isolated pinned-validator directory; see quickstart.md.')
}
const toolingRequire = createRequire(path.resolve(tools, 'package.json'))
const SwaggerParser = toolingRequire('@apidevtools/swagger-parser')
const Ajv2020 = toolingRequire('ajv/dist/2020').default
const addFormats = toolingRequire('ajv-formats')
const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'openapi.json'), 'utf8'))
const fixtureDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases.json'), 'utf8'))

// These checks validate an interface and synthetic cases, not a live financial engine.
function rewriteRefs(value) {
  if (Array.isArray(value)) return value.map(rewriteRefs)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [
    key,
    key === '$ref' && typeof child === 'string'
      ? child.replace('#/components/schemas/', '#/$defs/')
      : rewriteRefs(child),
  ]))
}

function exactParts(value) {
  assert.match(value, /^(0|[1-9][0-9]*)(\.[0-9]+)?$/)
  const [whole, fraction = ''] = value.split('.')
  return { digits: whole + fraction, scale: fraction.length }
}

function exactSumEquals(values, expected) {
  const parts = [...values, expected].map(exactParts)
  const scale = Math.max(...parts.map(part => part.scale))
  const integers = parts.map(part => BigInt(part.digits + '0'.repeat(scale - part.scale)))
  return integers.slice(0, -1).reduce((sum, value) => sum + value, 0n) === integers.at(-1)
}

function validateTargets(value) {
  const nodes = value.nodes
  const byId = new Map()
  const groups = new Map()
  const order = { geography: 0, asset_class: 1, sector: 2, investment: 3 }
  for (const node of nodes) {
    assert(!byId.has(node.id), 'Duplicate node ID')
    byId.set(node.id, node)
    const siblings = groups.get(node.parent_id) || []
    siblings.push(node)
    groups.set(node.parent_id, siblings)
    // Exact comparison is independent of binary floating-point weights.
    const part = exactParts(node.relative_weight)
    assert(BigInt(part.digits) <= 100n * (10n ** BigInt(part.scale)), 'Weight exceeds 100')
  }
  for (const siblings of groups.values()) {
    assert(exactSumEquals(siblings.map(node => node.relative_weight), '100'), 'Sibling weights must sum to exactly 100')
  }
  for (const node of nodes) {
    const visited = new Set([node.id])
    let current = node
    while (current.parent_id !== null) {
      const parent = byId.get(current.parent_id)
      assert(parent, 'Unknown parent ID')
      assert(!visited.has(parent.id), 'Allocation cycle')
      assert(order[parent.kind] < order[current.kind], 'Layer order must increase')
      visited.add(parent.id)
      current = parent
    }
    if (node.kind === 'investment') {
      assert(!groups.has(node.id), 'Investment nodes are leaves')
    }
  }
}

function validatePreview(value) {
  if (value.status !== 'ready') return
  const budget = value.original_budget
  for (const money of [value.allocated_budget, value.remaining_budget]) {
    assert.equal(money.currency, budget.currency, 'Budget currencies must match')
  }
  assert(exactSumEquals([value.allocated_budget.amount, value.remaining_budget.amount], budget.amount), 'Budget conservation failed')
  for (const recommendation of value.recommendations) {
    assert.equal(recommendation.estimated_budget_cost.currency, budget.currency)
    assert.equal(recommendation.instrument.id, recommendation.unit_price.instrument_id)
    assert.equal(recommendation.instrument.currency, recommendation.unit_price.unit_price.currency)
    assert.equal(recommendation.estimated_instrument_cost.currency, recommendation.instrument.currency)
  }
  assert(exactSumEquals(value.recommendations.map(item => item.estimated_budget_cost.amount), value.allocated_budget.amount), 'Recommendation costs do not match allocated budget')
}

function validateStockQuantity(quantity) {
  const part = exactParts(quantity)
  assert.equal(BigInt(part.digits) % (10n ** BigInt(part.scale)), 0n, 'Stock quantity must be integral')
}

async function main() {
  const allRefs = JSON.stringify(contract).match(/"\$ref"\s*:\s*"([^"]+)"/g) || []
  for (const declaration of allRefs) {
    assert(declaration.includes('"#/components/'), 'External references are forbidden in this contract')
  }
  await SwaggerParser.validate(structuredClone(contract), {
    resolve: { external: false, http: false, file: false },
    dereference: { circular: 'ignore' },
  })
  const operationIds = []
  for (const item of Object.values(contract.paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      if (item[method]) operationIds.push(item[method].operationId)
    }
  }
  assert(operationIds.every(Boolean), 'Each operation needs a stable ID')
  assert.equal(new Set(operationIds).size, operationIds.length, 'Duplicate operation ID')

  const ajv = new Ajv2020({
    strict: true,
    allErrors: true,
    coerceTypes: false,
    useDefaults: false,
    removeAdditional: false,
  })
  addFormats(ajv)
  ajv.addSchema({
    $id: 'urn:investment-factory:portfolio-contract',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $defs: rewriteRefs(contract.components.schemas),
  })
  const validators = Object.fromEntries(Object.keys(contract.components.schemas).map(name => [
    name,
    ajv.compile({ $ref: 'urn:investment-factory:portfolio-contract#/$defs/' + name }),
  ]))
  let accepted = 0
  let rejected = 0
  for (const fixture of fixtureDocument.cases) {
    const original = JSON.stringify(fixture.payload)
    const validator = validators[fixture.schema]
    assert(validator, 'Unknown fixture schema: ' + fixture.schema)
    let valid = validator(fixture.payload)
    if (valid && fixture.semantic) {
      try {
        if (fixture.semantic === 'targets') validateTargets(fixture.payload)
        else if (fixture.semantic === 'preview') validatePreview(fixture.payload)
        else if (fixture.semantic === 'stock_holding') {
          assert.equal(fixture.instrument_kind, 'stock')
          validateStockQuantity(fixture.payload.quantity)
        }
        else throw new Error('Unknown semantic fixture category')
      } catch {
        valid = false
      }
    }
    assert.equal(JSON.stringify(fixture.payload), original, 'Validation must not rewrite input')
    assert.equal(valid, fixture.valid, fixture.name + ': ' + JSON.stringify(validator.errors))
    if (valid) accepted += 1
    else rejected += 1
  }
  assert.equal(fixtureDocument.cases[3].payload.original_cost.amount, '1234.5600')
  assert(exactSumEquals(['0.1', '0.2', '99.7'], '100'))
  console.log(JSON.stringify({
    openapi: contract.openapi,
    schemas: Object.keys(validators).length,
    operations: operationIds.length,
    fixture_cases: fixtureDocument.cases.length,
    accepted,
    rejected,
    result: 'PASS',
    limitation: 'Structure, fixtures and selected semantic invariants only; no endpoint/provider/optimizer implementation claimed.',
  }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
