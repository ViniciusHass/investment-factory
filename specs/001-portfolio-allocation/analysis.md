# Specification analysis — C01 contract slice

**Date:** 2026-11-08. **Inputs:** [spec](./spec.md), [plan](./plan.md), [tasks](./tasks.md), [canonical contract](../../contracts/portfolio/v1/openapi.json), constitution.
**Scope:** contract design/checks only. Completing C01 does not complete feature-001 backend or feature-004 recommendations.

## Findings

No critical/high inconsistency found within C01. The owner supplied initial-zero cash, entered inventory, contribution budget and what/quantity action. Technical contract ownership is Sol's responsibility. No unresolved provider/trading/scoring choice is silently converted into a production default.

## Coverage

| Acceptance criterion | Tasks | Evidence / boundary |
|---|---|---|
| Leaves, optional layers and exact sibling totals | T006/T007 | Target schemas and graph/decimal fixtures, including root. |
| Effective weights follow existing path | T002/T006 | Data model/contract describe product of relative weights; backend implementation remains separate. |
| Holdings independent from targets | T004/T005 | Separate resources and original inventory fixtures. |
| Preserve original amount/currency | T003/T004/T005 | String schema, no coercion, immutable fixture input. |
| Separate converted reporting values | T008/T009 | Snapshot/value interface; provider implementation gated. |
| Current allocation uses a valid snapshot | T008 | Valuation shapes, source metadata; not an implemented valuation service. |
| Contribution budget/eligibility constraints | T008/T009 | Exact budget conservation and explicit policy metadata; optimizer is feature 004. |
| Scores cannot override strategy | T008 | Backend policy gate and reasons; no client-supplied score/quotes. |
| Initial cash and holdings are zero | T004/T005 | PortfolioCreated rejects nonzero cash/holding count. |
| Entered inventory and unknown cost | T004/T005 | Positive quantities, nullable cost/date; no inferred purchase. |
| Button returns what/quantity/cost/leftover | T008/T009 | Disjoint response schemas; actual UI/API implementation is not claimed. |
| Missing data/policy is unavailable, not zero | T008/T009 | Blocked/unavailable branches forbid financial result fields. |

All 12 contract-level criteria have mapped tasks. All 12 tasks are traceable; 0 critical issues, 0 high issues. The 3 user stories map to 2 contract tasks each, with 3 setup/foundation and 3 verification/publication tasks.

## Executed validation

Pinned swagger-parser 11.0.0 + Ajv2020 8.17.1 + ajv-formats 3.0.1 on portable Node22: PASS, OpenAPI 3.1.1, 36 component schemas, 15 operations, 37 cases (12 accepted / 25 rejected). Checks include original decimal text, graph invariants and exact budget conservation. No provider, backend endpoint, persistence or complete optimizer was tested or claimed.

## Deferred work and next action

Whole/fractional units is a feature-004 business question still pending. Providers/FX freshness, score/fees and nonzero-cash policies remain explicit gates for calculation cards. They do not block C01 CRUD design. Backend implementation/card-specific tasks, actual FastAPI OpenAPI export and runtime conformance must precede claims of API integration. [INV-0006](../../cards/INV-0006.md) remains BACKLOG until decomposed.
