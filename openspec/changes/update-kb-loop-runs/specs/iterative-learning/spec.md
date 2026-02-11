# Iterative Learning Specification

This specification defines the iterative loop/runs workflow for the KB Analysis plugin, enabling progressive refinement of codebase understanding through multiple learning cycles.

## ADDED Requirements

### Requirement: Initialize run structure

The system SHALL create a numbered run folder structure when starting a new learning iteration, including source and work-in-progress directories.

#### Scenario: First run initialization
- **WHEN** user starts KB learning for the first time in a directory
- **THEN** system creates `kb/sources/run-1/`, `kb/wip/run-1/`, and `kb/wip/draft-output/run-1/` directories

#### Scenario: Subsequent run initialization
- **WHEN** user starts KB learning after completing run-1
- **THEN** system creates run-2 directories and updates `kb/runs-metadata.json` with current_run = 2

#### Scenario: Resume incomplete run
- **WHEN** user starts KB learning and an incomplete run exists
- **THEN** system prompts user to resume incomplete run or start new run

### Requirement: Track run metadata

The system SHALL maintain a `runs-metadata.json` file in the `kb/` root directory that records run history, status, and user notes.

#### Scenario: Create metadata on first run
- **WHEN** first run is initialized
- **THEN** system creates `kb/runs-metadata.json` with empty runs array and current_run = 1

#### Scenario: Update metadata on run completion
- **WHEN** run completes successfully
- **THEN** system updates the run's status to "completed", records completed_at timestamp, and topics_learned count

#### Scenario: Record partial run
- **WHEN** run is interrupted mid-learning
- **THEN** system sets status to "incomplete" and preserves partial progress in run folder

### Requirement: Generate draft outputs

The system SHALL generate semi/beta draft documents after each run showing the AI's current understanding of the codebase.

#### Scenario: Generate draft on run completion
- **WHEN** run completes and distill phase executes
- **THEN** system creates draft documents in `kb/wip/draft-output/run-N/` with "DRAFT - Run N" header

#### Scenario: Draft includes summary
- **WHEN** draft output is generated
- **THEN** draft includes summary.md with high-level codebase overview based on learned topics

#### Scenario: Draft includes domain documents
- **WHEN** draft output is generated and topics are organized into domains
- **THEN** draft includes `domains/{domain}/domain.md` files for each identified domain

### Requirement: Support user feedback

The system SHALL enable users to provide feedback and corrections between runs through a structured feedback file.

#### Scenario: Create feedback template
- **WHEN** run completes
- **THEN** system creates `kb/wip/run-N/user-feedback.md` template with sections for focus areas, corrections, and additional context

#### Scenario: Read feedback on next run
- **WHEN** new run starts and previous run has user-feedback.md
- **THEN** system reads feedback file and uses it to guide learning focus and incorporate corrections

#### Scenario: Handle empty feedback
- **WHEN** new run starts and previous run's feedback file is empty
- **THEN** system proceeds with learning using default topic prioritization

### Requirement: Display run status

The system SHALL show current run information and history when users check KB status.

#### Scenario: Show current run number
- **WHEN** user invokes `/kb:check-kb-status`
- **THEN** system displays current run number, status (in-progress/completed), and topics learned so far

#### Scenario: Show run history
- **WHEN** user invokes `/kb:check-kb-status` and multiple runs exist
- **THEN** system displays table of all runs with run_id, status, topics_learned, and completion dates

#### Scenario: Show draft location
- **WHEN** user invokes `/kb:check-kb-status` and completed runs exist
- **THEN** system shows path to latest draft output and suggests reviewing it

### Requirement: Enable run cleanup

The system SHALL provide a mechanism to clean up old runs and draft outputs to manage disk space.

#### Scenario: List cleanable runs
- **WHEN** user invokes `/kb:cleanup-runs --list`
- **THEN** system lists all completed runs with disk space usage and creation dates

#### Scenario: Remove specific run
- **WHEN** user invokes `/kb:cleanup-runs --run 1`
- **THEN** system removes `sources/run-1/`, `wip/run-1/`, and `draft-output/run-1/` directories and updates metadata

#### Scenario: Protect current run
- **WHEN** user attempts to cleanup the current in-progress run
- **THEN** system prevents deletion and shows error message

### Requirement: Isolate run data

The system SHALL ensure each run's sources, work-in-progress, and drafts are isolated from other runs.

#### Scenario: Separate source directories
- **WHEN** user adds sources during run-2
- **THEN** sources are stored in `sources/run-2/` without affecting run-1 sources

#### Scenario: Independent learning plans
- **WHEN** run-2 starts with user feedback
- **THEN** system creates new `wip/run-2/learning-plan.md` based on feedback, preserving run-1's plan

#### Scenario: No cross-run contamination
- **WHEN** topics are learned in run-2
- **THEN** topic notes are written to `wip/run-2/{topic}.md` without modifying run-1 files

### Requirement: Preserve backward compatibility

The system SHALL maintain core learning workflow compatibility for users not using the iterative feature.

#### Scenario: Single-run workflow
- **WHEN** user completes run-1 and moves directly to final output without additional runs
- **THEN** system generates final output in `kb/output/` from run-1 data

#### Scenario: Legacy installations
- **WHEN** existing KB directories without run structure are detected
- **THEN** system treats existing data as run-1 and continues with run-2 for new learning

#### Scenario: Skip draft outputs
- **WHEN** user invokes `/kb:start-knowledge-base --no-draft`
- **THEN** system skips draft generation and only creates final output after all runs complete

### Requirement: Progressive refinement

The system SHALL enable incremental improvement of understanding across runs by incorporating user corrections.

#### Scenario: Apply corrections to next run
- **WHEN** user provides corrections in run-1 feedback (e.g., "Payment system uses Stripe, not custom")
- **THEN** run-2 incorporates this correction and updates affected topic notes and drafts

#### Scenario: Focus on missed areas
- **WHEN** user specifies focus areas in feedback (e.g., "Deep dive into authentication module")
- **THEN** run-2 prioritizes those topics in learning plan and allocates more analysis time

#### Scenario: Add context between runs
- **WHEN** user adds additional context in feedback (e.g., "Legacy code in legacy/ is deprecated")
- **THEN** run-2 applies this context when analyzing related code and marks accordingly in output
