# Tasks: C01 portfolio and contribution interface

**Input:** [spec](./spec.md), [plan](./plan.md), [research](./research.md), [data model](./data-model.md), [contract](./contracts/README.md), [quickstart](./quickstart.md).
**Scope:** Factory contract design and checks, not deployed backend/frontend features. Paths are Factory-relative. Backend implementation is a separate card with its own decomposition.
**Tests:** Required to demonstrate exact decimals, input preservation, invalid target graphs and ready/blocked separation.

## Phase 1 — Setup

- [x] T001 Record the owner's scaffold-ready, Sol-contract ownership and zero-cash/input/button decisions in `specs/001-portfolio-allocation/spec.md` and `specs/004-rebalancing-engine/spec.md`.
- [x] T002 Write C01 design boundaries and verified validator research in `specs/001-portfolio-allocation/plan.md` and `specs/001-portfolio-allocation/research.md`.

## Phase 2 — Foundation

- [x] T003 Define exact decimal strings (maximum 128 characters), positive quantities, UUIDs, currency codes and structured RFC9457 errors in `contracts/portfolio/v1/openapi.json`; prevent input coercion/default insertion in `validate.cjs`.

## Phase 3 — US1: zero-cash portfolio and existing holdings (P1)

**Independent test:** create/read fixture shapes distinguish zero cash, no positions and null cost; accepted original amount spelling is unchanged.
- [x] T004 [US1] Define portfolio/settings, owned-instrument identity and holding CRUD shapes, required If-Match, 428/412/409 and original fields in `contracts/portfolio/v1/openapi.json`.
- [x] T005 [US1] Add valid and invalid fixture cases for zero cash, positive quantities, nullable costs, exact original decimals and forbidden computed inputs in `contracts/portfolio/v1/cases.json`.

## Phase 4 — US2: optional allocation tree (P1)

**Independent test:** allow empty trees/leaves/omitted levels and reject incorrect sums at every nonempty group, duplicates, missing parents, cycles and reversed levels.
- [x] T006 [US2] Define closed target node and atomic replacement schemas in `contracts/portfolio/v1/openapi.json`.
- [x] T007 [US2] Validate graph and exact sibling-weight invariants using integer scaling/BigInt in `contracts/portfolio/v1/validate.cjs` and fixture cases in `cases.json`.

## Phase 5 — US3: ask what/quantity to invest (P2, interface only)

**Independent test:** ready response conserves the original budget; blocked response has reasons and cannot expose fictional quantities/costs.
- [x] T008 [US3] Define positive original-budget request and disjoint ready/blocked response shapes, real source/policy snapshots and separate valuation availability in `contracts/portfolio/v1/openapi.json`.
- [x] T009 [US3] Validate original = allocated + remaining, per-item budget-cost sums, currency consistency and blocked-result separation in `contracts/portfolio/v1/validate.cjs` with synthetic `cases.json`.

## Phase 6 — Verification and traceability

- [x] T010 Run OpenAPI/internal-reference, all-component Ajv2020 and positive/negative fixture checks using `contracts/portfolio/v1/validate.cjs`; document exact commands and scope limits in `specs/001-portfolio-allocation/quickstart.md`.
- [x] T011 Analyze `spec.md`, `plan.md`, this `tasks.md` and the contract; review core-vs-future route gates and record remaining feature-004 business questions in `specs/001-portfolio-allocation/analysis.md`.
- [x] T012 Publish verified contract/card evidence through Factory PR #2 using `cards/INV-0005.md` and `docs/foundation-status.md`; keep backend implementation separate and never merge main.

## Dependencies and parallel work

T001 → T002 → T003; US1/US2 schema work shares the canonical OpenAPI, so one owner edits it. After T003, independent fixture reviews for US1 and US2 can run in parallel in distinct scratch files before one owner integrates cases. US3 shares schemas and follows them; it does not implement feature-004 policy. T010 precedes T011, and T012 is last. No planned product task is marked done by completing these contract tasks.

## Implementation strategy

Publish and validate core C01 first. Prepare backend persistence/API and frontend client cards against this versioned source. Their endpoint/export/contract checks must pass before integrated financial screens are enabled. Stock quantities are integral and other fractions depend on the product's verified capability. Provider/FX freshness, scoring/fee policy and product minimum/increment data cannot be inferred from schemas; missing required inputs produce blocked results.

## Owner quantity and database planning increment — 2026-11-08

These tasks update the design slice; they do not mark backend migrations as implemented.

- [x] T013 [US1] Record whole-stock and product-specific fractional policy in `specs/001-portfolio-allocation/spec.md`, `specs/004-rebalancing-engine/spec.md` and `docs/decisions/0006-product-quantity-rules.md`.
- [x] T014 Define physical tables, exact original storage, keys, transaction/history rules, migration phases and PostgreSQL acceptance tests in `docs/database-design.md`.
- [x] T015 Link persistence planning into `specs/001-portfolio-allocation/plan.md`, `data-model.md` and `cards/INV-0006.md`; preserve its implementation status.
- [x] T016 Validate whole-stock rejection/acceptance and a synthetic fractional-product case through `contracts/portfolio/v1/validate.cjs`, then review contract/database/owner-decision consistency.
