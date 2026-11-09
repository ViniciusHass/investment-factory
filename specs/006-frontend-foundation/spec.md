# Feature Specification: Frontend Foundation

**Feature Branch**: to be created in the frontend repository from `develop` after card acceptance

**Created**: 2026-11-04

**Status**: Accepted for INV-0002 by the owner on 2026-11-06

**Input**: The owner approved the long-term frontend roadmap and accepted INV-0002 on 2026-11-06. Implementation uses an isolated branch, automated checks, Sol review, and the agreed merge authority.

## User Scenarios & Testing

### User Story 1 - Start the frontend project (Priority: P1)

As a developer new to this frontend, I can set up a fresh checkout, start the application, and see a neutral starting screen, so later portfolio features have a reproducible base.

**Why this priority**: Every frontend feature depends on a project that starts consistently.

**Independent Test**: In a clean checkout, follow the documented setup and start commands and verify that the starting screen loads without a running backend.

**Acceptance Scenarios**:

1. **Given** a clean checkout and documented prerequisites, **when** the developer follows the setup instructions, **then** dependency installation and application startup complete without undocumented manual steps.
2. **Given** the backend is unavailable, **when** the starting screen loads, **then** it remains usable and does not display invented portfolio values.

### User Story 2 - Verify a change before review (Priority: P2)

As a developer, I can run documented quality checks before opening a PR, so reviewers receive reproducible evidence that the foundation remains sound.

**Why this priority**: The project requires automated gates before frontend work enters `develop`.

**Independent Test**: Execute each documented check in a clean checkout and observe success; deliberately introduce a failing test to verify that the relevant check reports failure.

**Acceptance Scenarios**:

1. **Given** a clean checkout, **when** all documented checks run, **then** each completes successfully and the same checks run in the PR pipeline.
2. **Given** a failing test, **when** the test check runs, **then** it fails and blocks the PR gate.

### Edge Cases

- A missing or out-of-sync dependency lockfile produces a clear installation failure instead of silently choosing new versions.
- A missing backend does not prevent the foundation screen from loading.
- A missing quality-check command fails the pipeline; it is not treated as a skipped success.

## Requirements

### Functional Requirements

- **FR-001**: A fresh checkout MUST have one documented way to install dependencies and start the frontend locally.
- **FR-002**: The frontend MUST show a neutral foundation screen without fabricated investment values or performance.
- **FR-003**: The project MUST provide documented commands for linting, type checking, tests, and a production build.
- **FR-004**: The PR pipeline MUST run the same checks and fail when a required command or test fails.
- **FR-005**: The repository MUST document its folder boundaries and the steps for adding a future feature and translation.
- **FR-006**: The frontend MUST NOT contain financial-provider credentials or call financial providers directly.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A developer with the stated prerequisites can install and open the foundation screen from a clean checkout in at most 10 minutes using only the README.
- **SC-002**: All four documented quality checks and the PR pipeline complete successfully on the accepted foundation commit.
- **SC-003**: A deliberately failing test causes the corresponding local and PR checks to fail.
- **SC-004**: The foundation screen displays zero invented financial amounts and makes zero financial-provider requests.

## Assumptions

- This is an internal development foundation, not a portfolio feature for the end user.
- The approved frontend stack and exact commands are specified by the roadmap, ADR 0001, and card INV-0002; this specification defines their observable outcomes.
- API contracts, holdings entry, allocation editing, scoring, and contribution simulation belong to later cards.
- No backend service is required to validate this foundation.
