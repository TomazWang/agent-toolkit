---
name: task-integration
description: Integrates workflow with task-management plugin when available
---

# Task Integration Skill

Seamlessly integrates workflow phases with task-management plugin.

## Detection

Check if task-management plugin installed:
```bash
ls ~/.claude/plugins/task-management 2>/dev/null
```

## Integration Strategy

### If task-management EXISTS:

**Use /task commands:**
```bash
/task create "description" --project [name] --priority [level]
```

**Benefits:**
- Tasks visible in `/task list`
- Can use all task-management features
- Link tasks to workflow phases
- Track dependencies

**Example:**
```
Workflow: Payment Processing (Block B)

Created tasks:
- TASK-101: Setup Stripe SDK (high priority)
- TASK-102: Implement PaymentService
- TASK-103: Add webhook handler
...

Linked to workflow phase: Implementation
```

### If task-management NOT EXISTS:

**Fallback to TodoWrite:**
```
Standard TodoWrite integration
- [ ] Task 1
- [ ] Task 2
...
```

## Task Naming Convention

Format: `[Workflow Phase] - [Specific Action]`

Examples:
- `[Spec] - Create initial architecture doc`
- `[Testing] - Write integration tests`
- `[Implementation] - Add NotificationService`

## Progress Sync

Workflow tracks task completion:
```
Workflow Progress: 60%
Tasks: 12 total, 8 completed, 4 remaining
Phase: Implementation
```

## Next Steps Suggestion

Based on task progress, suggest next steps:
```
Completed: 8/12 tasks
Next critical task: TASK-105 (blocks 2 others)
Recommendation: Focus on TASK-105 next
```

This keeps workflow and task-management synchronized.
