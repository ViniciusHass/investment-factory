# Portfolio API contract v0.2.0

**Design owner:** Sol. **Business decision:** owner, 2026-11-08. **Status:** contract-first technical design; the JSON does not claim these endpoints are deployed.

[OpenAPI](./openapi.json) is canonical. [Feature 001](../../../specs/001-portfolio-allocation/spec.md), [plan](../../../specs/001-portfolio-allocation/plan.md), [feature 004](../../../specs/004-rebalancing-engine/spec.md) and [validation guide](../../../specs/001-portfolio-allocation/quickstart.md) explain scope and execution.

## Business flow

1. Create a portfolio: no holdings and known zero cash.
2. Register the instrument already owned and enter current quantity; original total cost/date may be unknown. Inventory registration never invents a purchase or changes cash.
3. Configure targets with optional hierarchy levels. Leaf nodes are valid; every nonempty group of children, including the implicit root's children, totals exactly 100.
4. Enter a new contribution amount/currency and press **Calcular investimento / Calculate investment**. This is a what-if budget even while persisted starting cash is zero; it does not require a prior ledger deposit.
5. A ready response shows instrument, quantity, dated unit price, estimated costs, reasons and unallocated budget. Blocked responses explain missing inputs/policy and contain no purchase quantities. Actual buys remain a separate explicit workflow; no brokerage/order endpoint exists.

## Interface scope

Base path is `/v1` on FastAPI. Core design includes portfolio creation/list/read/settings, owned-instrument identity registration, holding create/read/full-replace/remove and target read/full-replace. The `valuation` and `contribution-previews` interfaces require later provider/domain implementations and their own cards; they are not simulated production endpoints.

The browser never supplies market quotes, scores or FX rates in a preview request. It sends only the original budget. FastAPI loads current holdings/targets and approved data through backend ports. No financial provider name or credential is a required client input.

## Data and consistency

- Amounts/quantities/percentages use exact decimal strings. No exponent, grouping or binary-float conversion. Preserve accepted original cost and budget spelling/currency. Reporting totals and estimate conversions are separate.
- Historical cost is nullable and never inferred from a current quote. Initial cash zero is a known business value; missing data is not zero.
- Create/current holding quantities must be positive; removing a holding is explicit. One current holding per portfolio/instrument; duplicate POST is 409, never a silent purchase/quantity increment.
- Full holding replacement clears omitted optional cost/date to null. Settings PATCH preserves omitted properties.
- Target node IDs are unique; parents must exist, cycles and reversed/repeated layers are invalid; an investment node has an instrument and no children. Empty trees are valid until the user configures targets. There is no silent normalization of a 99.99/100.01 percent sum.
- GET emits a strong aggregate portfolio ETag. Settings, holding and target writes require If-Match. Missing header is 428, stale revision 412. Validation is atomic and failures preserve old records.
- Instrument registration is idempotent for normalized exchange/ticker identity. PUT has replacement semantics. No generic idempotency-key store is assumed; the client does not automatically retry mutating POSTs. Previews are side-effect-free calculations.
- Lists default to limit 50, permit 1–100, have stable backend ordering and return an opaque next_cursor/null. Do not parse the cursor in the browser.
- Responses and inputs are closed schema objects. Unknown request properties fail validation instead of becoming hidden persistence fields. Errors use application/problem+json, stable codes, JSON field pointers and sanitized details. Status matches the HTTP response and request IDs contain no secret.

## Recommendation invariants

Only owned, eligible instruments permitted by hierarchy/caps may receive a recommendation. Above-target branches do not receive buys merely for score. Stock quantities are integral; products that support fractions follow verified unit/minimum/increment rules. The decimal-string shape alone does not authorize fractional trading. Stock integer values with zero decimal suffix remain equivalent to whole units.

Allocated + remaining equals original budget in the original budget currency using exact arithmetic. The sum of recommendation budget costs equals allocated budget. Native-currency price/cost and any budget-currency conversion remain distinct. Fees, FX, eligibility, allocation and trading policies must be identified in a ready snapshot. Missing/stale quotes/FX or unresolved policies return blocked rather than assume zero or a made-up rate. No fit under valid constraints may return ready with no buys and all budget left, with an explanation.

All financial inputs in snapshots carry actual backend source/timestamps. Same-currency conversion does not require a fabricated provider quote. Market valuation does not depend on having a trading/scoring policy; recommendation snapshots add those policy versions separately. When invested value is zero, allocation percentages/deviations are null instead of dividing by zero.

Initial-zero cash does not settle treatment of future nonzero cash in allocation, deposit history, taxes/dividends or fees. Those policies must be explicit before their calculation paths are enabled. The owner resolved the quantity rule: stocks integral, other products fractional only where supported. Required product metadata still needs verification; its absence is explicit, without reopening the business question.

## Checks and fixtures

`validate.cjs` runs pinned OpenAPI structure/reference validation, strict Ajv2020 fixture checks with formats, and separate exact-decimal/target graph invariants. Validator dependencies live in a temporary tools directory; see the quickstart command.

`cases.json` contains synthetic schema/semantic fixtures only, including invented amounts/quotes labelled as fixtures. They are never provider samples, real advice or runtime data. Schema validation does not implement or validate the full financial optimizer, persistence, provider freshness or backend endpoints. Those require implementation/contract/integration tests on their own cards.

## Standards

[OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html) and [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html). Product/contract versioning here does not create release tags or approve a release policy.

## Quantity policy and persistence design — 2026-11-08

[ADR0006](../../../docs/decisions/0006-product-quantity-rules.md) records whole stock quantities and product-specific fractions. HoldingWrite contains an instrument ID, so the backend must look up its kind and reject fractional stock inventory with 422 and a pointer to quantity. Recommendation and Holding response schemas also reject fractional stock quantities when the embedded instrument kind is stock. Existing inventory is not subjected to the current minimum of a new order.

The current stock/ETF interface does not encode a CDB as a share with a fabricated unit price. Future deposit-product principal and identity follow their own accepted contract. See the [physical database plan](../../../docs/database-design.md) for storage, revisions, constraints, migrations and required integration tests. v0.2.0 versions this design update; it is not a product release or tag.
