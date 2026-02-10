---
name: stage-spec
description: Stage A (Specification) - Complete validated workflow with SDD and PoC validation
user-invocable: false
---

# Stage A: Specification

Complete specification workflow for complex projects with full validation.

## When to Use

- New projects or major features
- Security-critical functionality
- Architectural decisions needed
- Unknown requirements
- High risk or complexity
- More than 15 implementation steps

## Workflow Overview

**SDD → BDD → TDD with Validation**
1. Spec creation (OpenSpec if available)
2. PoC validation tests
3. BDD scenarios
4. TDD implementation
5. Task tracking integration

## Process

### 1. Research Phase
- Read existing specs, docs, architecture
- Understand current system
- Identify constraints

### 2. Create Initial Spec

**OpenSpec format** (if `openspec/` exists):
```
openspec/changes/[feature]/proposal.md
```

**Standard format** (otherwise):
```
docs/specs/[feature].md
```

**Spec structure:**
- Problem statement
- Proposed solution
- Alternatives considered
- Technical design
- Success criteria
- Risks and mitigations

### 3. Meta-Testing

**Purpose:** Validate spec is workable BEFORE implementation.

**Two approaches (both used case-by-case):**

#### A) Auto-Generated PoC Tests
Generate minimal code to test concepts:
```
Example: OAuth2 spec
→ Generate test: "Can we connect to OAuth provider?"
→ Create minimal client code
→ Run connection test
→ Result: ✅ PASS or ❌ FAIL → Iterate spec
```

#### B) Manual Validation Questions
Ask critical questions:
- "Does this scale to N users?"
- "Is complexity justified?"
- "Are there simpler alternatives?"
- "What could go wrong?"

**Complexity Check:**
If design seems over-complex, simplify before finalizing.

### 4. Iterate Based on Results

If PoC fails or questions reveal issues:
- Revise spec
- Re-run meta-tests
- Repeat until validated

### 5. Finalize Spec

Create final design document, then transition to Stage B for implementation.

## Integration

After finalization, automatically suggest:
```
✅ Spec finalized!

Next: Implement with Stage B?
This will:
- Create spec change for Phase 1
- Generate test cases
- Launch TDD workflow

Proceed? [Y/n]
```
