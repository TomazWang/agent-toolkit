## Why

The current KB plugin treats all sources as equally trustworthy and generates output automatically after each learning cycle. This creates several problems:

1. **Sources are not truth**: Documentation can be outdated or wrong, but the system treats them as reliable
2. **No user control over output**: System generates final output automatically without user validation
3. **Lost context between runs**: Each run starts fresh without carrying forward incomplete findings
4. **No confidence tracking**: Users don't know how reliable the generated knowledge base is
5. **Missing feedback loop**: No mechanism for users to guide AI focus based on what's uncertain

This change introduces a **trust-based refinement pipeline** where sources are untrusted inputs, WIP documents evolving understanding, and output is explicitly created by users only when they're satisfied with the confidence level.

## What Changes

- **Trust hierarchy**: Distinguish between untrusted sources → working drafts → validated output
- **Run-0 categorization**: AI analyzes initial sources and categorizes into baseline (always include) vs ephemeral (one-time use) vs deprecated (keep but mark unusable)
- **Autonomous input selection**: AI decides what sources to include each run based on confidence gaps, user corrections, and unresolved findings
- **Explicit output creation**: Users manually create versioned output (v0.1, v0.2, v1.0) when satisfied, referencing source run
- **Questions in output**: Each output version includes explicit questions to guide next iteration
- **User answers as sources**: Responses to questions become source documents for next run
- **Confidence tracking**: Each output version has confidence score and tracks changes from previous version
- **WIP as working memory**: Drafts stay in WIP until user explicitly promotes to output
- **No MCP integrations**: Remove cloud sources (completed in previous change, verify removal)
- **Commands**: `/kb:init`, `/kb:start`, `/kb:continue`, `/kb:create-output`

## Capabilities

### New Capabilities

- `trust-based-pipeline`: Trust hierarchy with sources (untrusted) → wip (drafts) → output (validated truth)
  - Run-0 categorization of sources into baseline/ephemeral/deprecated
  - Autonomous AI input selection based on confidence and gaps
  - Explicit user-driven output creation
  - Confidence scoring and version tracking

- `iterative-questions`: Questions embedded in output to guide refinement
  - Output includes outstanding questions with priority levels
  - User answers become source documents for next run
  - Question resolution tracking across runs

- `source-categorization`: AI-driven source classification and deprecation
  - Detect code-vs-docs discrepancies
  - Mark contradictory sources as deprecated (keep but don't use)
  - Maintain baseline sources that carry to all runs

- `confidence-tracking`: Versioned output with confidence scores
  - Each output version has overall confidence percentage
  - Per-domain confidence tracking
  - Changes documented between versions

### Modified Capabilities

None - this is a new architectural approach, not modifying existing requirements.

## Impact

**Affected Code:**
- Plugin structure remains `plugins/kb/` (from previous change)
- Skills requiring major modification:
  - `start-knowledge-base` - implement run-0 categorization and orchestration
  - `prepare` - update to support trust-based structure
  - `distill-kb-knowledge` - change to create WIP drafts only, not final output
  - `check-kb-status` - show run info, confidence, pending questions
- New skills needed:
  - `init` - initialize KB structure
  - `create-output` - user-triggered output version creation
  - `continue` - alias/shortcut for continuing to next run
- Commands to add:
  - `/kb:init` - initialize structure
  - `/kb:create-output` - create versioned output from WIP

**Directory Structure Changes:**
```
kb/
├── sources/
│   ├── baseline/                # Promoted baseline sources
│   │   └── RUN-0-DECISIONS.md   # Categorization rationale
│   ├── run-0/                   # Initial sources
│   ├── run-1/                   # Incremental sources + corrections
│   │   └── USER-ANSWERS-R1.md   # User responses as sources
│   └── run-N/
├── wip/                         # Working drafts (not final truth)
│   ├── run-0/
│   │   ├── DRAFT-summary.md     # Draft outputs
│   │   ├── QUESTIONS-FOR-USER.md
│   │   └── findings.md
│   ├── run-1/
│   │   ├── INPUT-SELECTION.md   # AI's input choices
│   │   ├── DRAFT-summary.md
│   │   └── DISCREPANCIES.md
│   └── run-N/
└── output/                      # User-validated truth
    ├── v0.1/                    # Explicit user-created versions
    │   ├── VERSION-INFO.md      # Run source, confidence, changes
    │   ├── summary.md
    │   ├── QUESTIONS-v0.1.md    # Outstanding questions
    │   ├── CONFIDENCE.md        # Confidence by domain
    │   └── domains/
    ├── v0.2/
    └── latest -> v0.2/          # Symlink to current version
```

**Workflow Changes:**
1. `/kb:init` - user initializes structure
2. User manually adds sources to `sources/run-0/`
3. `/kb:start` - AI categorizes sources (baseline vs ephemeral), runs run-0
4. Run-0 creates WIP drafts with questions
5. User reviews WIP, answers questions, adds sources to `sources/run-1/`
6. `/kb:continue` - AI selects inputs, runs run-1 with corrections
7. Loop steps 5-6 until satisfied
8. `/kb:create-output` - user explicitly creates versioned output
9. Output contains questions for further refinement
10. User answers questions as new sources, continues iterations

**APIs:**
- No external API changes
- Internal skill APIs change significantly (commands, parameters)

**Dependencies:**
- No new dependencies
- Maintains removal of MCP integrations from previous change

**Breaking Changes:**
- Workflow fundamentally different (no auto-output)
- Directory structure significantly changed
- Users must adapt to new command flow
- Existing KB directories require migration
