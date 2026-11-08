# Implementation Plan: C01 portfolio, holdings and target contracts

**Branch:** Factory `agents/investment-factory-update-2026-11-07`, published through `docs/frontend-foundation-plan`. **Date:** 2026-11-08. **Spec:** [spec.md](./spec.md).

## Summary

Sol owns the technical contract after the owner's scaffold-ready confirmation. Deliver a versioned OpenAPI definition for zero-cash portfolio creation, inventory entered by the person, optional allocation hierarchy and a separate contribution-preview interface. The contract is a design artifact, not deployed endpoints. Core CRUD can proceed without market providers. Valuation and recommendations retain explicit data/policy gates under features 002–004.

## Technical Context

- **Language/version:** OpenAPI 3.1.1 JSON / JSON Schema 2020-12. Contract checks run on Node 22.12+. Backend implementation remains Python 3.14/FastAPI on the owner's structure; frontend remains React/strict TypeScript.
- **Primary dependencies:** pinned swagger-parser 11.0.0, Ajv 8.17.1 and ajv-formats 3.0.1 in an isolated validation-tools directory, not product manifests.
- **Storage:** contracts and explicitly synthetic fixture cases in Git. Backend persistence is PostgreSQL/SQLAlchemy/Alembic in later cards; no temporary in-memory product implementation substituted for persistence.
- **Testing:** OpenAPI structure/internal references, strict schema fixtures, exact-decimal conservation and target graph invariants. No live quote/API calls.
- **Target:** Windows development and Linux CI; personal local application, no new account/auth platform.
- **Performance/scope:** structural checks are local and deterministic; no invented provider SLA. List operations use limit 1–100 (default 50) and an opaque cursor. Decimal text length is bounded to 128 characters without rounding accepted inputs.
- **Constraints:** no product repository edits in this design slice, original values preserved, zero cash distinguished from unknown prices, no order execution.

## Constitution Check

| Principle | Pre/post-design result |
|---|---|
| Specification first | PASS: owner's business clarification is recorded and all interface behavior has explicit schemas and invariants. |
| Objective logic | PASS: no provider, scoring threshold or whole/fractional policy invented; blocked calculations carry reasons. |
| Traceability | PASS: tasks/cards link to feature 001, feature 004 and the canonical contract. |
| Separation | PASS: contracts in Factory; backend handles money and provider ports; client only calls FastAPI. |
| Reproducibility | PASS: versioned schemas, fixture cases, original decimal strings and calculation-source snapshots. |
| Human authority | PASS: no backend merge, no main merge; future frontend merge requires review/CI. |
| Least privilege | PASS: no credential-bearing schema field, external reference resolution disabled in validator. |

**Gate:** PASS for C01 contract design. This does not approve the financial optimizer or a provider adapter. Whole/fractional quantity policy is a feature-004 business question; no core-CRUD choice depends on its answer.

## Project Structure

- [Canonical OpenAPI](../../contracts/portfolio/v1/openapi.json), [semantics](../../contracts/portfolio/v1/README.md), fixtures and `validate.cjs` live under `contracts/portfolio/v1/`.
- Feature artifacts: this plan, research, data model, quickstart, contract index and tasks in `specs/001-portfolio-allocation/`.
- Backend card will add API request/response/routes, domain and application services inside the owner's `src/api`, `src/domain`, `src/aplication` and `src/infrastruct` boundaries. Do not rename or replace the scaffold just to match conventional spelling. Runtime/manifest changes, if needed, belong to an explicit reviewed implementation diff.
- Frontend client/types live in `src/shared/api/` in its own implementation card/worktree. No fictional portfolio routes are enabled before integrated endpoints exist.

## Delivery

US1: portfolio creation and entered holdings; US2: target graph; US3: preview request/result shape only. Complete schema/fixture checks, then analyze spec/plan/tasks before promoting implementation cards. Backend OpenAPI export must be compared with this contract during API implementation. F03 may consume a reviewed contract before deployment, but must not claim integration success or synthesize production data.

## Complexity Tracking

No constitution exception. A flat target-node list avoids recursive response duplication and supports omitted layers. No scheduler, global frontend store or general ledger is added. A preview budget is not a ledger deposit.
