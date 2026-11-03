# Investment Factory Constitution

## Principles
1. **Specification first**: features require observable acceptance criteria before implementation.
2. **Objective finance logic**: scoring thresholds and weights are explicit, versioned and testable; unknown data is never silently scored as zero.
3. **Traceability**: every card links to a spec and every PR links to a card and test evidence.
4. **Separation of concerns**: React UI, FastAPI domain, provider adapters and Factory orchestration remain separate.
5. **Reproducibility**: snapshots of market inputs, timestamps, currencies and calculation versions make simulations explainable.
6. **Human authority**: agents can prepare PRs but cannot merge into protected main branches.
7. **Least privilege**: secrets remain outside repos, agents run in scoped worktrees and use limited permissions.

## Development policy
Use a spec -> plan -> tasks -> cards -> implementation -> verification -> human approval workflow. Changes to this constitution require explicit user review.
