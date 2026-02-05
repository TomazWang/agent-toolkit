# TDD Workflow Plugin

Enforce and guide Test-Driven Development with the RED-GREEN-REFACTOR cycle.

## Source Attribution

Based on patterns from:
- [Superpowers test-driven-development skill](https://github.com/obra/superpowers) - TDD methodology

## Overview

This plugin enforces the discipline of Test-Driven Development: write failing tests first, make them pass with minimal code, then refactor.

## Features

- Enforced RED-GREEN-REFACTOR cycle
- Test-first development workflow
- Automatic test running and verification
- Refactoring guidance
- TDD metrics and tracking

## Commands

### `/tdd`

Start or manage TDD workflow.

```bash
# Start TDD cycle
/tdd start "User authentication"

# Run current test
/tdd test

# Move to refactor phase
/tdd refactor

# Complete cycle
/tdd done
```

## Skills

### `test-driven-development`

Enforces TDD discipline at every implementation step:

**RED Phase:**
- Write a failing test first
- Run test to confirm it fails
- Understand what needs to be implemented

**GREEN Phase:**
- Write minimum code to make test pass
- Run test to confirm it passes
- No refactoring yet

**REFACTOR Phase:**
- Improve code quality
- Keep tests passing
- Run tests after each change

## Workflow

```
User: "Implement user login"

TDD Skill:

🔴 RED Phase: Write Failing Test

First, let's write a test that describes the desired behavior:

```typescript
// tests/auth/login.test.ts
describe('login', () => {
  it('should authenticate user with valid credentials', async () => {
    const result = await login('user@example.com', 'password123');
    expect(result).toMatchObject({
      success: true,
      user: { email: 'user@example.com' }
    });
  });
});
```

Running test... ❌ FAILED (login is not defined)

Good! Test fails as expected.

🟢 GREEN Phase: Make It Pass

Now implement minimum code to make test pass:

```typescript
// src/auth/login.ts
export async function login(email: string, password: string) {
  // Minimal implementation
  return {
    success: true,
    user: { email }
  };
}
```

Running test... ✅ PASSED

🔵 REFACTOR Phase: Improve Code

Now let's add proper implementation:
- Actually verify password
- Check user exists
- Handle errors

[Refactors while keeping tests green]

✅ TDD Cycle Complete
```

## Configuration

```yaml
---
test_command: npm test
test_watch: true
fail_on_no_tests: true
coverage_threshold: 80
---
```
