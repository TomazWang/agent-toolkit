---
name: start
description: Start TDD workflow with RED-GREEN-REFACTOR cycle
usage: |
  /tdd:start <feature-name>
  /tdd:start <feature-name> --tests-file <path>
examples:
  - /tdd:start "User authentication"
  - /tdd:start "Payment processing" --tests-file tests.md
---

# TDD Start Command

Launch Test-Driven Development workflow enforcing RED → GREEN → REFACTOR cycle.

## Process

### 1. Initialize TDD Session
- Feature name
- Test framework detection (Jest, pytest, RSpec, etc.)
- Optional: Pre-defined test cases file

### 2. RED Phase: Write Failing Test
**You MUST write test BEFORE implementation:**
```
Write a failing test that describes desired behavior
Run test → Confirm it fails
Only then proceed to GREEN phase
```

### 3. GREEN Phase: Make It Pass
**Write MINIMUM code to pass:**
```
Implement just enough to make test pass
No refactoring yet
No extra features
Run test → Confirm it passes
```

### 4. REFACTOR Phase: Improve Code
**Now improve while keeping tests green:**
```
Refactor for clarity/performance
Run tests after each change
All tests must stay passing
```

### 5. Repeat
Cycle continues until feature complete.

## Example Session

```
User: /tdd:start "Email validation"

🔴 RED Phase: Write Failing Test

Write a test for email validation:
```typescript
test('validates email format', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('invalid')).toBe(false);
});
```

Run: npm test
Result: ❌ FAIL (validateEmail not defined)

Good! Test fails as expected.

🟢 GREEN Phase: Make It Pass

Now implement minimal code:
```typescript
function validateEmail(email: string): boolean {
  return email.includes('@');
}
```

Run: npm test
Result: ✅ PASS

🔵 REFACTOR Phase

Improve regex:
```typescript
function validateEmail(email: string): boolean {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}
```

Run: npm test
Result: ✅ PASS

✅ Cycle complete! Next feature?
```

See test-driven-development skill for full discipline enforcement.
