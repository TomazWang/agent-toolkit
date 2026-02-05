---
name: block-a-spec-validation
description: Block A workflow - Create spec with meta-validation for complex work
---

# Block A: Spec + Meta-Validation Skill

Guides creation and validation of specs for complex projects/features.

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

Create final design document, then transition to Block B for implementation.

## Integration

After finalization, automatically suggest:
```
✅ Spec finalized!

Next: Implement with Block B?
This will:
- Create spec change for Phase 1
- Generate test cases
- Launch TDD workflow

Proceed? [Y/n]
```
