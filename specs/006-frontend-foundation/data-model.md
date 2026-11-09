# Data Model: Frontend Foundation

There are no persisted business entities in this feature. Portfolio, positions, allocation tree, scores and contribution plans belong to later specs.

The only state is the in-memory application startup state: a neutral screen renders without a backend dependency or financial request. No domain amount, currency, user identity, mock portfolio or browser storage is introduced.

Configuration consists of package scripts, locked dependency versions, strict TypeScript settings, lint rules and test setup. These are validated by the developer command contract, not a database schema.
