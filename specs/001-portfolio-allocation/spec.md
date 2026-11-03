# Feature 001 — Hierarchical portfolio allocation

## Goal
Configure relative target weights for geography -> asset class -> sector. At the investment level, use objective eligibility and scoring to prioritize eligible assets, subject to concentration limits.

## Acceptance criteria
- Every sibling group is validated against 100% when fully allocated.
- Effective weight is the product of parent-relative weights.
- Portfolio holdings can be entered independently of targets.
- Proposed contributions are constrained by available cash and eligible assets.
- Scores cannot silently override strategic limits.

## Open questions
How to handle unallocated cash, overlapping instrument categories, FX exposure, and rebalancing without selling?
