# Confidence Tracking Specification

This specification defines how confidence scores are calculated, tracked, and improved across versions.

## ADDED Requirements

### Requirement: Calculate overall confidence

The system SHALL calculate an overall confidence percentage for each output version.

#### Scenario: Initial confidence estimation
- **WHEN** output v0.1 is created from run-0
- **THEN** CONFIDENCE.md includes overall confidence score (0-100%)

#### Scenario: Confidence improvement tracking
- **WHEN** output v0.2 is created after v0.1
- **THEN** CONFIDENCE.md shows comparison (e.g., "Overall: 85% (+15% from v0.1)")

#### Scenario: Confidence based on source verification
- **WHEN** AI calculates confidence
- **THEN** higher confidence for code-verified facts, lower for doc-only claims

### Requirement: Track confidence by domain

The system SHALL maintain per-domain confidence scores in addition to overall confidence.

#### Scenario: Domain-level confidence
- **WHEN** output includes multiple domains (auth, api, deployment)
- **THEN** CONFIDENCE.md lists confidence score for each domain

#### Scenario: Domain confidence rationale
- **WHEN** domain has low confidence
- **THEN** CONFIDENCE.md documents why (e.g., "No code found", "Contradictory sources", "Sparse documentation")

#### Scenario: Mixed confidence levels
- **WHEN** some domains have high confidence (95%) and others low (60%)
- **THEN** overall confidence reflects weighted average based on domain importance

### Requirement: Document confidence factors

The system SHALL document what factors contributed to confidence scores.

#### Scenario: High confidence factors
- **WHEN** domain has 90%+ confidence
- **THEN** CONFIDENCE.md lists verification sources (e.g., "Verified via code + OpenAPI spec + tests")

#### Scenario: Low confidence factors
- **WHEN** domain has <70% confidence
- **THEN** CONFIDENCE.md lists gaps (e.g., "Config location unknown", "No code evidence", "Docs contradict each other")

#### Scenario: Medium confidence factors
- **WHEN** domain has 70-90% confidence
- **THEN** CONFIDENCE.md lists what's known and what's uncertain

### Requirement: Suggest focus areas

The system SHALL suggest which domains need focus in next run based on confidence scores.

#### Scenario: Low-confidence domain prioritization
- **WHEN** run-2 completes and CONFIDENCE.md shows deployment at 60%
- **THEN** system suggests "Focus on deployment in next run to improve confidence"

#### Scenario: Multiple low-confidence domains
- **WHEN** multiple domains have <70% confidence
- **THEN** system ranks them by priority and suggests focus order

#### Scenario: High-confidence domains skippable
- **WHEN** domain has 95%+ confidence
- **THEN** system suggests "API domain well understood, can skip unless user requests deeper dive"

### Requirement: Track confidence changes

The system SHALL document confidence changes between versions in VERSION-INFO.md and CONFIDENCE.md.

#### Scenario: Improvement documented
- **WHEN** auth domain improves from 70% to 85% between v0.1 and v0.2
- **THEN** CONFIDENCE.md shows "Auth: 85% (+15% - resolved OAuth2 configuration question)"

#### Scenario: Decline documented
- **WHEN** domain confidence decreases due to new contradictions found
- **THEN** CONFIDENCE.md shows "Deployment: 75% (-10% - found contradictory CI/CD config)"

#### Scenario: Changes summary
- **WHEN** output version is created
- **THEN** VERSION-INFO.md includes "Confidence Changes" section summarizing improvements and declines

### Requirement: Enable confidence-driven workflow

The system SHALL use confidence scores to guide autonomous input selection and focus.

#### Scenario: AI prioritizes low-confidence areas
- **WHEN** AI selects inputs for run-3 and sees deployment at 60% confidence
- **THEN** INPUT-SELECTION.md documents "Focusing on deployment domain (low confidence)"

#### Scenario: AI skips high-confidence areas
- **WHEN** AI selects inputs and sees API at 95% confidence with no user questions
- **THEN** INPUT-SELECTION.md documents "Skipping deep dive on API (high confidence, well understood)"

#### Scenario: User override possible
- **WHEN** user provides feedback "Focus on API even though confidence is high"
- **THEN** AI includes API in focus areas regardless of confidence score
