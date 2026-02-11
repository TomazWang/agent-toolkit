## Why

The current KB Analysis plugin follows a linear, single-pass learning workflow that doesn't support iterative refinement. Users cannot provide incremental feedback or corrections to guide the AI's understanding as it learns. Additionally, users have no visibility into the AI's interpretation until the final output, making it difficult to course-correct during the learning process. This change introduces an iterative loop/runs concept that allows progressive refinement and provides draft outputs after each run.

## What Changes

- **Remove MCP integrations**: Simplify dependencies by removing cloud source integrations (Google Docs, Figma, Notion, Confluence). Focus on local source analysis.
- **Rename plugin folder**: Change `kb-analysis` to `kb` to match the plugin name convention (plugin name should match folder name).
- **Add loop/runs concept**: Introduce iterative learning workflow with sub-folders in `sources/` and `wip/` directories to track learning iterations.
- **Generate draft documents**: After each run, create semi/beta/draft documents showing the AI's current understanding of the codebase. This gives users insight into what the AI thinks the project is about.
- **Support incremental refinement**: Each run allows users to provide more details or corrections based on the previous run's output.

## Capabilities

### New Capabilities

- `iterative-learning`: Iterative loop/runs workflow that supports progressive refinement
  - Sub-folder structure in `sources/` and `wip/` to organize learning runs
  - Draft document generation after each run
  - Support for user feedback and corrections between runs
  - Progress tracking across multiple iterations

### Modified Capabilities

None - this change introduces new capabilities without modifying existing spec-level requirements.

## Impact

**Affected Code:**
- Plugin folder rename: `plugins/kb-analysis/` → `plugins/kb/`
- Skills requiring modification:
  - `start-knowledge-base` - orchestrate loop/runs workflow
  - `prepare-kb-analysis` - create loop/run sub-folders
  - `distill-kb-knowledge` - generate draft outputs per run
  - `check-kb-status` - show current run progress
- MCP-related skills to remove:
  - `fetch-cloud-sources`
  - Cloud source URL handling in `add-kb-source`

**Directory Structure Changes:**
```
kb/
├── sources/
│   ├── run-1/          ← NEW: First learning iteration
│   ├── run-2/          ← NEW: Second iteration with refinements
│   └── run-N/          ← NEW: Subsequent runs
├── wip/
│   ├── run-1/          ← NEW: Work-in-progress for run 1
│   │   ├── learning-plan.md
│   │   └── {topic}.md
│   ├── run-2/          ← NEW: Work-in-progress for run 2
│   └── draft-output/   ← NEW: Semi/beta documents per run
└── output/             ← Final knowledge base (unchanged)
```

**Dependencies:**
- Remove MCP server dependencies (.mcp.json configuration)
- Simplify installation by removing cloud authentication requirements

**APIs:**
- No external API changes
- Internal skill APIs remain compatible
