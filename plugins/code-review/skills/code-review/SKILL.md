---
name: code-review
description: Comprehensive code review with parallel specialized agents
argument-hint: |
  [files...] [--focus <areas>] [--quick] [--pr <number>] [--commit <hash>]
---

# Code Review Skill

## When to Use

Use this skill when the user wants to:
- Review code changes before committing
- Analyze pull requests for quality issues
- Get security, performance, or architecture feedback
- Comprehensive multi-agent code analysis
- User invokes `/code-review:review` or asks for code review

## Overview

Orchestrate a comprehensive code review using specialized agents that analyze different aspects of the code in parallel.

## Command Parsing

Parse the user's arguments:
- **files**: Optional file patterns to review (default: all changed files)
- **--focus**: Comma-separated list of focus areas (architecture, security, testing, performance, style)
- **--quick**: Single-agent general review instead of parallel specialized reviews
- **--pr <number>**: Review a specific pull request
- **--commit <hash>**: Review a specific commit
- **--staged**: Review only staged changes
- **--comment**: Post review comments inline (for PRs)

## Review Process

### 1. Determine Scope

If no files specified, detect changes:

```bash
# Check for PR context
if --pr flag:
  gh pr diff $PR_NUMBER > /tmp/review-diff.patch
  files = parse files from diff

# Check for commit
elif --commit flag:
  git show $COMMIT_HASH > /tmp/review-diff.patch
  files = parse files from diff

# Check for staged changes
elif --staged flag:
  git diff --staged --name-only

# Default to branch changes
else:
  git diff main...HEAD --name-only
```

**If no changes found:**
"No changes to review. Current branch matches main."

### 2. Configure Review

Determine which agents to run:

**--quick mode:**
- Run single general review (no parallel agents)
- Faster but less thorough

**--focus mode:**
- Map focus areas to agents:
  - architecture → cr-architecture-reviewer
  - security → cr-security-reviewer
  - testing → cr-test-coverage-reviewer
  - performance → cr-performance-reviewer
  - style → cr-style-reviewer

**Default (full review):**
- Run all 5 specialized agents in parallel

### 3. Launch Review Agents

**Parallel execution:**
```
Use Task tool to launch multiple agents simultaneously:
- Task(subagent_type="code-review:cr-architecture-reviewer", ...)
- Task(subagent_type="code-review:cr-security-reviewer", ...)
- Task(subagent_type="code-review:cr-test-coverage-reviewer", ...)
- Task(subagent_type="code-review:cr-performance-reviewer", ...)
- Task(subagent_type="code-review:cr-style-reviewer", ...)
```

Each agent receives:
- List of files to review
- Diff/patch content
- Project context
- Review configuration

### 4. Collect Results

Wait for all agents to complete and collect their findings:

```
Results format:
{
  agent: "cr-security-reviewer",
  findings: [
    {
      file: "src/auth/login.ts",
      line: 45,
      severity: "critical",
      category: "sql-injection",
      message: "Unsafe SQL query construction",
      suggestion: "Use parameterized queries"
    },
    ...
  ]
}
```

### 5. Generate Report

Aggregate findings from all agents:

```markdown
# Code Review Report
Generated: 2026-02-05 14:30

## Summary
- Files reviewed: 12
- Critical issues: 2
- High priority: 5
- Medium priority: 12
- Low priority: 8

## Critical Issues

### src/auth/login.ts:45 [Security]
**SQL Injection Vulnerability**
Unsafe SQL query construction allows injection attacks.

```typescript
// Current (vulnerable)
const query = `SELECT * FROM users WHERE email = '${email}'`;

// Suggested fix
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [email]);
```

**Recommendation:** Fix immediately before deploying.

---

### src/payment/process.ts:89 [Security]
**Missing Authorization Check**
Payment processing endpoint doesn't verify user authorization.

```typescript
// Add authorization check
if (!user.canProcessPayments()) {
  throw new UnauthorizedError();
}
```

**Recommendation:** Add authorization check and write tests.

## High Priority Issues

[List high priority findings...]

## Medium Priority Issues

[List medium priority findings...]

## Low Priority Issues

[List low priority findings...]

## Recommendations

1. **Immediate Actions:**
   - Fix SQL injection in auth/login.ts
   - Add authorization to payment processing

2. **Short Term:**
   - Increase test coverage (currently 65%, target 80%)
   - Optimize N+1 queries in user service
   - Add input validation to API endpoints

3. **Long Term:**
   - Refactor auth module for better separation
   - Implement caching strategy
   - Update coding style guide

## Detailed Reviews

### Architecture Review
[Full cr-architecture-reviewer output]

### Security Review
[Full cr-security-reviewer output]

### Test Coverage Review
[Full cr-test-coverage-reviewer output]

### Performance Review
[Full cr-performance-reviewer output]

### Style Review
[Full cr-style-reviewer output]
```

### 6. Save Report

Save report to `docs/reviews/YYYY-MM-DD-<branch-or-pr>.md`

### 7. Create Tasks (Optional)

Ask user: "Would you like me to create tasks for the critical and high priority issues?"

If yes:
```bash
/task create "Fix SQL injection in auth/login.ts" --priority critical
/task create "Add authorization to payment processing" --priority critical
/task create "Increase test coverage to 80%" --priority high
...
```

### 8. PR Comments (Optional)

If --comment flag and --pr flag:
```bash
gh pr review $PR_NUMBER --comment -b "Review findings..."
```

Post inline comments at specific lines for critical/high issues.

## Output Format

**Console output:**
```
🔍 Starting comprehensive code review...

📊 Scope:
  - Files: 12 (src/auth/*.ts, src/payment/*.ts, src/api/*.ts)
  - Lines changed: ~450
  - Branch: feature/payment-flow

🤖 Launching 5 specialized review agents in parallel:
  ✓ cr-architecture-reviewer
  ✓ cr-security-reviewer
  ✓ cr-test-coverage-reviewer
  ✓ cr-performance-reviewer
  ✓ cr-style-reviewer

⏳ Review in progress...

✅ Review complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SUMMARY
  Critical: 2 🚨
  High: 5 ⚠️
  Medium: 12 💡
  Low: 8 📝

🚨 CRITICAL ISSUES

1. SQL Injection in src/auth/login.ts:45
   → Use parameterized queries

2. Missing authorization in src/payment/process.ts:89
   → Add user.canProcessPayments() check

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Full report saved to: docs/reviews/2026-02-05-feature-payment-flow.md

Would you like me to create tasks for the critical and high priority issues?
```

## Error Handling

- **No git repository:** "Not in a git repository. Please run from project root."
- **No changes found:** "No changes to review. Current branch matches main."
- **Agent failures:** Continue with other agents, note failures in report
- **Invalid focus area:** "Invalid focus area: <area>. Valid options: architecture, security, testing, performance, style"

## Configuration

Read from `.claude/code-review.local.md`:

```yaml
---
default_agents: [security, testing]
min_severity: medium
auto_create_tasks: true
exclude_patterns:
  - "**/*.test.ts"
  - "**/migrations/*"
---
```

## Implementation Notes

- Use Task tool for parallel agent execution
- Parse diffs to provide context to agents
- Aggregate findings by severity
- Generate actionable recommendations
- Integrate with task management
- Support PR/commit review modes
