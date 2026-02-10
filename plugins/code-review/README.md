# Code Review Plugin

Comprehensive code review system with parallel specialized agents that analyze different aspects of your code.

## Source Attribution

This plugin is inspired by:
- [Anthropic Claude Code code-review plugin](https://github.com/anthropics/claude-code/tree/main/plugins/code-review) - Parallel agent review pattern
- [Anthropic Claude Code pr-review-toolkit](https://github.com/anthropics/claude-code/tree/main/plugins/pr-review-toolkit) - Specialized review agents
- [Superpowers systematic-debugging](https://github.com/obra/superpowers) - Systematic analysis approach

## Features

- **Parallel Review Agents**: Multiple specialized agents review code simultaneously
- **Architecture Analysis**: Evaluate design patterns, structure, and maintainability
- **Security Scanning**: Identify vulnerabilities and security issues
- **Test Coverage**: Analyze test completeness and quality
- **Performance Review**: Find optimization opportunities
- **Style Consistency**: Check code style and conventions

## Commands

### `/code-review:code-review`

Initiate a comprehensive code review.

```bash
# Review all changes in current branch
/code-review:code-review

# Review specific files
/code-review:code-review src/auth/*.ts

# Review with focus areas
/code-review:code-review --focus security,performance

# Review PR/commit
/code-review:code-review --pr 123
/code-review:code-review --commit abc123

# Quick review (fewer agents)
/code-review:code-review --quick
```

## Specialized Review Agents

### cr-architecture-reviewer

Analyzes code architecture and design:
- Design patterns usage
- Separation of concerns
- Module dependencies
- Code organization
- Maintainability issues

### cr-security-reviewer

Scans for security vulnerabilities:
- SQL injection risks
- XSS vulnerabilities
- Authentication issues
- Authorization flaws
- Sensitive data exposure
- Dependency vulnerabilities

### cr-test-coverage-reviewer

Evaluates testing:
- Test coverage analysis
- Missing test cases
- Test quality and clarity
- Integration vs unit tests
- Edge case coverage

### cr-performance-reviewer

Identifies performance issues:
- N+1 queries
- Unnecessary loops
- Memory leaks
- Inefficient algorithms
- Caching opportunities
- Bundle size concerns

### cr-style-reviewer

Checks code style:
- Naming conventions
- Code formatting
- Documentation completeness
- Comment quality
- Consistency with project standards

## Skills

### `review`

Main user-invocable skill for comprehensive code review:
- Orchestrates parallel specialized agents
- Supports focused reviews (--focus security,performance)
- Generates detailed reports
- Integrates with PR/commit workflows
- Command: `/code-review:code-review [files...] [options]`

### `reviewing-code`

Auto-activating skill that guides systematic code review when providing feedback:
1. Understand context
2. Analyze changes
3. Check for issues
4. Provide constructive feedback
5. Suggest improvements

## Usage

### Full Review

```bash
/code-review:code-review
```

This launches all 5 review agents in parallel. Each agent analyzes the code from their specialty and generates a report.

**Output:**
```
Starting comprehensive code review...

Running 5 specialized review agents in parallel:
  - cr-architecture-reviewer
  - cr-security-reviewer
  - cr-test-coverage-reviewer
  - cr-performance-reviewer
  - cr-style-reviewer

=== Architecture Review ===
[Architecture findings]

=== Security Review ===
[Security findings]

=== Test Coverage Review ===
[Test coverage findings]

=== Performance Review ===
[Performance findings]

=== Style Review ===
[Style findings]

=== Summary ===
- Critical issues: 2
- High priority: 5
- Medium priority: 12
- Low priority: 8

Recommended actions:
1. Fix SQL injection in auth/login.ts:45
2. Add tests for payment processing
3. Optimize database queries in user service
```

### Focused Review

```bash
/code-review:code-review --focus security,performance
```

Runs only cr-security-reviewer and cr-performance-reviewer agents.

### Quick Review

```bash
/code-review:code-review --quick
```

Single agent does a general review instead of parallel specialized reviews. Faster but less thorough.

## Review Checklist

When reviewing code, agents follow this checklist:

**Correctness:**
- [ ] Does the code do what it's supposed to?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?

**Security:**
- [ ] Are inputs validated?
- [ ] Is authentication/authorization correct?
- [ ] Are there injection vulnerabilities?
- [ ] Is sensitive data protected?

**Performance:**
- [ ] Are there obvious inefficiencies?
- [ ] Is caching used appropriately?
- [ ] Are database queries optimized?

**Testing:**
- [ ] Are there tests for new code?
- [ ] Do tests cover edge cases?
- [ ] Are tests clear and maintainable?

**Maintainability:**
- [ ] Is the code readable?
- [ ] Are names clear and consistent?
- [ ] Is the design extensible?
- [ ] Is documentation adequate?

**Style:**
- [ ] Does it follow project conventions?
- [ ] Is formatting consistent?
- [ ] Are comments helpful?

## Configuration

Create `.claude/code-review.local.md` for project-specific settings:

```yaml
---
review_checklist: custom
security_level: high
min_test_coverage: 80
style_guide: airbnb
focus_areas:
  - security
  - performance
exclude_patterns:
  - "**/*.test.ts"
  - "**/migrations/*"
---

# Project Code Review Guidelines

## Security Requirements
- All user inputs must be validated
- Use parameterized queries only
- JWT tokens expire in 1 hour

## Performance Standards
- API responses < 200ms
- Database queries < 50ms
- No N+1 queries

## Testing Requirements
- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical flows
```

## Integration

### With Git Hooks

Pre-commit review workflow:

```bash
# Before committing, run a quick review
/code-review:code-review --quick --staged

# Review shows issues before commit
```

### With CI/CD

Integrate code review into your PR workflow:

```bash
# Review PRs before merging
/code-review:code-review --pr <PR_NUMBER>

# Review generates a report that can be added as a PR comment
```

### With Task Management

If task-management plugin is installed, reviews can create tasks for issues:

```bash
# After review, the skill can create tasks for critical/high priority findings
# Example tasks that would be created:
# - "Fix SQL injection in auth/login.ts" (priority: critical)
# - "Add tests for payment processing" (priority: high)
```

## Tips

- Run full review before creating PRs
- Use focused review during development
- Configure project-specific rules in .local.md
- Link review findings to tasks for tracking
- Archive review reports in docs/code-review:code-reviews/

## Example Workflow

```bash
# During development
/code-review:code-review --quick --focus security

# Before committing
/code-review:code-review src/auth/

# Before PR
/code-review:code-review --full

# During PR review
/code-review:code-review --pr 123 --comment
```
