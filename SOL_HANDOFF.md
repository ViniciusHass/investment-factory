# Investment Factory — complete project handoff for Sol

> **Read this document before creating cards or changing architecture.** This is the agreed project context and a starting point, not authorization to make unresolved product decisions without consulting the owner.

## 1. Vision
Build a **personal-use**, web-based portfolio planner to record holdings, configure hierarchical target allocation, evaluate assets objectively, and propose how to distribute new contributions to return toward target weights. Also compare intended/planned contributions with realized contributions and simulate future outcomes. This is **not** an automatic brokerage trading system and must not imply investment returns are guaranteed.

## 2. Confirmed product decisions
- React + TypeScript frontend, FastAPI Python backend; Windows native development in VS Code.
- Allocation hierarchy is **geography first**: emerging vs developed markets → asset class (stocks, treasury/government bonds, real-estate funds/REITs, potentially ETFs) → sector → company/instrument.
- Each parent sets child percentages **relative to that parent**; siblings total 100%. Example: 40% emerging × 60% equities × 25% technology = 6% of overall portfolio.
- At investment level, assign **objective scores** based on instrument-specific criteria and eligibility gates, with configurable thresholds and weights. Asset scores prioritize eligible candidates **within strategic limits**; do not silently change geographic/class/sector targets.
- User enters existing holdings/positions and amount available for a new contribution. Rebalancer should consider current market value, target weights, eligibility, asset concentration limits, possible fractional/whole-share constraints, fees, FX, and preferably avoid sales initially.
- Show allocation deviations, recommended contributions, reasons for each recommendation, remaining gaps and planned vs realized results. Support what-if and longer-term simulations with explicit assumptions.
- Initially personal use, not multi-tenant SaaS. Do not overbuild auth/hosting in MVP.
- Investment data must come from external financial APIs/datasets, with backend adapters. Holdings are user-entered/imported, not magically inferred from quote APIs.

## 3. Financial data and scoring
Potential Brazilian sources: brapi for equities/FIIs/ETFs, official Tesouro Transparente data for government bonds, BCB for FX/Selic/macroeconomics. International coverage/provider still **undecided**; assess price, licensing, coverage, fundamentals and limits before selection. Avoid assuming any free tier or API endpoint without validation.

Persist instrument identity, source ID, ticker/exchange, market/country, currency, unit, metric period, as-of timestamp, collected-at timestamp, provenance, missing/stale flags, and provider errors. Different instruments need different scorecards; do not apply industrial-company leverage ratios to banks or government bonds. Example equity criteria discussed: ROIC vs cost of capital, debt/EBITDA, 5-year profit growth, free cash flow and valuation; **examples only**, not approved universal rules. Missing information is not a failing metric by default.

## 4. Rebalancing policy
Goal: allocate contribution budget to reduce deviations from target hierarchy, then prefer higher-scored eligible assets within caps and constraints. Scores and target weights are separate concepts. Include a traceable objective function and deterministic tests. Example: portfolio 30k equities, 10k FIIs, 10k Treasury; targets 50/30/20; a 5k new contribution can go entirely to FIIs to reduce deviations (still not reach all targets). Do not interpret that example as a universal optimizer result for all constraints.

## 5. Repositories and ownership
- `investment-factory`: spec-first workflow, orchestration, cards, architectural decisions, contracts, agent instructions, execution history. This is the control plane, not the product API.
- `investment-backend`: owner **personally creates the initial scaffolding** (FastAPI, uv, SQLAlchemy, Alembic, PostgreSQL). Sol can propose architecture and review; Luna implements only assigned cards afterward.
- `investment-frontend`: user has limited React/frontend experience. **Sol must prepare a long-term, staged frontend plan before any Luna scaffolding or implementation.** Include learning-oriented rationale, chosen libraries, architecture, milestones, test approach, dependencies on backend contracts, UX, accessibility and maintenance strategy. Get explicit owner approval of plan. See `docs/frontend-roadmap.md`.
- Factory includes backend and frontend as **Git submodules**. Bootstrap creates all three locally; remote GitHub repos are created manually and local submodule URLs replaced with GitHub URLs before publishing Factory.

## 6. Agents and operating mode
Desired mode: **autonomous orchestration with scoped merge authority**. Sol acts as architect/planner/reviewer; Luna agents implement backend/frontend cards. A Python Factory scheduler (future phase) persists state, checks dependencies, allocates worktrees, invokes agents, captures logs and tests, requests fixes, and opens PRs. The owner approves backend card merges and both `develop → main` promotions after MVP evaluation. The owner delegates frontend card PR merges into frontend `develop` to Sol after CI and technical review. Luna never merges. No force push or bypass. Keep agent permissions narrow and secrets out of prompts and commits.

Card lifecycle: BACKLOG → READY → RUNNING → TESTING → REVIEW → AWAITING_HUMAN_APPROVAL → DONE; failures retry with bounded attempts, then BLOCKED. Features can span multiple backend/frontend cards with explicit API contract dependencies. Each card requires objective acceptance criteria, test expectations, repo, dependencies and a Definition of Done. Keep distinct worktrees for concurrent agents; Git submodules do not provide concurrent isolation.

**Important limitation:** Sol/Luna are intended agent roles/model selections, not proof that the user's local Codex CLI exposes those exact model identifiers or native programmatic delegation. Verify `codex --help`, authentication, model availability, Windows sandbox behavior and actual CLI/SDK capabilities. Do not hardcode unverified model IDs or claim full autonomy exists in Phase 1. Consider Codex CLI noninteractive runs initially, SDK/app-server later if supported and needed.

## 7. Spec Kit
Use GitHub Spec Kit for constitution → specify → clarify → plan → tasks → analyze, adapted to locally installed CLI version. The original `.specify/` package was a project-specific seed; on 2026-11-03, `specify` 1.3.0 was initialized with its Codex integration and PowerShell scripts. Existing constitution and specs remained intact. Review generated assets before using a workflow on a feature. Factory converts approved Spec Kit tasks into tracked cards; Spec Kit itself is not an agent scheduler.

## 8. Architecture choices and quality gates
- Frontend: React + TypeScript + Vite (planned), frontend library decisions by Sol roadmap.
- Backend: FastAPI, SQLAlchemy, Alembic, PostgreSQL, uv; scoring/rebalancing isolated from provider I/O.
- Factory: Python 3.12+, Poetry, eventual SQLite state, Git CLI/worktrees, Codex integration.
- Automated checks: lint/type checking, unit/integration tests, OpenAPI contract checks, PR review and human merge.
- No market-data provider API secrets in frontend, repo or prompts. No trading/order execution in MVP.
- Prefer explicit ADRs for architecture decisions; do not create unrequested complexity.

## 9. Immediate action plan for Sol
1. Inspect all repository instructions, current git status and submodules. Confirm GitHub publishing and main-branch protection before any autonomous agent writes.
2. Review user's backend scaffolding when ready; **do not replace it**.
3. Draft `docs/frontend-roadmap.md` as a concrete long-term frontend plan and present to user for approval **before** frontend implementation.
4. Review Spec Kit setup and seed specs; refine ambiguous requirements with user rather than inventing answers.
5. Create a milestone/dependency plan, including financial-data-provider research and normalized data contracts before scoring and rebalance logic.
6. Validate local Codex roles/model IDs and Windows permissions, then propose minimal safe Factory orchestrator for the next phase.

## 10. Open questions (do not assume answers)
- Which international data provider and licensing budget? Which countries and exchanges first?
- What is the portfolio base currency, and what FX conversion conventions apply?
- How do we define sectors for bonds and real-estate instruments? Are some hierarchy branches optional?
- What objective scorecards, exclusion rules and sector-specific thresholds should apply?
- Is asset discovery of unowned investments part of MVP? Design should allow it, but scope not yet confirmed.
- How should realized vs planned investments be captured, and what simulation horizon/return assumptions are acceptable?
- How to handle partial shares, cash balances, taxes, fees, dividends, and rebalancing sales?
- Which GitHub rulesets are enforceable on the owner's account? Which exact Codex models and automation features are available?

## 11. Working agreement
Do not claim a phase is implemented until commands and tests have actually run. Keep user approval for merges and major design choices. First deliver the frontend plan, then delegate its implementation. Keep the Factory focused on coordinating product development, not becoming an unnecessary application platform.

## 12. Owner clarification — 2026-11-08

The owner confirms the initial backend scaffold is ready. Sol defines the technical API contract, endpoints, schemas, validation and implementation cards. The owner supplies business needs and reviews backend PRs. Do not ask the owner to design the API or repeat the resolved scaffold-readiness question; preserve the owner's structure in implementation diffs.

The MVP begins with zero cash. The person can enter existing holdings and a new investment amount; the action must indicate which investments to buy and the quantity of each. A recommendation neither executes an order nor records an actual purchase. Whole/fractional-unit policy is a pending business clarification. See [feature 001](specs/001-portfolio-allocation/spec.md), [feature 004](specs/004-rebalancing-engine/spec.md) and [C01 contract](contracts/portfolio/v1/README.md).
