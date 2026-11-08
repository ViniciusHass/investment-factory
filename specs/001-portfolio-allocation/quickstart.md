# Validate C01 before implementation

Prerequisite: Node 22.12+ and npm. Install pinned validation tools in a disposable directory, not a product repository:

```powershell
$contractTools = Join-Path $env:TEMP 'investment-contract-validation-tools'
npm install --prefix $contractTools --no-save --ignore-scripts --package-lock=false @apidevtools/swagger-parser@11.0.0 ajv@8.17.1 ajv-formats@3.0.1
$env:CONTRACT_VALIDATION_TOOLS = $contractTools
node contracts/portfolio/v1/validate.cjs
git diff --check
```

Run from Factory root. The validator must reject bad fixture cases, preserve decimal strings, verify schema references/operation IDs and report its case count. Fixtures are explicitly synthetic tests and must not enter production UI.

Backend implementation validation (not yet executed by this design): create portfolio and observe zero cash/no holdings; enter an instrument and holding with original decimal text and nullable cost; GET returns the accepted original amount/currency. Change reporting currency and ensure originals unchanged. PUT a valid omitted-layer target tree; reject wrong sums/cycles atomically, including root children. Reject missing/stale If-Match without losing the stored tree. Export FastAPI OpenAPI and compare the implemented subset with the canonical contract.

Preview acceptance (feature 004): user presses Calculate investment with a positive original budget. With approved policies and real dated inputs, show instruments, positive quantities, costs/reasons and leftover; total allocation never exceeds budget. Without required inputs/policy, show blocked reasons and no invented quantities. A preview must leave actual holdings/cash unchanged.
