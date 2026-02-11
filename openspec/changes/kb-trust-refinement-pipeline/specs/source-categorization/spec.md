# Source Categorization Specification

This specification defines how sources are classified and managed based on reliability.

## ADDED Requirements

### Requirement: Detect code-documentation discrepancies

The system SHALL compare documentation claims against actual code implementation and flag contradictions.

#### Scenario: Doc contradicts code
- **WHEN** AI reads docs/auth.md claiming "JWT-only authentication" but code shows OAuth2 implementation
- **THEN** system creates entry in DISCREPANCIES.md flagging this contradiction

#### Scenario: Trust code over docs
- **WHEN** discrepancy is found between code and docs
- **THEN** system uses code as source of truth and marks docs as suspect

#### Scenario: Discrepancy resolution tracking
- **WHEN** user confirms which source is correct (code or docs)
- **THEN** system marks discrepancy as resolved in next run's DISCREPANCIES.md

### Requirement: Mark sources as deprecated

The system SHALL mark contradictory or outdated sources as DEPRECATED without deleting them.

#### Scenario: Deprecated source marked
- **WHEN** AI determines docs/deployment.md contradicts actual deployment code
- **THEN** system adds entry to RUN-0-DECISIONS.md marking it as DEPRECATED

#### Scenario: Deprecated sources excluded from future runs
- **WHEN** AI selects inputs for run-2 and sees source marked DEPRECATED
- **THEN** system does NOT include that source in input selection

#### Scenario: Deprecated sources kept on disk
- **WHEN** source is marked DEPRECATED
- **THEN** system does NOT delete the file, only excludes it from processing

#### Scenario: Deprecation rationale documented
- **WHEN** source is marked DEPRECATED
- **THEN** RUN-0-DECISIONS.md includes reason (e.g., "Contradicts code", "Outdated 2020", "Refers to removed feature")

### Requirement: Categorize sources by lifecycle

The system SHALL categorize sources into baseline (always use), ephemeral (one-time), or deprecated (don't use).

#### Scenario: Baseline source promotion
- **WHEN** AI determines source is critical and will be needed in all runs
- **THEN** system moves source to `sources/baseline/` directory

#### Scenario: Ephemeral source retention
- **WHEN** AI determines source is useful only for initial context (historical docs)
- **THEN** system leaves source in `sources/run-0/` and documents as ephemeral

#### Scenario: Category documented in RUN-0-DECISIONS
- **WHEN** run-0 categorization completes
- **THEN** RUN-0-DECISIONS.md lists all sources under Baseline, Ephemeral, or Deprecated sections

#### Scenario: Category consistency
- **WHEN** source is categorized as baseline
- **THEN** it MUST NOT also be marked as ephemeral or deprecated (mutually exclusive)

### Requirement: Document categorization rationale

The system SHALL document why each source was categorized in RUN-0-DECISIONS.md.

#### Scenario: Baseline rationale
- **WHEN** source is moved to baseline
- **THEN** RUN-0-DECISIONS.md includes reason (e.g., "Primary codebase", "Current API spec")

#### Scenario: Ephemeral rationale
- **WHEN** source is marked ephemeral
- **THEN** RUN-0-DECISIONS.md includes reason (e.g., "Historical context only", "One-time architecture notes")

#### Scenario: Deprecation rationale
- **WHEN** source is marked deprecated
- **THEN** RUN-0-DECISIONS.md includes detailed reason and evidence (e.g., "Claims microservices, code shows monolith")

#### Scenario: Trust hierarchy applied
- **WHEN** AI documents rationale
- **THEN** system follows trust hierarchy: code > tests > comments > docs
