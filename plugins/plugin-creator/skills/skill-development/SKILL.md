---
name: skill-development
description: How to create effective skills with proper triggering conditions and structure
---

# Skill Development Skill

Guide to creating powerful, reusable skills for Claude Code.

## When to Use

Activate when:
- Creating new skills
- Improving existing skills
- Skill not triggering properly
- Unclear skill structure

## What Are Skills?

Skills are **reusable knowledge modules** that:
- Teach concepts and methodologies
- Enforce workflows and best practices
- Provide context-sensitive guidance
- Act as "muscle memory" for Claude

**Not just documentation** - Skills are active guidance that Claude follows.

## Skill Structure

### Directory Layout

**CRITICAL**: Skills are FOLDERS, not flat files:
```
skills/
└── my-skill/              # Folder named after skill
    └── SKILL.md           # Must be named SKILL.md
```

**Common mistake**:
```
skills/
└── my-skill.md            # ❌ WRONG - flat file won't work
```

### SKILL.md Format

```yaml
---
name: skill-name
description: Clear, concise description of what skill does
---

# Skill Title

## When to Use

Activate when:
- [Specific triggering condition 1]
- [Specific triggering condition 2]
- User mentions "[keyword]"
- [Context-specific scenario]

## [Main Content Sections]

[Progressive disclosure structure]

## Examples

[Concrete, actionable examples]
```

## Designing Effective Skills

### 1. Clear Triggering Conditions

**Purpose**: Tell Claude WHEN to use this skill

**Good triggering conditions**:
```markdown
## When to Use

Activate when:
- User wants to implement API endpoint
- User mentions "REST", "GraphQL", or "API"
- OpenAPI/AsyncAPI files detected in project
- Before implementing any API code
```

**Bad triggering conditions**:
```markdown
## When to Use

Use this skill for API development.  # ❌ Too vague
```

**Patterns**:
- User intent: "User wants to..."
- Keywords: "User mentions 'X', 'Y', or 'Z'"
- File detection: "package.json detected"
- Workflow stage: "Before writing tests"
- Context: "When debugging performance issues"

### 2. Progressive Disclosure

**Start simple, add detail progressively**:

```markdown
# Quick Start (TL;DR)
[30 second overview]

# The Process
[High-level steps]

# Step 1: [First Step]
[Detailed guidance]

# Step 2: [Second Step]
[Detailed guidance]

# Advanced Topics
[Deep dives, edge cases]

# Reference
[Links, tables, technical details]
```

**Why**: User reads what they need, when they need it.

### 3. Concrete Examples

**Show, don't just tell**:

```markdown
## Example: Creating REST API Spec

**BAD** (vague):
```yaml
paths:
  /users:
    get:
      # Define your endpoint here
```

**GOOD** (concrete):
```yaml
paths:
  /users:
    get:
      summary: List all users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
```
```

### 4. Actionable Guidance

**Tell Claude what to DO, not just what to know**:

**Good** (actionable):
```markdown
## Process

1. Search for all test files:
   - Use Glob: `**/*.test.{js,ts}`
   - Read each test file

2. Analyze test coverage:
   - Count tested functions vs total functions
   - Identify untested code paths

3. Generate report:
   - List missing tests
   - Prioritize by criticality
   - Suggest test cases
```

**Bad** (informational):
```markdown
## Process

Test coverage is important. You should check that your code
has adequate test coverage and identify gaps.
```

### 5. Enforcement vs Guidance

**Enforcement Skills** (Rigid):
```markdown
## TDD Workflow

**MUST follow this order**:

1. RED: Write failing test FIRST
2. GREEN: Write minimum code to pass
3. REFACTOR: Improve code

**If user tries to write code before tests:**
```
⛔ TDD Violation

You must write the test FIRST.

Run: /tdd:start "feature description"
```
```

**Guidance Skills** (Flexible):
```markdown
## Brainstorming Workflow

**Suggested approach**:

1. Understand the problem
2. Generate ideas
3. Evaluate options
4. Refine solution

**Adapt this process** to your needs.
```

## Skill Types

### Workflow Skills

**Purpose**: Multi-step processes

**Example**: `spec-driven-development`
```markdown
## Process

### 1. Spec First
- Define API contract in OpenAPI/AsyncAPI
- Document all endpoints
- Specify schemas

### 2. Validate Spec
- Run spec linter
- Check completeness

### 3. Generate from Spec
- Server stubs
- Client SDK
- Tests

### 4. Implement
- Fill in business logic
- Keep implementation matching spec
```

### Methodology Skills

**Purpose**: Enforce best practices

**Example**: `test-driven-development`
```markdown
## RED-GREEN-REFACTOR Cycle

### RED Phase
**Write failing test FIRST**
- No implementation yet
- Test should fail

### GREEN Phase
**Minimum code to pass**
- No premature optimization
- Just make it work

### REFACTOR Phase
**Improve while tests pass**
- Clean up code
- Tests stay green
```

### Routing Skills

**Purpose**: Decision-making and delegation

**Example**: `workflow-router`
```markdown
## Complexity Detection

### Simple (Block C)
- <8 steps
- Single file changes
- Bug fixes
→ Route to: Simple Planning

### Medium (Block B)
- 8-15 steps
- Existing spec
- Feature implementation
→ Route to: Spec + TDD

### Complex (Block A)
- >15 steps
- New architecture
- Security critical
→ Route to: Spec + Meta-Validation
```

### Domain Knowledge Skills

**Purpose**: Specialized expertise

**Example**: `frontend-design-system`
```markdown
## Component Patterns

### Atomic Design
- Atoms: Button, Input, Label
- Molecules: FormField, SearchBar
- Organisms: Header, ProductCard
- Templates: PageLayout
- Pages: HomePage, ProductPage

### Implementation
[Detailed guidance for each level]
```

## Advanced Techniques

### Multi-Mode Skills

**Support different user contexts**:

```markdown
## Modes

### Mode 1: Quick Start
For users who want to get started fast.
[Minimal steps]

### Mode 2: Comprehensive
For users who want full control.
[Detailed workflow]

### Mode 3: Expert
For advanced users.
[Advanced options]

**Auto-detect mode** based on user request:
- "quickly add X" → Quick Start
- "properly implement X" → Comprehensive
- "optimize X" → Expert
```

### Conditional Workflows

**Adapt based on context**:

```markdown
## Process

### 1. Detect Project Type

**If package.json exists:**
→ Node.js project
→ Use npm/yarn commands
→ Check for test framework

**If requirements.txt exists:**
→ Python project
→ Use pip commands
→ Check for pytest/unittest

**If pom.xml exists:**
→ Java project
→ Use maven commands
→ Check for JUnit

### 2. Adapt Workflow
[Language-specific guidance]
```

### Integration Patterns

**Work with other plugins**:

```markdown
## Integration

### With task-management
**If task-management plugin available:**
```
/task:create "Implement feature X"
```
Track progress with task statuses.

**If not available:**
Use inline checklist:
- [ ] Step 1
- [ ] Step 2

### With workflow plugin
**If in workflow session:**
Follow workflow blocks (A/B/C).

**If standalone:**
Use independent process.
```

## Testing Skills

### Manual Testing

1. **Create test scenario**:
   ```markdown
   User says: "I want to implement a REST API for users"
   Expected: Skill should trigger and guide spec-first development
   ```

2. **Test triggering**:
   - Does skill activate when it should?
   - Does it stay dormant when it shouldn't?

3. **Test guidance**:
   - Is the process clear?
   - Can Claude follow it successfully?
   - Does it handle edge cases?

4. **Test examples**:
   - Are examples concrete enough?
   - Do they work as shown?

### Refinement Cycle

1. **Write initial skill**
2. **Test with real scenarios**
3. **Identify confusion points**
4. **Add examples/clarification**
5. **Retest**
6. **Repeat**

## Common Pitfalls

### Too Vague

**Problem**:
```markdown
## When to Use
Use this for API development.
```

**Fix**:
```markdown
## When to Use

Activate when:
- User says "create API" or "add endpoint"
- User mentions "REST", "GraphQL", "OpenAPI"
- Before implementing any API code
- OpenAPI files detected in project
```

### Too Much Information Upfront

**Problem**:
```markdown
# API Development

[3000 words of theory and edge cases]

## Getting Started
[Finally, the process]
```

**Fix**:
```markdown
# API Development

## Quick Start
1. Define spec
2. Validate spec
3. Implement

[Detailed sections below]

## 1. Define Spec
[Details]
```

### Missing Examples

**Problem**:
```markdown
## Process
1. Create the specification
2. Validate it
3. Generate code
```

**Fix**:
```markdown
## Process

### 1. Create Specification

**Example - User API**:
```yaml
openapi: 3.0.0
info:
  title: User API
paths:
  /users:
    get:
      summary: List users
      responses:
        '200':
          description: Success
```

[Continue with concrete examples]
```

### Informational Not Actionable

**Problem**:
```markdown
Testing is important for code quality. Good tests catch bugs early.
```

**Fix**:
```markdown
## Writing Tests

1. **Identify what to test**:
   - Use Glob to find source files: `src/**/*.{js,ts}`
   - List all public functions

2. **For each function**:
   - Write test for happy path
   - Write test for error cases
   - Write test for edge cases

3. **Run tests**:
   ```bash
   npm test
   ```
```

## Skill Templates

### Basic Skill Template

```markdown
---
name: skill-name
description: Clear description in one sentence
---

# Skill Name

Expanded description of what this skill does and why it's useful.

## When to Use

Activate when:
- [Specific condition 1]
- [Specific condition 2]
- User mentions "[keyword]"

## Quick Start

[30-second overview]

## Process

### Step 1: [First Step]
[What to do]

**Example**:
[Concrete example]

### Step 2: [Second Step]
[What to do]

**Example**:
[Concrete example]

## Advanced

[Deep dive topics]

## Troubleshooting

**Problem**: [Common issue]
**Solution**: [How to fix]

## References

- [Relevant links]
```

### Workflow Enforcement Template

```markdown
---
name: workflow-name
description: Enforces [methodology] workflow
---

# [Methodology] Workflow

## When to Use

Activate when:
- User wants to implement [feature type]
- Before writing [code type]
- [Methodology] detected in project

## Required Process

**MUST follow this order**:

### Phase 1: [First Phase]
**Requirements**:
- [Requirement 1]
- [Requirement 2]

**Example**:
[Show what this looks like]

**If user skips this**:
```
⛔ [Methodology] Violation
[Explanation why this is required]
[How to fix]
```

### Phase 2: [Second Phase]
[Continue pattern]

## Enforcement

**Block these actions**:
- Writing implementation before [phase 1]
- Skipping [required step]

**Allow these actions**:
- [Safe actions during workflow]
```

## References

- Official skills documentation: https://code.claude.com/docs/en/skills
- Superpowers skills: https://github.com/obra/superpowers
- Official plugin examples: https://github.com/anthropics/claude-code/tree/main/plugins
