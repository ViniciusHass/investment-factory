# Quickstart Validation: Frontend Foundation

Use a clean checkout of the INV-0002 frontend branch with Node 22.12+ and npm. No backend service is required.

1. Run `npm ci`; expect a successful locked install.
2. Run `npm run dev`; open the printed local URL. Expect a neutral screen with no investment amount, performance claim or provider call.
3. Run `npm run lint`, `npm run typecheck`, `npm run test -- --run`, and `npm run build`; expect each command to pass.
4. Temporarily make the meaningful UI test fail, run `npm run test -- --run`, and confirm a nonzero exit status. Remove the temporary failure and rerun it successfully.
5. Open the PR to frontend `develop`. Confirm `Frontend CI / foundation` runs all four checks and passes on the final commit. Include command outputs and a note that the screen runs without FastAPI.

The expected behavior is in [developer-commands.md](./contracts/developer-commands.md). Do not merge during validation.
