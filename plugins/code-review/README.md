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

### `/review`

Initiate a comprehensive code review.

```bash
# Review all changes in current branch
/review

# Review specific files
/review src/auth/*.ts

# Review with focus areas
/review --focus security,performance

# Review PR/commit
/review --pr 123
/review --commit abc123

# Quick review (fewer agents)
/review --quick
```

## Specialized Review Agents

### architecture-reviewer

Analyzes code architecture and design:
- Design patterns usage
- Separation of concerns
- Module dependencies
- Code organization
- Maintainability issues

### security-reviewer

Scans for security vulnerabilities:
- SQL injection risks
- XSS vulnerabilities
- Authentication issues
- Authorization flaws
- Sensitive data exposure
- Dependency vulnerabilities

### test-coverage-reviewer

Evaluates testing:
- Test coverage analysis
- Missing test cases
- Test quality and clarity
- Integration vs unit tests
- Edge case coverage

### performance-reviewer

Identifies performance issues:
- N+1 queries
- Unnecessary loops
- Memory leaks
- Inefficient algorithms
- Caching opportunities
- Bundle size concerns

### style-reviewer

Checks code style:
- Naming conventions
- Code formatting
- Documentation completeness
- Comment quality
- Consistency with project standards

## Skills

### `reviewing-code`

Use this skill when manually reviewing code or providing feedback. Guides systematic code review:
1. Understand context
2. Analyze changes
3. Check for issues
4. Provide constructive feedback
5. Suggest improvements

### `security-analysis`

Use when analyzing code for security vulnerabilities. Systematic security review:
1. Input validation
2. Authentication/authorization
3. Data protection
4. Error handling
5. Dependencies

## Usage

### Full Review

```bash
/review
```

This launches all 5 review agents in parallel. Each agent analyzes the code from their specialty and generates a report.

**Output:**
```
Starting comprehensive code review...

Running 5 specialized review agents in parallel:
  - architecture-reviewer
  - security-reviewer
  - test-coverage-reviewer
  - performance-reviewer
  - style-reviewer

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
/review --focus security,performance
```

Runs only security-reviewer and performance-reviewer agents.

### Quick Review

```bash
/review --quick
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

Add pre-commit hook for automatic review:

```bash
#!/bin/bash
# .git/hooks/pre-commit
claude review --quick --staged
```

### With CI/CD

Add to GitHub Actions:

```yaml
- name: Code Review
  run: claude review --pr ${{ github.event.pull_request.number }}
```

### With Task Management

Reviews automatically create tasks for issues:

```bash
# After review, creates:
/task create "Fix SQL injection in auth/login.ts" --priority critical
/task create "Add tests for payment processing" --priority high
```

## Tips

- Run full review before creating PRs
- Use focused review during development
- Configure project-specific rules in .local.md
- Link review findings to tasks for tracking
- Archive review reports in docs/reviews/

## Example Workflow

```bash
# During development
/review --quick --focus security

# Before committing
/review src/auth/

# Before PR
/review --full

# During PR review
/review --pr 123 --comment
```
