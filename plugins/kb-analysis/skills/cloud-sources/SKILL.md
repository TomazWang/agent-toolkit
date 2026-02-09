---
name: cloud-sources
description: |
  Fetch content from cloud sources (Google Docs, Slides, Figma, Notion, Confluence).
  Use when:
  - User provides gdrive://, figma://, notion:// URLs
  - Need to analyze design documents or cloud-hosted docs
  - Invokes /kb:add-source with cloud URL

  Requires MCP servers configured in .mcp.json
---

# Cloud Sources Integration

Fetch and convert cloud-hosted documents for KB analysis.

---

## Supported Sources

| Source | URL Format | MCP Server | Required Config |
|--------|------------|------------|-----------------|
| Google Docs | `gdrive://doc-id` | gdrive | GOOGLE_APPLICATION_CREDENTIALS |
| Google Slides | `gdrive://slide-id` | gdrive | GOOGLE_APPLICATION_CREDENTIALS |
| Google Sheets | `gdrive://sheet-id` | gdrive | GOOGLE_APPLICATION_CREDENTIALS |
| Figma | `figma://file-key` | figma | FIGMA_ACCESS_TOKEN |
| Notion | `notion://page-id` | notion | NOTION_API_KEY |
| Confluence | `confluence://space/page` | confluence | CONFLUENCE_URL, CONFLUENCE_TOKEN |

---

## Setup Requirements

### 1. Configure Credentials

Add to `kb/.kb-config`:

```bash
# Google (for Docs, Slides, Sheets)
# Create service account at https://console.cloud.google.com
# Enable Google Drive API and Google Docs API
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Figma
# Get token from https://www.figma.com/developers/api#access-tokens
FIGMA_ACCESS_TOKEN=your-figma-token

# Notion
# Create integration at https://www.notion.so/my-integrations
NOTION_API_KEY=your-notion-key

# Confluence
CONFLUENCE_URL=https://your-domain.atlassian.net/wiki
CONFLUENCE_TOKEN=your-api-token
```

### 2. MCP Servers

The `.mcp.json` file configures MCP servers. They start automatically when needed.

---

## Fetching Process

### For Google Docs/Slides

```
Input: gdrive://1ABC123def456

1. Use MCP gdrive server to fetch document
2. Extract text content and structure
3. Convert to markdown format
4. Save to kb/sources/cloud/gdoc-{id}.md
5. Update inventory
```

**Output format for Slides:**
```markdown
# {Presentation Title}

> Source: Google Slides
> ID: 1ABC123def456
> Fetched: {timestamp}

## Slide 1: {Title}

{Content}

---

## Slide 2: {Title}

{Content}
```

### For Figma

```
Input: figma://ABC123

1. Use MCP figma server to fetch file
2. Extract:
   - Page structure
   - Frame names and hierarchy
   - Text content from frames
   - Component names
3. Save to kb/sources/cloud/figma-{key}.md
4. Update inventory
```

**Output format:**
```markdown
# {Figma File Name}

> Source: Figma
> Key: ABC123
> Fetched: {timestamp}

## Pages

### Page: {Page Name}

#### Frame: {Frame Name}
- Components: {list}
- Text content: {extracted text}

```

### For Notion

```
Input: notion://page-id

1. Use MCP notion server to fetch page
2. Extract page content and child pages
3. Convert blocks to markdown
4. Save to kb/sources/cloud/notion-{id}.md
```

### For Confluence

```
Input: confluence://SPACE/Page+Title

1. Use MCP confluence server to fetch page
2. Extract content and attachments list
3. Convert to markdown
4. Save to kb/sources/cloud/confluence-{space}-{page}.md
```

---

## Usage in KB Workflow

### Adding Cloud Sources

```bash
# Add a Google Slides presentation
/kb:add-source gdrive://1ABC123def456

# Add a Figma design file
/kb:add-source figma://ABC123XYZ

# Add Notion documentation
/kb:add-source notion://page-uuid-here
```

### During Learning

Cloud sources appear in `kb/sources/cloud/` and are included in topic analysis:

```bash
# List cloud sources
ls kb/sources/cloud/

# Search cloud sources during topic learning
grep -ri "auth" kb/sources/cloud/
```

---

## Handling Failures

If MCP server is not available or credentials missing:

```
⚠️  Cloud Source Failed: {url}

Reason: {error message}

Options:
1. Configure credentials in kb/.kb-config
2. Export manually and add to kb/sources/raw/
3. Skip this source

Continuing without this source...
```

**Do not block** the learning process for cloud source failures.

---

## Manual Alternative

If MCP integration isn't working:

### Google Docs/Slides
1. Open in browser
2. File → Download → PDF or plain text
3. Add to `kb/sources/raw/`
4. Run `/kb:doc-converter`

### Figma
1. Open in browser
2. Export frames as PNG/PDF
3. Copy text content manually
4. Save to `kb/sources/raw/figma-export.md`

### Notion
1. Export as Markdown
2. Add to `kb/sources/docs/`

---

## Inventory Update

After fetching, update `kb/sources/inventory.md`:

```markdown
## Cloud Sources

| Source | Type | ID | Fetched | Status |
|--------|------|----| --------|--------|
| Project Arch | Google Slides | 1ABC... | 2024-02-09 | ✅ |
| UI Designs | Figma | XYZ... | 2024-02-09 | ✅ |
| API Docs | Notion | abc... | 2024-02-09 | ✅ |
```
