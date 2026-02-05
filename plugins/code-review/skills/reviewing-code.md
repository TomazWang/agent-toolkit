---
name: reviewing-code
description: Systematic code review skill for providing constructive feedback
---

# Reviewing Code Skill

Use this skill when manually reviewing code or providing code feedback to ensure systematic, thorough, and constructive reviews.

## When to Use

- User asks you to review code
- Providing feedback on implementations
- Evaluating pull requests
- Code quality assessments

## Review Process

### 1. Understand Context

Before reviewing, understand:
- **What is the goal?** What problem does this code solve?
- **What changed?** What files/functions were modified?
- **Why this approach?** Are there design decisions to understand?
- **What's the scope?** Is this a fix, feature, refactor?

### 2. Review Layers

Review in this order (inspired by superpowers:systematic-debugging approach):

**Layer 1: Correctness**
- Does the code do what it's supposed to?
- Are edge cases handled?
- Is error handling appropriate?
- Are there obvious bugs?

**Layer 2: Security**
- Are there security vulnerabilities?
- Is input validated?
- Is authentication/authorization correct?
- Is sensitive data protected?

**Layer 3: Performance**
- Are there inefficiencies?
- Is caching used where appropriate?
- Are database queries optimized?
- Is memory usage reasonable?

**Layer 4: Testing**
- Are there tests?
- Do tests cover edge cases?
- Are tests clear and maintainable?
- Is test coverage adequate?

**Layer 5: Maintainability**
- Is the code readable?
- Are names clear?
- Is the design extensible?
- Is there documentation?

**Layer 6: Style**
- Does it follow conventions?
- Is formatting consistent?
- Are comments helpful (not redundant)?

### 3. Provide Feedback

**Be constructive:**
- Start with positives
- Explain the "why" behind suggestions
- Provide examples of better approaches
- Distinguish must-fix from nice-to-have

**Be specific:**
```
❌ "This function is too complex"
✓ "This function has cyclomatic complexity of 15. Consider extracting
   lines 45-67 into a separate validateInput() function."

❌ "Fix the security issue"
✓ "The SQL query on line 45 uses string interpolation which allows
   SQL injection. Use parameterized queries:
   db.query('SELECT * FROM users WHERE email = ?', [email])"
```

**Be empathetic:**
- Assume good intent
- Ask questions instead of making demands
- Acknowledge tradeoffs
- Suggest, don't command

### 4. Categorize Findings

**Critical (Must Fix):**
- Security vulnerabilities
- Data corruption risks
- Production-breaking bugs
- Legal/compliance violations

**High Priority (Should Fix):**
- Logic errors
- Poor error handling
- Missing tests for core functionality
- Significant performance issues

**Medium Priority (Consider Fixing):**
- Code duplication
- Unclear naming
- Missing edge case handling
- Minor performance optimizations

**Low Priority (Nice to Have):**
- Style inconsistencies
- Better variable names
- Additional comments
- Refactoring opportunities

### 5. Summarize

Provide executive summary:
```markdown
## Review Summary

**Overall:** Looks good with some important fixes needed

**Critical Issues:** 1
- SQL injection vulnerability in login endpoint

**High Priority:** 3
- Missing error handling in payment processing
- No tests for authentication flow
- N+1 query in user dashboard

**Medium Priority:** 5
[List briefly...]

**Low Priority:** 8
[List briefly...]

**Strengths:**
- Clear code organization
- Good use of TypeScript types
- Comprehensive error messages

**Recommendations:**
1. Fix SQL injection (critical)
2. Add tests for authentication
3. Optimize dashboard queries
```

## Feedback Templates

### Bug Report

```
**Issue:** [Brief description]
**Location:** file.ts:line
**Severity:** [Critical/High/Medium/Low]

**Problem:**
[Explain what's wrong and why it's a problem]

**Evidence:**
```code
[Show the problematic code]
```

**Impact:**
[What could go wrong]

**Suggested Fix:**
```code
[Show corrected code]
```
```

### Improvement Suggestion

```
**Suggestion:** [Brief description]
**Location:** file.ts:line
**Priority:** [High/Medium/Low]

**Current Approach:**
[Explain current implementation]

**Suggested Improvement:**
[Explain better approach and why]

**Example:**
```code
[Show improved code]
```

**Benefits:**
- [List advantages]
```

### Positive Feedback

```
**Nice work on:** [Specific aspect]

**Why it's good:**
[Explain what makes it good]

**Example:**
```code
[Show the good code]
```
```

## Review Principles

Based on industry best practices and the systematic approaches from Anthropic's code-review plugin and Superpowers:

1. **Systematic, not ad-hoc** - Follow the layer-by-layer approach
2. **Evidence-based** - Point to specific code, not vague feelings
3. **Constructive** - Help improve, don't just criticize
4. **Prioritized** - Distinguish critical from nice-to-have
5. **Actionable** - Provide clear next steps
6. **Balanced** - Acknowledge good along with issues
7. **Educational** - Explain the "why" to help learning

## Red Flags to Watch For

**Security:**
- String concatenation in SQL/commands
- Unvalidated user input
- Hardcoded secrets
- Missing authentication/authorization

**Correctness:**
- Off-by-one errors
- Null pointer dereferences
- Race conditions
- Missing error handling

**Performance:**
- N+1 queries
- Unbounded loops
- Memory leaks
- Unnecessary computations

**Maintainability:**
- God objects (>500 lines)
- Deep nesting (>4 levels)
- Magic numbers
- Unclear naming

## Example Review

```
Code to review:
```typescript
async function getUsers(req, res) {
  const users = await db.query("SELECT * FROM users WHERE role = '" + req.query.role + "'");
  res.send(users);
}
```

Review using this skill:

**Layer 1: Correctness**
✓ Basic functionality works

**Layer 2: Security**
❌ SQL injection vulnerability (CRITICAL)
❌ No input validation (HIGH)
❌ Missing authentication check (HIGH)

**Layer 3: Performance**
⚠️ SELECT * may fetch unnecessary columns (MEDIUM)

**Layer 4: Testing**
❌ No tests visible (HIGH)

**Layer 5: Maintainability**
⚠️ Missing error handling (MEDIUM)
⚠️ No TypeScript types (MEDIUM)

**Layer 6: Style**
⚠️ Function name could be more specific (LOW)

## Feedback:

### Critical Issues

**1. SQL Injection Vulnerability**
**Location:** Line 2
**Severity:** Critical

The SQL query concatenates user input directly into the query string,
allowing SQL injection attacks.

**Current (Vulnerable):**
```typescript
const users = await db.query("SELECT * FROM users WHERE role = '" + req.query.role + "'");
```

**Suggested Fix:**
```typescript
const users = await db.query(
  "SELECT * FROM users WHERE role = ?",
  [req.query.role]
);
```

**Impact:** Attacker could access/modify all database data.

### High Priority Issues

**2. Missing Authentication**
This endpoint should verify the user is authenticated before
returning user data.

**3. No Input Validation**
Validate that `role` is one of the expected values.

**4. Missing Tests**
Add tests covering normal case, SQL injection attempts,
unauthorized access.

[Continue with medium/low priority...]

**Summary:**
Fix the SQL injection immediately. Add auth check and input
validation before deploying. Consider adding tests to prevent
regression.
```

This systematic approach ensures thorough, helpful code reviews.
