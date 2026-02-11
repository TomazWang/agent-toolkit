---
name: start-knowledge-base
description: |
  AUTONOMOUS KNOWLEDGE BASE BUILDER - Use when user wants to:
  - "Learn this codebase", "Analyze this project", "Build knowledge base"
  - "Understand this repo", "Document what this code does"
  - Invokes /kb:start-knowledge-base

  This skill orchestrates the ENTIRE learning process autonomously with trust-based refinement.
  Trigger once → AI learns everything → Outputs WIP drafts with questions for refinement.
---

# Autonomous Knowledge Base Builder - Trust-Based Pipeline

**MISSION**: Autonomously learn codebase through iterative refinement with trust hierarchy.

You are an autonomous learning agent with trust-based workflow. You will:
1. Detect or start appropriate run (run-0 for categorization, run-N for refinement)
2. Select inputs autonomously (baseline + run-N + corrections + WIP)
3. Learn systematically (one topic at a time)
4. Generate WIP drafts with confidence scores and questions
5. Continue until user explicitly creates output

**Trust Hierarchy**: Code > Tests > Comments > Docs (code is truth, docs can lie)

**CRITICAL**: Do NOT create output/ files. Only create WIP drafts. User decides when to promote WIP to output.

---

## WORKFLOW DETECTION

### Detect Current State

```bash
# Detect what run we should execute
if [ ! -d "kb" ]; then
  echo "❌ KB not initialized. Run /kb:init first."
  exit 1
fi

# Detect run number
if [ ! -d "kb/wip/run-0" ]; then
  RUN_NUMBER=0
  RUN_TYPE="CATEGORIZATION"
  echo "🔍 Starting Run-0: Source Categorization"
elif [ ! -d "kb/wip/run-1" ]; then
  RUN_NUMBER=1
  RUN_TYPE="REFINEMENT"
  echo "🔄 Starting Run-1: First Refinement"
else
  # Count existing runs
  RUN_NUMBER=$(ls -d kb/wip/run-* 2>/dev/null | wc -l)
  RUN_TYPE="REFINEMENT"
  echo "🔄 Starting Run-$RUN_NUMBER: Iterative Refinement"
fi

# Create run directories
mkdir -p kb/{sources/run-$RUN_NUMBER,wip/run-$RUN_NUMBER}

echo "📊 Run: $RUN_NUMBER ($RUN_TYPE)"
```

---

## RUN-0: SOURCE CATEGORIZATION

**Purpose**: Analyze initial sources and categorize by reliability and lifecycle.

**Only runs on first invocation.** Subsequent runs skip to INPUT SELECTION.

### Step 1: Scan Sources

```bash
if [ $RUN_NUMBER -eq 0 ]; then
  echo "═══════════════════════════════════════════════════════════════"
  echo "🔍 RUN-0: SOURCE CATEGORIZATION"
  echo "═══════════════════════════════════════════════════════════════"

  # Scan kb/sources/run-0/
  echo "Scanning: kb/sources/run-0/"

  # List all sources
  find kb/sources/run-0/ -type f -name "*.md" -o -name "*.pdf" -o -name "*.txt" | while read file; do
    echo "  📄 $file"
  done

  # Count repos
  REPOS=$(find kb/sources/run-0/ -type d -name ".git" | wc -l)
  echo "  📦 Repositories: $REPOS"
fi
```

### Step 2: Analyze Each Source

For each source, determine:
- **Is it code or documentation?**
- **Is it current or outdated?** (check dates, compare to code)
- **Does it contradict code?** (docs say X, code shows Y)
- **Is it critical for all runs?** (core repo, main API spec)
- **Is it one-time context?** (old README, historical notes)

### Step 3: Apply Trust Hierarchy

**Trust Levels** (high to low):
1. **Running Code** - What actually executes (HIGHEST TRUST)
2. **Tests** - What behavior is expected
3. **Comments in Code** - May be stale but closer to truth
4. **Recent Documentation** - If dated within 6 months
5. **Old Documentation** - Often outdated (LOWEST TRUST)

**Discrepancy Detection**:
- Read docs claim about feature X
- Search code for feature X implementation
- If mismatch found: TRUST CODE, mark doc as DEPRECATED

### Step 4: Categorize Sources

Create three categories:

#### Baseline Sources (Promote to sources/baseline/)
Criteria:
- Primary codebase (repos/)
- Current API specs (verified against code)
- Core documentation (verified accurate)
- Critical for understanding in ALL runs

Actions:
- Move to `kb/sources/baseline/`
- Document in RUN-0-DECISIONS.md why it's baseline

#### Ephemeral Sources (Keep in run-0/)
Criteria:
- Historical context documents (old READMEs)
- Meeting notes, onboarding docs
- Useful for initial understanding but not ongoing
- Not contradictory, just one-time use

Actions:
- Leave in `kb/sources/run-0/`
- Document in RUN-0-DECISIONS.md as ephemeral
- Will NOT be included in run-1+

#### Deprecated Sources (Mark but keep)
Criteria:
- Contradicts code implementation
- Outdated (2+ years old, tech changed)
- Refers to removed features
- Factually incorrect

Actions:
- **Do NOT delete** (keeps audit trail)
- Mark in RUN-0-DECISIONS.md as DEPRECATED
- Will be excluded from run-1+ input selection

### Step 5: Generate RUN-0-DECISIONS.md

```bash
cat > kb/sources/baseline/RUN-0-DECISIONS.md << 'EOF'
# Run-0 Source Categorization

**Date**: $(date -u +"%Y-%m-%d")
**Run**: 0 (Initial Categorization)

## Trust Hierarchy Applied

Code > Tests > Comments > Documentation

When docs contradict code, we TRUST CODE and mark docs as deprecated.

---

## Baseline Sources (Critical - Carry to All Runs)

### repos/my-project/
**Category**: Baseline
**Reason**: Primary codebase, source of truth
**Verification**: Active development, latest commit $(git log -1 --format=%cd)
**Action**: Moved to sources/baseline/

### docs/api-spec.yaml
**Category**: Baseline
**Reason**: Current API spec, matches code endpoints
**Verification**: Checked against src/routes/ - all endpoints present
**Action**: Moved to sources/baseline/

---

## Ephemeral Sources (One-Time Context)

### README-2020.md
**Category**: Ephemeral
**Reason**: Historical README, useful for context but outdated
**Verification**: Architecture described is 2 versions old
**Action**: Kept in run-0/, will not carry forward

### onboarding-notes.md
**Category**: Ephemeral
**Reason**: Onboarding context, not technical reference
**Action**: Kept in run-0/, useful for initial understanding only

---

## Deprecated Sources (Contradicts Code - Excluded)

### docs/authentication.md
**Category**: DEPRECATED ⚠️
**Reason**: Claims "JWT-only authentication" but code shows OAuth2 + JWT implementation
**Evidence**:
  - Doc: "We use JWT tokens exclusively"
  - Code: src/auth/oauth2Provider.js implements OAuth2 flow
  - Code: Issues JWT AFTER OAuth2 authentication
**Trust**: CODE (docs are outdated, likely pre-2024 migration)
**Action**: Marked DEPRECATED, excluded from future runs

### docs/deployment.md
**Category**: DEPRECATED ⚠️
**Reason**: Describes Kubernetes deployment, actual deployment is Docker Compose
**Evidence**:
  - Doc: "Deploy via K8s manifests in k8s/"
  - Code: No k8s/ directory found, docker-compose.yml present
**Trust**: CODE
**Action**: Marked DEPRECATED, excluded from future runs

---

## Summary

- **Baseline**: 5 sources (repos + verified docs)
- **Ephemeral**: 3 sources (historical context)
- **Deprecated**: 2 sources (contradict code)

**Next**: Run-0 will learn from baseline + ephemeral sources.
**Run-1+**: Will use only baseline + new sources + WIP findings.
EOF

echo "✅ Created RUN-0-DECISIONS.md"
```

### Step 6: Move Baseline Sources

```bash
# Move identified baseline sources to baseline/
if [ $RUN_NUMBER -eq 0 ]; then
  echo "📦 Moving baseline sources..."

  # Example: Move verified docs
  [ -f "kb/sources/run-0/docs/api-spec.yaml" ] && mv kb/sources/run-0/docs/api-spec.yaml kb/sources/baseline/

  # Repos stay referenced (symlink or note location)
  # Don't physically move large repos, just document

  echo "✅ Baseline sources organized"
fi
```

---

## INPUT SELECTION (Run-1+)

**Purpose**: Autonomously select what to learn from for this run.

### For Run-0

**Include**:
- ALL sources in `kb/sources/run-0/`
- ALL sources in `kb/sources/baseline/`

**Exclude**:
- Nothing (first run, need full picture)

### For Run-N (N ≥ 1)

**Include**:
- `kb/sources/baseline/` - ALWAYS
- `kb/sources/run-N/` - Current run additions
- `kb/wip/run-{N-1}/findings.md` - Unresolved items
- `kb/wip/run-{N-1}/QUESTIONS-FOR-USER.md` - Outstanding questions
- `kb/sources/run-N/USER-ANSWERS-RN.md` - User corrections (HIGH PRIORITY)
- Previous output version (if exists) - to refine

**Exclude**:
- Sources marked DEPRECATED in RUN-0-DECISIONS.md
- Ephemeral sources from run-0 (unless critical)
- Resolved findings (marked complete in previous run)

### Generate INPUT-SELECTION.md

```bash
cat > kb/wip/run-$RUN_NUMBER/INPUT-SELECTION.md << EOF
# Input Selection - Run $RUN_NUMBER

**Date**: $(date -u +"%Y-%m-%d")
**Run**: $RUN_NUMBER

## Included Sources

### From Baseline (always included)
- repos/my-project/ (primary codebase)
- docs/api-spec.yaml (verified API spec)
[list all baseline sources]

### From Run-$RUN_NUMBER (current run additions)
$([ -d kb/sources/run-$RUN_NUMBER ] && ls kb/sources/run-$RUN_NUMBER || echo "  (none)")

### From Previous WIP (carry forward)
$([ -f kb/wip/run-$((RUN_NUMBER-1))/findings.md ] && echo "  - findings.md (unresolved items)" || echo "  (none)")

### User Corrections (HIGH PRIORITY)
$([ -f kb/sources/run-$RUN_NUMBER/USER-ANSWERS-R$RUN_NUMBER.md ] && echo "  - USER-ANSWERS-R$RUN_NUMBER.md ⭐ User corrections override previous understanding" || echo "  (none)")

---

## Excluded Sources

### Deprecated (from RUN-0-DECISIONS.md)
- docs/authentication.md (contradicts code)
- docs/deployment.md (contradicts code)

### Ephemeral (from run-0, not carried forward)
- README-2020.md (historical context only)
- onboarding-notes.md (one-time context)

---

## Focus Areas

$(if [ -f kb/sources/run-$RUN_NUMBER/USER-ANSWERS-R$RUN_NUMBER.md ]; then
  echo "### User-Directed Focus"
  echo "User provided corrections in USER-ANSWERS - prioritize these areas:"
  echo "  - [extracted from USER-ANSWERS file]"
else
  echo "### AI-Directed Focus"
  echo "Based on previous run confidence (if exists):"
  echo "  - Low confidence domains from previous run"
  echo "  - Unresolved questions from previous run"
fi)

---

## Rationale

Run $RUN_NUMBER focuses on:
- $([ $RUN_NUMBER -eq 0 ] && echo "Initial categorization and full codebase learning" || echo "Refining understanding based on user feedback and addressing knowledge gaps")

Baseline sources provide foundation, current run sources add new information, user corrections override previous assumptions.
EOF

echo "✅ Created INPUT-SELECTION.md"
```

---

## LEARNING LOOP

### Phase 1: Topic Analysis

Use `topic-analyzer` agent to identify ALL learning topics from included sources.

```bash
echo "🔍 Analyzing sources to identify topics..."

# Call topic-analyzer agent
# It scans code structure, docs, and generates topic list
# Creates kb/wip/run-$RUN_NUMBER/learning-plan.md
```

### Phase 2: Learn Each Topic

For each topic in learning plan:

```bash
# Read topic from learning plan
TOPIC="authentication"  # example

echo "📚 Learning topic: $TOPIC"

# Call code-investigator agent
# Deep dive into code, trace execution, understand implementation

# Call discrepancy-hunter agent
# Compare docs vs code for this topic, flag contradictions

# Record findings
cat >> kb/wip/run-$RUN_NUMBER/$TOPIC.md << EOF
# Topic: $TOPIC

## Code Analysis
[findings from code-investigator]

## Discrepancies Found
[findings from discrepancy-hunter]

## Confidence
[score 0-100% based on verification]

## Questions
[what's still unclear]
EOF

# Update learning plan (mark complete)
echo "✅ $TOPIC complete"
```

### Phase 3: Apply User Corrections

If USER-ANSWERS file exists:

```bash
if [ -f kb/sources/run-$RUN_NUMBER/USER-ANSWERS-R$RUN_NUMBER.md ]; then
  echo "📝 Applying user corrections..."

  # Parse USER-ANSWERS
  # Extract question-answer pairs
  # Override previous understanding with user's answers

  # Example:
  # User said: "Auth uses OAuth2, not JWT-only"
  # Action: Update authentication.md with corrected understanding
  #         Mark docs/authentication.md confidence as low (contradicted by user)
fi
```

---

## DISTILLATION (WIP DRAFT GENERATION)

### Generate DRAFT-summary.md

```bash
cat > kb/wip/run-$RUN_NUMBER/DRAFT-summary.md << 'EOF'
# DRAFT Knowledge Base Summary - Run $RUN_NUMBER

⚠️ **DRAFT** - Not yet validated by user

## Overall Confidence: [calculated]%

$([ $RUN_NUMBER -gt 0 ] && echo "## Changes from Run-$((RUN_NUMBER-1))" && echo "[list changes]")

## Project Overview
[synthesized from all topics]

## Architecture
[synthesized architecture understanding]

## Key Components
[domain-by-domain breakdown]

## Known Gaps
[what's still unclear or low confidence]
EOF
```

### Generate DISCREPANCIES.md

```bash
cat > kb/wip/run-$RUN_NUMBER/DISCREPANCIES.md << 'EOF'
# Code vs Documentation Discrepancies - Run $RUN_NUMBER

## Found Discrepancies

### 1. Authentication Implementation
**Doc Claims**: "JWT-only authentication"
**Code Shows**: OAuth2 provider + JWT token issuance
**Trust**: CODE ✅
**Status**: Resolved (docs marked deprecated)

### 2. [Other discrepancies]
...
EOF
```

### Generate QUESTIONS-FOR-USER.md

```bash
cat > kb/wip/run-$RUN_NUMBER/QUESTIONS-FOR-USER.md << 'EOF'
# Questions for User - Run $RUN_NUMBER

Please answer these to improve next run's accuracy.

## Critical Questions

### Q1: [Question Title]
**Finding**: [What we found in code/docs]
**Question**: [Specific question]
**Options**:
- [ ] Option A
- [ ] Option B
- [ ] Other: __________

**Why it matters**: [Impact statement]

---

## High Priority

[More questions...]

---

## To Answer

Create `kb/sources/run-$((RUN_NUMBER+1))/USER-ANSWERS-R$((RUN_NUMBER+1)).md` with your responses.
EOF
```

---

## COMPLETION OUTPUT

```
═══════════════════════════════════════════════════════════════
✅ RUN-$RUN_NUMBER COMPLETE
═══════════════════════════════════════════════════════════════

$([ $RUN_NUMBER -eq 0 ] && echo "🔍 Source Categorization:" && echo "   • Baseline: X sources moved to sources/baseline/" && echo "   • Ephemeral: Y sources kept in run-0/" && echo "   • Deprecated: Z sources marked (excluded from future runs)")

📊 Learning Summary:
   • Topics learned: [count]
   • Confidence: [overall]%
   • Discrepancies found: [count]
   • Questions for user: [count]

📁 WIP Drafts Created:
   • kb/wip/run-$RUN_NUMBER/DRAFT-summary.md
   • kb/wip/run-$RUN_NUMBER/DISCREPANCIES.md
   • kb/wip/run-$RUN_NUMBER/QUESTIONS-FOR-USER.md
   • kb/wip/run-$RUN_NUMBER/INPUT-SELECTION.md
   • kb/wip/run-$RUN_NUMBER/[topic].md files

$([ $RUN_NUMBER -eq 0 ] && echo "📋 Categorization:" && echo "   • sources/baseline/RUN-0-DECISIONS.md")

═══════════════════════════════════════════════════════════════
📋 NEXT STEPS:

1. Review WIP drafts: kb/wip/run-$RUN_NUMBER/DRAFT-summary.md
2. Check questions: kb/wip/run-$RUN_NUMBER/QUESTIONS-FOR-USER.md

Options:
✅ Satisfied? Create output: /kb:create-output
🔄 Need refinement? Answer questions and: /kb:continue
📊 Check status: /kb:status

$([ $RUN_NUMBER -eq 0 ] && echo "💡 TIP: Review RUN-0-DECISIONS.md to see how sources were categorized")
═══════════════════════════════════════════════════════════════
```

---

## Design Philosophy

**Trust-Based**: Sources are untrusted until verified against code

**Iterative**: Multiple runs refine understanding progressively

**User-Driven Output**: No automatic output/ creation - user decides when to promote WIP

**Autonomous Learning**: AI continues without interruption within a run

**Confidence-Aware**: Track and improve confidence across iterations

**Question-Guided**: Explicit questions guide user on what's needed

---

## IMPORTANT REMINDERS

1. **NEVER write to output/ directory** - only WIP drafts
2. **ALWAYS mark WIP files with "⚠️ DRAFT" header**
3. **TRUST CODE over docs** when conflicts found
4. **Continue autonomously** within a run (don't stop for permission)
5. **Generate questions** for gaps found during learning
