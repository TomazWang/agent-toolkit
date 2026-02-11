---
name: init
user-invocable: true
description: |
  Initialize KB trust-based structure. Use when:
  - User wants to start a new knowledge base
  - User invokes /kb:init
  - Setting up trust-based pipeline for first time
---

# KB Init: Initialize Trust-Based Structure

Initialize the knowledge base with trust-based directory structure: sources (untrusted), wip (drafts), output (validated truth).

**Note**: This is a one-time setup. After initialization, use `/kb:start` to begin learning.

---

## Prerequisites

- No existing `kb/` directory (or confirmation to reinitialize)
- User ready to add sources to `kb/sources/run-0/`

---

## Initialization Steps

### 1. Check for Existing KB

```bash
if [ -d "kb" ]; then
  echo "⚠️ KB directory already exists."
  echo "Reinitialize? This will not delete existing data. (y/n)"
  # Wait for user confirmation
  # If no, exit
fi
```

### 2. Create Trust-Based Structure

```bash
# Three-tier trust hierarchy
mkdir -p kb/{sources/{baseline,run-0},wip,output}

# Create logs directory (gitignored)
mkdir -p kb/.logs

echo "✅ Created trust-based directory structure"
```

### 3. Create .gitignore

```bash
cat > kb/.gitignore << 'EOF'
# KB Analysis - Gitignore

# Logs (session activity, gitignored for privacy)
.logs/

# Config with credentials
.kb-config

# Temporary files
*.tmp
.DS_Store
EOF

echo "✅ Created .gitignore"
```

### 4. Create Config Template (Optional)

```bash
cat > kb/.kb-config.example << 'EOF'
# KB Analysis Configuration Template
# Copy to .kb-config and fill in your values (optional)

# === Git Hosting ===
GITLAB_URL=https://gitlab.yourcompany.com
GITLAB_TOKEN=

# === Ticket Systems ===
VSTS_ORG=https://dev.azure.com/yourorg
VSTS_PROJECT=
VSTS_PAT=

JIRA_URL=https://yourcompany.atlassian.net
JIRA_TOKEN=
EOF

echo "✅ Created .kb-config.example (optional integrations)"
```

### 5. Create README for Sources

```bash
cat > kb/sources/run-0/README.md << 'EOF'
# Sources for Run-0

Add your initial sources here:

## Repositories
Place repos in subdirectories (will be analyzed as code):
- `repos/my-project/` - Your main codebase
- `repos/legacy-system/` - Historical codebases

## Documents
Add documentation files:
- `docs/` - Markdown, PDF, DOCX, etc.
- `api-specs/` - OpenAPI, AsyncAPI, GraphQL schemas

## Code Snippets
Single files or examples:
- `snippets/` - Important code examples

## Notes
Context documents:
- `meeting-notes.md` - Historical discussions
- `architecture-decisions.md` - ADRs

---

**What happens next:**

When you run `/kb:start`, the AI will:
1. Read all sources from this directory
2. Categorize them into:
   - **Baseline**: Critical sources to carry to all runs (repos, core docs)
   - **Ephemeral**: One-time context (historical notes)
   - **Deprecated**: Contradicts code (marked but not deleted)
3. Move baseline sources to `sources/baseline/`
4. Document decisions in `sources/baseline/RUN-0-DECISIONS.md`
5. Begin learning and create draft outputs in `wip/run-0/`
EOF
```

---

## Completion Output

```
═══════════════════════════════════════════════════════════════
✅ KB TRUST-BASED STRUCTURE INITIALIZED
═══════════════════════════════════════════════════════════════
📁 Directory Structure Created:

kb/
├── sources/
│   ├── baseline/          ← Will hold critical sources after run-0
│   └── run-0/             ← ADD YOUR SOURCES HERE
├── wip/                   ← AI working drafts (not final truth)
└── output/                ← User-validated truth (empty until you create it)

✅ .gitignore created (excludes .logs/, .kb-config)
✅ .kb-config.example created (optional integrations)
✅ sources/run-0/README.md created (instructions)

═══════════════════════════════════════════════════════════════
📋 NEXT STEPS:

1. Add your sources to: kb/sources/run-0/
   - Repositories (code to analyze)
   - Documentation (API specs, READMEs, etc.)
   - Any files relevant to understanding the codebase

2. When ready, run: /kb:start
   - AI will categorize sources (baseline vs ephemeral)
   - Begins run-0 learning
   - Creates draft outputs in wip/run-0/

3. Review drafts, provide feedback, iterate with /kb:continue

4. When satisfied, create output with /kb:create-output
═══════════════════════════════════════════════════════════════
```

---

## Error Handling

### Already Initialized

```
⚠️  KB directory already exists at: kb/

Options:
1. Continue with existing KB: /kb:status
2. Reinitialize (keeps existing data): /kb:init --force
3. Start fresh (backup first!): rm -rf kb/ && /kb:init

Current KB appears to be: [trust-based / legacy structure]
```

### Permission Issues

```
❌ Cannot create kb/ directory

Reason: {error}

Check:
- Write permissions in current directory
- Disk space available
- Directory doesn't exist as a file

Try: chmod +w . or run from different directory
```

---

## Options

**`--force`**: Reinitialize even if kb/ exists (preserves existing data, creates missing directories)

```bash
/kb:init --force
```

---

## Design Notes

**Trust Hierarchy:**
- `sources/` = Untrusted inputs (docs can be wrong)
- `wip/` = AI working memory (drafts, evolving understanding)
- `output/` = User-validated truth (explicit creation only)

**Why separate run-0?**
- First run is special: AI categorizes what to keep
- Baseline sources (repos, core docs) promoted to sources/baseline/
- Ephemeral sources stay in run-0/ (one-time context)
- Deprecated sources marked but not deleted (audit trail)

**Why no automatic output?**
- User decides when confidence is sufficient
- Allows iterative refinement without premature outputs
- Output becomes explicit milestone, not byproduct
