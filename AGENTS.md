# Investment Factory — Codex agent instructions

## Read first
Read `SOL_HANDOFF.md`, `.specify/memory/constitution.md`, `docs/architecture.md`, `docs/frontend-roadmap.md` and the governing feature spec before proposing changes. The owner wants a personal investment portfolio planner, not a brokerage trading bot.

## Responsibilities
- **Sol / architect:** gather requirements, create and refine specs, plans and acceptance criteria, split features into cards, review results. Do not implement product features in architect role.
- **Luna / implementer:** implement approved cards with tests, within an isolated repository worktree. Report evidence and blockers; no merges.
- **Factory (future):** deterministic Python orchestrator for card states, dependency checks, session logs, retry budgets and PRs. No claim of automatic delegation until verified in the user's Codex CLI.

## Startup sequence
1. Bootstrap all three repositories and publish remotes using `docs/publishing.md`.
2. Owner scaffolds backend; Sol may review its design but should not overwrite owner work.
3. **Sol must produce a long-term frontend roadmap** as specified in `docs/frontend-roadmap.md`; get owner approval before Luna scaffolds frontend.
4. Adopt Spec Kit workflow (constitution → specify → clarify → plan → tasks → analyze) as supported by installed version; convert tasks into traceable Factory cards.
5. Only after foundations, build autonomous orchestration with human-approved PR merges.

## Domain rules
- Hierarchy: geography → asset class → sector → investment; sibling weights sum to 100% under each parent.
- Companies/instruments have objective eligibility gates and 0–100 scores; scores rank eligible investments but cannot silently override strategic allocation or concentration caps.
- Record current holdings, target allocations, contribution amount, expected/planned vs actual contributions; propose rebalancing primarily through new contributions without assuming sales.
- Provider adapters run in FastAPI backend only. Normalize instrument IDs, exchanges, currencies, timestamps, units, sources and quality. Missing/stale data is not a zero score. Do not invent data or imply guaranteed returns.
- Financial APIs: investigate Brazilian market providers, official Treasury data, Central Bank FX, and international sources; verify terms, rate limits, cost and coverage before coding.

## Security and Git
- Three Git repos, backend/frontend referenced as Factory submodules. Use separate worktrees for concurrent agents; submodules alone do not isolate concurrent edits.
- Never force push, bypass protections, expose secrets or execute brokerage orders. Backend PR merges into `develop` and any `develop` to `main` merge require owner approval. The owner explicitly delegates to Sol authorization and execution of frontend card PR merges into frontend `develop`, after passing CI and Sol technical review. Luna never merges. Repository prompts are not a substitute for GitHub enforcement.
- No implementation without accepted specs/cards, contracts and test expectations. Keep ADRs in `docs/decisions/`.
- Backend and frontend use `develop` as the integration branch. Each approved implementation starts from `develop` in its own branch and worktree and targets a PR to `develop`. Backend card merges require owner approval; Sol may merge frontend card PRs into frontend `develop` only after CI and technical review. The owner alone approves promotion from `develop` to `main` in both repos after MVP evaluation.

## Code style
- Write code comments in English, including comments in Dockerfiles and configuration files. User-facing text and project planning documents may use Portuguese or the supported UI languages.
- In backend and frontend, make subsequent commits atomic: one coherent change per commit, with a Conventional Commit subject matching the existing repository style. Use the GitFlow branch path `develop` -> one work branch per card -> PR to `develop`. Agent-authored commits use `Codex <codex@users.noreply.github.com>` without changing the owner's global Git identity. Do not rewrite earlier published commits to retrofit this rule.
- Plan SemVer separately for backend and frontend releases; do not create version tags or automate releases before the owner approves the release policy.
