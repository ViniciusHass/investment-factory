# Implementation Plan: Frontend Shell and Languages

**Planning branch**: `docs/frontend-foundation-plan` in Factory while its PR #2 remains open. **Implementation branch**: `feat/inv-0003-shell-i18n` from frontend `develop`. **Date**: 2026-11-07. **Spec**: [spec.md](./spec.md).

## Summary

Extend the accepted F01 React SPA with a responsive semantic shell, available home and not-found routes, complete pt-BR/en catalogs, an accessible language control and reusable status presentations. Test routes and translations with Vitest and test keyboard/axe behavior in Chromium. No FastAPI call or portfolio feature is introduced.

## Technical Context

| Field | Choice |
|---|---|
| Language/version | Strict TypeScript and React from F01; Node 22.12+ |
| Primary dependencies | `react-router` declarative mode; `i18next` and `react-i18next`; Playwright Test and `@axe-core/playwright` for browser accessibility checks |
| Storage | Proposed browser-local display-language preference only; no user account or backend storage |
| Testing | Vitest/Testing Library for component, route and catalog behavior; Playwright/axe for real browser keyboard and responsive checks |
| Target platform | Modern desktop/mobile browsers; Windows development; Linux CI with Chromium |
| Project type | Frontend SPA in `investment-frontend` |
| Constraints | No invented financial values, direct provider access, backend API client, auth or changes to original investment currency |
| Scale/scope | Two active route outcomes, two initial locales, five reusable feedback states |

Exact package versions and licenses are verified and locked by the implementation card. Do not add a global state store or translation service.

## Constitution Check

| Principle | Gate |
|---|---|
| Specification first | Spec 007, UI contract and tasks define observable behavior before Luna edits product code. |
| Objective finance logic | No financial calculation or provider-derived number appears in this card. |
| Traceability | PR cites INV-0003, spec, plan, tasks and test evidence. |
| Separation of concerns | React shell stays in frontend; FastAPI and Factory runtime are untouched. |
| Reproducibility | Lockfile and local/CI commands include browser test setup. |
| Human authority | Sol reviews and may merge only into frontend `develop` after green CI; no `main` merge. |
| Least privilege | Browser stores only locale; no API keys, portfolio values or account token. |

**Gate result**: PASS. The owner authorized the frontend roadmap; the stated F02 default is pt-BR with a supported choice saved only in this browser. The owner may steer a later change. No backend contract is needed for this slice.

## Project Structure

Factory artifacts live in `specs/007-frontend-shell-i18n/`: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui-routes-and-states.md`, `quickstart.md`, `tasks.md` and checklist.

Planned frontend structure:

```text
src/
  app/App.tsx                 route composition
  app/AppShell.tsx            header, primary navigation, main and footer
  app/AppShell.module.css     responsive layout and tokens
  pages/HomePage.tsx          localized neutral home
  pages/NotFoundPage.tsx      recovery route
  shared/i18n/i18n.ts         bundled resources and fallback
  shared/i18n/locales/pt-BR.ts
  shared/i18n/locales/en.ts
  shared/ui/LanguageSelect.tsx
  shared/ui/FeedbackState.tsx
  test/                      route, translation and state tests
e2e/shell.spec.ts            keyboard and browser axe checks
playwright.config.ts
```

**Structure decision**: Keep route and shell composition in `app`, pages in `pages`, and only truly shared language/status primitives under `shared`. Future feature folders are added by their own accepted cards. The current neutral F01 screen becomes the localized home content rather than a second disconnected page.

## Delivery Sequence

1. Add routing, home/not-found behavior and semantic responsive shell without enabling unfinished portfolio routes.
2. Add bundled catalogs, language switch, document language/title updates and safe browser-only storage fallback.
3. Add feedback state primitives and tests for all five states, both locales and retry callback.
4. Add Playwright/axe browser checks for desktop and 320 px, keyboard routes and language switch; wire them into CI with browser installation.
5. Run npm clean install, lint, typecheck, unit tests, browser tests and build; review layout/contrast manually and open PR to frontend `develop`.

## Complexity Tracking

No constitution exception. Browser testing is justified by the roadmap's keyboard/axe acceptance gate and the need to inspect narrow layout and color contrast in a real rendering engine.
