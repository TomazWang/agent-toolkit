---
name: sourceatlas
description: Use SourceAtlas to quickly understand a codebase. Gets project overview, finds patterns, analyzes code history. Integrates with KB learning workflow.
argument-hint: <command> [args]
---

# KB SourceAtlas Integration

Use [SourceAtlas](https://github.com/lis186/SourceAtlas) to quickly analyze codebases during KB learning.

---

## What SourceAtlas Does

```
┌─────────────────────────────────────────────────────────────┐
│                 SOURCEATLAS CAPABILITIES                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  overview    → Tech stack, architecture, code quality       │
│  pattern     → Find implementation patterns (221 supported) │
│  impact      → Analyze breaking change risks                │
│  history     → Git hotspots, knowledge distribution         │
│  flow        → Trace execution paths                        │
│  dependency  → Upgrade planning                             │
│                                                             │
│  Speed: Scans <5% of files for quick insights               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Setup

Install SourceAtlas plugin:

```bash
/plugin marketplace add lis186/SourceAtlas
```

---

## Commands

### Quick Overview (Start Here)

Get project overview in ~3 minutes:

```
/sourceatlas:overview
```

Outputs:
- Tech stack
- Architecture patterns
- Project scale
- Code quality signals

### Find Patterns

Search for specific implementation patterns:

```
/sourceatlas:pattern "api endpoint"
/sourceatlas:pattern "authentication"
/sourceatlas:pattern "database query"
```

Supports 221+ patterns including:
- MVVM, MVC, MVP
- React Hooks, Redux
- FastAPI, Django
- And more...

### Analyze Impact

Before modifying code, check impact:

```
/sourceatlas:impact path/to/file.ts
```

Shows:
- Dependents
- Breaking change risks

### Code History

Find hotspots and knowledge distribution:

```
/sourceatlas:history
```

Shows:
- Frequently changed files
- Who knows what
- Potential problem areas

### Trace Flow

Map execution paths for features:

```
/sourceatlas:flow "user login"
/sourceatlas:flow "payment processing"
```

### Dependency Analysis

Plan framework upgrades:

```
/sourceatlas:dependency
```

---

## Integration with KB Workflow

### During kb-plan

Use overview to identify topics:

```
# In a cloned repo
cd kb/sources/repos/your-repo
/sourceatlas:overview
```

The output helps identify:
- Architecture domains
- Key components
- Learning priorities

### During kb-learn

Use specific commands for deep dives:

```
# Learning about authentication
/sourceatlas:pattern "auth"
/sourceatlas:flow "user login"
/sourceatlas:history src/auth/
```

### Recording Findings

Add SourceAtlas output to notes:

```markdown
## SourceAtlas Analysis

### Overview (from /sourceatlas:overview)
- Tech: TypeScript, React, Node.js
- Patterns: MVVM, Repository pattern
- Scale: ~50k LOC, 200 files

### Auth Patterns Found
- JWT handling in src/auth/jwt.ts
- OAuth in src/auth/oauth/
- Session management in src/services/session/

### Hotspots (from /sourceatlas:history)
- src/api/handlers.ts (50 changes, 3 authors)
- src/auth/session.ts (30 changes, 2 authors)
```

---

## Workflow Example

```
# 1. Prepare
/kb:prepare
cd kb/sources/repos/target-repo

# 2. Quick overview
/sourceatlas:overview
# → Identifies main domains and tech stack

# 3. Plan based on overview
/kb:plan
# → Create learning plan from overview

# 4. Learn topic with pattern search
/kb:learn authentication
/sourceatlas:pattern "auth"
/sourceatlas:flow "login"

# 5. Check history for context
/sourceatlas:history src/auth/
# → Find who changed what and when

# 6. Record findings
# → Add to kb/wip/authentication.md
```

---

## Tips

- **Start with overview** - fastest way to understand a new codebase
- **Use pattern search** - finds examples faster than grep
- **Check history** - identifies knowledge holders
- **Combine with git-analysis** - SourceAtlas history + detailed git blame
- **Record everything** - add output to your topic notes
