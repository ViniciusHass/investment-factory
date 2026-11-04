# Publish the three repositories (Windows PowerShell)

Bootstrap creates three **local** repositories. It does not create GitHub repositories or grant agents permissions.

1. Create three **empty public** GitHub repositories named `investment-backend`, `investment-frontend`, and `investment-factory` (no initial README/license). They were created under `ViniciusHass` on 2026-11-03; the commands below remain a reference for a fresh bootstrap.
2. Push the backend and frontend first:

```powershell
$root = 'C:\dev\investments'
foreach ($name in @('investment-backend','investment-frontend')) {
  git -C "$root\$name" remote add origin "https://github.com/<OWNER>/$name.git"
  git -C "$root\$name" push -u origin main
}
```

3. Update the Factory submodule URLs to the remote URLs (the local paths in `.gitmodules` are unsuitable for collaborators/CI):

```powershell
cd C:\dev\investments\investment-factory
git config -f .gitmodules submodule.backend.url "https://github.com/<OWNER>/investment-backend.git"
git config -f .gitmodules submodule.frontend.url "https://github.com/<OWNER>/investment-frontend.git"
git submodule sync --recursive
git add .gitmodules
git commit -m "chore: use remote URLs for submodules"
git remote add origin "https://github.com/<OWNER>/investment-factory.git"
git push -u origin main
```

4. On another machine, use `git clone --recurse-submodules <factory-url>`.
5. Configure GitHub rulesets / branch protection and PR checks. **A sole repository owner may retain bypass capability depending on plan and rules**; verify enforcement. Keep automation tokens without merge/bypass permissions. No automated merges.
6. If a remote is already configured, inspect `git remote -v` before repeating these commands.

## Integration branches

Backend and frontend each have a local `develop` branch. After their GitHub remotes are configured and the initial `main` branches are published, publish `develop` from each product repository and configure PR checks/protection for both `develop` and `main`. Implementation branches start from `develop` and their PRs target `develop`. Backend card merges require owner approval; Sol may merge frontend card PRs into frontend `develop` after CI and technical review. Both `develop → main` promotions require owner approval after MVP evaluation. Do not publish a submodule pointer to a commit that collaborators cannot fetch.
