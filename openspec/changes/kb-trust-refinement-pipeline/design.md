## Context

The KB plugin currently generates knowledge base output automatically after learning, treating all sources as equally trustworthy. Users have no control over when output is created or how confident the AI is in its findings. This leads to premature outputs with unvalidated information.

The trust-based refinement pipeline addresses this by establishing clear boundaries between untrusted inputs (sources), evolving understanding (WIP), and validated truth (output). Users explicitly control output creation and iteratively refine understanding through question-answer cycles.

## Goals / Non-Goals

**Goals:**
- Establish trust hierarchy: sources < wip < output
- Enable AI to categorize sources by reliability and deprecate contradictory docs
- Give users explicit control over output creation (manual, not automatic)
- Track confidence per domain and overall
- Guide users on what's needed through embedded questions
- Allow iterative refinement through run loops
- Carry forward incomplete findings between runs
- Version outputs with change tracking

**Non-Goals:**
- Not changing core learning algorithms (code-investigator, discrepancy-hunter)
- Not adding automatic confidence calculation (initially manual estimation)
- Not implementing ML-based source reliability scoring
- Not building UI for version comparison (CLI only)
- Not automating question generation (manual for now, can enhance later)

## Decisions

### Decision 1: Three-tier trust hierarchy

**Choice:** sources/ (untrusted) → wip/ (drafts) → output/ (validated)

**Rationale:**
- Makes trust explicit in directory names
- Sources can be wrong (docs often are)
- WIP is working memory, can be revised
- Output is user-validated truth
- Clear promotion path

**Alternatives considered:**
- Two-tier (sources + output): Lost working memory, no draft stage
- Four-tier (sources + working + draft + output): Too complex, unclear boundaries

**Implementation:**
```
kb/
├── sources/     # Untrusted inputs
├── wip/         # AI's working memory
└── output/      # User-validated truth
```

### Decision 2: Run-0 as categorization phase

**Choice:** First run categorizes sources into baseline/ephemeral/deprecated

**Rationale:**
- AI can't know which sources to carry forward without reading them first
- Some sources are one-time use (historical context)
- Some sources contradict code (mark deprecated, don't delete)
- Baseline sources (repo, core docs) always needed
- Explicit categorization creates audit trail

**Alternatives considered:**
- Manual categorization: Too much user burden
- No categorization: Everything carries forward (bloats context)
- Delete wrong sources: Lose history, can't explain why they were wrong

**Implementation:**
```bash
# Run-0 creates:
sources/baseline/RUN-0-DECISIONS.md

## Baseline (carry to all runs)
- repos/my-project/
- docs/api-spec.yaml

## Run-0 Only (ephemeral)
- old-readme.md (historical context)

## Deprecated (keep but mark unusable)
- deployment.md (contradicts code)
```

### Decision 3: Explicit output creation by user

**Choice:** No automatic output generation. User runs `/kb:create-output` when satisfied.

**Rationale:**
- User knows when confidence is sufficient
- Allows multiple refinement iterations before committing
- Output becomes explicit milestone, not automatic byproduct
- User can create multiple versions at different confidence levels

**Alternatives considered:**
- Auto-output after each run: Too many premature outputs
- Auto-output at confidence threshold: AI confidence estimation unreliable initially
- Prompt user after each run: Interrupts flow, annoying

**Implementation:**
```bash
/kb:create-output

# Prompts:
"Create output from which run? (current: run-2)"
"Version name? (default: v0.2)"

# Creates:
output/v0.2/
├── VERSION-INFO.md
├── summary.md
├── QUESTIONS-v0.2.md
└── CONFIDENCE.md
```

### Decision 4: Questions embedded in output

**Choice:** Each output version includes QUESTIONS-{version}.md with outstanding questions

**Rationale:**
- Makes gaps explicit
- Guides user on what to provide next
- Questions are prioritized (high/medium/low)
- Each question explains why it matters
- Questions resolved between versions

**Format:**
```markdown
# QUESTIONS-v0.1.md

## Critical

### Q1: OAuth2 Configuration
**Finding**: Code shows OAuth2 but config location unknown
**Question**: Where are credentials stored?
- [ ] Env vars
- [ ] Vault
- [ ] AWS Secrets Manager
**Why it matters**: Security docs incomplete without this
```

**Alternatives considered:**
- Questions in main summary: Clutters output, hard to track
- Separate questions.md (unversioned): Loses history of what was resolved
- No explicit questions: User doesn't know what's missing

### Decision 5: User answers as source documents

**Choice:** User responses to questions become source files in `sources/run-N/USER-ANSWERS-RN.md`

**Rationale:**
- Treats user input as just another source (consistency)
- Preserves user responses as auditable documents
- AI reads USER-ANSWERS-RN.md like any other source
- Corrections override previous understanding

**Format:**
```markdown
# USER-ANSWERS-R2.md

## Q1: OAuth2 Configuration
**Answer**: Environment variables

**Details**:
CLIENT_ID and CLIENT_SECRET in .env
In production: AWS Parameter Store
```

**Alternatives considered:**
- Inline corrections in WIP: Hard to track what user said vs AI inferred
- Structured JSON: Less readable, harder for users to write
- Interactive CLI prompts: Breaks flow, not auditable

### Decision 6: Autonomous input selection

**Choice:** AI decides which sources/WIP/outputs to include each run, documents decisions in INPUT-SELECTION.md

**Rationale:**
- Reduces user burden (don't manually specify inputs)
- AI can focus on low-confidence areas
- Excludes deprecated sources automatically
- Documents rationale for auditing

**Selection logic:**
```
Include:
- sources/baseline/ (always)
- sources/run-N/ (current run additions)
- wip/run-{N-1}/ (previous WIP findings)
- output/v{latest}/ (to refine)
- USER-ANSWERS-RN.md (corrections)

Exclude:
- Deprecated sources
- Resolved findings
- Ephemeral sources from run-0
```

**Alternatives considered:**
- User specifies inputs: Too manual, error-prone
- Include everything: Context overload, slow
- No documentation: Can't audit AI decisions

### Decision 7: Confidence tracking

**Choice:** Each output version includes overall + per-domain confidence scores in CONFIDENCE.md

**Rationale:**
- Users know how reliable output is
- Prioritizes refinement on low-confidence areas
- Tracks improvement across versions
- Documents why confidence is low

**Format:**
```markdown
# CONFIDENCE.md - v0.2

## Overall: 85%

## By Domain
- API: 95% (verified via code + OpenAPI spec)
- Auth: 80% (OAuth2 config location unknown)
- Deployment: 60% (contradictory sources)

## Changes from v0.1
- Auth: 70% → 80% (+10% - resolved JWT vs OAuth2)
- API: 95% (unchanged)
```

**Alternatives considered:**
- No confidence tracking: User doesn't know reliability
- Single overall score: Can't see where gaps are
- Automatic ML scoring: Unreliable, overly complex initially

### Decision 8: Version tracking with change logs

**Choice:** Each output version includes VERSION-INFO.md with source run, changes, and limitations

**Rationale:**
- Clear audit trail of what changed
- References which runs contributed
- Documents known limitations
- Users understand evolution

**Format:**
```markdown
# VERSION-INFO.md - v0.2

**From Run**: run-2
**Confidence**: 85%
**Created**: 2026-02-11

## Changes from v0.1
- ✅ Resolved: OAuth2 config location (env vars)
- ✅ Added: Stripe webhook verification details
- ⚠️ Still unknown: Database migration status

## Source Runs
- run-0: Initial categorization
- run-1: User corrections (OAuth2, deployment)
- run-2: Stripe and config details
```

### Decision 9: WIP directory per run

**Choice:** Each run has its own `wip/run-N/` directory with drafts, findings, questions

**Rationale:**
- Isolates work per run (no cross-contamination)
- Can compare drafts across runs
- Preserves decision-making trail
- AI can reference previous WIP for context

**Structure:**
```
wip/run-1/
├── INPUT-SELECTION.md    # What AI chose to include
├── DRAFT-summary.md      # Draft output (not final)
├── DISCREPANCIES.md      # Code vs docs mismatches
├── QUESTIONS-FOR-USER.md # Questions AI needs answered
└── findings.md           # Unresolved items
```

**Alternatives considered:**
- Single wip/ dir: Overwrites previous work, loses history
- wip/latest/ symlink: Confusing, unclear what run it is
- No WIP persistence: Lose AI's working memory

### Decision 10: Commands for workflow stages

**Choice:** Four commands: `/kb:init`, `/kb:start`, `/kb:continue`, `/kb:create-output`

**Rationale:**
- Clear entry points for each phase
- `/init` - one-time setup
- `/start` - begins learning (categorization + run-0)
- `/continue` - continues to next run (most common)
- `/create-output` - explicit output creation

**Command flow:**
```
/kb:init              # User runs once
(user adds sources)
/kb:start             # Categorizes + runs run-0
(user reviews WIP)
/kb:continue          # Runs run-1
(user reviews WIP)
/kb:continue          # Runs run-2
(user satisfied)
/kb:create-output     # Creates v0.1
(user answers questions from v0.1)
/kb:continue          # Runs run-3
/kb:create-output     # Creates v0.2
```

**Alternatives considered:**
- Single `/kb:run` command: Unclear which phase, needs flags
- Auto-continue: Too automatic, loses user control
- More granular commands: Too many commands, overwhelming

## Risks / Trade-offs

**[Risk]** Users forget to create output after satisfactory runs → **Mitigation:** `/kb:status` reminds "Run N complete, confidence 85%. Create output with /kb:create-output?"

**[Risk]** Confidence scores subjective/inaccurate initially → **Mitigation:** Document methodology in CONFIDENCE.md, improve over time with user feedback

**[Risk]** Too many WIP directories clutter kb/ folder → **Mitigation:** Add `/kb:cleanup-runs` to archive old runs, keep last 3-5

**[Risk]** User doesn't answer questions, gets stuck → **Mitigation:** Questions marked optional vs critical, AI proceeds with what it has

**[Risk]** Deprecated sources accumulate → **Mitigation:** Mark clearly, move to sources/deprecated/ folder after N runs

**[Trade-off]** Manual output creation vs automatic: Accepted because user control is core value proposition

**[Trade-off]** More directory structure complexity vs clarity: Accepted because trust hierarchy must be explicit

**[Trade-off]** Questions manual vs auto-generated: Accepted for v1, can enhance with auto-generation later

## Migration Plan

### Phase 1: Core structure and commands
1. Add `/kb:init` command - creates trust-based structure
2. Modify `/kb:start` - implement run-0 categorization
3. Add `/kb:continue` command - orchestrates subsequent runs
4. Add `/kb:create-output` command - user-driven output creation

### Phase 2: Trust-based workflows
1. Modify `prepare` skill - support baseline vs run-specific sources
2. Modify `distill` skill - generate WIP drafts, not final output
3. Add INPUT-SELECTION.md generation
4. Add QUESTIONS-FOR-USER.md generation

### Phase 3: Confidence and versioning
1. Add CONFIDENCE.md generation
2. Add VERSION-INFO.md generation
3. Add version comparison utilities
4. Add confidence improvement tracking

### Phase 4: Cleanup and polish
1. Add `/kb:cleanup-runs` command
2. Improve `check-kb-status` to show confidence + questions
3. Add migration script for existing KB directories
4. Update README with new workflow

### Rollback Strategy
- Plugin can coexist with old structure (different kb/ folder)
- Users can keep old KB directories intact
- New workflow is opt-in via `/kb:init`

## Open Questions

1. **Confidence calculation methodology**: How to estimate domain-level confidence?
   - Initial: Manual estimation by AI based on source corroboration
   - Future: Track what's verified via code vs docs only

2. **Question auto-generation**: Can AI automatically identify knowledge gaps?
   - Deferred: Start with manual question writing, enhance later

3. **Source deprecation archival**: When to move deprecated sources to archive?
   - Proposal: After 2 runs without use, move to sources/deprecated/

4. **Output promotion**: Should v0.x → v1.0 have formal promotion criteria?
   - Proposal: v1.0 = 95%+ confidence across all domains
