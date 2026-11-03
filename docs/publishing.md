# Publish the three repositories (Windows PowerShell)

Bootstrap creates three **local** repositories. It does not create GitHub repositories or grant agents permissions.

1. Create three **empty private** GitHub repositories named `investment-backend`, `investment-frontend`, and `investment-factory` (no initial README/license). Replace `<OWNER>` below with your GitHub username/organization.
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
