# Developer Command Contract

Run commands in `investment-frontend` with Node 22.12+ and npm.

| Command | Observable result |
|---|---|
| `npm ci` | Installs from committed lockfile; fails on absent or inconsistent lockfile. |
| `npm run dev` | Starts Vite and renders a neutral screen without FastAPI. |
| `npm run lint` | Exits nonzero on a lint violation. |
| `npm run typecheck` | Exits nonzero on a TypeScript error. |
| `npm run test -- --run` | Runs meaningful UI tests once; exits nonzero on a failing test. |
| `npm run build` | Produces a production bundle or exits nonzero. |

The GitHub Actions `foundation` job runs `npm ci`, lint, typecheck, test and build when manifest and lockfile exist. It must not report test success after skipping tests. CI has read-only repository permissions and cannot merge.
