# Shared API contracts

Store versioned OpenAPI/JSON Schema contracts agreed in Factory. Backend will implement them and frontend will consume generated or validated types. Market-data responses must include provenance and freshness metadata. No contract is considered final until its specification is reviewed.

## Portfolio C01 — technical design by Sol

[OpenAPI v0.1.0](./portfolio/v1/openapi.json), [semantics and scope](./portfolio/v1/README.md) and [validation guide](../specs/001-portfolio-allocation/quickstart.md) define portfolio, entered holdings, targets and gated valuation/contribution-preview interfaces. The owner confirmed zero starting cash and a button showing investments/quantities, and assigned technical design to Sol on 2026-11-08. This design does not claim deployed routes.
