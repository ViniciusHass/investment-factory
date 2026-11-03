# Investment Factory — Phase 1 (three-repository bootstrap)

Windows-native starter for a personal investment portfolio planning system. This ZIP creates **three local Git repositories** and adds backend/frontend as Git submodules in Factory. The owner has begun the backend package tree; frontend requires an approved long-term Sol plan before Luna scaffolds it.

## Quick start

Prerequisites: Git and PowerShell 7 (`pwsh`); configure `git config --global user.name` and `user.email`. Python 3.12+, uv for the backend, Poetry for the planned Factory runtime, VS Code, Codex CLI and Node.js are needed later, but not to run the bootstrap.

```powershell
pwsh -File .\scriptsootstrap.ps1 -Root 'C:\dev\investments'
pwsh -File 'C:\dev\investments\investment-factory\scriptserify.ps1' -Root 'C:\dev\investments'
code 'C:\dev\investments\investment-factory'
```

**Do not run bootstrap in a directory that already contains any of the three repositories.** It refuses to overwrite. The ZIP is not itself a Git repository.

Read `SOL_HANDOFF.md` first, then `docs/publishing.md` to publish the three repositories to GitHub in the right order. Local submodule URLs must be changed before pushing Factory.

## Workflow and boundaries

Sol owns requirements, architecture, Spec Kit artifacts, cards and review. Luna implements approved cards in isolated worktrees. The owner approves backend card merges and both `develop → main` promotions; Sol may merge frontend card PRs into frontend `develop` after CI and technical review. Agent model names and automatic delegation are **not configured or validated** yet; Codex configuration intentionally has no model ID. Spec Kit 1.3.0 has been initialized locally with Codex integration; the original project constitution and seed specs remain.

No market-data integration, production financial data, or brokerage execution are included. The frontend is not scaffolded. The backend has an initial package tree and still needs a uv manifest, migrations and API contracts. Local Docker configuration is described in `docs/development-docker.md`.
