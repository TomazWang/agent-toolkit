---
name: learn-kb-topic
description: |
  Learn a SINGLE topic deeply. Use when:
  - Called by auto-learn during autonomous loop
  - User invokes /kb:learn-kb-topic <topic>
  - Need to investigate specific area of codebase

  Focuses on ONE topic to reduce context and prevent hallucination.
argument-hint: <topic-name>
---

# KB Learn: Single Topic Deep Dive

Learn ONE topic thoroughly. This skill is called repeatedly by the autonomous learner.

**Input**: `$ARGUMENTS` = topic name (e.g., `authentication`, `api-layer`)

---

## The Core Principle

> **Focus on what ACTUALLY IS, not what documentation SAYS.**

```
╔═══════════════════════════════════════════════════════════════╗
║                     TRUST HIERARCHY                            ║
╠═══════════════════════════════════════════════════════════════╣
║  1. 🔴 Running Code      ← What actually executes              ║
║  2. 🟠 Git History       ← What changed and when               ║
║  3. 🟡 Tickets/MRs       ← Why it changed                      ║
║  4. 🟢 Tests             ← Expected behavior                   ║
║  5. 🔵 Comments          ← May be stale                        ║
║  6. ⚪ Documentation     ← Often outdated                      ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Learning Process

### Step 1: Mark In Progress

Update `kb/wip/learning-plan.md`:
- Find the line with `$ARGUMENTS`
- Change: `⏳ $ARGUMENTS` → `🔄 $ARGUMENTS`

### Step 2: Create/Update Topic Notes

Create or update `kb/wip/$ARGUMENTS.md`:

```markdown
# Topic: $ARGUMENTS

> Started: {ISO timestamp}
> Status: 🔄 Learning

## 1. Documentation Claims

What docs/comments/READMEs say about this topic:

| Source | Claim | Location |
|--------|-------|----------|
| | | |

## 2. Code Reality

What the code ACTUALLY does:

### Key Files

| File | Purpose | Evidence |
|------|---------|----------|
| | | |

### Implementation Details

(Actual code behavior, data flows, dependencies)

## 3. Discrepancies

| # | Docs Say | Code Does | Evidence | Severity |
|---|----------|-----------|----------|----------|
| 1 | | | | High/Med/Low |

## 4. Git History

Key changes over time:

| Date | Commit | Summary | Author |
|------|--------|---------|--------|
| | | | |

### Notable Commits

(Details on important changes)

## 5. Related Tickets

| Ticket | Title | Relevance |
|--------|-------|-----------|
| | | |

## 6. Questions for Team

- [ ] Question 1
- [ ] Question 2

## 7. Summary

### What This Does
(Clear explanation)

### Key Insights
- Insight 1
- Insight 2

### Gotchas
- Gotcha 1

### Related Topics
- Related 1
- Related 2
```

### Step 3: Investigate

#### 3.1 Find Documentation Claims

```bash
# Search docs for topic mentions
grep -ri "$ARGUMENTS" kb/sources/docs/ 2>/dev/null || true
grep -ri "$ARGUMENTS" README* docs/ *.md 2>/dev/null || true
```

Record what documentation claims about this topic.

#### 3.2 Find Actual Code

```bash
# Find relevant code files
grep -rli "$ARGUMENTS" --include="*.ts" --include="*.tsx" --include="*.js" \
  --include="*.py" --include="*.go" --include="*.rs" --include="*.java" \
  --include="*.kt" --include="*.rb" . 2>/dev/null | head -20
```

Read and analyze each relevant file. Focus on:
- Entry points
- Main logic
- Data flow
- Error handling
- External calls

#### 3.3 Analyze Git History

```bash
# Commits mentioning topic
git log --oneline --all --grep="$ARGUMENTS" | head -20

# Code changes (pickaxe search)
git log --oneline --all -S "$ARGUMENTS" | head -20

# Recent changes in related files
git log --oneline -10 -- "*$ARGUMENTS*" 2>/dev/null || true
```

#### 3.4 Find Tests

```bash
# Look for test files
find . -type f \( -name "*test*" -o -name "*spec*" \) | xargs grep -l "$ARGUMENTS" 2>/dev/null | head -10
```

Tests reveal expected behavior and edge cases.

#### 3.5 Check for Tickets

```bash
# Find ticket references in commits
git log --all --oneline | grep -iE "(JIRA|VSTS|#[0-9]+)" | head -10
```

### Step 4: Record All Findings

Write everything to `kb/wip/$ARGUMENTS.md`. Be thorough:
- Quote specific code snippets
- Reference exact file:line locations
- Note every discrepancy
- Include commit hashes for evidence

### Step 5: Complete Topic

#### 5.1 Write Summary
Ensure the Summary section is complete with:
- Clear explanation of what this topic covers
- Key insights discovered
- Gotchas and warnings
- Related topics for cross-reference

#### 5.2 Mark Complete
Update `kb/wip/learning-plan.md`:
- Change: `🔄 $ARGUMENTS` → `✅ $ARGUMENTS`

#### 5.3 Report Completion

Output:
```
═══════════════════════════════════════════════════════════════
✅ TOPIC COMPLETE: $ARGUMENTS
═══════════════════════════════════════════════════════════════
📝 Notes: kb/wip/$ARGUMENTS.md
📊 Files analyzed: N
⚠️  Discrepancies: N
❓ Questions: N

Key findings:
• Finding 1
• Finding 2
═══════════════════════════════════════════════════════════════
```

---

## Guardrails

1. **STAY FOCUSED** - Only learn about `$ARGUMENTS`, don't drift
2. **VERIFY CLAIMS** - Check every doc claim against code
3. **USE GIT** - History reveals truth
4. **RECORD EVIDENCE** - File paths, line numbers, commit hashes
5. **NOTE DISCREPANCIES** - These are valuable findings
6. **COMPLETE NOTES** - Don't leave sections empty

---

## Integration with Auto-Learn

When called from auto-learn:
1. This skill learns the topic
2. Marks it complete
3. Auto-learn picks next topic
4. Loop continues until all done

**DO NOT** ask for permission to continue - the loop is autonomous.

---

## Manual Usage

For manual topic learning:
```
/kb:learn-kb-topic authentication
```

This will learn just that one topic and stop.
