---
name: test-driven-development
description: Enforces TDD discipline - write tests first, then implement
---

# Test-Driven Development Skill

Auto-activates to enforce TDD discipline during implementation.

## When to Use

Activate when:
- User starts implementing feature
- User invokes `/tdd:start`
- User mentions "test" or "TDD"
- Integrated from Block B workflow

## The Iron Law of TDD

**RED → GREEN → REFACTOR**

Never write production code without a failing test first.

## Process

### RED: Write Failing Test

```
1. Write test describing desired behavior
2. Run test
3. MUST fail (if passes, test is bad)
4. Confirm failure message makes sense
```

**Block implementation until test fails.**

### GREEN: Make It Pass

```
1. Write MINIMUM code to pass
2. No refactoring yet
3. No "future-proofing"
4. Quick and dirty is OK
5. Run test - must pass
```

**Block refactoring until test passes.**

### REFACTOR: Improve Code

```
1. Now improve code quality
2. Extract methods
3. Rename for clarity
4. Optimize if needed
5. Run tests after EACH change
6. All tests must stay green
```

**Block next feature until refactoring done.**

## Enforcement

**If user tries to implement before test:**
```
⛔ STOP: No Test Written Yet

TDD requires test-first development.

Please write a failing test before implementing.

Example:
test('feature does X', () => {
  expect(feature()).toBe(expected);
});
```

**If user tries to refactor during GREEN:**
```
⛔ STOP: Test Not Passing Yet

Refactoring comes AFTER test passes.

Current phase: GREEN (make it pass)
Next phase: REFACTOR (improve code)

Focus on making the test pass first.
```

## Integration with workflow plugin

When called from Block B:
- Test cases already generated
- Use those as starting RED tests
- Cycle through each test case
- Mark complete when all pass

This skill enforces discipline so TDD actually happens.
