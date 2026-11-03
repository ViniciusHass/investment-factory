# Feature 002 — Financial market data providers

## Goal
Retrieve current and historical prices, financial metrics, dividends/distributions, Treasury rates and FX through backend provider adapters.

## Acceptance criteria
- Each response records provider, instrument identifier, market, currency, as-of timestamp and retrieval timestamp.
- Normalization handles unit and currency differences explicitly.
- FX responses include base/quote currencies, rate direction, source, as-of and collection timestamps; conversion snapshots are traceable without changing user-entered amounts.
- Missing, unsupported and stale data are distinct statuses; never invent values.
- Provider API keys are server-only and read from environment/configuration outside Git.
- Provider errors and rate limits have deterministic handling; cache policy is documented.
- Provider coverage, terms and licensing are reviewed before implementation.
- Portfolio positions remain user-managed and are not mistaken for quotes.
- Backend application/domain services depend on provider-independent price and FX ports. Infrastructure adapters normalize provider payloads; replacing an adapter must not require changing portfolio allocation or gain calculations.
- The selected FX adapter is configurable. Fallback behavior, if any, is explicit and preserves the source and as-of date of the value actually used.

## Initial MVP coverage and candidate sources to validate
The initial MVP needs real data for US listed equities and ETFs. Free-tier candidates and limits are researched in `docs/us-data-provider-research.md`. Candidate stack: Twelve Data for prices, SEC EDGAR for company XBRL fundamentals, and Banco Central do Brasil PTAX for dated USD/BRL conversion. These are not approved implementations; verify coverage, rights, API behavior, freshness, units and errors with fixtures before choosing. Brazilian instruments, Treasury and REITs are later phases.

## Open questions
Which US exchanges and ETF metrics are required for MVP? What is the acceptable freshness of prices and fundamentals? How should unsupported ETF fundamentals be represented?
