# Research: portfolio and contribution interface

## Owner decisions and boundaries

The owner confirmed the scaffold ready on 2026-11-08 and assigned technical contract design to Sol. Initial cash is zero; existing holdings and a new investment budget are entered separately. The button must return investments and quantities. The API must not turn that action into an actual purchase.

## Decisions

- **OpenAPI 3.1.1 / JSON Schema:** one canonical contract for generated client types and backend conformance. Version 3.1.1 is deliberately pinned, not a claim to use the newest OpenAPI release. Alternative: independently maintained frontend DTOs would drift. [Official specification](https://spec.openapis.org/oas/v3.1.1.html).
- **Decimal strings:** original amount/currency are preserved literally; no binary-floating financial arithmetic in the browser. Unknown historical cost is null; known starting cash is zero. Alternative: numeric JSON loses accepted decimal spelling and can lose precision.
- **Error format:** RFC 9457 with stable application code, field JSON pointers and request ID; UI translates codes. Alternative: leaking framework-specific validation/provider responses couples clients and risks exposing details. [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).
- **Concurrent edits:** strong portfolio ETag / required If-Match for inventory/target/settings writes; 428 if absent and 412 if outdated. Read-only previews do not require an idempotency ledger. Create-holding duplicates return 409 and never increase quantity implicitly; instrument registration normalizes exchange/ticker and returns the existing identity.
- **Ready/blocked:** distinct oneOf branches with required status constants and closed properties; a blocked result cannot carry fabricated quantities/costs. Financial policy selection remains explicit before ready responses.
- **Validation:** swagger-parser 11.0.0 accepts OpenAPI 3.1.1; its schema/reference checks do not validate every instance or business invariant. Ajv2020 plus formats validates fixture cases without coercion, defaults or deleting properties. Separate exact-decimal/graph checks cover sums, cycles and budget conservation. Tools are installed only in a temporary directory with pinned versions.

## Validator evidence

Pinned swagger-parser [version support](https://raw.githubusercontent.com/APIDevTools/swagger-parser/v11.0.0/lib/index.js), [schema validator](https://raw.githubusercontent.com/APIDevTools/swagger-parser/v11.0.0/lib/validators/schema.js), [spec validator limits](https://raw.githubusercontent.com/APIDevTools/swagger-parser/v11.0.0/lib/validators/spec.js); Ajv [schema drafts](https://ajv.js.org/json-schema), [references](https://ajv.js.org/guide/combining-schemas.html) and [formats](https://ajv.js.org/guide/formats.html).

## Deferred policies

Provider coverage/terms, FX freshness, scoring thresholds, fees and whole/fractional increments belong to features 002–004. The contract supports their future versioned snapshots and explicit blocked states. Nonzero-cash allocation treatment is not silently decided from the initial-zero requirement. These do not block inventory/targets contract design.
