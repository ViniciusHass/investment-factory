# Investment Factory — Phase 1 (three-repository bootstrap)

Windows-native starter for a personal investment portfolio planning system. This ZIP creates **three local Git repositories** and adds backend/frontend as Git submodules in Factory. Backend is deliberately left for the owner to scaffold; frontend requires a long-term Sol plan before Luna scaffolds it.

## Quick start

Prerequisites: Git and PowerShell 7 (`pwsh`); configure `git config --global user.name` and `user.email`. Python 3.12+, Poetry, VS Code, Codex CLI and Node.js are needed later, but not to run the bootstrap.

```powershell
pwsh -File .\scriptsootstrap.ps1 -Root 'C:\dev\investments'
pwsh -File 'C:\dev\investments\investment-factory\scriptserify.ps1' -Root 'C:\dev\investments'
code 'C:\dev\investments\investment-factory'
```

**Do not run bootstrap in a directory that already contains any of the three repositories.** It refuses to overwrite. The ZIP is not itself a Git repository.

Read `SOL_HANDOFF.md` first, then `docs/publishing.md` to publish the three repositories to GitHub in the right order. Local submodule URLs must be changed before pushing Factory.

## Workflow and boundaries

Sol owns requirements, architecture, Spec Kit artifacts, cards and review. Luna implements approved cards in isolated worktrees. The owner approves merges. Agent model names and automatic delegation are **not configured or validated** yet; Codex configuration intentionally has no model ID. Spec Kit is **not installed** by this ZIP: `.specify/` contains initial project-specific material; install/initialize the official CLI separately after checking its current commands and avoid overwriting files.

No API credentials, market-data integration, production financial data, or brokerage execution are included. The frontend is not scaffolded. Backend/frontend are seeded with instructions and README only.
