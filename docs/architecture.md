# Investment Factory architecture — agreed direction

Three repositories: `investment-factory` (orchestration/specifications), `investment-backend` (owner scaffolds FastAPI + SQLAlchemy + Alembic + PostgreSQL with uv), `investment-frontend` (Sol first plans long-term React + TypeScript + Vite architecture, Luna scaffolds after approval). Backend/frontend are Git submodules of Factory. Agents work in isolated Git worktrees.

## Financial domain
Portfolio allocation tree: geography (emerging/developed) → asset class (equities, real-estate funds, government bonds etc.) → sector → asset. Child weights are relative to parent and sum to 100% for fully allocated groups. At asset level use objective eligibility and scores, not arbitrary strategic weight overrides. Capture current positions, purchases, currencies, target percentages, contribution budget, planned vs actual allocations, and simulations. Optimize contributions under constraints; do not promise returns.

## Data architecture
React → FastAPI → domain/application services → financial provider adapters → external APIs. Persist normalized prices/fundamentals with as-of/collected-at timestamps, source, units, currency, quality and stale/missing status. Potential sources: brapi, Tesouro Transparente, BCB, international provider TBD. Verify API access and terms before choosing. No direct browser-to-provider access or client-side secrets.

## Multicurrency records
The backend accepts entries in their original currency and preserves the exact user-declared amount and currency for retrieval. Portfolio reporting calculates converted values and distribution when requested, into a configurable consolidation currency initially set to USD, using a dated FX snapshot with source and policy version; conversion never overwrites the original entry. Saved plans retain their calculation snapshots for reproducibility. Current valuation, original contribution and converted reporting amount are distinct concepts. Missing FX leaves consolidated values unavailable instead of inventing zero; see `docs/decisions/0002-multicurrency-records.md`.

Current allocation compares target weights with current position values converted using a current valid FX snapshot. Below-target branches are candidates for new contributions; above-target branches do not receive a buy recommendation, and other eligibility/cap constraints can still block a below-target purchase. The MVP gain summary converts invested and current amounts using the same current FX snapshot and explains that convention to the user.

## Development process
Spec Kit artifacts → Sol decomposition → Factory cards → Luna worktree implementation → automated tests → Sol review → PR → user-only merge. Factory runtime later: Python scheduler, SQLite state, retry limits, logs and cost controls. Codex CLI/SDK integration to be validated on user's Windows machine. `workspace-write` and `on-request` are conservative defaults, not a security guarantee. No model IDs assumed.

Backend and frontend each have a `develop` integration branch. An approved card uses a separate branch and worktree based on `develop`, then a PR to `develop` with GitHub Actions checks. Backend card merges require owner approval. The owner delegates frontend card merges into frontend `develop` to Sol after CI and technical review; Luna never merges. After MVP testing, the owner and Sol finalize CI gates and the owner approves any promotion to `main`; see `docs/decisions/0003-branches-and-ci.md`.
