# Implementation Plan: Frontend Foundation

**Planning branch**: `docs/frontend-foundation-plan` in Factory. **Implementation branch**: `feat/inv-0002-frontend-foundation` from frontend `develop`. **Date**: 2026-11-06. **Spec**: [spec.md](./spec.md). **Card**: [INV-0002](../../cards/INV-0002.md).

## Summary

Create a reproducible React + strict TypeScript + Vite foundation in `investment-frontend`. A neutral screen works without FastAPI. npm scripts and GitHub Actions run lint, typecheck, a meaningful test, and build. No portfolio data, API client, authentication, or provider keys are introduced.

## Technical Context

| Field | Choice |
|---|---|
| Language/version | Strict TypeScript; Node 22.12+ within the Node 22 line already used in Docker |
| Dependencies | React, React DOM, Vite, TypeScript, Vite React plugin, ESLint, Vitest, Testing Library, jsdom |
| Storage | None |
| Testing | Rendered screen test with Vitest and Testing Library; deliberate failing test proves gate behavior |
| Platform | Modern browsers; Windows development; Linux GitHub Actions and Docker |
| Project type | SPA in separate frontend repository |
| Performance | Starts without backend and sends no financial API request; no arbitrary bundle threshold before baseline |
| Constraints | No product data, API contract or secrets; `npm ci` uses committed lockfile |
| Scope | Neutral screen, one meaningful UI test, scripts, CI and onboarding docs |

Exact compatible package versions are chosen and locked during implementation. Router, Query client, forms, charts, i18n runtime, and API schema generator remain in later cards.

## Constitution Check

| Principle | Gate before and after design |
|---|---|
| Specification first | Spec 006 and owner-approved INV-0002 define observable outcomes. |
| Objective finance logic | No financial calculation or invented value is introduced. |
| Traceability | PR links spec, plan, tasks, card and command evidence. |
| Separation of concerns | Frontend repository only; FastAPI and Factory code untouched. |
| Reproducibility | Lockfile and same local/CI commands. |
| Human authority | Luna opens PR to `develop`; Sol reviews and may merge after CI and technical review. No promotion to `main`. |
| Least privilege | CI read-only; no secrets or provider access in client. |

**Gate result**: PASS. No constitution exception or unresolved design question blocks this infrastructure slice.

## Project Structure

Factory documentation for this feature: `specs/006-frontend-foundation/{spec.md,plan.md,research.md,data-model.md,quickstart.md,tasks.md,contracts/developer-commands.md}`.

Planned frontend files: `package.json`, `package-lock.json`, `index.html`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`, `src/main.tsx`, `src/app/App.tsx`, `src/app/App.module.css`, `src/app/App.test.tsx`, `src/test/setup.ts`, `.github/workflows/ci.yml`, and `README.md`.

**Structure decision**: Keep the initial app small. `src/app` owns composition and the starting screen. Add `features`, `entities`, and `shared` only in later accepted cards. Preserve the existing Dockerfile and `.dockerignore`.

## Delivery Sequence

1. Pin compatible package versions and commit lockfile; configure strict TypeScript, Vite, ESLint, and Vitest.
2. Add the neutral screen and meaningful UI test; prove it works without FastAPI.
3. Restore the test step in the existing `foundation` workflow. Run the same checks locally and in CI; verify a temporary failing test blocks the command, then remove that failure.
4. Document setup, scripts, folder boundaries, future feature and translation flow. Open PR to frontend `develop` with evidence.

## Complexity Tracking

No justified constitution violations. Later roadmap libraries are deferred until their owning cards.
