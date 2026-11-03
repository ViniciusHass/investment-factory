param([string]$Root = 'C:\dev\investments')
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$Source = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
foreach ($tool in @('git')) { if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "$tool is required." } }
foreach ($name in @('investment-factory','investment-backend','investment-frontend')) {
  if (Test-Path (Join-Path $Root $name)) { throw "Target exists: $name. Refusing to overwrite anything." }
}
if (-not (& git config user.name)) { throw 'Configure git config --global user.name first.' }
if (-not (& git config user.email)) { throw 'Configure git config --global user.email first.' }
New-Item -ItemType Directory -Path $Root -Force | Out-Null
$Factory = Join-Path $Root 'investment-factory'
New-Item -ItemType Directory -Path $Factory | Out-Null
foreach ($dir in @('.codex','.specify','agents','cards','contracts','docs','scripts','specs','factory')) {
 Copy-Item -LiteralPath (Join-Path $Source $dir) -Destination $Factory -Recurse
}
foreach ($file in @('README.md','AGENTS.md','.gitignore','pyproject.toml','SOL_HANDOFF.md')) {
 Copy-Item -LiteralPath (Join-Path $Source $file) -Destination $Factory
}
New-Item -ItemType Directory -Path (Join-Path $Factory 'state') | Out-Null
Set-Content -Path (Join-Path $Factory 'state/.gitkeep') -Value ''
function Invoke-Git([string]$Repo,[string[]]$GitArgs) {
 & git -C $Repo @GitArgs
 if ($LASTEXITCODE -ne 0) { throw "git failed in $Repo : $($GitArgs -join ' ')" }
}
foreach ($name in @('investment-backend','investment-frontend')) {
 $Repo = Join-Path $Root $name
 New-Item -ItemType Directory -Path $Repo | Out-Null
 Copy-Item -LiteralPath (Join-Path $Source "repo-seeds/$name/README.md") -Destination $Repo
 Copy-Item -LiteralPath (Join-Path $Source "repo-seeds/$name/AGENTS.md") -Destination $Repo
 Copy-Item -LiteralPath (Join-Path $Source "repo-seeds/$name/.gitignore") -Destination $Repo
 Invoke-Git -Repo $Repo -GitArgs @('init','-b','main')
 Invoke-Git -Repo $Repo -GitArgs @('add','.')
 Invoke-Git -Repo $Repo -GitArgs @('commit','-m',"chore: initialize $name repository")
}
Invoke-Git -Repo $Factory -GitArgs @('init','-b','main')
# Local paths are only for initial bootstrap. Replace with GitHub remotes before publishing Factory.
foreach ($name in @('investment-backend','investment-frontend')) {
 $Repo = (Resolve-Path (Join-Path $Root $name)).Path
 & git -C $Factory -c protocol.file.allow=always submodule add $Repo ($name -replace 'investment-','')
 if ($LASTEXITCODE -ne 0) { throw "Could not add $name submodule" }
}
Invoke-Git -Repo $Factory -GitArgs @('add','.')
Invoke-Git -Repo $Factory -GitArgs @('commit','-m','chore: initialize investment factory and local submodules')
Write-Host "Created factory, backend, frontend in $Root"
Write-Host 'NEXT: create three empty GitHub repos, push backend and frontend, replace submodule URLs, then push factory.'
Write-Host 'See docs/publishing.md. No GitHub remote has been created automatically.'
