---
name: spec
description: Manually create or validate specs (Block A workflow)
usage: |
  /workflow:spec create <feature-name>
  /workflow:spec validate
  /workflow:spec finalize
examples:
  - /workflow:spec create "Multi-tenant architecture"
  - /workflow:spec validate
  - /workflow:spec finalize
---

# Workflow Spec Command

Manually enter Block A (Spec + Meta-Validation) workflow.

## Subcommands

### create <feature-name>

Start Block A spec creation process.

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

Run meta-tests on current spec (if in Block A).

**Meta-testing:**
- Auto-generated PoC tests
- Manual validation questions
- Complexity checks
- Feasibility validation

### finalize

Finalize current spec and transition to Block B.

**Process:**
1. Verify meta-tests passed
2. Create final spec document (design.md)
3. Transition to Block B for implementation
4. Or prompt: "Ready to implement (Block B)?"

## Example Usage

```
User: /workflow:spec create "Payment processing"

→ Starting Block A: Spec Creation

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
Ready to implement (Block B)? [Y/n]
```

See block-a-spec-validation skill for full workflow details.
