---
name: prepare
description: |
  Initialize KB structure and prepare source materials. Use when:
  - Called by auto-learn during initialization
  - User needs to add more sources mid-process
  - Setting up KB for the first time manually

  Part of the autonomous workflow - usually called automatically.
---

# KB Prepare: Initialize & Sources

Set up knowledge base structure and prepare source materials.

**Note**: In autonomous mode (`/kb:start`), this runs automatically.

---

## Directory Structure

```
kb/
├── .kb-config           ← Credentials (gitignored)
├── .kb-config.example   ← Template
├── .logs/               ← Activity logs (gitignored)
├── sources/
│   ├── repos/           ← Cloned repositories
│   ├── docs/            ← Converted documents
│   ├── raw/             ← Original files (PDF, DOCX, etc.)
│   └── cloud/           ← Fetched cloud docs (GDocs, Figma)
├── wip/                 ← Work in progress
│   ├── learning-plan.md ← Topics and progress
│   ├── {topic}.md       ← Topic notes
│   └── source-inventory.md
└── output/              ← Final knowledge base
    ├── summary.md
    └── domains/
        └── {domain}/
            ├── domain.md
            ├── questions.json
            └── entities.json
```

---

## Initialization Steps

### 1. Create Structure

```bash
mkdir -p kb/{sources/{repos,docs,raw,cloud},wip,output/domains,.logs}
touch kb/.gitignore
echo ".kb-config" >> kb/.gitignore
echo ".logs/" >> kb/.gitignore
```

### 2. Create Config Template

```bash
cat > kb/.kb-config.example << 'EOF'
# KB Analysis Configuration
# Copy to .kb-config and fill in your values

# === Git Hosting ===

# GitLab (for private repos)
GITLAB_URL=https://gitlab.yourcompany.com
GITLAB_TOKEN=

# GitHub (for private repos)
GITHUB_TOKEN=

# === Ticket Systems ===

# Azure DevOps / VSTS
VSTS_ORG=https://dev.azure.com/yourorg
VSTS_PROJECT=
VSTS_PAT=

# Jira
JIRA_URL=https://yourcompany.atlassian.net
JIRA_TOKEN=

# === Cloud Documents ===

# Google (Docs, Slides, Sheets)
GOOGLE_APPLICATION_CREDENTIALS=

# Figma
FIGMA_ACCESS_TOKEN=

# Notion
NOTION_API_KEY=

# Confluence
CONFLUENCE_URL=
CONFLUENCE_TOKEN=
EOF
```

### 3. Detect Current Project

If running in a git repo, use it as the primary source:

```bash
if [ -d ".git" ]; then
  echo "Detected git repository: $(basename $(pwd))"
  # Don't clone - we're already in it
fi
```

---

## Adding Sources

### Local Repositories

```bash
# Clone with full history
cd kb/sources/repos
git clone --no-single-branch <repo-url> <name>
```

### Local Files

Copy or symlink to `kb/sources/raw/`:
- PDFs, DOCX, PPTX → `raw/`
- Already markdown → `docs/`

### Cloud Sources

Use the `cloud-sources` skill:
```
/kb:add-source gdrive://doc-id
/kb:add-source figma://file-key
```

---

## Source Inventory

Create/update `kb/wip/source-inventory.md`:

```markdown
# Source Inventory

> Generated: {timestamp}

## Configuration Status

| Service | Status | Notes |
|---------|--------|-------|
| GitLab | ✅/❌ | |
| Azure DevOps | ✅/❌ | |
| Google | ✅/❌ | |
| Figma | ✅/❌ | |

## Repositories

| Name | Path | Tech Stack | LOC | Notes |
|------|------|------------|-----|-------|
| main | ./ | TypeScript | ~50k | Current project |

## Documents

| File | Type | Location | Notes |
|------|------|----------|-------|
| | | | |

## Cloud Sources

| Name | Type | ID | Status |
|------|------|----| -------|
| | | | |

## Summary

- **Total repos**: N
- **Total docs**: N
- **Cloud sources**: N
- **Ready for analysis**: Yes/No
```

---

## Completion

When preparation is complete, output:

```
═══════════════════════════════════════════════════════════════
✅ KB PREPARATION COMPLETE
═══════════════════════════════════════════════════════════════
📁 Structure: Initialized
⚙️  Config: kb/.kb-config.example created
📚 Sources:
   • Repos: N
   • Docs: N
   • Raw: N
   • Cloud: N

Next: Analyzing sources to create learning plan...
═══════════════════════════════════════════════════════════════
```

In autonomous mode, proceed directly to topic analysis.
