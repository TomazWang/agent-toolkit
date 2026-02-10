---
name: analyze-git-history
description: Analyze git history for a topic. Finds commits, changes, and evolution of code. Use during kb:learn to understand why code exists.
user-invocable: false
argument-hint: <topic> [keywords...]
---

# KB Git Analysis

Deep dive into git history to understand code evolution.

**Input**: Topic and optional keywords (e.g., `auth tokens`, `session`)

---

## Why Git History

```
Documentation: "Sessions expire after 30 minutes"

Git commit:    "Extend session to 24h for mobile UX"
               Date: 2024-03-15
               Ticket: VSTS-4521

→ Git tells you WHEN and WHY reality differs from docs
```

---

## Commands

### Find Commits by Message

```bash
cd kb/sources/repos/<repo>
git log --oneline --all --grep="$ARGUMENTS"
```

### Find Code Changes (Pickaxe)

```bash
git log -p --all -S "$ARGUMENTS" -- "*.ts" "*.tsx"
```

### File History

```bash
git log --oneline --follow -- path/to/file.ts
```

### Blame (Who Changed What)

```bash
git blame path/to/file.ts
```

### Date Range

```bash
git log --oneline --since="2024-01-01" --until="2024-06-01"
```

### Merge Commits

```bash
git log --oneline --merges --grep="VSTS\|MR\|PR"
```

---

## Multi-Repo Analysis

For projects with multiple repos:

```bash
for repo in kb/sources/repos/*/; do
  echo "=== $(basename $repo) ==="
  cd "$repo"
  git log --oneline --all --grep="$ARGUMENTS" | head -10
  cd -
done
```

---

## Output Format

```markdown
## Git Analysis: $ARGUMENTS

### Summary
- Commits found: N
- Date range: YYYY-MM to YYYY-MM
- Key authors: @user1, @user2

### Timeline

| Date | Commit | Summary | Ticket |
|------|--------|---------|--------|
| 2024-03 | abc123 | Extended session | VSTS-4521 |
| 2024-02 | def456 | Added refresh | VSTS-4200 |

### Key Commit: abc123

**Date**: 2024-03-15
**Author**: dev@company.com
**Message**:
> Extended session from 30min to 24h for mobile

**Files changed**:
- SessionManager.ts (+15, -3)

**Why this matters**:
Explains discrepancy between docs and code
```

---

## Record Findings

Add to topic notes:

```bash
echo "## Git History" >> kb/wip/{topic}.md
# ... add findings ...
```
