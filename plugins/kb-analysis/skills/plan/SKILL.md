---
name: plan
description: |
  Create or update learning plan manually. Use when:
  - User wants to customize topic order
  - Need to add/remove topics from plan
  - Reviewing what will be learned

  Note: In autonomous mode (/kb:start), planning happens automatically.
---

# KB Plan: Learning Plan Management

Create or update the learning plan for knowledge base analysis.

**Note**: `/kb:start` creates the plan automatically. Use this skill for manual control.

---

## When to Use

- **Customizing topics** - Add domain-specific topics
- **Reordering priorities** - Change what gets learned first
- **Reviewing plan** - See what will be learned
- **Mid-process updates** - Add newly discovered topics

---

## Learning Plan Structure

Location: `kb/wip/learning-plan.md`

```markdown
# Learning Plan

> Created: {timestamp}
> Project: {project name}
> Mode: AUTONOMOUS / MANUAL

## Source Summary

| Type | Count | Notes |
|------|-------|-------|
| Repos | N | list |
| Docs | N | list |
| Cloud | N | list |

## Topics Queue

Status Legend:
- ⏳ Pending
- 🔄 In Progress
- ✅ Complete
- ⏭️ Skipped

### Critical (Learn First)
1. ⏳ project-overview - Entry points, purpose, structure
2. ⏳ architecture - System design, component relationships
3. ⏳ data-models - Core entities, schemas, relationships

### High Priority
4. ⏳ authentication - Auth flows, security mechanisms
5. ⏳ api-layer - Endpoints, contracts, validation
6. ⏳ core-services - Business logic, main features

### Medium Priority
7. ⏳ configuration - Settings, environment, feature flags
8. ⏳ error-handling - Error patterns, logging, monitoring
9. ⏳ external-integrations - Third-party services, APIs

### Lower Priority
10. ⏳ utilities - Helper functions, shared code
11. ⏳ testing - Test patterns, coverage, fixtures
12. ⏳ deployment - CI/CD, infrastructure, scripts

## Progress

- **Total Topics**: 12
- **Completed**: 0
- **In Progress**: -
- **Remaining**: 12

## Notes

(Add observations, dependencies, or special instructions)
```

---

## Creating a Plan

### Step 1: Analyze Sources

```bash
# What do we have?
ls -la kb/sources/repos/
ls -la kb/sources/docs/
ls -la kb/sources/cloud/
```

### Step 2: Identify Topics

From directory structure:
```
src/
├── auth/       → Topic: authentication
├── api/        → Topic: api-layer
├── services/   → Topic: core-services
├── models/     → Topic: data-models
└── utils/      → Topic: utilities
```

From documentation:
- README mentions "microservices" → Topic: architecture
- API docs exist → Topic: api-layer
- Deployment docs → Topic: deployment

From code patterns:
- Found OAuth code → Add to authentication
- Found Redis usage → Topic: caching
- Found queue processing → Topic: async-processing

### Step 3: Prioritize

**Critical** (learn first):
- Foundation topics others depend on
- Core architecture
- Main entry points

**High priority**:
- Security-related
- API contracts
- Core business logic

**Medium priority**:
- Configuration
- Error handling
- Integrations

**Lower priority**:
- Utilities
- Testing details
- Deployment specifics

### Step 4: Write Plan

Create `kb/wip/learning-plan.md` with the structure above.

---

## Modifying the Plan

### Add a Topic

Insert in appropriate priority section:
```markdown
### High Priority
4. ⏳ authentication
5. ⏳ NEW-TOPIC - reason for adding    ← Add here
6. ⏳ api-layer
```

Update total count in Progress section.

### Skip a Topic

Change status:
```markdown
7. ⏭️ configuration - Skipped: not relevant to current scope
```

### Reorder Topics

Move lines to change order. Topics are learned in listed order.

---

## Output

After creating/updating plan:

```
═══════════════════════════════════════════════════════════════
📋 LEARNING PLAN READY
═══════════════════════════════════════════════════════════════
📁 Location: kb/wip/learning-plan.md

📊 Topics: 12 total
   • Critical: 3
   • High: 3
   • Medium: 3
   • Lower: 3

🎯 First topic: project-overview

To start learning:
   /kb:start              ← Autonomous (recommended)
   /kb:learn <topic>      ← Manual, one at a time
═══════════════════════════════════════════════════════════════
```
