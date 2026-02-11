## Context

The KB Analysis plugin currently uses a linear, single-pass workflow where the AI learns the codebase once and generates a final knowledge base. This approach has limitations:
- No mechanism for users to provide feedback during learning
- Users see results only at the end, making course-correction difficult
- No way to iteratively refine the AI's understanding based on corrections
- Each learning session starts from scratch, losing previous insights

The plugin also includes MCP integrations for cloud sources (Google Docs, Figma, Notion) which add complexity and external dependencies. Plugin folder naming (`kb-analysis`) doesn't match the plugin name convention.

This design introduces an iterative loop/runs workflow where users can progressively refine the AI's understanding through multiple runs, with draft outputs generated after each run to provide visibility.

## Goals / Non-Goals

**Goals:**
- Enable iterative refinement: users can run multiple learning cycles with incremental feedback
- Provide draft visibility: generate semi/beta documents after each run showing AI's current understanding
- Simplify dependencies: remove MCP cloud integrations to reduce complexity
- Standardize naming: align plugin folder name with plugin name
- Preserve existing functionality: maintain backward compatibility for core learning workflow
- Track progress across runs: users can see evolution of AI's understanding

**Non-Goals:**
- Not changing the core learning algorithm or agents (code-investigator, discrepancy-hunter remain the same)
- Not adding new cloud integrations or external dependencies
- Not modifying the final output format (`kb/output/` structure stays the same)
- Not building a UI for managing runs (CLI-based workflow only)
- Not implementing automatic diff/comparison between runs (manual review)

## Decisions

### Decision 1: Run-numbered folder structure

**Choice:** Use `run-1/`, `run-2/`, etc. folders in both `sources/` and `wip/`

**Rationale:**
- Simple, predictable naming (easy to script and navigate)
- Natural ordering (filesystem sorts numerically)
- Clear progression (users can see learning evolution)
- Each run is isolated (prevents cross-contamination)

**Alternatives considered:**
- Timestamp-based folders (`2024-01-15-143022/`) - harder to reference, less readable
- Named runs (`initial/`, `refined/`) - ambiguous, doesn't scale beyond 2-3 runs
- Single folder with versioned files - too complex, harder to compare runs

### Decision 2: Draft output location

**Choice:** Store draft documents in `wip/draft-output/run-N/` for each run

**Rationale:**
- Keeps drafts separate from final output (clarity)
- Maintains work-in-progress semantics (`wip/` folder)
- Easy to clean up drafts without affecting sources or final output
- Clear mapping: `run-N/` in sources → `draft-output/run-N/` in wip

**Alternatives considered:**
- Store in `output/drafts/` - mixes draft and final outputs
- Store alongside topic notes in `wip/run-N/` - clutters working directory
- Don't persist drafts - users lose visibility into AI's thinking

### Decision 3: Run progress tracking

**Choice:** Add `runs-metadata.json` in `kb/` root to track run history

**Format:**
```json
{
  "runs": [
    {
      "run_id": 1,
      "started_at": "2024-01-15T14:30:22Z",
      "completed_at": "2024-01-15T15:45:10Z",
      "status": "completed",
      "topics_learned": 12,
      "user_notes": "Initial run, focused on API structure"
    }
  ],
  "current_run": 2
}
```

**Rationale:**
- Enables `/kb:check-kb-status` to show run history
- Tracks metadata that folders alone can't capture (timestamps, user notes)
- Simple JSON format (easy to parse and update)
- Supports future features (run comparison, statistics)

### Decision 4: User feedback mechanism

**Choice:** Use `wip/run-N/user-feedback.md` for users to provide corrections/guidance

**Rationale:**
- Explicit file for user input (clear intent)
- Markdown format (easy to write, readable)
- Per-run feedback (scoped to specific iteration)
- AI reads this file at start of next run to guide learning

**Format:**
```markdown
# User Feedback for Run 2

## Areas to focus on
- Deep dive into authentication module (missed in run 1)
- Clarify API versioning strategy

## Corrections
- The payment system uses Stripe, not custom implementation

## Additional context
- Legacy code in `legacy/` folder should be marked as deprecated
```

### Decision 5: MCP removal strategy

**Choice:** Remove cloud source skills and .mcp.json, keep local file analysis

**Rationale:**
- Simplifies installation (no external auth required)
- Reduces dependencies (no MCP server management)
- Focuses plugin scope (local codebase analysis)
- Users can still manually add cloud docs as local files

**Migration:**
- Remove `skills/cloud-sources/` and `skills/fetch-cloud-sources/`
- Update `add-kb-source` to only accept local paths
- Remove MCP references from README
- Add note about manual cloud doc export if needed

### Decision 6: Plugin folder rename

**Choice:** Rename `plugins/kb-analysis/` to `plugins/kb/` with symlink for backward compatibility

**Rationale:**
- Matches plugin name (`kb` not `kb-analysis`)
- Cleaner, shorter name
- Symlink preserves existing installations during transition

**Migration:**
1. Rename folder
2. Update plugin.json, README references
3. Create symlink: `kb-analysis -> kb`
4. Deprecation notice in old folder location

## Risks / Trade-offs

**[Risk]** Disk space usage increases with multiple runs → **Mitigation:** Add cleanup command `/kb:cleanup-runs` to remove old runs, document in README

**[Risk]** Users confused about which run to use for final output → **Mitigation:** Clear status message showing "Current run: N", recommend using latest completed run

**[Risk]** Runs folder structure becomes cluttered after many iterations → **Mitigation:** Document best practice: archive old runs after final output is generated, max 3-5 active runs

**[Risk]** Breaking change for users with existing `kb-analysis` installations → **Mitigation:** Symlink provides backward compatibility, add migration guide to README

**[Risk]** Draft outputs may confuse users if quality varies significantly between runs → **Mitigation:** Clearly mark drafts with "DRAFT - Run N" header, explain iterative process in README

**[Trade-off]** More complexity in folder structure vs. simpler linear workflow → Accepted because iterative refinement is core value proposition

**[Trade-off]** Lost cloud integration features vs. simpler dependencies → Accepted because local analysis is the primary use case, cloud docs can be exported manually

## Migration Plan

### Phase 1: Folder rename
1. Rename `plugins/kb-analysis/` → `plugins/kb/`
2. Update plugin.json name field
3. Create symlink for backward compatibility
4. Update marketplace registry

### Phase 2: Remove MCP integrations
1. Delete `skills/cloud-sources/` and `skills/fetch-cloud-sources/`
2. Remove .mcp.json from plugin root
3. Update `add-kb-source` skill to remove cloud URL handling
4. Update README to remove cloud integration sections

### Phase 3: Add run structure support
1. Modify `prepare-kb-analysis` skill to create run folders
2. Add `runs-metadata.json` initialization
3. Update `start-knowledge-base` to detect current run number
4. Add `user-feedback.md` template generation

### Phase 4: Draft output generation
1. Modify `distill-kb-knowledge` to generate draft outputs per run
2. Add run number to draft output headers
3. Update `check-kb-status` to show run history and current run

### Rollback Strategy
- Symlink allows reverting plugin name change
- Git revert for code changes
- Manual cleanup of run folders if needed (won't break existing workflows)

## Open Questions

1. **Should we support run branching?** (e.g., `run-2a/`, `run-2b/` for exploring different approaches)
   - Deferred: Start with linear runs, add branching if users request it

2. **How to handle partial runs?** (user stops mid-learning)
   - Mark as `status: "incomplete"` in runs-metadata.json, allow resumption or cleanup

3. **Should draft outputs be automatically compared between runs?**
   - Deferred: Add as future enhancement, requires diff algorithm
