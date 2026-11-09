# Data Model: Frontend Shell and Languages

No portfolio or backend entities are introduced.

## DisplayLanguage

- Supported values: `pt-BR`, `en` initially; list is extensible.
- Initial value: `pt-BR` unless a valid stored explicit choice exists.
- Storage: browser-local preference only; no user ID or backend write. Failure to read/write storage does not break rendering or in-session switching.
- Constraint: display language does not change monetary currency, original input amount or portfolio reporting policy.

## NavigationDestination

- Fields: stable route ID, path, translated label key, availability, current-route state.
- Active in F02: home (`/`) and unknown-route recovery (`*`). Future portfolio destinations may be displayed as unavailable text but have no active route until their cards are implemented.

## FeedbackState

- Kind: `empty`, `loading`, `error`, `unavailable`, `stale`.
- Fields: translated title/message keys, optional action label/callback, semantic announcement priority.
- Rule: no kind implies a monetary value or replaces backend data-quality provenance; `stale` is a presentation state, not a freshness calculation.
