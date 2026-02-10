---
name: start-knowledge-base
description: |
  AUTONOMOUS KNOWLEDGE BASE BUILDER - Use when user wants to:
  - "Learn this codebase", "Analyze this project", "Build knowledge base"
  - "Understand this repo", "Document what this code does"
  - Invokes /kb:start-knowledge-base

  This skill orchestrates the ENTIRE learning process autonomously.
  Trigger once → AI learns everything → Outputs complete knowledge base.
---

# Autonomous Knowledge Base Builder

**MISSION**: Trigger once, learn the ENTIRE codebase autonomously.

You are an autonomous learning agent. Once triggered, you will:
1. Set up the knowledge base structure
2. Analyze sources to identify ALL topics
3. Learn each topic systematically (one at a time)
4. Continue until COMPLETE
5. Distill into organized domain knowledge

**CRITICAL**: Do NOT stop until all topics are learned. Do NOT ask for permission between topics. Keep going autonomously.

---

## Phase 1: INITIALIZE

### 1.1 Create KB Structure

```bash
mkdir -p kb/{sources/{repos,docs,raw,cloud},wip,output/domains}
```

### 1.2 Check for Config

```bash
if [ ! -f kb/.kb-config ]; then
  cat > kb/.kb-config.example << 'EOF'
# Optional: GitLab access
GITLAB_URL=https://gitlab.yourcompany.com
GITLAB_TOKEN=

# Optional: Azure DevOps / VSTS
VSTS_ORG=https://dev.azure.com/yourorg
VSTS_PROJECT=
VSTS_PAT=

# Optional: Google Cloud (for Docs/Slides)
GOOGLE_APPLICATION_CREDENTIALS=
EOF
  echo "Created kb/.kb-config.example - configure if needed"
fi
```

### 1.3 Inventory Sources

Scan for available sources:

```bash
# Current directory is the project to learn
echo "=== PROJECT ANALYSIS ===" > kb/wip/source-inventory.md

# Get project structure
echo "## Project Structure" >> kb/wip/source-inventory.md
find . -type f -name "*.md" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" | head -50 >> kb/wip/source-inventory.md

# Get tech stack indicators
echo "## Tech Stack Indicators" >> kb/wip/source-inventory.md
ls -la package.json Cargo.toml go.mod pyproject.toml requirements.txt pom.xml build.gradle 2>/dev/null >> kb/wip/source-inventory.md
```

---

## Phase 2: ANALYZE & PLAN

### 2.1 Deep Codebase Analysis

Analyze the codebase to identify learning topics:

**From Directory Structure:**
```
src/
├── auth/           → Topic: Authentication
├── api/            → Topic: API Layer
├── services/       → Topic: Core Services
├── models/         → Topic: Data Models
├── utils/          → Topic: Utilities
└── config/         → Topic: Configuration
```

**From Key Files:**
- README.md → Project overview
- Architecture docs → System design
- API specs → Contracts
- Config files → Environment setup

**From Code Patterns:**
- Entry points (main, index, app)
- Database connections
- External integrations
- Authentication flows
- Error handling patterns

### 2.2 Generate Topic List

Create comprehensive topic list in `kb/wip/learning-plan.md`:

```markdown
# Autonomous Learning Plan

> Generated: {timestamp}
> Mode: AUTONOMOUS - Will learn ALL topics without stopping

## Source Analysis

| Type | Count | Location |
|------|-------|----------|
| Source Files | N | src/ |
| Config Files | N | various |
| Documentation | N | docs/ |

## Topics Queue

Status: ⏳ Pending | 🔄 In Progress | ✅ Complete | ⏭️ Skipped

### Critical (Learn First)
1. ⏳ project-overview - Entry points, main purpose
2. ⏳ architecture - System design, component relationships
3. ⏳ data-models - Core entities, schemas

### High Priority
4. ⏳ authentication - Auth flows, security
5. ⏳ api-layer - Endpoints, contracts
6. ⏳ core-services - Business logic

### Medium Priority
7. ⏳ configuration - Settings, environment
8. ⏳ error-handling - Error patterns, logging
9. ⏳ external-integrations - Third-party services

### Lower Priority
10. ⏳ utilities - Helper functions
11. ⏳ testing - Test patterns, coverage
12. ⏳ deployment - CI/CD, infrastructure

## Progress Tracking

- **Total Topics**: N
- **Completed**: 0
- **Current**: (none)
- **Remaining**: N

## Auto-Continue Protocol

After completing each topic:
1. Mark as ✅ Complete
2. Update progress counts
3. Pick next ⏳ Pending topic
4. Continue learning
5. DO NOT STOP until all complete
```

---

## Phase 3: AUTONOMOUS LEARNING LOOP

**THIS IS THE CORE LOOP - DO NOT EXIT UNTIL COMPLETE**

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTONOMOUS LEARNING LOOP                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │  PICK    │───▶│  LEARN   │───▶│  RECORD  │              │
│  │  TOPIC   │    │  TOPIC   │    │  NOTES   │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│       ▲                               │                     │
│       │         ┌──────────┐          │                     │
│       └─────────│  MORE?   │◀─────────┘                     │
│                 │  YES→loop│                                │
│                 │  NO→done │                                │
│                 └──────────┘                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### For Each Topic:

#### Step 1: Mark In Progress
Update `kb/wip/learning-plan.md`:
- Change topic status: ⏳ → 🔄
- Set "Current" to topic name

#### Step 2: Create Topic Notes
Create `kb/wip/{topic-name}.md` with template:

```markdown
# Topic: {topic-name}

> Started: {timestamp}
> Status: 🔄 In Progress

## Documentation Claims
(What docs/comments say about this)

## Code Reality
(What code actually does)

## Key Files
| File | Purpose | LOC |
|------|---------|-----|

## Discrepancies
| Docs Say | Code Does | Evidence |
|----------|-----------|----------|

## Git History Insights
(Key commits, changes over time)

## Summary
(Final understanding)
```

#### Step 3: Investigate Topic

**Trust Hierarchy** (use in this order):
```
1. Running Code      ← What actually executes
2. Git History       ← What changed and when
3. Tickets/MRs       ← Why it changed
4. Tests             ← Expected behavior
5. Comments          ← May be stale
6. Documentation     ← Often outdated
```

**Investigation Actions:**
1. Find relevant files: `grep -ri "{topic}" --include="*.ts" --include="*.py" ...`
2. Read key implementations
3. Check git history: `git log --oneline -S "{topic}"`
4. Look for tests
5. Note any discrepancies between docs and code

#### Step 4: Record Findings
Write comprehensive notes to `kb/wip/{topic-name}.md`

#### Step 5: Mark Complete & Continue
Update `kb/wip/learning-plan.md`:
- Change status: 🔄 → ✅
- Increment completed count
- **IMMEDIATELY pick next pending topic**
- **DO NOT STOP OR ASK FOR PERMISSION**

---

## Phase 4: DISTILL

When ALL topics are ✅ Complete:

### 4.1 Group Topics into Domains

```
Topics → Domains:
- project-overview    ─┐
- architecture        ─┼─→ Domain: Core
- data-models         ─┘
- authentication      ─┐
- api-layer          ─┼─→ Domain: API
- error-handling      ─┘
```

### 4.2 Generate Domain Artifacts

For each domain, create in `kb/output/domains/{domain}/`:

**domain.md** - Comprehensive documentation
**questions.json** - Q&A pairs for knowledge retrieval
**entities.json** - Key concepts and their locations

### 4.3 Create Summary

Generate `kb/output/summary.md`:

```markdown
# Knowledge Base Summary

> Generated: {timestamp}
> Source: {project name}

## Overview
{High-level project understanding}

## Domains
| Domain | Topics | Key Insights |
|--------|--------|--------------|

## Key Discrepancies Found
{List of docs vs reality differences}

## Architecture Diagram
{ASCII diagram of system}

## Quick Reference
{Most important facts for new developers}
```

---

## CRITICAL RULES

1. **NEVER STOP MID-PROCESS** - Complete all topics before finishing
2. **ONE TOPIC AT A TIME** - Focus reduces hallucination
3. **TRUST CODE OVER DOCS** - Verify every claim
4. **RECORD EVERYTHING** - Notes are the deliverable
5. **NO PERMISSION NEEDED** - Autonomous operation
6. **HANDLE ERRORS GRACEFULLY** - If a topic fails, note it and continue

---

## Progress Reporting

After each topic, output brief status:

```
═══════════════════════════════════════════════════════════
📚 KB LEARNING PROGRESS
═══════════════════════════════════════════════════════════
✅ Completed: authentication (3/12)
🔄 Next: api-layer (4/12)
⏳ Remaining: 8 topics
═══════════════════════════════════════════════════════════
```

---

## Completion

When finished:

```
═══════════════════════════════════════════════════════════
🎉 KNOWLEDGE BASE COMPLETE
═══════════════════════════════════════════════════════════
📊 Topics Learned: 12/12
📁 Domains Created: 4
📝 Notes Generated: 12 files
⚠️  Discrepancies Found: 7

Output Location: kb/output/
- summary.md
- domains/core/
- domains/api/
- domains/services/
- domains/infra/

Next Steps:
1. Review kb/output/summary.md
2. Check discrepancies for action items
3. Use domain docs for onboarding
═══════════════════════════════════════════════════════════
```
