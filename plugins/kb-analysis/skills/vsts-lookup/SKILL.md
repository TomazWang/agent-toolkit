---
name: vsts-ticket-lookup
description: Find related tickets (VSTS/Azure DevOps/Jira). Extracts context about why decisions were made. Use during kb:learn when you find ticket references.
user-invocable: false
argument-hint: <ticket-id or keywords>
---

# KB VSTS/Ticket Lookup

Find context from tickets to understand why code exists.

**Input**: Ticket ID (e.g., `VSTS-4521`) or search terms

---

## Why Tickets Matter

```
Code:   if (mobile) sessionTTL = 7 * DAY;

Ticket: VSTS-4521
        "Mobile users losing work due to timeout"
        Decision: Extend to 7 days for mobile
        Approved by: Product Owner

→ Ticket tells you WHY the code makes that decision
```

---

## Setup

Requires config in `kb/.kb-config`:

```
VSTS_ORG=https://dev.azure.com/yourorg
VSTS_PROJECT=YourProject
VSTS_PAT=your-personal-access-token
```

---

## Lookup Methods

### Direct Ticket Lookup

```bash
source kb/.kb-config

# Azure DevOps CLI
az boards work-item show --id 4521 --org $VSTS_ORG

# Or via API
curl -u :$VSTS_PAT \
  "$VSTS_ORG/$VSTS_PROJECT/_apis/wit/workitems/4521?api-version=7.0"
```

### Search by Keywords

```bash
az boards query --wiql \
  "SELECT [ID], [Title] FROM WorkItems WHERE [Title] CONTAINS '$ARGUMENTS'"
```

### From Git Commits

```bash
git log --all --grep="VSTS\|JIRA" | grep -oE "(VSTS|JIRA)-[0-9]+"
```

---

## What to Extract

For each ticket:

```markdown
## VSTS-4521: {Title}

**Type**: Bug/Feature/Task
**Status**: Closed
**Created**: 2024-02-01
**Resolved**: 2024-03-15

### Problem
{What was the issue}

### Solution
{What was decided}

### Discussion
- @user1: "Mobile users losing work"
- @product: "Approved 7 day sessions"

### Related
- Parent: VSTS-4500
- PR: !789
- Commits: abc123

### Why It Matters
{Relevance to current analysis}
```

---

## No Access?

If you can't access tickets:

1. Check commit messages for summaries
2. Check MR/PR descriptions
3. Note the gap in your findings

```markdown
## VSTS-4521: [No Access]

**Note**: Unable to access ticket system.
**From git**: "VSTS-4521: Extend session to 24h"
**Action**: Ask team member for details
```

---

## Record Findings

Add to topic notes:

```markdown
## Related Tickets

| Ticket | Summary | Impact |
|--------|---------|--------|
| VSTS-4521 | Extended session | High |
```
