# Research: Frontend Shell and Languages

## Routing

- **Decision**: Use React Router in declarative mode with `BrowserRouter`; only the home route and an unknown-URL recovery route are active in F02.
- **Rationale**: The [official installation guide](https://reactrouter.com/start/declarative/installation) supports a Vite React SPA with `react-router` and `BrowserRouter`. Unimplemented portfolio sections should not imply working data screens.
- **Alternative**: Framework or data-router mode adds loader and server conventions before FastAPI contracts exist.

## Languages

- **Decision**: Use `i18next` with `react-i18next`, bundled pt-BR/en catalogs and explicit supported languages. Keep display locale separate from reporting currency. Initial policy: pt-BR default, browser-only persistence of an explicit choice, safe fallback if storage is blocked.
- **Rationale**: [react-i18next hooks](https://react.i18next.com/latest/using-with-hooks) support immediate language changes; [i18next configuration](https://www.i18next.com/overview/configuration-options) supports bundled resources, `supportedLngs` and a known fallback. Bundled catalogs avoid an extra network dependency for the shell.
- **Alternative**: Text literals spread across components or browser language detection without a clear fallback complicate completeness and future user preferences.

## Accessibility verification

- **Decision**: Use Playwright with `@axe-core/playwright` for browser-level shell scans at desktop and 320 px, plus keyboard navigation checks. Retain Vitest/Testing Library for component and translation behavior.
- **Rationale**: [Playwright's accessibility guidance](https://playwright.dev/docs/accessibility-testing) runs axe in a real browser and calls out manual testing as complementary. Browser checks can detect contrast and responsive issues that jsdom cannot reliably represent.
- **Alternative**: axe in jsdom alone cannot prove layout or color-contrast behavior at a narrow viewport.

## Shared states

- **Decision**: Provide small reusable empty, loading, error, unavailable and stale feedback presentations with translated text and optional callback. No mock portfolio values, HTTP client or global state store in F02.
- **Rationale**: Later feature screens need consistent accessible states, while data freshness and absence semantics remain backend contract work.
- **Alternative**: Duplicating state copy in each future page would create translation and accessibility drift.
