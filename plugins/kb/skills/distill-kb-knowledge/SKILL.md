---
name: distill-kb-knowledge
description: |
  Transform learned topics into organized domain knowledge. Use when:
  - All topics are marked complete in learning plan
  - Called by auto-learn after learning loop finishes
  - User invokes /kb:distill-kb-knowledge manually

  Final phase of KB workflow - generates the knowledge base output.
---

# KB Distill: Generate Knowledge Base

Transform learning notes into structured, organized domain knowledge.

---

## Prerequisites

Before distilling:
- ✅ Learning plan exists at `kb/wip/learning-plan.md`
- ✅ At least some topics marked ✅ complete
- ✅ Topic notes exist in `kb/wip/`

---

## Distillation Process

### Phase 1: Assess Completion

```bash
# Count completed topics
completed=$(grep -c "✅" kb/wip/learning-plan.md 2>/dev/null || echo 0)
pending=$(grep -c "⏳" kb/wip/learning-plan.md 2>/dev/null || echo 0)

echo "Completed: $completed"
echo "Pending: $pending"
```

If pending topics remain, warn but continue:
```
⚠️  {N} topics still pending. Distilling completed topics only.
```

### Phase 2: Group into Domains

Analyze completed topics and group by logical domain:

```
TOPIC → DOMAIN MAPPING

Authentication Topics:
├── authentication     ─┐
├── oauth-integration  ─┼─→ Domain: auth
└── session-management ─┘

API Topics:
├── api-endpoints      ─┐
├── api-contracts      ─┼─→ Domain: api
└── error-handling     ─┘

Core Topics:
├── project-overview   ─┐
├── architecture       ─┼─→ Domain: core
└── data-models        ─┘

Infrastructure Topics:
├── configuration      ─┐
├── deployment         ─┼─→ Domain: infra
└── monitoring         ─┘
```

### Phase 3: Generate Domain Artifacts

For each domain, create `kb/output/domains/{domain}/`:

#### 3.1 domain.md

```markdown
# {Domain} Domain

> Generated: {timestamp}
> Topics: {list of source topics}

## Overview

{High-level description synthesized from topic notes}

## Architecture

{ASCII diagram showing components and relationships}

```
┌─────────────┐     ┌─────────────┐
│ Component A │────▶│ Component B │
└─────────────┘     └─────────────┘
```

## Key Components

### {Component 1}

- **Location**: `path/to/code`
- **Purpose**: What it does
- **Key files**:
  - `file1.ts` - description
  - `file2.ts` - description

### {Component 2}
...

## How It Works

{Detailed explanation with code references}

### Flow: {Main Flow}

1. Step 1 (`file.ts:45`)
2. Step 2 (`other.ts:120`)
3. Step 3

## Configuration

| Setting | Default | Environment | Notes |
|---------|---------|-------------|-------|
| | | | |

## Known Issues & Discrepancies

### Issue 1: {Title}

- **Docs claim**: X
- **Reality**: Y
- **Evidence**: `file.ts:123`, commit `abc123`
- **Impact**: High/Medium/Low
- **Recommendation**: {action}

## History

| Date | Change | Ticket | Author |
|------|--------|--------|--------|
| | | | |

## Related Domains

- {Other domain 1}
- {Other domain 2}
```

#### 3.2 questions.json

```json
{
  "domain": "{domain}",
  "generated": "{timestamp}",
  "questions": [
    {
      "id": "q1",
      "question": "How does {domain} handle X?",
      "type": "implementation",
      "answer": "Based on code analysis...",
      "evidence": ["file.ts:45", "commit abc123"],
      "confidence": "high"
    },
    {
      "id": "q2",
      "question": "Why was Y designed this way?",
      "type": "rationale",
      "answer": "According to ticket VSTS-123...",
      "evidence": ["VSTS-123", "MR !456"],
      "confidence": "medium"
    }
  ]
}
```

**Question types:**
- `implementation` - How something works
- `rationale` - Why it was built this way
- `configuration` - How to configure
- `troubleshooting` - Common issues and fixes
- `history` - How it evolved

#### 3.3 entities.json

```json
{
  "domain": "{domain}",
  "generated": "{timestamp}",
  "entities": [
    {
      "id": "auth-manager",
      "name": "AuthManager",
      "type": "class",
      "location": "src/auth/AuthManager.ts",
      "description": "Central authentication coordinator",
      "relationships": [
        {"type": "uses", "target": "session-service"},
        {"type": "implements", "target": "IAuthProvider"}
      ]
    }
  ]
}
```

**Entity types:**
- `class`, `interface`, `function`, `module`
- `service`, `controller`, `model`, `util`
- `config`, `constant`, `type`

### Phase 4: Generate Summary

Create `kb/output/summary.md`:

```markdown
# Knowledge Base Summary

> Project: {project name}
> Generated: {timestamp}
> Source: {repo/path}

## Executive Summary

{2-3 paragraph overview of the project based on everything learned}

## Quick Stats

| Metric | Value |
|--------|-------|
| Topics Learned | N |
| Domains Created | N |
| Discrepancies Found | N |
| Questions Generated | N |
| Entities Mapped | N |

## Domain Overview

| Domain | Topics | Key Insight |
|--------|--------|-------------|
| core | 3 | {one-liner} |
| api | 4 | {one-liner} |
| auth | 2 | {one-liner} |

## Architecture Overview

{High-level ASCII diagram of entire system}

## Critical Findings

### Documentation vs Reality

{Top discrepancies that should be addressed}

### Technical Debt

{Patterns or issues discovered}

### Knowledge Gaps

{Areas that need clarification from team}

## Recommended Reading Order

For new developers:
1. `domains/core/domain.md` - Start here
2. `domains/auth/domain.md` - Security context
3. `domains/api/domain.md` - Interface layer
4. ...

## File Index

| File | Description |
|------|-------------|
| summary.md | This file |
| domains/core/domain.md | Core architecture |
| domains/core/questions.json | Core Q&A |
| domains/core/entities.json | Core entities |
| ... | ... |
```

---

## Completion Output

```
═══════════════════════════════════════════════════════════════
🎉 KNOWLEDGE BASE COMPLETE
═══════════════════════════════════════════════════════════════

📊 Statistics
   • Topics distilled: N
   • Domains created: N
   • Questions generated: N
   • Entities mapped: N
   • Discrepancies documented: N

📁 Output Location: kb/output/

   kb/output/
   ├── summary.md              ← Start here
   └── domains/
       ├── core/
       │   ├── domain.md
       │   ├── questions.json
       │   └── entities.json
       ├── api/
       │   └── ...
       └── auth/
           └── ...

🚀 Next Steps
   1. Review kb/output/summary.md
   2. Check discrepancies for action items
   3. Share with team for onboarding
   4. Update as codebase evolves

═══════════════════════════════════════════════════════════════
```
