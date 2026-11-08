# Data model: C01 and the preview boundary

| Entity | Fields / invariants |
|---|---|
| Portfolio | UUID, name (1–120 characters), reporting_currency default USD, integer revision >=1, cash balances, holding count, timestamps. Creation has no holdings and known zero cash; settings changes do not rewrite original entries. |
| Instrument | UUID, normalized ticker (1–32 characters), exchange MIC (four uppercase alphanumeric characters), currency, stock/ETF kind, metadata status. Identity is unique by normalized exchange/ticker. User-entered identity is not a verified market quote. |
| Holding | UUID, portfolio/instrument IDs, positive decimal quantity, nullable original total cost and as_of_date, timestamps. One current record per instrument. Inventory corrections do not infer trades or cash movements. |
| Money | amount string, currency code. Accepted amount spelling is preserved; no exponent/grouping/rounding. Strings are bounded to 128 characters. |
| Targets | flat nodes with UUID, parent UUID/null, kind, label, relative weight, optional instrument identity. Root is implicit; empty initial tree and leaves are valid; each nonempty sibling set totals exactly 100. No cycles/orphans/reversed/repeated layers. |
| Market snapshot | UUID/time, portfolio and targets revisions, calculation/FX policy versions, real dated quotes and FX rates. Freshness is backend policy, not browser cache age. |
| Contribution preview | original positive budget; ready with instruments, quantities, estimated native/budget costs, allocated/remaining budget and policy snapshot; or blocked with reasons only. The original budget is not persisted cash. |
| Problem | RFC9457 fields, stable code, request UUID and field errors. No raw exception or provider payload. |

Quantities are decimal text so the shape supports either business answer about fractional units. The engine still requires a resolved trading policy before producing quantities. `original_cost=null` means unknown, never zero. For full inventory replacement, omitted optional cost/date become null; for settings PATCH, omitted fields remain unchanged.

Target amounts are parent-relative. Effective weight multiplies weights only along existing nodes. An investment node is a leaf with instrument identity; other nodes do not have instrument IDs. Portfolio target editing remains independent from registering a holding. Ambiguous instrument placement across multiple branches cannot silently produce a financial allocation; the calculation policy must resolve it or block.

State transitions: initial portfolio → manually entered inventory and targets → read-only contribution preview → separately saved plan / manually recorded purchase in future feature-004 cards. No preview transition changes the actual portfolio.
