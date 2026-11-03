param([string]$Root = 'C:\dev\investments')
$ErrorActionPreference='Stop'
$Factory=Join-Path $Root 'investment-factory'
foreach ($name in @('investment-factory','investment-backend','investment-frontend')) {
 $repo=Join-Path $Root $name
 if (-not (Test-Path (Join-Path $repo '.git'))) { throw "Missing Git repository: $repo" }
 & git -C $repo status --short
 if ($LASTEXITCODE -ne 0) { throw "git status failed: $repo" }
}
foreach ($p in @('AGENTS.md','SOL_HANDOFF.md','.specify/memory/constitution.md','.codex/config.toml','.gitmodules','docs/frontend-roadmap.md','docs/publishing.md')) {
 if (-not (Test-Path (Join-Path $Factory $p))) { throw "Missing $p" }
}
& git -C $Factory submodule status
if ($LASTEXITCODE -ne 0) { throw 'Submodule validation failed' }
Write-Host 'Local Phase 1 checks passed. Model availability, Spec Kit installation and GitHub rules still require manual verification.'
