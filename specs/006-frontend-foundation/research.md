# Research: Frontend Foundation

## Node and toolchain

- **Decision**: Use Node 22.12+ locally and the existing Node 22 container family. Resolve current compatible Vite, React, TypeScript and Vitest versions during implementation; record exact package resolutions in `package-lock.json`.
- **Rationale**: [Vite](https://vite.dev/guide/) and [Vitest](https://vitest.dev/guide/) document Node 22.12+ support; the existing Dockerfile uses Node 22.
- **Alternative**: Changing the container to another Node major expands this card without a demonstrated need.

## Reproducible dependencies

- **Decision**: Commit `package-lock.json` and use `npm ci` in validation and CI.
- **Rationale**: [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) requires a lockfile and fails if it disagrees with the manifest.
- **Alternative**: `npm install` in CI can change dependency resolution.

## Test boundary

- **Decision**: Test the visible neutral screen with Vitest and Testing Library. Restore the CI test step in this card and prove a failing test returns a nonzero status before removing the temporary failure.
- **Rationale**: This verifies user-visible behavior and the gate without inventing finance logic. The accepted command remains `npm run test -- --run`.
- **Alternative**: A constant-only test would mirror implementation and would not prove the screen.

## External interface

- **Decision**: Only developer commands and a neutral UI state are contracted here. No FastAPI endpoint or provider contract is introduced.
- **Rationale**: API contracts belong to later cards.
- **Alternative**: Mock portfolio data or an empty API client would create product behavior without an accepted contract.
