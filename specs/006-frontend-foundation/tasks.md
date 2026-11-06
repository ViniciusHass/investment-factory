# Tasks: Frontend Foundation (INV-0002)

**Input**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [developer-commands.md](./contracts/developer-commands.md), [quickstart.md](./quickstart.md). All implementation paths below are relative to `investment-frontend`.

**Tests**: Required by FR-003, FR-004, SC-002, SC-003 and the approved card.

## Phase 1: Setup

**Purpose**: Create a reproducible frontend project without product logic.

- [ ] T001 Create `package.json` with React, Vite, strict TypeScript, ESLint, Vitest and Testing Library dependencies plus `dev`, `lint`, `typecheck`, `test` and `build` scripts; commit matching `package-lock.json` and verify `npm ci` on Node 22.12+.
- [ ] T002 [P] Configure `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts` and `index.html` for a strict React SPA.
- [ ] T003 Configure `eslint.config.js` and add only the required lint dependencies to `package.json` and `package-lock.json` after T001 because the manifest and lockfile are shared.

**Checkpoint**: `npm ci` and `npm run typecheck` work from a clean checkout.

## Phase 2: Foundational

**Purpose**: Make meaningful UI testing possible before the first screen.

- [ ] T004 Configure Vitest and DOM testing in `vite.config.ts` and `src/test/setup.ts`, including cleanup and accessible queries; coordinate with T002 because `vite.config.ts` is shared.

**Checkpoint**: Test runner is ready for US1 tests.

## Phase 3: User Story 1 — Start the frontend project (P1)

**Goal**: A neutral screen starts without a backend and shows no invented financial value.

**Independent test**: From a clean checkout, `npm ci`, `npm run dev`, then inspect the starting screen with FastAPI stopped.

- [ ] T005 [US1] Write a failing rendered-screen test in `src/app/App.test.tsx` covering visible neutral content and absence of fabricated investment amounts; keep the test meaningful rather than checking a constant.
- [ ] T006 [US1] Implement the neutral screen in `src/app/App.tsx` and `src/app/App.module.css`, and mount it from `src/main.tsx`; make T005 pass without API requests.
- [ ] T007 [US1] Time a clean checkout through `npm ci` and `npm run dev` against the 10-minute success criterion; with FastAPI stopped, inspect browser requests and confirm `src/app/App.tsx` sends no provider request and shows no mock portfolio value or performance claim.

**Checkpoint**: US1 works independently and its test passes.

## Phase 4: User Story 2 — Verify a change before review (P2)

**Goal**: Local and PR checks run the same commands and reject a failing test.

**Independent test**: Run all contract commands, induce a temporary test failure, observe nonzero local and PR checks, then restore green CI.

- [ ] T008 [US2] Update `.github/workflows/ci.yml` so the existing `foundation` job runs `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test -- --run` and `npm run build` when `package.json` and `package-lock.json` exist; remove any conditional success path that skips a required command once the project is scaffolded.
- [ ] T009 [US2] Demonstrate a failing assertion in `src/app/App.test.tsx` makes `npm run test -- --run` fail locally and `Frontend CI / foundation` fail on the implementation PR; then restore the valid test in a separate atomic commit.
- [ ] T010 [US2] Run the commands declared in `package.json`: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test -- --run` and `npm run build`; record actual output in the PR description.

**Checkpoint**: US2 has a green final CI run and evidence that the test gate catches failure.

## Phase 5: Polish and review

- [ ] T011 [P] Update `README.md` with Node/npm prerequisites, setup and run commands, folder boundaries, the future FastAPI request path, and how to add a feature and translation; avoid claiming API integration already exists.
- [ ] T012 Check `Dockerfile` and `.dockerignore` still support the scaffold; do not change their behavior without evidence. Confirm no secrets or fabricated portfolio data in `src/`, `README.md` or the build output.
- [ ] T013 Open a PR from `feat/inv-0002-frontend-foundation` to frontend `develop`, link INV-0002 and spec 006, cite `README.md`, `.github/workflows/ci.yml` and `src/app/App.test.tsx` as evidence for T007–T012, and request Sol review. Do not merge.

## Dependencies and Execution Order

- Phase 1 precedes Phase 2. T001 owns the manifest and lockfile; T003 must coordinate edits to them. T002 owns initial Vite config; T004 extends it after T002.
- US1 depends on Phase 2. T005 must fail before T006; T007 follows T006.
- US2 depends on a meaningful US1 test. T008 precedes T009; T010 follows the restored passing test.
- T011 may proceed alongside US1/US2 because it owns `README.md`. T012 and T013 follow all other tasks.

## Parallel Example

After T001, one worker can prepare `README.md` (T011) while the main implementer handles `src/app/App.test.tsx` and `src/app/App.tsx` (T005–T006). Do not edit `package.json`, `package-lock.json` or `vite.config.ts` concurrently because their tasks share those files.

## Implementation Strategy

Complete setup and US1 first so the app starts without FastAPI. Then wire CI and prove the failing test gate. Preserve atomic Conventional Commits authored by Codex. Stop at the PR for Sol's technical review; `develop` and `main` remain protected.
