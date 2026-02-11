---
name: add-kb-source
description: |
  Add source files to KB. Use when:
  - User wants to add a repository or file
  - User invokes /kb:add-kb-source <path>
  - Need to include additional sources mid-learning

  Handles local files and directories only.
argument-hint: <path>
---

# KB Add Source

Add source materials to the knowledge base for analysis.

**Input**: `$ARGUMENTS` - path to local file/directory

---

## Supported Sources

| Type | Format | Example |
|------|--------|---------|
| Local repo | path | `./path/to/repo` |
| Local file | path | `./document.pdf` |

**Note**: Cloud sources (Google Docs, Figma, Notion) are no longer supported. Export cloud documents manually and add them as local files.

---

## Process

### 1. Detect Source Type

Local file or directory path.

### 2. Handle Local Sources

#### Directory (Repository)

```bash
# If it's a git repo, clone with history
if [ -d "$ARGUMENTS/.git" ]; then
  cp -r "$ARGUMENTS" kb/sources/repos/$(basename "$ARGUMENTS")
else
  # Just copy the directory
  cp -r "$ARGUMENTS" kb/sources/raw/$(basename "$ARGUMENTS")
fi
```

#### File

```bash
# Copy to appropriate location based on type
case "$ARGUMENTS" in
  *.md)  cp "$ARGUMENTS" kb/sources/docs/ ;;
  *.pdf|*.docx|*.pptx) cp "$ARGUMENTS" kb/sources/raw/ ;;
  *)     cp "$ARGUMENTS" kb/sources/raw/ ;;
esac
```

### 3. Update Inventory

Add to `kb/wip/source-inventory.md`:

```markdown
## Sources Added

| Source | Type | Location | Added |
|--------|------|----------|-------|
| {name} | {type} | {path} | {timestamp} |
```

---

## Output

```
═══════════════════════════════════════════════════════════════
✅ SOURCE ADDED
═══════════════════════════════════════════════════════════════
📄 Source: $ARGUMENTS
📁 Type: local
📍 Location: kb/sources/{path}

If learning is in progress, this source will be included
in future topic analysis.
═══════════════════════════════════════════════════════════════
```

---

## Error Handling

If source cannot be added:

```
⚠️  Failed to add source: $ARGUMENTS

Reason: {error}

Check:
- File/directory exists
- Read permissions
- Sufficient disk space

Alternative: Copy files manually to kb/sources/raw/
```
