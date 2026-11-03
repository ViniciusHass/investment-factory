# Investment Factory architecture — agreed direction

Three repositories: `investment-factory` (orchestration/specifications), `investment-backend` (owner scaffolds FastAPI + SQLAlchemy + Alembic + PostgreSQL with Poetry), `investment-frontend` (Sol first plans long-term React + TypeScript + Vite architecture, Luna scaffolds after approval). Backend/frontend are Git submodules of Factory. Agents work in isolated Git worktrees.

## Financial domain
Portfolio allocation tree: geography (emerging/developed) → asset class (equities, real-estate funds, government bonds etc.) → sector → asset. Child weights are relative to parent and sum to 100% for fully allocated groups. At asset level use objective eligibility and scores, not arbitrary strategic weight overrides. Capture current positions, purchases, currencies, target percentages, contribution budget, planned vs actual allocations, and simulations. Optimize contributions under constraints; do not promise returns.

## Data architecture
React → FastAPI → domain/application services → financial provider adapters → external APIs. Persist normalized prices/fundamentals with as-of/collected-at timestamps, source, units, currency, quality and stale/missing status. Potential sources: brapi, Tesouro Transparente, BCB, international provider TBD. Verify API access and terms before choosing. No direct browser-to-provider access or client-side secrets.

## Development process
Spec Kit artifacts → Sol decomposition → Factory cards → Luna worktree implementation → automated tests → Sol review → PR → user-only merge. Factory runtime later: Python scheduler, SQLite state, retry limits, logs and cost controls. Codex CLI/SDK integration to be validated on user's Windows machine. `workspace-write` and `on-request` are conservative defaults, not a security guarantee. No model IDs assumed.
