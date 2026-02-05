---
name: block-b-spec-to-tdd
description: Block B workflow - Convert spec changes into TDD implementation
---

# Block B: Spec Change + TDD Skill

Converts spec changes into test cases and implements with TDD.

## Process

### 1. Research
- Read existing spec (from Block A or existing docs)
- Understand current implementation
- Identify what needs to change

### 2. Create Spec Change Document

**OpenSpec format:**
```
openspec/changes/[feature]/spec-change.md
```

**Standard:**
```
docs/specs/changes/[feature].md
```

**Contents:**
- What's changing and why
- Affected components
- Implementation approach

### 3. Generate Test Cases

From spec change, create test scenarios:

```markdown
# Test Cases: Email Notifications

## Unit Tests
- NotificationService.send() triggers email
- Email template renders correctly
- User preferences respected

## Integration Tests
- Event triggers notification
- Email delivers successfully
- Retry logic on failure

## Acceptance Tests
- User receives email within 30s
- Email contains correct content
- Unsubscribe link works
```

### 4. Create Implementation Plan

Break into steps:
1. Setup email service
2. Create NotificationService
3. Implement email templates
4. Add event hooks
5. Write tests
6. Integrate and validate

### 5. TDD Implementation

**If tdd-workflow plugin installed:**
- Launch `/tdd:start` with generated tests
- Follow RED → GREEN → REFACTOR cycle

**Otherwise:**
- Guide manual TDD:
  1. Write failing tests (RED)
  2. Implement to pass (GREEN)
  3. Refactor for quality (REFACTOR)

### 6. Task Integration

**If task-management installed:**
- Create tasks for each step: `/task create ...`
- Link to workflow

**Otherwise:**
- Use TodoWrite

### 7. Validate

All tests must pass before marking complete.

## Example Flow

```
Block B: Email Notifications

1. Spec change created
2. Generated 12 test scenarios
3. Created 8-step plan
4. Integrated: 8 tasks created
5. Launched TDD workflow
6. Implementation progress: 6/8 complete
7. Tests: 10/12 passing
8. Next: Fix 2 failing tests
```
