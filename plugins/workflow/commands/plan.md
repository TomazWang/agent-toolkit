---
name: plan
description: Create simple plans (Block C workflow)
usage: |
  /workflow:plan <requirement>
  /workflow:plan <requirement> --skip-research
examples:
  - /workflow:plan "Add dark mode toggle"
  - /workflow:plan "Fix login button" --skip-research
---

# Workflow Plan Command

Manually enter Block C (Simple Planning) workflow.

## Process

1. **Research** (unless skipped):
   - Quick check of relevant code
   - Understand current implementation

2. **Create Plan**:
   - Break requirement into steps
   - Identify files to modify
   - Define success criteria

3. **Convert to Tasks**:
   - If task-management installed: Create tasks with `/task`
   - Otherwise: Use TodoWrite
   - Link tasks to plan

4. **Track Implementation**:
   - Tasks show in TodoWrite/task-management
   - Update as you work

## Output Location

- `docs/plans/YYYY-MM-DD-[feature].md`

## Example Usage

```
User: /workflow:plan "Add email validation"

Research phase:
- Reading signup form code...
- Found: No validation currently

Creating plan:
docs/plans/2026-02-05-email-validation.md

Plan:
1. Add email regex validation
2. Add error message display
3. Update tests
4. Test in browser

Converting to tasks:
✓ task-management detected
/task create "Add email regex" --project validation
/task create "Add error display" --project validation
/task create "Update tests" --project validation

Tasks created (3 total)
Ready to implement!
```

See block-c-simple-planning skill for full workflow details.
