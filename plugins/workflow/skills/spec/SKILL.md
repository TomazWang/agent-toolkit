---
name: spec
description: Manually work on Stage A (Specification) - create or validate specs
argument-hint: <feature-name>
---

# Workflow Spec Command

Manually enter Stage A (Spec + Meta-Validation) workflow.

## Subcommands

### create <feature-name>

Start Stage A spec creation process.

**Process:**
1. Research existing docs/specs/code
2. Create initial spec document
3. Run meta-testing automatically
4. Iterate based on results
5. Ready for finalize

**Output location:**
- If `openspec/` exists: `openspec/changes/[feature]/proposal.md`
- Otherwise: `docs/specs/[feature].md`

### validate

Run meta-tests on current spec (if in Stage A).

**Meta-testing:**
- Auto-generated PoC tests
- Manual validation questions
- Complexity checks
- Feasibility validation

### finalize

Finalize current spec and transition to Stage B.

**Process:**
1. Verify meta-tests passed
2. Create final spec document (design.md)
3. Transition to Stage B for implementation
4. Or prompt: "Ready to implement (Stage B)?"

## Example Usage

```
User: /workflow:spec create "Payment processing"

→ Starting Stage A: Spec Creation

Research phase:
- Reading existing code...
- Checking for related specs...

Creating initial spec:
openspec/changes/payment-processing/proposal.md

[Spec draft created]

Running meta-tests:
✓ Auto PoC: Stripe API connection
✓ Auto PoC: Test payment creation
? Manual: Webhook security?
? Manual: Error handling strategy?

[Iterate based on feedback]

User: /workflow:spec finalize

→ Finalizing spec:
openspec/changes/payment-processing/design.md

✅ Spec finalized
Ready to implement (Stage B)? [Y/n]
```

See block-a-spec-validation skill for full workflow details.
