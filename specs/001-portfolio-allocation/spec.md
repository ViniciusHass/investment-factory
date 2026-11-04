# Feature 001 — Hierarchical portfolio allocation

## Goal
Configure relative target weights along the geography -> asset class -> sector -> investment hierarchy. Every layer may be omitted; when omitted, the investment attaches directly to the preceding available node or portfolio root. At the investment level, use objective eligibility and scoring to prioritize eligible assets, subject to concentration limits.

## Acceptance criteria
- A node without children is a valid leaf. Every node with children requires its child weights to sum exactly to 100%; the frontend shows a red, textual, accessible error and prevents submission otherwise, while the backend enforces the same invariant.
- Effective weight is the product of parent-relative weights.
- Portfolio holdings can be entered independently of targets.
- User-entered monetary values retain their original decimal amount and currency on retrieval. A changed FX rate or consolidation currency cannot rewrite the recorded entry.
- Converted portfolio totals are separate, carry the applied dated FX rate/source/policy, and become unavailable when a valid rate is missing.
- Current allocation is calculated on request from current position values converted to the portfolio consolidation currency with one valid current FX snapshot. The comparison with target weights uses those calculated percentages, without rewriting the positions.
- Proposed contributions are constrained by available cash and eligible assets.
- Scores cannot silently override strategic limits.

## Open questions
How to handle unallocated cash, overlapping instrument categories, FX exposure, and rebalancing without selling? USD is the initial consolidation currency; the approved current-FX policy still needs a source, freshness limit and rounding rule.
