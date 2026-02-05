---
name: agent-development
description: Developing specialized agents with focused expertise
---

# Agent Development Skill

Guide to creating effective autonomous agents for Claude Code plugins.

## When to Use

Activate when:
- Creating new agents
- User asks about agent structure
- Designing specialized automation
- Questions about agent capabilities

## What Are Agents?

Agents are **autonomous specialized workers** that:
- Perform focused tasks independently
- Have specific domain expertise
- Work in background with limited tools
- Return results when complete

**When to use agents**:
- Focused analysis needed (code review, validation)
- Background processing (report generation)
- Specialized expertise (performance analysis, security audit)
- User wants autonomous work

**When NOT to use agents**:
- User needs interactive control → Use Commands
- Just providing guidance → Use Skills
- Event-driven automation → Use Hooks

## Agent Structure

### File Location

```
plugin-name/
└── agents/
    ├── analyzer.md
    ├── validator.md
    └── reviewer.md
```

### Basic Agent Format

```yaml
---
name: agent-name
description: Clear description of agent's specialized purpose
color: blue|green|orange|cyan|purple
tools: [Read, Grep, Glob]
---

# Agent Name

Detailed description of agent's role and expertise.

## Your Role

[Clear role definition for the agent]

## Process

[Step-by-step workflow the agent follows]

## Analysis

[What the agent analyzes and how]

## Output Format

[Expected output structure]

## Examples

[Concrete examples of agent's work]
```

## YAML Frontmatter

### Required Fields

```yaml
---
name: agent-name         # Must match filename
description: Brief desc  # What agent does
color: blue             # Visual identifier
tools: [Read, Grep]     # Available tools
---
```

### Agent Colors

**Purpose**: Visual identification in UI

**Available colors**:
- `blue` - General purpose, analysis
- `green` - Testing, validation, success-focused
- `orange` - Performance, optimization, warnings
- `cyan` - Style, formatting, documentation
- `purple` - Architecture, design, planning

**Examples**:
```yaml
color: blue      # code-analyzer
color: green     # test-validator
color: orange    # performance-reviewer
color: cyan      # style-checker
color: purple    # architecture-reviewer
```

### Tool Selection

**Read-only agents** (analysis, reporting):
```yaml
tools: [Read, Grep, Glob]
```

**Analysis with execution**:
```yaml
tools: [Read, Grep, Glob, Bash]
```

**Implementation agents** (rare, usually use commands instead):
```yaml
tools: [Read, Grep, Glob, Bash, Edit, Write]
```

**Available tools**:
- `Read` - Read files
- `Grep` - Search content
- `Glob` - Find files by pattern
- `Bash` - Execute commands
- `Edit` - Modify existing files
- `Write` - Create new files
- `Task` - Spawn subagents (advanced)

## Agent Patterns

### Analysis Agent

**Purpose**: Examine code and generate reports

```yaml
---
name: code-analyzer
description: Analyzes code quality and identifies issues
color: blue
tools: [Read, Grep, Glob]
---

# Code Analyzer Agent

Specialized agent for code quality analysis.

## Your Role

Analyze code for:
1. Code quality issues
2. Potential bugs
3. Anti-patterns
4. Improvement opportunities

## Process

1. **Find relevant files**:
   - Use Glob to find source files
   - Filter by language/framework

2. **Analyze each file**:
   - Read file contents
   - Check for common issues
   - Identify patterns

3. **Generate report**:
   - Categorize issues by severity
   - Provide specific locations
   - Suggest fixes

## Analysis

### Code Quality Checks

**Look for**:
- Overly complex functions (>50 lines)
- Deep nesting (>3 levels)
- Duplicate code
- Missing error handling
- Poor naming

### Example Analysis

For each issue found:
```markdown
### Issue: Complex Function
Location: src/utils.ts:45
Severity: Medium

Function `processData` is 120 lines.
Recommendation: Break into smaller functions
```

## Output Format

```markdown
# Code Analysis Report

## Summary
- Files analyzed: 25
- Issues found: 12
- Critical: 2
- Warnings: 10

## Critical Issues

### Issue 1: [Description]
Location: [file:line]
Problem: [What's wrong]
Fix: [How to fix]

## Warnings

[Similar format]

## Recommendations

1. [High-level suggestion]
2. [Another suggestion]
```
```

### Validation Agent

**Purpose**: Verify correctness and completeness

```yaml
---
name: spec-validator
description: Validates API specifications for completeness
color: green
tools: [Read, Grep, Glob, Bash]
---

# Spec Validator Agent

Validates OpenAPI/AsyncAPI specifications.

## Your Role

Ensure API specs are:
1. Syntactically valid
2. Complete and consistent
3. Following best practices
4. Ready for implementation

## Process

1. **Find spec files**:
   - Glob for `*.openapi.{yml,yaml,json}`
   - Glob for `*.asyncapi.{yml,yaml,json}`

2. **Validate syntax**:
   - Use validator tool (Bash)
   - Check YAML/JSON parsing
   - Verify spec version

3. **Check completeness**:
   - All endpoints documented
   - Request/response schemas defined
   - Authentication specified
   - Error responses included

4. **Verify consistency**:
   - Schema references valid
   - No duplicate operations
   - Consistent naming

## Validation Checks

### Syntax
- [ ] Valid YAML/JSON
- [ ] Correct OpenAPI/AsyncAPI version
- [ ] No parsing errors

### Completeness
- [ ] All paths have descriptions
- [ ] All parameters documented
- [ ] All responses defined
- [ ] Schemas have examples

### Best Practices
- [ ] Consistent naming
- [ ] Proper use of references
- [ ] Security schemes defined
- [ ] Version specified

## Output Format

```markdown
# Spec Validation Report

## File: api.openapi.yml

### Status: ⚠️ WARNINGS

### Syntax ✓
- Valid YAML
- OpenAPI 3.0.0
- No parsing errors

### Completeness Issues

#### Missing Response Schemas
- GET /users - 404 response not defined
- POST /users - 400 response missing

#### Missing Descriptions
- Parameter `limit` in GET /users
- Schema `UserResponse`

### Best Practice Violations

#### Inconsistent Naming
- `/users` vs `/user-orders` (use consistent pluralization)

## Recommendations

1. Add error response definitions (400, 404, 500)
2. Document all parameters and schemas
3. Use consistent naming convention
4. Add examples for complex schemas

## Next Steps

Fix the issues above, then run:
/spec:validate --strict
```
```

### Review Agent

**Purpose**: Provide expert feedback

```yaml
---
name: security-reviewer
description: Reviews code for security vulnerabilities
color: orange
tools: [Read, Grep, Glob]
---

# Security Reviewer Agent

Specialized security audit agent.

## Your Role

Identify security vulnerabilities:
1. Injection attacks (SQL, XSS, Command)
2. Authentication/authorization issues
3. Insecure dependencies
4. Data exposure
5. Cryptographic weaknesses

## Process

1. **Scan for vulnerability patterns**:
   - Grep for dangerous functions
   - Check input validation
   - Review authentication logic

2. **Analyze each finding**:
   - Determine severity
   - Assess exploitability
   - Suggest remediation

3. **Generate security report**:
   - Prioritize by risk
   - Provide specific fixes
   - Include references

## Detection Patterns

### SQL Injection
```
Search for:
- String concatenation in SQL queries
- Unparameterized queries
- Direct user input in SQL
```

### XSS
```
Search for:
- Unescaped user input in HTML
- innerHTML with dynamic content
- Unsafe DOM manipulation
```

### Command Injection
```
Search for:
- Shell commands with user input
- Unvalidated file paths
- Process execution with dynamic args
```

## Output Format

```markdown
# Security Review Report

## Summary
- Critical: 2
- High: 5
- Medium: 8
- Low: 3

## Critical Vulnerabilities

### SQL Injection in User Query
**Location**: src/database.ts:45
**Severity**: CRITICAL
**CWE**: CWE-89

**Vulnerable Code**:
```typescript
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.execute(query);
```

**Exploitation**:
Attacker can inject SQL: `1 OR 1=1--`

**Fix**:
```typescript
const query = `SELECT * FROM users WHERE id = ?`;
db.execute(query, [userId]);
```

**References**:
- OWASP SQL Injection: https://owasp.org/...
- CWE-89: https://cwe.mitre.org/...

[Continue for other issues]

## Recommendations

1. Implement parameterized queries everywhere
2. Add input validation middleware
3. Enable SQL injection protection in ORM
4. Security code review before deployment
```
```

### Meta Agent

**Purpose**: Coordinate other agents or complex workflows

```yaml
---
name: meta-validator
description: Orchestrates multi-faceted validation
color: purple
tools: [Read, Grep, Glob, Bash, Task]
---

# Meta Validator Agent

Coordinates comprehensive validation.

## Your Role

Run multiple validation checks:
1. Technical validation (syntax, compilation)
2. Conceptual validation (design review)
3. Integration validation (component interaction)

## Process

1. **Technical Validation**:
   - Generate minimal PoC code
   - Attempt to compile/run
   - Check for basic errors

2. **Conceptual Validation**:
   - Analyze design decisions
   - Check scalability
   - Review architecture

3. **Integration Validation**:
   - Verify component compatibility
   - Check dependency conflicts
   - Test integration points

4. **Generate comprehensive report**:
   - Combine all findings
   - Prioritize issues
   - Recommend next steps

## Coordination

**Can launch subagents**:
```
Launch syntax-checker agent for file X
Launch security-reviewer for auth module
Launch performance-analyzer for query optimization
```

Wait for all agents to complete, then synthesize results.

## Output Format

```markdown
# Meta Validation Report

## Technical Validation ✓
- PoC compiles successfully
- No syntax errors
- Basic functionality works

## Conceptual Validation ⚠️

### Scalability Concern
Current design loads all users into memory.
With 1M+ users, this will cause OOM errors.

**Recommendation**: Implement pagination

### Architecture Question
Using REST for real-time updates.
Consider WebSockets for better performance.

## Integration Validation ✓
- All dependencies compatible
- No version conflicts
- Integration tests pass

## Overall Assessment

**Status**: READY WITH MODIFICATIONS

**Required changes**:
1. Add pagination (CRITICAL)
2. Consider WebSocket migration (OPTIONAL)

**Once fixed**: Ready to implement
```
```

## Agent Best Practices

### Clear Role Definition

**Good**:
```markdown
## Your Role

Analyze test coverage:
1. Identify untested code
2. Measure coverage percentage
3. Suggest missing test cases
4. Prioritize by criticality
```

**Bad**:
```markdown
## Your Role

You're a testing agent. Help with tests.
```

### Specific Process

**Good**:
```markdown
## Process

1. Find test files:
   - Glob: `**/*.test.{js,ts}`
   - Glob: `**/*.spec.{js,ts}`

2. Find source files:
   - Glob: `src/**/*.{js,ts}`

3. For each source file:
   - Check if corresponding test exists
   - Read test and source
   - Identify untested functions

4. Calculate coverage:
   - Total functions: X
   - Tested functions: Y
   - Coverage: Y/X * 100%

5. Generate report
```

**Bad**:
```markdown
## Process

1. Check test coverage
2. Make a report
```

### Structured Output

**Good**:
```markdown
## Output Format

```markdown
# Test Coverage Report

## Summary
- Coverage: 68%
- Files: 25 total, 18 tested
- Functions: 120 total, 82 tested

## Untested Files
- src/utils/helper.ts (0% coverage)
- src/api/legacy.ts (15% coverage)

## Missing Tests by Priority

### Critical
- `processPayment()` - handles money
- `authenticateUser()` - security critical

### High
- `validateInput()` - data integrity
- `sendEmail()` - user-facing feature

## Recommendations
1. Add tests for critical functions
2. Increase coverage to 80% target
```
```

**Bad**:
```markdown
## Output Format

Return a report with the findings.
```

## Advanced Techniques

### Conditional Analysis

```markdown
## Process

1. **Detect project type**:
   - If `package.json` → Node.js
   - If `requirements.txt` → Python
   - If `pom.xml` → Java

2. **Use language-specific checks**:

**For Node.js**:
- Check for `npm audit` vulnerabilities
- Validate package.json scripts
- Check for outdated dependencies

**For Python**:
- Check for `safety` vulnerabilities
- Validate requirements.txt
- Check for deprecated packages

**For Java**:
- Check for known CVEs in dependencies
- Validate pom.xml
- Check for outdated libraries
```

### Progressive Analysis

```markdown
## Process

1. **Quick scan** (surface issues):
   - Run in <30 seconds
   - Find obvious problems
   - Return preliminary results

2. **If issues found**:
   **Deep analysis** (thorough investigation):
   - Detailed examination
   - Root cause analysis
   - Comprehensive recommendations

3. **If no issues in quick scan**:
   Return clean report, skip deep analysis
```

### Multi-Stage Reporting

```markdown
## Process

1. **Initial findings**:
   Report issues as found (streaming)

2. **Analysis phase**:
   Investigate each issue

3. **Final report**:
   Comprehensive summary with prioritization
```

## Tool Usage Patterns

### Read + Grep + Glob Combo

```markdown
1. **Find files**: Glob `src/**/*.ts`
2. **Search patterns**: Grep `"TODO|FIXME|HACK"`
3. **Read context**: Read files with matches
4. **Analyze**: Review surrounding code
```

### Bash for Validation

```markdown
1. **Run linter**:
   ```bash
   npm run lint 2>&1
   ```

2. **Parse output**:
   Extract error messages and locations

3. **Categorize**:
   Group by error type

4. **Report**:
   Include in analysis
```

## Testing Agents

### Test Scenarios

```markdown
Test security-reviewer agent:

1. **Clean code**:
   Input: Secure, parameterized queries
   Expected: Clean report, no issues

2. **SQL injection**:
   Input: String concatenation in SQL
   Expected: Critical vulnerability reported

3. **Mixed issues**:
   Input: Some secure, some vulnerable
   Expected: Identifies only vulnerable code

4. **False positives**:
   Input: Safe dynamic queries (ORM-generated)
   Expected: Doesn't flag as vulnerable
```

## Common Pitfalls

### Too Broad Scope

**Problem**:
```yaml
---
name: code-helper
description: Helps with code
tools: [Read, Grep, Glob, Bash, Edit, Write]
---
```

**Fix**:
```yaml
---
name: performance-analyzer
description: Identifies performance bottlenecks and optimization opportunities
color: orange
tools: [Read, Grep, Glob, Bash]
---
```

### Vague Instructions

**Problem**:
```markdown
## Your Role
Review code and provide feedback.
```

**Fix**:
```markdown
## Your Role

Perform style consistency review:
1. Check naming conventions (camelCase vs snake_case)
2. Verify formatting consistency (indentation, spacing)
3. Review documentation completeness (JSDoc for public APIs)
4. Identify commented-out code
5. Check for TODO cleanup needs
```

### No Output Structure

**Problem**:
```markdown
## Output
Provide a report of findings.
```

**Fix**:
```markdown
## Output Format

```markdown
# Style Review Report

## Naming Issues
- Inconsistent casing: `getUserData()` vs `get_user_name()`
- Vague names: `data` in api.ts:45 (suggest: `userData`)

## Formatting Issues
- Inconsistent indentation: mix of 2 and 4 spaces
- Long lines: utils.ts:120 (145 chars, exceeds 120 limit)

## Documentation Gaps
- Missing JSDoc: `processPayment()`, `calculateTax()`
- Found 12 TODOs: create issues for tracking

## Recommendations
1. Configure Prettier/ESLint
2. Add pre-commit hooks
3. Document public APIs
```
```

## References

- Official agents documentation: https://code.claude.com/docs/en/agents
- Plugin reference: https://code.claude.com/docs/en/plugins-reference
- Official plugin examples: https://github.com/anthropics/claude-code/tree/main/plugins
