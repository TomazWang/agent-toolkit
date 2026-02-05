---
name: meta-testing
description: Validates specs are workable through PoC tests and validation questions
---

# Meta-Testing Skill

Validates specifications before full implementation (Block A).

## Purpose

Catch bad specs BEFORE writing production code:
- Is this spec actually implementable?
- Does it fulfill the requirements?
- Is the design unnecessarily complex?
- Will this work at scale?

## Two Approaches (Both Used)

### 1. Auto-Generated PoC Tests

**Generate minimal proof-of-concept code:**

```
Spec: Use Stripe for payments

PoC Test:
→ Generate: Minimal Stripe client
→ Test: Can we connect to API?
→ Test: Can we create test charge?
→ Run and verify

Results:
✅ Connection works
✅ Test charge succeeds
→ Spec is viable
```

**When to use:**
- Technical integration questions
- "Can we connect to X?"
- "Does this API do what we need?"
- "Will this pattern work?"

### 2. Manual Validation Questions

**Ask critical questions user must answer:**

```
Spec: Multi-tenant with database-per-tenant

Questions:
? Does this scale to 1000 tenants?
  → User answer → Might not (connection limits)
  → Recommendation: Use shared schema instead

? Is this complexity justified?
  → User answer → Maybe not for MVP
  → Recommendation: Start simpler

Updated spec based on answers
```

**When to use:**
- Scalability questions
- Complexity tradeoffs
- Business decisions
- "What if" scenarios

## Case-by-Case Decision

**System decides which approach:**

```
Technical validation → Auto PoC
Business/scale validation → Manual Questions
Both often needed → Use both
```

## PoC Test Generation

**Template:**
```python
# PoC Test: [What we're validating]
# Generated: [timestamp]
# Spec: [spec-reference]

[Minimal test code]

# Expected: [what should happen]
# Actual: [what happened]
# Result: PASS/FAIL
```

**Run and report:**
```
Meta-Test Results:
✅ PoC-1: API connection (PASS)
✅ PoC-2: Basic operation (PASS)
⚠️ PoC-3: Load test (SLOW - 500ms, expected <100ms)

Recommendations:
- Consider caching for PoC-3
- Otherwise spec validated
```

## Complexity Check

**Red flags for over-complexity:**
- >10 components for simple feature
- >5 integration points
- Custom solution when standard exists
- "Microservices" for small app

**Suggest simplification:**
```
⚠️ Complexity Alert

Spec proposes: 8 microservices for email notifications

Recommendation: Start with single service
- Can always split later
- Easier to debug
- Faster to implement

Simplify spec? [Y/n]
```

## Iteration Loop

```
1. Create spec
2. Run meta-tests (auto + manual)
3. Identify issues
4. Update spec
5. Re-test
6. Repeat until validated
7. Finalize
```

## Success Criteria

Spec is ready when:
- ✅ All PoC tests pass
- ✅ Critical questions answered
- ✅ Complexity justified
- ✅ No obvious blockers
- ✅ Requirements fulfilled

Then move to Block B for implementation.
