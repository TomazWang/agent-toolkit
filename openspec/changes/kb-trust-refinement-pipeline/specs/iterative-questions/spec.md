# Iterative Questions Specification

This specification defines how questions are embedded in outputs to guide refinement iterations.

## ADDED Requirements

### Requirement: Generate questions in WIP

The system SHALL generate QUESTIONS-FOR-USER.md in WIP after each run with prioritized outstanding questions.

#### Scenario: Questions file created after run
- **WHEN** run-N completes learning
- **THEN** system creates `wip/run-N/QUESTIONS-FOR-USER.md` with outstanding questions

#### Scenario: Questions prioritized by urgency
- **WHEN** system generates questions file
- **THEN** questions are organized into Critical, High Priority, Medium Priority, and Low Priority sections

#### Scenario: Questions include context
- **WHEN** system writes each question
- **THEN** question includes finding context, specific question, answer options, and impact statement

### Requirement: Include questions in output versions

The system SHALL include QUESTIONS-{version}.md in each output version with unresolved questions.

#### Scenario: Output includes questions file
- **WHEN** user creates output v0.2 from run-2
- **THEN** system copies questions from `wip/run-2/QUESTIONS-FOR-USER.md` to `output/v0.2/QUESTIONS-v0.2.md`

#### Scenario: Questions cleaned and formatted
- **WHEN** system creates output questions file
- **THEN** questions are reformatted for clarity and include "Why it matters" sections

#### Scenario: Resolved questions marked
- **WHEN** output v0.2 is created after questions from v0.1 were answered
- **THEN** QUESTIONS-v0.2.md shows which v0.1 questions were resolved

### Requirement: Accept user answers as sources

The system SHALL read user answer files (USER-ANSWERS-RN.md) as source documents in subsequent runs.

#### Scenario: User creates answer file
- **WHEN** user reviews questions and creates `sources/run-2/USER-ANSWERS-R2.md`
- **THEN** system treats this file as a high-priority source for run-2

#### Scenario: Answers override previous understanding
- **WHEN** USER-ANSWERS-R2.md contradicts run-1 findings
- **THEN** system uses user answers as ground truth and updates understanding

#### Scenario: Partial answers accepted
- **WHEN** user answers only some questions in USER-ANSWERS-RN.md
- **THEN** system proceeds with answered questions and carries unanswered ones forward

### Requirement: Track question resolution

The system SHALL track which questions were resolved across runs and document in VERSION-INFO.md.

#### Scenario: Resolved questions documented
- **WHEN** output v0.2 is created after answering v0.1 questions
- **THEN** VERSION-INFO.md lists resolved questions and their answers

#### Scenario: Unresolved questions carried forward
- **WHEN** questions from v0.1 remain unanswered in run-2
- **THEN** QUESTIONS-v0.2.md includes those questions with "Still unresolved from v0.1" marker

#### Scenario: New questions added
- **WHEN** run-2 discovers new gaps not in v0.1
- **THEN** QUESTIONS-v0.2.md includes new questions with "New in v0.2" marker
