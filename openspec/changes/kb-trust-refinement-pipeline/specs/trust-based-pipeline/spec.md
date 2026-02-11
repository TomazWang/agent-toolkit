# Trust-Based Pipeline Specification

This specification defines the trust hierarchy and workflow for the KB refinement pipeline.

## ADDED Requirements

### Requirement: Initialize trust-based structure

The system SHALL create a three-tier directory structure (sources/wip/output) when initializing a new knowledge base.

#### Scenario: First-time initialization
- **WHEN** user invokes `/kb:init` in a directory without kb/
- **THEN** system creates `kb/sources/`, `kb/wip/`, and `kb/output/` directories

#### Scenario: Already initialized
- **WHEN** user invokes `/kb:init` and kb/ directory exists
- **THEN** system shows error "KB already initialized. Use /kb:start to begin learning."

#### Scenario: Structure validation
- **WHEN** system initializes structure
- **THEN** system creates `.gitignore` to exclude `.logs/` and `.kb-config`

### Requirement: Categorize sources in run-0

The system SHALL analyze all sources in run-0 and categorize them into baseline, ephemeral, or deprecated.

#### Scenario: Baseline source identification
- **WHEN** AI analyzes initial sources in run-0
- **THEN** system moves critical sources (repos, core docs) to `sources/baseline/`

#### Scenario: Ephemeral source marking
- **WHEN** AI finds sources useful only for initial context (old READMEs, historical notes)
- **THEN** system leaves them in `sources/run-0/` and documents as ephemeral in RUN-0-DECISIONS.md

#### Scenario: Deprecated source detection
- **WHEN** AI finds sources that contradict code
- **THEN** system marks them as DEPRECATED in RUN-0-DECISIONS.md but does NOT delete files

#### Scenario: Categorization documentation
- **WHEN** run-0 categorization completes
- **THEN** system creates `sources/baseline/RUN-0-DECISIONS.md` with categorization rationale

### Requirement: Select inputs autonomously

The system SHALL autonomously select which sources, WIP, and outputs to include in each run based on confidence gaps and corrections.

#### Scenario: Baseline always included
- **WHEN** AI starts any run (run-1, run-2, etc.)
- **THEN** system includes all sources from `sources/baseline/`

#### Scenario: Current run sources included
- **WHEN** AI starts run-N
- **THEN** system includes all sources from `sources/run-N/`

#### Scenario: Previous WIP carried forward
- **WHEN** AI starts run-N
- **THEN** system includes WIP findings from `wip/run-{N-1}/` that are marked incomplete

#### Scenario: Deprecated sources excluded
- **WHEN** AI selects inputs for run-N
- **THEN** system excludes sources marked as DEPRECATED in RUN-0-DECISIONS.md

#### Scenario: Selection documentation
- **WHEN** AI completes input selection for run-N
- **THEN** system creates `wip/run-N/INPUT-SELECTION.md` documenting what was included and why

### Requirement: Generate WIP drafts only

The system SHALL generate draft outputs in wip/ directory, NOT in output/ directory, until user explicitly creates output.

#### Scenario: Run completion generates WIP draft
- **WHEN** run-N learning completes
- **THEN** system creates `wip/run-N/DRAFT-summary.md` with draft findings

#### Scenario: Output directory untouched
- **WHEN** any run completes
- **THEN** system does NOT create or modify anything in `output/` directory

#### Scenario: Draft marked clearly
- **WHEN** system generates WIP draft
- **THEN** draft file includes "⚠️ DRAFT - Not yet validated by user" header

### Requirement: Enable explicit output creation

The system SHALL allow users to manually create versioned output from any completed run's WIP.

#### Scenario: User creates output version
- **WHEN** user invokes `/kb:create-output` after run-2 completes
- **THEN** system prompts for version name and creates `output/v{version}/` with content from `wip/run-2/`

#### Scenario: Output version prompt with defaults
- **WHEN** user invokes `/kb:create-output`
- **THEN** system suggests default version name based on run number (e.g., v0.2 for run-2)

#### Scenario: Multiple versions from same run
- **WHEN** user creates output v0.2 from run-2, then later creates v0.2-revised from same run-2
- **THEN** system allows multiple output versions referencing the same source run

#### Scenario: Version metadata creation
- **WHEN** system creates output version
- **THEN** system generates VERSION-INFO.md with source run, timestamp, and confidence

#### Scenario: Latest symlink update
- **WHEN** system creates new output version
- **THEN** system updates `output/latest` symlink to point to newly created version

### Requirement: Maintain run isolation

The system SHALL keep each run's sources, WIP, and drafts isolated in separate run-N directories.

#### Scenario: Separate source directories
- **WHEN** user adds sources for run-2
- **THEN** sources are stored in `sources/run-2/` without affecting run-1

#### Scenario: Separate WIP directories
- **WHEN** AI generates draft for run-2
- **THEN** draft is stored in `wip/run-2/` without modifying run-1 WIP

#### Scenario: WIP history preserved
- **WHEN** run-3 starts
- **THEN** `wip/run-1/` and `wip/run-2/` remain unchanged and accessible

### Requirement: Support workflow commands

The system SHALL provide commands for each workflow stage: init, start, continue, create-output.

#### Scenario: Init command initializes structure
- **WHEN** user invokes `/kb:init`
- **THEN** system creates directory structure and shows instructions for adding sources

#### Scenario: Start command begins run-0
- **WHEN** user invokes `/kb:start` after adding sources
- **THEN** system categorizes sources and executes run-0 learning

#### Scenario: Continue command advances run
- **WHEN** user invokes `/kb:continue` after reviewing run-1 WIP
- **THEN** system starts run-2 with autonomous input selection

#### Scenario: Create-output command generates version
- **WHEN** user invokes `/kb:create-output` after satisfactory run
- **THEN** system prompts for version details and creates output

#### Scenario: Status command shows progress
- **WHEN** user invokes `/kb:status`
- **THEN** system shows current run, confidence, pending questions, and suggests next action
