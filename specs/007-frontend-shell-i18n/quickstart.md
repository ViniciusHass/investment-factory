# Quickstart Validation: Frontend Shell and Languages

Use a clean checkout of the F02 frontend branch with Node 22.12+ and npm. FastAPI is not required.

1. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test -- --run` and `npm run build`.
2. Install the pinned Chromium browser used by Playwright, then run the documented browser-test command. CI must run the same browser suite.
3. Start `npm run dev`; at `/`, inspect the semantic landmarks and keyboard navigation at desktop and 320 px widths. Future sections must be visibly unavailable.
4. Switch pt-BR/en with keyboard. Inspect all visible labels, accessible names, the document language and title without a reload. Reload and confirm the agreed persistence policy.
5. Visit an unknown URL; confirm localized recovery and a working link home. Simulate storage throwing and an unsupported saved locale; the app must remain usable.
6. Render each shared empty, loading, error, unavailable and stale state in tests in both languages; verify distinct text, roles and retry action.
7. Run axe on home and not-found routes at desktop and 320 px. Manually inspect focus order and color contrast, because automated scans do not prove all accessibility requirements.
8. Confirm no FastAPI or financial-provider request and no fabricated monetary value; open a PR to frontend `develop` with evidence. Luna does not merge.

The exact route and state behavior is in [ui-routes-and-states.md](./contracts/ui-routes-and-states.md). The initial language is pt-BR, and an explicit supported choice is remembered only in this browser.
