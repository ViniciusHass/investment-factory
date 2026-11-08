# Feature 001 — Hierarchical portfolio allocation

## Goal
Configure relative target weights along the geography -> asset class -> sector -> investment hierarchy. Every layer may be omitted; when omitted, the investment attaches directly to the preceding available node or portfolio root. At the investment level, use objective eligibility and scoring to prioritize eligible assets, subject to concentration limits.

User stories: **US1 (P1)** starts with an empty portfolio and zero cash, then records existing holdings; **US2 (P1)** configures optional hierarchy levels with valid weights; **US3 (P2)** enters a new contribution budget and requests an explanation of what to buy and how many units. US3's calculation belongs to feature 004; its interface must remain separate from recording holdings.

## Clarifications

### Session 2026-11-08

- Q: Must all investment quantities be integral, or may they be fractional? → A: Stocks require whole units. Products that permit fractions, such as CDBs, may be fractional under their verified product rules.

- Q: Is the backend scaffold ready, and who defines the API contract? → A: The owner confirms the scaffold is ready; Sol owns technical contract design. The owner supplies business needs and reviews backend PRs.
- Q: How does the MVP begin and how does the person request investment recommendations? → A: Cash starts at zero; the person can enter existing holdings and the amount they want to invest. A button must indicate which investments to buy and the quantity of each.

Contract design, endpoint naming and request/response schemas are Sol's responsibility. These are not decisions to send back to the owner. The owner confirmation replaces the previous readiness question; published runtime gaps, if any, become explicit implementation work rather than another request for the owner to design the API.

## Acceptance criteria
- A node without children is a valid leaf. Every node with children requires its child weights to sum exactly to 100%; the frontend shows a red, textual, accessible error and prevents submission otherwise, while the backend enforces the same invariant.
- Effective weight is the product of parent-relative weights.
- Portfolio holdings can be entered independently of targets.
- User-entered monetary values retain their original decimal amount and currency on retrieval. A changed FX rate or consolidation currency cannot rewrite the recorded entry.
- Converted portfolio totals are separate, carry the applied dated FX rate/source/policy, and become unavailable when a valid rate is missing.
- Current allocation is calculated on request from current position values converted to the portfolio consolidation currency with one valid current FX snapshot. The comparison with target weights uses those calculated percentages, without rewriting the positions.
- Proposed contributions are constrained by available cash and eligible assets.
- Scores cannot silently override strategic limits.
- A newly created portfolio has no holdings and known zero cash. Unknown market values or costs remain unknown; zero starting cash is not a substitute for missing financial data.
- Recording existing holdings is inventory registration, not a purchase or an inferred cash transaction. Quantity and instrument are required; unknown historical cost stays null and is not inferred from today's quote.
- A separate contribution input accepts the original amount and currency. The action labelled “Calcular investimento” / “Calculate investment” requests recommendations showing instrument, quantity, estimated cost, reasons and unallocated budget. Recommendations never place orders or silently register purchases.
- The frontend shows an explicit unavailable/blocked result when required prices, FX, allocation policy or trading constraints are absent. It must not invent quantities so the button appears to work.

## Open questions
Initial cash is zero, existing holdings are entered by the person and new-contribution recommendations show quantities. The contribution budget is a simulation input; submitting it does not itself record a deposit, purchase or sale. Detailed cash movements and overlapping instrument categories remain separate business-policy work. USD is the initial consolidation currency; the current-FX policy still needs a source, freshness limit and rounding rule. Quantity policy is confirmed: stocks use integral quantities, and products that permit fractions follow their verified unit/minimum/increment rules. Product metadata, not a repeated owner choice between whole/fractional globally, gates a recommendation. See the database plan and ADR 0006.
