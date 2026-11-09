# Tasks: Frontend Shell and Languages (F02 / INV-0003)

**Input**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [data-model.md](./data-model.md), [UI contract](./contracts/ui-routes-and-states.md) and [quickstart.md](./quickstart.md). Paths below are relative to `investment-frontend`.

**Tests**: Required for routes, translations, feedback states, keyboard use and browser axe scans.

## Phase 1: Setup

- [x] T001 Record the F02 default pt-BR and browser-only persistence rule in `src/shared/i18n/i18n.ts`; keep storage failure safe and do not couple language to currency.
- [x] T002 Add `react-router`, `i18next`, `react-i18next`, Playwright Test and `@axe-core/playwright` to `package.json` and `package-lock.json`; add browser-test scripts and verify locked installation with `npm ci`.
- [x] T003 [P] Create responsive spacing, color, focus and typography tokens in `src/app/AppShell.module.css`, keeping normal-text contrast at least 4.5:1.

**Checkpoint**: Dependencies are locked and the language policy is final.

## Phase 2: Foundational

- [x] T004 Add route and translation test helpers in `src/test/` so tests can isolate navigation and locale state without requiring FastAPI.
- [x] T005 Configure `playwright.config.ts` to start the Vite app, use Chromium and test desktop plus 320 px widths; add the browser-test command to `package.json` after T002.

**Checkpoint**: Unit and browser test infrastructure is ready.

## Phase 3: User Story 1 — Find the available workspace (P1)

**Independent test**: Start without FastAPI, visit `/` and an unknown URL at desktop/mobile widths, and navigate with keyboard.

- [x] T006 [US1] Write route and keyboard expectations for home, unknown URL and unavailable future navigation in `src/app/App.test.tsx` before implementing the shell.
- [x] T007 [US1] Implement `src/app/AppShell.tsx`, `src/pages/HomePage.tsx`, `src/pages/NotFoundPage.tsx` and route composition in `src/app/App.tsx`; mount `BrowserRouter` from `src/main.tsx` without active routes for unimplemented features.
- [x] T008 [US1] Complete the responsive shell in `src/app/AppShell.module.css` and verify header, navigation, main region, current-page indication and visible focus at 320 px and desktop widths.

**Checkpoint**: Home and not-found recovery work independently, with no fabricated portfolio screen.

## Phase 4: User Story 2 — Switch display language (P1)

**Independent test**: Switch locales on both routes, reload, simulate bad or blocked storage, and inspect document language/title.

- [x] T009 [US2] Write tests for complete pt-BR/en catalog coverage, immediate switch, document title/language, reload policy and storage failure in `src/shared/i18n/i18n.test.ts` and `src/shared/ui/LanguageSelect.test.tsx`.
- [x] T010 [US2] Implement bundled `src/shared/i18n/locales/pt-BR.ts` and `src/shared/i18n/locales/en.ts`, initialize `src/shared/i18n/i18n.ts` with supported locales/fallback, and keep display language independent from currency.
- [x] T011 [US2] Implement labelled keyboard-operable `src/shared/ui/LanguageSelect.tsx`; translate all shell, home and not-found strings and synchronize `html[lang]` and page title without reload.

**Checkpoint**: Both locales are complete and a blocked preference store does not break the app.

## Phase 5: User Story 3 — Understand common states (P2)

**Independent test**: Render five states in each locale and activate an error retry action with keyboard.

- [x] T012 [US3] Write tests for empty, loading, error, unavailable and stale messages/semantics and optional retry callback in `src/shared/ui/FeedbackState.test.tsx`.
- [x] T013 [US3] Implement `src/shared/ui/FeedbackState.tsx` and styling in `src/shared/ui/FeedbackState.module.css`; use translated labels, text beyond color and appropriate roles without fetching data.

**Checkpoint**: Shared states are independently testable and do not invent backend quality values.

## Phase 6: Polish and review

- [x] T014 Add browser keyboard journeys and axe scans for home/not-found at desktop and 320 px in `e2e/shell.spec.ts`; fail on reported violations and manually inspect focus/contrast.
- [x] T015 Update `.github/workflows/ci.yml` to install the pinned Chromium browser and run the browser-test command after unit tests, lint and typecheck; keep the required `foundation` check green.
- [x] T016 Update `README.md` with routes, locale catalogs, how to add a language and run browser tests; state clearly that FastAPI integration and user accounts are future cards.
- [x] T017 Run the commands from `package.json` and `playwright.config.ts`: `npm ci`, lint, typecheck, unit tests, browser tests and build; inspect `src/` for secrets, raw translation keys and invented financial values. Open a PR to frontend `develop` linking INV-0003 and provide evidence. Luna does not merge.

## Dependencies and Execution Order

- T001 precedes language implementation; T002 precedes T004/T005. T003 may proceed independently of dependency installation.
- T006 precedes T007/T008. T009 precedes T010/T011. T012 precedes T013. Each user story can be tested independently after foundational setup.
- Browser checks T014 need the shell and language control; CI T015 follows browser configuration. Documentation T016 may proceed in parallel after routes/locale design stabilizes; T017 is last.
- Shared files (`package.json`, `package-lock.json`, `src/app/App.tsx`, `.github/workflows/ci.yml`) have one owner at a time; do not run concurrent edits to them.

## Parallel Example

After T002, one worker can write catalog coverage tests in `src/shared/i18n/i18n.test.ts` while another prepares feedback-state tests in `src/shared/ui/FeedbackState.test.tsx`. Both depend on the same agreed language policy and must avoid editing `src/shared/i18n/i18n.ts` concurrently.

## Implementation Strategy

Deliver route shell first, then language switching, then shared states. Add browser accessibility checks before opening the PR. Use isolated worktree, atomic Conventional Commits authored by Codex, CI evidence, Sol technical review and merge only into frontend `develop`.

## Verification — 2026-11-08

Frontend PR #4 merged into develop as d3b4473 after Sol review and CI run 42501901783 passed. Local npm ci, lint, typecheck, 28 unit tests, 16 Chromium/axe tests and build passed. Screenshots were inspected at desktop/320px. Translation and storage tests are consolidated in src/app/App.test.tsx; feedback behavior is also covered in src/shared/ui/FeedbackState.test.tsx rather than all originally proposed test filenames. No financial API was added. Development-tool advisories inherited from F01 are tracked in INV-0004.
