# Frontend: required long-term planning deliverable (Sol)

**Owner:** Sol (architect). **Implementer after approval:** Luna frontend. **Status:** NOT YET APPROVED.

Before any React/Vite scaffolding, Sol must deliver a phased roadmap with:

1. User journeys: portfolio overview; geography → asset class → sector weights; investment discovery; position entry; objective scoring; contribution simulation; review of proposed allocations.
2. Design system and accessibility: typography, responsive layout, keyboard navigation, forms, loading/error/empty states, localization pt-BR, currency and decimal handling.
3. Technical architecture: Vite/React/TypeScript, routing, component boundaries, typed API contracts, client state vs server state, form validation, charts, testing approach, environment configuration.
4. Security and correctness: no provider credentials in frontend, safe input handling, no fake performance data, explicit timestamps and stale-data badges, accessibility tests.
5. Milestones and dependency graph: foundation → layout/navigation → API client → allocation editor → holdings → scoring → rebalance simulator → historical views; specify backend contract prerequisites.
6. Card decomposition with objective acceptance criteria, estimates as ranges (not commitments), risks, test strategy and documentation for a developer new to React.
7. Explicit decision record for libraries (router, query cache, form validation, UI components, charting); prefer minimal dependencies and avoid choosing without rationale.

Do not assume any of these libraries are installed. Request the user's approval of the roadmap before Luna implements it.
