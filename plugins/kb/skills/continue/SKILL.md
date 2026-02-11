---
name: continue
user-invocable: true
description: |
  Continue to next run iteration. Use when:
  - User has reviewed current run's WIP drafts
  - User wants to run next iteration with corrections/new sources
  - User invokes /kb:continue

  Alias for starting the next run automatically.
---

# KB Continue: Advance to Next Run

Continue the iterative refinement workflow by starting the next run with autonomous input selection.

**Note**: This is equivalent to `/kb:start` but automatically detects the next run number.

---

## Prerequisites

- KB initialized (`kb/` directory exists)
- At least one run completed (run-0 or higher)
- User has optionally added new sources or answers to questions

---

## Continue Workflow

### 1. Detect Current Run

```bash
# Check what runs exist
if [ -d "kb/wip/run-2" ]; then
  CURRENT_RUN=2
  NEXT_RUN=3
elif [ -d "kb/wip/run-1" ]; then
  CURRENT_RUN=1
  NEXT_RUN=2
elif [ -d "kb/wip/run-0" ]; then
  CURRENT_RUN=0
  NEXT_RUN=1
else
  echo "❌ No runs found. Use /kb:start to begin run-0."
  exit 1
fi

echo "📊 Current run: $CURRENT_RUN"
echo "🚀 Starting run: $NEXT_RUN"
```

### 2. Check for User Additions

```bash
# Check if user added sources for next run
if [ -d "kb/sources/run-$NEXT_RUN" ] && [ "$(ls -A kb/sources/run-$NEXT_RUN)" ]; then
  echo "✅ Found new sources in kb/sources/run-$NEXT_RUN/"
  ls kb/sources/run-$NEXT_RUN/
fi

# Check for user answers
if [ -f "kb/sources/run-$NEXT_RUN/USER-ANSWERS-R$NEXT_RUN.md" ]; then
  echo "✅ Found USER-ANSWERS-R$NEXT_RUN.md (corrections will be applied)"
fi
```

### 3. Show Previous Run Summary

```bash
# Show what was learned in previous run
echo "═══════════════════════════════════════════════════════════════"
echo "📋 PREVIOUS RUN SUMMARY (Run-$CURRENT_RUN)"
echo "═══════════════════════════════════════════════════════════════"

# If DRAFT-summary exists, show confidence
if [ -f "kb/wip/run-$CURRENT_RUN/DRAFT-summary.md" ]; then
  CONFIDENCE=$(grep -i "confidence" kb/wip/run-$CURRENT_RUN/DRAFT-summary.md | head -1)
  echo "Confidence: $CONFIDENCE"
fi

# Show pending questions
if [ -f "kb/wip/run-$CURRENT_RUN/QUESTIONS-FOR-USER.md" ]; then
  QUESTIONS=$(grep -c "^### Q" kb/wip/run-$CURRENT_RUN/QUESTIONS-FOR-USER.md)
  echo "Pending questions: $QUESTIONS"
fi

echo "═══════════════════════════════════════════════════════════════"
```

### 4. Invoke Start with Next Run

```bash
# Call start-knowledge-base skill with explicit run number
# This triggers autonomous input selection and learning

echo "🔄 Starting run-$NEXT_RUN with autonomous input selection..."
echo ""

# Pass control to start-knowledge-base
# It will:
# - Select inputs (baseline + run-N + previous WIP + user answers)
# - Document choices in INPUT-SELECTION.md
# - Run learning loop
# - Generate WIP drafts
```

---

## Output

```
═══════════════════════════════════════════════════════════════
🚀 CONTINUING TO RUN-2
═══════════════════════════════════════════════════════════════

📊 Previous Run: run-1
   Confidence: 75%
   Pending questions: 3

✅ Found new additions:
   • sources/run-2/USER-ANSWERS-R2.md
   • sources/run-2/docs/stripe-config.md

🔄 Starting run-2 with autonomous input selection...

[Learning process begins...]
[see start-knowledge-base skill for detailed output]

═══════════════════════════════════════════════════════════════
✅ RUN-2 COMPLETE
═══════════════════════════════════════════════════════════════

📁 Drafts created in: kb/wip/run-2/
   • DRAFT-summary.md (confidence: 85% ⬆️ +10%)
   • QUESTIONS-FOR-USER.md (2 questions remain)
   • INPUT-SELECTION.md (documents AI choices)

📋 NEXT STEPS:

1. Review drafts: kb/wip/run-2/DRAFT-summary.md
2. Check questions: kb/wip/run-2/QUESTIONS-FOR-USER.md

Options:
- Satisfied? Create output: /kb:create-output
- Need refinement? Answer questions → /kb:continue
- Check status: /kb:status
═══════════════════════════════════════════════════════════════
```

---

## User Journey

### First Continue (Run-0 → Run-1)

```bash
# After run-0, user reviews draft
cat kb/wip/run-0/DRAFT-summary.md
cat kb/wip/run-0/QUESTIONS-FOR-USER.md

# User answers questions
mkdir -p kb/sources/run-1
cat > kb/sources/run-1/USER-ANSWERS-R1.md << 'EOF'
# User Answers for Run 1

## Q1: Auth Implementation
Answer: OAuth2 + JWT (docs were outdated)
EOF

# Continue to run-1
/kb:continue

# AI reads USER-ANSWERS-R1.md as corrections
# Runs run-1 with updated understanding
```

### Subsequent Continues

```bash
# User reviews run-1 draft
cat kb/wip/run-1/DRAFT-summary.md  # Confidence: 80%

# Still has questions? Answer and continue
cat > kb/sources/run-2/USER-ANSWERS-R2.md << 'EOF'
Q2: Deployment architecture
Answer: Modular monolith (not microservices)
EOF

/kb:continue  # → run-2

# Satisfied with run-2?
/kb:create-output  # Creates v0.1 from run-2
```

---

## Error Handling

### No Runs Exist

```
❌ No runs found.

To start learning, use: /kb:start

(This will begin run-0 and categorize sources)
```

### No New Information

```
⚠️  No new sources or answers found for run-2.

Previous run: run-1 (confidence: 80%)

Options:
1. Add more sources: kb/sources/run-2/
2. Answer questions: kb/sources/run-2/USER-ANSWERS-R2.md
3. Create output now: /kb:create-output
4. Continue anyway (re-analyze with same inputs)

Proceed? (y/n)
```

### Previous Run Incomplete

```
⚠️  Run-1 appears incomplete (no DRAFT-summary.md found).

This might indicate:
- Learning was interrupted
- Error occurred during run-1
- Files were manually deleted

Options:
1. Resume run-1: /kb:start --resume
2. Skip to run-2: /kb:continue --force
3. Check status: /kb:status
```

---

## Options

**`--force`**: Continue even if previous run seems incomplete

```bash
/kb:continue --force
```

**`--skip-summary`**: Skip previous run summary display

```bash
/kb:continue --skip-summary
```

---

## Design Notes

**Why a separate `continue` command?**
- More intuitive than `/kb:start` after run-0
- Clearly signals "next iteration" intent
- Auto-detects run number (less user burden)
- Can show previous run context

**Why not automatic continue?**
- User needs time to review drafts
- User may want to add sources or answer questions
- User may be satisfied and want to create output instead
- Explicit command = explicit control

**Integration with start:**
- `continue` is essentially `start` with auto run-number detection
- Both trigger the same learning workflow
- `continue` adds convenience and context display
