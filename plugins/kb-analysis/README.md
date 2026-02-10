# KB Analysis Plugin

**Autonomous Knowledge Base Builder** - Trigger once, learn entire codebase.

Analyzes source code, documentation, git history, and cloud documents to build institutional knowledge. Focuses on what code **actually does**, not what documentation **claims**.

## Quick Start

```bash
# Start autonomous learning
/kb:start-knowledge-base

# That's it! The AI will:
# 1. Set up KB structure
# 2. Analyze codebase to identify topics
# 3. Learn each topic (one at a time)
# 4. Find documentation vs code discrepancies
# 5. Generate organized knowledge base
```

## Installation

```bash
# Via plugin directory
claude --plugin-dir ./plugins/kb-analysis

# Or symlink to plugins
ln -s $(pwd)/plugins/kb-analysis ~/.claude/plugins/kb-analysis
```

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTONOMOUS WORKFLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  /kb:start-knowledge-base                                                   │
│      │                                                       │
│      ▼                                                       │
│  ┌──────────┐                                               │
│  │ PREPARE  │ Set up structure, detect sources              │
│  └────┬─────┘                                               │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────┐    ┌─────────────────┐                        │
│  │ ANALYZE  │───▶│ topic-analyzer  │ Identify ALL topics    │
│  └────┬─────┘    │     agent       │                        │
│       │          └─────────────────┘                        │
│       ▼                                                      │
│  ┌──────────────────────────────────────┐                   │
│  │          LEARNING LOOP               │                   │
│  │                                      │                   │
│  │  For each topic:                     │                   │
│  │  ┌─────────────────────┐            │                   │
│  │  │ code-investigator   │ Deep dive  │                   │
│  │  └──────────┬──────────┘            │                   │
│  │             │                        │                   │
│  │  ┌──────────▼──────────┐            │                   │
│  │  │ discrepancy-hunter  │ Find lies  │                   │
│  │  └──────────┬──────────┘            │                   │
│  │             │                        │                   │
│  │  ┌──────────▼──────────┐            │                   │
│  │  │   Record findings   │            │                   │
│  │  └──────────┬──────────┘            │                   │
│  │             │                        │                   │
│  │        (next topic)                  │                   │
│  └──────────────────────────────────────┘                   │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────┐                                               │
│  │ DISTILL  │ Generate organized knowledge                  │
│  └──────────┘                                               │
│       │                                                      │
│       ▼                                                      │
│  🎉 COMPLETE                                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Commands (Skills)

| Command | Purpose |
|---------|---------|
| `/kb:start-knowledge-base [scope]` | Start autonomous learning (optional: focus area) |
| `/kb:check-kb-status` | Check progress and get guidance |
| `/kb:learn-kb-topic <topic>` | Learn specific topic manually |
| `/kb:distill-kb-knowledge` | Generate final knowledge base |
| `/kb:add-kb-source <path>` | Add files or cloud sources |
| `/kb:plan-kb-learning` | View/edit learning plan |

## Agents

| Agent | Purpose |
|-------|---------|
| `kb.guide` | Helps users understand the workflow |
| `kb.topic-analyzer` | Scans codebase to identify learning topics |
| `kb.code-investigator` | Deep dives into code, traces execution flow (integrates with SourceAtlas) |
| `kb.discrepancy-hunter` | Finds documentation vs code mismatches |

## Cloud Sources Support

Fetch from cloud platforms via MCP integration:

| Source | URL Format | Config Required |
|--------|------------|-----------------|
| Google Docs/Slides | `gdrive://doc-id` | GOOGLE_APPLICATION_CREDENTIALS |
| Figma | `figma://file-key` | FIGMA_ACCESS_TOKEN |
| Notion | `notion://page-id` | NOTION_API_KEY |
| Confluence | `confluence://space/page` | CONFLUENCE_URL + TOKEN |

```bash
# Add cloud sources
/kb:add-kb-source gdrive://1ABC123def456
/kb:add-kb-source figma://XYZ789
```

## Output Structure

```
kb/
├── sources/             ← Input materials
│   ├── repos/           ← Cloned repositories
│   ├── docs/            ← Markdown documents
│   ├── raw/             ← Original files (PDF, DOCX)
│   └── cloud/           ← Fetched cloud docs
│
├── wip/                 ← Work in progress
│   ├── learning-plan.md ← Topics and progress
│   └── {topic}.md       ← Notes per topic
│
└── output/              ← Final knowledge base
    ├── summary.md       ← Start here!
    └── domains/
        └── {domain}/
            ├── domain.md      ← Domain documentation
            ├── questions.json ← Q&A pairs
            └── entities.json  ← Key concepts
```

## Trust Hierarchy

The core philosophy - prioritize these sources:

```
1. 🔴 Running Code      ← What actually executes
2. 🟠 Git History       ← What changed and when
3. 🟡 Tickets/MRs       ← Why it changed
4. 🟢 Tests             ← Expected behavior
5. 🔵 Comments          ← May be stale
6. ⚪ Documentation     ← Often outdated
```

## Configuration

Create `kb/.kb-config` for optional integrations:

```bash
# Git hosting (for private repos)
GITLAB_URL=https://gitlab.yourcompany.com
GITLAB_TOKEN=your-token
GITHUB_TOKEN=your-token

# Ticket systems
VSTS_ORG=https://dev.azure.com/yourorg
VSTS_PROJECT=YourProject
VSTS_PAT=your-pat

# Cloud documents
GOOGLE_APPLICATION_CREDENTIALS=/path/to/creds.json
FIGMA_ACCESS_TOKEN=your-token
NOTION_API_KEY=your-key
```

## Why One Topic at a Time?

- **Reduces context size** - AI works better with focused context
- **Prevents hallucination** - No mixing unrelated information
- **Better quality** - Deep understanding beats broad coverage
- **Traceable** - Each topic has its own notes file

## Skills Reference

### Core Workflow
| Skill | Purpose |
|-------|---------|
| `start` | Autonomous orchestrator (main entry) |
| `status` | Progress dashboard |
| `learn` | Single topic deep dive |
| `distill` | Generate final output |

### Source Management
| Skill | Purpose |
|-------|---------|
| `add-source` | Add local/cloud sources (user-invocable) |
| `prepare-kb-analysis` | Initialize structure (auto-activating) |
| `fetch-cloud-sources` | Fetch from Google/Figma/Notion (auto-activating) |
| `convert-documents` | Convert PDF/DOCX to markdown (auto-activating) |

### Analysis Helpers
| Skill | Purpose |
|-------|---------|
| `plan` | Manage learning plan (user-invocable) |
| `analyze-git-history` | Git history deep dive (auto-activating) |
| `vsts-ticket-lookup` | Ticket system lookup (auto-activating) |
| `sourceatlas-integration` | SourceAtlas integration (auto-activating) |

## Hooks

Logging hooks included:
- **SessionStart** - Logs session start
- **PostToolUse** - Logs file operations
- **Stop** - Logs session end

Logs stored in `kb/.logs/` (gitignored).

## License

MIT

## Source Attribution

Part of [agent-toolkit](https://github.com/anthropics/agent-toolkit).

Inspired by:
- Documentation recovery workflows
- Institutional knowledge preservation
- Code archaeology techniques
