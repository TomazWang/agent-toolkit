---
name: add-source
description: |
  Add source files or cloud documents to KB. Use when:
  - User wants to add a repository, file, or cloud doc
  - User invokes /kb:kb-add-source <path-or-url>
  - Need to include additional sources mid-learning

  Handles local files and cloud sources (Google Docs, Figma, Notion).
argument-hint: <path-or-url>
---

# KB Add Source

Add source materials to the knowledge base for analysis.

**Input**: `$ARGUMENTS` - path to local file/directory or cloud URL

---

## Supported Sources

| Type | Format | Example |
|------|--------|---------|
| Local repo | path | `./path/to/repo` |
| Local file | path | `./document.pdf` |
| Google Docs/Slides | `gdrive://id` | `gdrive://1ABC123` |
| Figma | `figma://key` | `figma://XYZ789` |
| Notion | `notion://id` | `notion://page-uuid` |
| Confluence | `confluence://space/page` | `confluence://TEAM/Guide` |

---

## Process

### 1. Detect Source Type

```
$ARGUMENTS starts with:
- gdrive://  → Cloud: Google Drive
- figma://   → Cloud: Figma
- notion://  → Cloud: Notion
- confluence:// → Cloud: Confluence
- http(s):// → Cloud: Generic URL
- Otherwise  → Local file/directory
```

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

### 3. Handle Cloud Sources

Use the `cloud-sources` skill for cloud URLs:

**Google Docs/Slides** (`gdrive://`):
- Requires GOOGLE_APPLICATION_CREDENTIALS in kb/.kb-config
- Fetches via MCP gdrive server
- Saves to `kb/sources/cloud/gdoc-{id}.md`

**Figma** (`figma://`):
- Requires FIGMA_ACCESS_TOKEN in kb/.kb-config
- Fetches via MCP figma server
- Extracts text content and structure
- Saves to `kb/sources/cloud/figma-{key}.md`

**Notion** (`notion://`):
- Requires NOTION_API_KEY in kb/.kb-config
- Fetches via MCP notion server
- Saves to `kb/sources/cloud/notion-{id}.md`

### 4. Update Inventory

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
📁 Type: {local/cloud}
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

For cloud sources, check:
- Credentials in kb/.kb-config
- MCP server availability
- Access permissions

Alternative: Download manually and add to kb/sources/raw/
```
