# Factory cards

Cards are execution units derived from reviewed Spec Kit tasks before becoming READY. Each card must link to `specs/<id>/spec.md`, state the target repository, dependencies, objective acceptance criteria, test commands and approval state. BACKLOG seed cards may describe proposed contracts but are not authorization to implement. The orchestrator will manage lifecycle in a later phase. Backend and frontend are GitHub repositories referenced as Factory submodules; branch protection and CI checks remain to be verified.
