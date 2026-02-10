---
name: check-workflow-status
description: Check current workflow state and progress
---

# Workflow Status Command

Show current workflow state, progress, and next steps.

## Process

### 1. Read Workflow State

Check `.claude/workflow/current.json` for active workflow.

### 2. Display Summary

```
═══════════════════════════════════════
📊 Workflow Status
═══════════════════════════════════════

Feature: payment-processing
Block: B (Spec Change + TDD)
Phase: Testing (3/5 tests passing)
Started: 2 hours ago

Progress:
✅ Spec change created
✅ Test cases generated (12 total)
✅ Implementation plan created
🔄 TDD implementation (60% complete)
⏳ Validation pending

Tasks:
✅ 15 completed
🔄 3 in progress
⏳ 2 pending
━━━━━━━━━━━━━━━━━━━━━━━━ 75%

Next Steps:
1. Fix failing tests (2 remaining)
2. Complete refactoring phase
3. Run full test suite
4. Deploy to staging

Integrations:
✓ task-management (tracking 20 tasks)
✓ tdd-workflow (active)
✓ OpenSpec (using openspec/ structure)
```

### 3. Verbose Mode (if --verbose)

**Show additional details:**
- Full task list with status
- Test results breakdown
- Files modified
- Commits made
- Time spent per phase

## No Active Workflow

If no workflow active:

```
No active workflow

To start a new workflow:
  /workflow:start-development-workflow "your requirement"

Or use specific blocks:
  /workflow:create-workflow-spec create "feature"  (Stage A)
  /workflow:plan-simple-workflow "task"             (Stage C)
```

## Example Output

### Stage A in Progress

```
Feature: multi-tenant-architecture
Block: A (Spec + Meta-Validation)
Phase: Meta-testing
Started: 30 minutes ago

Progress:
✅ Research completed
✅ Initial spec created
🔄 Meta-testing in progress
  ✅ PoC Test 1: Database isolation
  ✅ PoC Test 2: Tenant switching
  ⏳ Manual Q: Scaling strategy
⏳ Spec iteration pending
⏳ Finalization pending

Next: Answer scaling questions, iterate spec
```

### Stage B in Progress

```
Feature: email-notifications
Block: B (Spec Change + TDD)
Phase: Implementation
Started: 1 hour ago

Progress:
✅ Spec change created
✅ Test cases generated (8)
✅ Plan created (12 steps)
🔄 TDD implementation
  ✅ RED: 8/8 tests failing
  🔄 GREEN: 6/8 tests passing
  ⏳ REFACTOR pending

Tasks: 12 total
✅ 8 completed | 🔄 2 in progress | ⏳ 2 pending

Next: Fix 2 failing tests, then refactor
```

### Stage C in Progress

```
Feature: fix-login-button
Block: C (Simple Planning)
Phase: Implementation
Started: 15 minutes ago

Progress:
✅ Plan created (4 steps)
✅ Tasks created (4)
🔄 Implementation in progress

Tasks: 4 total
✅ 3 completed | 🔄 1 in progress

Next: Complete final task, test, done!
```

## Implementation Notes

**Read state from:**
- `.claude/workflow/current.json` (workflow state)
- `.claude/tasks/` (task-management integration)
- TodoWrite state (built-in tasks)
- Git log (commits since workflow start)

**Calculate progress:**
- Phase completion
- Task completion percentage
- Test pass rate
- Time estimates

**Format for clarity:**
- Use emoji indicators (✅🔄⏳❌)
- Show progress bars
- Highlight next steps
- Color code by priority (if terminal supports)
