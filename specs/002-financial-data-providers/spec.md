# Feature 002 — Financial market data providers

## Goal
Retrieve current and historical prices, financial metrics, dividends/distributions, Treasury rates and FX through backend provider adapters.

## Acceptance criteria
- Each response records provider, instrument identifier, market, currency, as-of timestamp and retrieval timestamp.
- Normalization handles unit and currency differences explicitly.
- Missing, unsupported and stale data are distinct statuses; never invent values.
- Provider API keys are server-only and read from environment/configuration outside Git.
- Provider errors and rate limits have deterministic handling; cache policy is documented.
- Provider coverage, terms and licensing are reviewed before implementation.
- Portfolio positions remain user-managed and are not mistaken for quotes.

## Candidate sources to validate
Brazil: brapi; Brazilian Treasury: Tesouro Transparente official datasets; FX/macro: Banco Central do Brasil; international: compare available licensed providers before selection. Candidates are not commitments or confirmed coverage.

## Open questions
Which instruments and exchanges are required for MVP? Which metrics are mandatory for each asset class? What is the acceptable freshness of prices and fundamentals?
