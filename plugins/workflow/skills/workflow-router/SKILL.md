---
name: workflow-router
description: Detects complexity and routes requirements to Block A/B/C
---

# Workflow Router Skill

Auto-activates when user starts work. Analyzes complexity and routes to appropriate workflow block.

## When to Use

Activates when:
- User invokes `/workflow:start`
- User begins describing complex work without specific command
- Keywords detected: "implement", "build", "add", "fix", "create"

## Routing Logic

### Block A: Spec + Meta-Validation

**Route here if:**
- NEW complex system/architecture
- Keywords: "new project", "architecture", "design", "system", "platform"
- No existing spec + >15 steps estimated
- Security/compliance critical
- Multiple subsystems

### Block B: Spec Change + TDD

**Route here if:**
- Existing spec can be extended
- Keywords: "implement", "add feature", "refactor", "integrate"
- 8-15 steps estimated
- Moderate design complexity

### Block C: Simple Planning

**Route here if:**
- Small scope changes
- Keywords: "fix", "update", "quick", "simple"
- <8 steps estimated
- Single component/file

## When Unclear

If can't decide confidently, ASK with recommendation:

```
Recommendation: Block B

Reasoning: [why]

Options:
1. Block B (Recommended)
2. Block A
3. Block C

Which? [1/2/3]
```

## Integration Check

Before routing, check available plugins and inform user of integrations.
