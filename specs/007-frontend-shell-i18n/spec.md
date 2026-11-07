# Feature Specification: Frontend Shell and Languages

**Feature Branch**: To be created from `investment-frontend/develop` after the Factory card is ready  
**Created**: 2026-11-07  
**Status**: Accepted under the owner's 2026-11-07 authorization to proceed through the frontend roadmap  
**Input**: Approved frontend roadmap F02: responsive shell, routes, shared UI states, complete pt-BR/en text, accessible language switch, keyboard and axe checks. This feature follows completed INV-0002.

## User Scenarios & Testing

### User Story 1 - Find the available workspace (Priority: P1)

As a person opening the portfolio planner on desktop or mobile, I can identify the application, reach its available starting page, and understand which future sections are not yet ready without seeing invented financial values.

**Why this priority**: Every future portfolio screen needs the same accessible navigation and layout.

**Independent Test**: Open the app at `/` and at an unknown URL at desktop and narrow mobile widths with no backend running. Navigate with keyboard only and verify the page title, focus, current location, and recovery link.

**Acceptance Scenarios**:

1. **Given** the root URL, **when** the app loads, **then** it shows one primary heading, a responsive application shell and an available home destination.
2. **Given** a future section without an implemented feature, **when** it appears in navigation, **then** it is clearly marked unavailable and cannot lead to a fictitious portfolio screen.
3. **Given** an unknown URL, **when** it loads, **then** a localized not-found state offers a working route back to home.

---

### User Story 2 - Switch display language (Priority: P1)

As a person reading the planner, I can switch all currently visible application text between Brazilian Portuguese and English without reloading or changing any financial currency.

**Why this priority**: Two-language support is an explicit MVP requirement and must be built into shared navigation before feature screens grow.

**Independent Test**: Switch languages on the root and not-found routes; inspect labels, headings, status copy, accessible names, page title and the document language. Reload and verify the documented preference behavior.

**Acceptance Scenarios**:

1. **Given** the initial app, **when** the language is changed, **then** all shell and available page text changes immediately, including accessible names and the document language.
2. **Given** a saved supported language, **when** the page reloads, **then** the same language remains selected without any user account.
3. **Given** an unsupported or unreadable saved value, **when** the app starts, **then** it falls back to the configured default and remains usable.

---

### User Story 3 - Understand common states (Priority: P2)

As a person using future portfolio features, I can distinguish empty, loading, error, unavailable and stale states through reusable components that communicate status in text as well as color.

**Why this priority**: Later API screens need consistent states, including a clear difference between missing data and zero.

**Independent Test**: Render each state in isolation in both languages and verify message, semantic role, focus or announcement behavior as appropriate, and keyboard reachability of any action.

**Acceptance Scenarios**:

1. **Given** each shared state, **when** it renders, **then** it has a translated textual label and suitable accessible semantics; color is not the only signal.
2. **Given** an error with a retry action, **when** the action is reached by keyboard and activated, **then** the supplied callback runs once.

### Edge Cases

- Browser storage can be disabled or throw an exception; the app still opens and language switching works for the current session.
- Unsupported locale values do not leak translation keys into the UI.
- Narrow screens do not hide navigation, the language control or state actions.
- Changing language on the not-found route preserves the current URL until the person chooses home.
- No backend is available and no portfolio data exists; the shell must not present fabricated amounts, scores or returns.

## Requirements

### Functional Requirements

- **FR-001**: The app MUST provide a responsive shared shell with semantic header, main region, navigation and clear current-page indication.
- **FR-002**: The app MUST route the available home page and an unknown-URL recovery page without a backend dependency.
- **FR-003**: Navigation MUST distinguish available destinations from future unavailable sections without pretending those sections have portfolio data.
- **FR-004**: The app MUST support complete Brazilian Portuguese and English translations for every visible or accessible string introduced by this feature, using a structure that can add more languages later.
- **FR-005**: People MUST be able to change language by keyboard and pointer without a full reload; document language and page title MUST match the selection.
- **FR-006**: The app MUST use the agreed initial language and preference persistence policy; corrupt or unavailable storage MUST not prevent startup or switching.
- **FR-007**: Language preference MUST remain separate from currency or portfolio data; this feature MUST NOT alter holdings or monetary values.
- **FR-008**: Shared empty, loading, error, unavailable and stale states MUST expose distinct translated text and accessible semantics; a supplied retry action MUST be keyboard operable.
- **FR-009**: The app MUST remain usable without FastAPI and MUST NOT call financial providers or show invented investment values.
- **FR-010**: Automated tests MUST cover routes, language switch, fallback, state actions and an accessibility scan of the main shell; local lint, typecheck, tests and build MUST pass in CI.

### Key Entities

- **Display language**: A supported UI locale (`pt-BR` or `en` initially), independent of reporting currency and future user profile settings.
- **Navigation destination**: Route, translated label, availability and current state; future destinations are disabled until their feature card is implemented.
- **Feedback state**: One of empty, loading, error, unavailable or stale, with translated message and optional action.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A keyboard-only user can reach home, change language and recover from an unknown URL without a dead end at desktop and 320 px viewport widths.
- **SC-002**: 100% of strings introduced by F02 are present in both pt-BR and en catalogs, including accessible labels and state messages; no raw translation keys appear in either locale.
- **SC-003**: Language change updates the visible shell and document language without a page reload; reload honors the agreed preference policy.
- **SC-004**: All five shared states are distinguishable by text in both languages; automated shell accessibility scan reports no violations at the tested routes and widths.
- **SC-005**: The app loads with FastAPI stopped, makes zero financial-provider requests and displays zero fabricated portfolio amounts.

## Assumptions

- The initial default is `pt-BR`, with an explicit switch to `en`; a supported selection is saved only in this browser. This reasonable default was stated to the owner for correction if preferred.
- No user account or backend preference API is introduced. Future user settings can supersede this local preference through a later contract.
- Only the existing home destination and a not-found recovery route are active; later feature routes become active with their own cards.
- This feature provides shell and feedback primitives, not an allocation editor, holdings form, API client, charts or financial calculations.
