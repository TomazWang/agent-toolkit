---
name: prepare-kb-analysis
user-invocable: false
description: |
  Initialize KB structure and prepare source materials. Use when:
  - Called by auto-learn during initialization
  - User needs to add more sources mid-process
  - Setting up KB for the first time manually

  Part of the autonomous workflow - usually called automatically.
---

# KB Prepare: Initialize & Sources

Set up knowledge base structure and prepare source materials with run-based iteration support.

**Note**: In autonomous mode (`/kb:start-knowledge-base`), this runs automatically.

---

## Directory Structure

```
kb/
├── .kb-config           ← Credentials (gitignored)
├── .kb-config.example   ← Template
├── .logs/               ← Activity logs (gitignored)
├── runs-metadata.json   ← Run history and tracking
├── sources/
│   ├── run-1/           ← First iteration sources
│   ├── run-2/           ← Second iteration sources
│   └── run-N/           ← Nth iteration sources
├── wip/                 ← Work in progress
│   ├── run-1/           ← First iteration work
│   │   ├── learning-plan.md
│   │   ├── {topic}.md
│   │   └── user-feedback.md
│   ├── run-2/           ← Second iteration work
│   └── draft-output/    ← Draft outputs per run
│       ├── run-1/       ← Draft from run 1
│       └── run-2/       ← Draft from run 2
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

### 1. Detect or Create Run Number

```bash
# Check if runs-metadata.json exists
if [ -f "kb/runs-metadata.json" ]; then
  # Read current run number
  CURRENT_RUN=$(jq -r '.current_run' kb/runs-metadata.json)

  # Check for incomplete runs
  INCOMPLETE=$(jq -r '.runs[] | select(.status=="in-progress") | .run_id' kb/runs-metadata.json)

  if [ -n "$INCOMPLETE" ]; then
    echo "Found incomplete run: $INCOMPLETE"
    # Prompt user: Resume or start new?
    # For now, start new run
    CURRENT_RUN=$((CURRENT_RUN + 1))
  else
    CURRENT_RUN=$((CURRENT_RUN + 1))
  fi
else
  # First run
  CURRENT_RUN=1
fi

echo "Initializing run $CURRENT_RUN"
```

### 2. Create Run Structure

```bash
# Create run-specific directories
mkdir -p kb/sources/run-${CURRENT_RUN}
mkdir -p kb/wip/run-${CURRENT_RUN}
mkdir -p kb/wip/draft-output/run-${CURRENT_RUN}

# Create general directories if they don't exist
mkdir -p kb/{output/domains,.logs}
```

### 3. Initialize/Update Metadata

```bash
# If first run, create metadata file
if [ ! -f "kb/runs-metadata.json" ]; then
  cat > kb/runs-metadata.json << 'EOF'
{
  "runs": [],
  "current_run": 1
}
EOF
fi

# Add run entry to metadata
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Read existing metadata
METADATA=$(cat kb/runs-metadata.json)

# Add new run entry
NEW_METADATA=$(echo "$METADATA" | jq \
  --arg run_id "$CURRENT_RUN" \
  --arg started "$TIMESTAMP" \
  '.runs += [{
    "run_id": ($run_id | tonumber),
    "started_at": $started,
    "status": "in-progress",
    "topics_learned": 0
  }] | .current_run = ($run_id | tonumber)')

echo "$NEW_METADATA" > kb/runs-metadata.json
```

### 4. Create Config Template (First Run Only)

```bash
if [ ! -f "kb/.kb-config.example" ]; then
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
EOF
fi

# Create .gitignore
if [ ! -f "kb/.gitignore" ]; then
  cat > kb/.gitignore << 'EOF'
.kb-config
.logs/
EOF
fi
```

### 5. Detect Current Project

If running in a git repo, note it for the current run:

```bash
if [ -d ".git" ]; then
  echo "Detected git repository: $(basename $(pwd))"
  echo "Will analyze current directory as primary source for run $CURRENT_RUN"
fi
```

### 6. Read Previous Run Feedback (Run 2+)

```bash
if [ $CURRENT_RUN -gt 1 ]; then
  PREV_RUN=$((CURRENT_RUN - 1))
  FEEDBACK_FILE="kb/wip/run-${PREV_RUN}/user-feedback.md"

  if [ -f "$FEEDBACK_FILE" ]; then
    echo "Reading user feedback from run $PREV_RUN..."
    # Parse feedback for focus areas, corrections, context
    # Store in memory for learning plan generation
  fi
fi
```

---

## Adding Sources to Current Run

### Local Repositories

```bash
# Copy/clone to current run's source directory
CURRENT_RUN=$(jq -r '.current_run' kb/runs-metadata.json)

# Clone with full history
cd kb/sources/run-${CURRENT_RUN}
git clone --no-single-branch <repo-url> <name>
```

### Local Files

Copy to current run's directory:
- PDFs, DOCX, PPTX → `sources/run-N/raw/`
- Already markdown → `sources/run-N/docs/`

---

## Legacy Migration

If existing KB structure without runs is detected:

```bash
if [ -d "kb/sources/repos" ] && [ ! -d "kb/sources/run-1" ]; then
  echo "Migrating legacy KB structure..."

  # Move existing sources to run-1
  mkdir -p kb/sources/run-1
  [ -d "kb/sources/repos" ] && mv kb/sources/repos kb/sources/run-1/
  [ -d "kb/sources/docs" ] && mv kb/sources/docs kb/sources/run-1/
  [ -d "kb/sources/raw" ] && mv kb/sources/raw kb/sources/run-1/

  # Move existing wip to run-1
  mkdir -p kb/wip/run-1
  [ -f "kb/wip/learning-plan.md" ] && mv kb/wip/learning-plan.md kb/wip/run-1/
  find kb/wip -maxdepth 1 -name "*.md" -exec mv {} kb/wip/run-1/ \;

  # Initialize metadata for migrated run
  echo "Marking existing work as run-1..."
fi
```

---

## Completion

When preparation is complete, output:

```
═══════════════════════════════════════════════════════════════
✅ KB PREPARATION COMPLETE - RUN ${CURRENT_RUN}
═══════════════════════════════════════════════════════════════
📁 Structure: Initialized
⚙️  Config: kb/.kb-config.example available
📊 Metadata: kb/runs-metadata.json updated
🔄 Current Run: ${CURRENT_RUN}

📂 Run directories:
   • kb/sources/run-${CURRENT_RUN}/
   • kb/wip/run-${CURRENT_RUN}/
   • kb/wip/draft-output/run-${CURRENT_RUN}/

Next: Analyzing sources to create learning plan...
═══════════════════════════════════════════════════════════════
```

In autonomous mode, proceed directly to topic analysis.
