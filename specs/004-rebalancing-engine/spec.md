# Feature 004 — Contribution-only rebalancing

Given current holdings, hierarchical targets, eligible investments, scores and a contribution budget, produce explainable allocations minimizing target deviations subject to investment caps, fees, trading increments and cash constraints. Do not place orders. Show remaining deviation after allocation.

## Clarifications

### Session 2026-11-08

- Q: Must all investment quantities be integral, or may they be fractional? → A: Stocks require whole units. Products that permit fractions, such as CDBs, may be fractional under their verified product rules.

- Q: What does the MVP contribution action need to show? → A: After entering existing holdings and the amount to invest, the person uses a button that indicates which investments to buy and the quantity of each. Cash starts at zero; a recommendation does not execute or record a purchase.

The UI action is “Calcular investimento” / “Calculate investment”. Each ready recommendation must include instrument identity, positive decimal quantity, dated unit price, estimated cost, reason and any required FX provenance; the result also includes original budget and unallocated amount. Saved plans and realized purchases remain explicit, separate actions. The engine recommends only within the MVP's owned-instrument scope; broad discovery remains post-MVP.

Quantity policy is confirmed: stock quantities must be positive integers. Products that permit fractions, such as CDBs, may be fractional according to verified product rules. Minimums, increments and units are instrument-specific; missing metadata blocks a ready recommendation rather than inventing a rule. CDB's future representation is principal money, not a share with a fabricated unit price. The API still uses exact decimal strings for different product types.

The budget may be entered in any supported currency and retains its original amount and currency. Calculations use an explicit portfolio consolidation currency and dated FX snapshot, with conversion source, direction and policy version recorded. The recommendation returns both the original budget and separately labeled converted values. A changed FX rate must never rewrite the user's budget or recorded contribution. If required FX data is missing or stale under the approved policy, report the calculation as unavailable rather than treating the amount as zero.

Calculate current allocation on request from current position values and a valid current FX snapshot. Compare each node's current effective percentage with its strategic target: a branch below target is a candidate for new contributions; a branch already above target must not receive a buy recommendation solely to chase a higher score. Eligibility, concentration caps, purchase increments, fees and available cash still constrain a candidate below target. If no valid purchase fits, return an explainable unallocated budget rather than proposing an unsuitable buy. Show current percentage, target percentage, deviation and reasons for buying or skipping each relevant branch.
