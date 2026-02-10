---
name: openspec-integration
description: Integration with OpenSpec for fluid, iterative API specification
user-invocable: false
---

# OpenSpec Integration Skill

## When to Use

This skill auto-activates when:
- `openspec/` directory detected in project
- User is working on API specifications
- SDD workflow needs spec format
- Part of the unified workflow

## Overview

OpenSpec is a fluid, iterative approach to API specification that emphasizes:
- **Fluid not rigid**: Specs evolve with understanding
- **Iterative not waterfall**: Continuous refinement
- **Easy not complex**: Simple, readable format

## OpenSpec Philosophy

From [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec):

> "Traditional spec-first development often fails because:
> - Specs become outdated immediately
> - They're too rigid for changing requirements
> - They're hard to maintain
>
> OpenSpec solves this by making specs:
> - Living documents that evolve
> - Easy to update iteratively
> - Tightly integrated with code"

## Directory Structure

Detect and use OpenSpec structure:

```
openspec/
├── spec/                  # API specifications
│   ├── api.yaml          # Main OpenAPI spec
│   ├── endpoints/        # Endpoint details
│   └── schemas/          # Schema definitions
├── plan/                  # Planning documents (optional)
│   ├── architecture.md
│   └── decisions.md
└── examples/              # Example requests/responses
    ├── requests/
    └── responses/
```

## Integration with Workflow

### 1. Auto-Detection

```bash
# Check if OpenSpec exists
if [ -d "openspec/" ]; then
  USE_OPENSPEC=true
  SPEC_DIR="openspec/spec/"
else
  SPEC_DIR="docs/api/" or "api/"
fi
```

### 2. Spec Creation (SDD Phase)

**When creating specs:**

```yaml
# openspec/spec/api.yaml
openapi: 3.1.0
info:
  title: User Authentication API
  version: 0.1.0
  description: |
    Initial spec - will evolve as we learn more.

    Status: DRAFT
    Last updated: 2026-02-09

paths:
  /auth/login:
    post:
      summary: User login
      description: |
        Authenticate user with email/password.

        TODO: Decide on token format (JWT vs session)
        TODO: Rate limiting strategy
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
        '401':
          description: Invalid credentials

# Version: 0.1.0 - Initial draft
# Version: 0.2.0 - Added rate limiting (pending)
# Version: 1.0.0 - Production ready (target)
```

**Iterative evolution:**
```markdown
## Spec Evolution Log

### v0.1.0 (2026-02-09)
- Initial draft based on requirements
- Open questions: token format, rate limiting

### v0.2.0 (2026-02-10)
- Decided: JWT tokens (30min access + 7day refresh)
- Added: Rate limiting (5 attempts per 15min)
- Refined: Error response format

### v0.3.0 (2026-02-11)
- Added: OAuth2 support
- Changed: Session management approach
```

### 3. Workflow Integration

**Spec-first workflow:**

```bash
# 1. Start with OpenSpec
/workflow:start-development-workflow "Add payment processing API"

# Auto-detects openspec/ directory

# 2. Create initial spec (fluid)
→ Creates openspec/spec/payment.yaml
→ Version 0.1.0 - DRAFT
→ Includes TODOs and open questions

# 3. BDD scenarios from spec
→ Generates features/payment.feature
→ Based on spec endpoints and schemas

# 4. Implement iteratively
→ For each endpoint:
  - TDD implementation
  - Update spec as we learn
  - Mark sections STABLE when complete

# 5. Spec evolves
→ v0.1.0 DRAFT → v0.5.0 WORKING → v1.0.0 STABLE
```

### 4. Fluid Spec Updates

**As implementation reveals new insights:**

```yaml
# BEFORE (v0.1.0 - assumptions)
/payments:
  post:
    summary: Process payment
    # TODO: What payment methods?
    # TODO: How to handle failures?

# AFTER (v0.3.0 - learned from implementation)
/payments:
  post:
    summary: Process payment
    description: |
      Supports: credit card, PayPal, Apple Pay

      LEARNED: Need idempotency keys for retry safety
      LEARNED: Webhook callbacks for async processing

    parameters:
      - name: Idempotency-Key
        in: header
        required: true
        description: Unique key for safe retries
```

## OpenSpec vs Traditional Spec

**Traditional (rigid):**
```
1. Write complete spec upfront
2. Spec is "frozen"
3. Implementation must match spec exactly
4. Changes require formal approval
5. Spec becomes outdated quickly
```

**OpenSpec (fluid):**
```
1. Start with minimal spec (DRAFT)
2. Implement and learn
3. Update spec as understanding grows
4. Mark stable sections
5. Spec stays current with code
```

## Status Markers

Use status markers in specs:

```yaml
paths:
  /users:
    get:
      # STATUS: STABLE - Don't change without discussion
      summary: List users

  /users/{id}:
    put:
      # STATUS: WORKING - Still refining
      summary: Update user

  /admin/reports:
    get:
      # STATUS: DRAFT - Open questions
      # TODO: What metrics?
      # TODO: Date range format?
      summary: Generate reports
```

## Integration Points

**With SDD Workflow:**
- Auto-detect `openspec/` directory
- Use OpenSpec format for all API specs
- Follow iterative refinement process

**With BDD Workflow:**
- Generate BDD scenarios from OpenSpec endpoints
- Keep scenarios in sync with spec versions

**With TDD Workflow:**
- Implement against current spec version
- Update spec when tests reveal new requirements

**With Task Management:**
- Create tasks for DRAFT sections
- Track spec evolution through task updates

## Commands

**Create OpenSpec spec:**
```bash
/workflow:create-workflow-spec "User API"
→ Detects openspec/ directory
→ Creates openspec/spec/user-api.yaml
→ Version 0.1.0 DRAFT
→ Includes standard sections + TODOs
```

**Update spec iteratively:**
```bash
/workflow:create-workflow-spec-update
→ Opens current spec
→ Marks changes with version bump
→ Logs evolution in spec comments
```

**Validate spec:**
```bash
/workflow:create-workflow-spec-validate
→ OpenAPI validation
→ Check status markers
→ Identify DRAFT sections needing attention
```

## Example: Iterative Spec Evolution

**Day 1: Initial spec**
```yaml
# v0.1.0 - DRAFT
paths:
  /auth/login:
    post:
      summary: Login endpoint
      # TODO: Decide on auth mechanism
```

**Day 2: After BDD scenarios**
```yaml
# v0.2.0 - WORKING
paths:
  /auth/login:
    post:
      summary: User login with email/password
      description: Returns JWT access token
      # Decided: JWT tokens
      # TODO: Refresh token strategy?
```

**Day 3: After TDD implementation**
```yaml
# v0.3.0 - WORKING
paths:
  /auth/login:
    post:
      summary: User login with email/password
      description: |
        Returns JWT access token (30min) + refresh token (7 days)

        LEARNED: Need to handle concurrent logins
        LEARNED: Should return user profile in response
      # TODO: Add rate limiting details
```

**Day 5: After testing**
```yaml
# v1.0.0 - STABLE
paths:
  /auth/login:
    post:
      summary: User login with email/password
      description: |
        Authenticates user and returns JWT tokens.
        Rate limited to 5 attempts per 15 minutes.
      # STABLE: Don't change without team discussion
```

## Best Practices

**DO:**
- Start with minimal DRAFT specs
- Update specs as you learn
- Use status markers (DRAFT/WORKING/STABLE)
- Log evolution in spec comments
- Keep spec close to code

**DON'T:**
- Try to design everything upfront
- Freeze specs too early
- Let specs drift from implementation
- Skip status markers
- Forget to version bump

## Output

**OpenSpec files:**
```
openspec/spec/<feature>.yaml     - Main spec file
openspec/plan/<feature>.md       - Planning notes (optional)
openspec/examples/               - Request/response examples
```

**Spec includes:**
- Version number and status
- Evolution log
- Open questions (TODO)
- Learned insights
- Status markers per endpoint
