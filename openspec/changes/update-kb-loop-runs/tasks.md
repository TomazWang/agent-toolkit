# Implementation Tasks: Update KB Loop/Runs

## 1. Plugin Rename and Structure

- [x] 1.1 Rename plugin folder from `plugins/kb-analysis/` to `plugins/kb/`
- [x] 1.2 Update plugin.json name field to "kb"
- [x] 1.3 Create symlink `kb-analysis -> kb` for backward compatibility
- [x] 1.4 Update marketplace registry.json with new plugin path and name
- [x] 1.5 Update README.md references to reflect new plugin name
- [x] 1.6 Update CLAUDE.md to reference `plugins/kb/` instead of `plugins/kb-analysis/`

## 2. Remove MCP Integrations

- [x] 2.1 Delete `skills/cloud-sources/` directory and SKILL.md
- [x] 2.2 Delete `skills/fetch-cloud-sources/` directory and SKILL.md
- [x] 2.3 Remove .mcp.json configuration file from plugin root
- [x] 2.4 Update `skills/add-kb-source/SKILL.md` to remove cloud URL handling (gdrive://, figma://, notion://, confluence://)
- [x] 2.5 Remove cloud source sections from README.md (Google Docs, Figma, Notion, Confluence tables)
- [x] 2.6 Remove cloud authentication configuration from README.md
- [x] 2.7 Update plugin.json to remove cloud-sources and fetch-cloud-sources from skills array

## 3. Run Structure Implementation

- [x] 3.1 Create run folder initialization function in `skills/prepare/SKILL.md`
- [x] 3.2 Add logic to detect existing runs and determine next run number
- [x] 3.3 Implement creation of `kb/sources/run-N/` directory structure
- [x] 3.4 Implement creation of `kb/wip/run-N/` directory structure
- [x] 3.5 Implement creation of `kb/wip/draft-output/run-N/` directory structure
- [x] 3.6 Add run number parameter to skills that need run context

## 4. Metadata Tracking

- [x] 4.1 Create `runs-metadata.json` schema definition
- [x] 4.2 Implement metadata file initialization in `skills/prepare/SKILL.md`
- [x] 4.3 Add metadata update logic for run start (status: "in-progress", started_at timestamp)
- [x] 4.4 Add metadata update logic for run completion (status: "completed", completed_at timestamp, topics_learned count)
- [x] 4.5 Add metadata update logic for incomplete runs (status: "incomplete")
- [x] 4.6 Implement current_run tracking and update logic

## 5. Draft Output Generation

- [ ] 5.1 Modify `skills/distill-kb-knowledge/SKILL.md` to accept run number parameter
- [ ] 5.2 Add draft output generation logic to write to `kb/wip/draft-output/run-N/`
- [ ] 5.3 Add "DRAFT - Run N" header to all draft documents
- [ ] 5.4 Implement draft summary.md generation based on learned topics
- [ ] 5.5 Implement draft domain documents generation in `domains/{domain}/domain.md` format
- [ ] 5.6 Ensure draft generation doesn't overwrite final output in `kb/output/`

## 6. User Feedback Mechanism

- [ ] 6.1 Create user-feedback.md template with sections (focus areas, corrections, additional context)
- [ ] 6.2 Add feedback file generation after run completion in `skills/distill-kb-knowledge/SKILL.md`
- [ ] 6.3 Implement feedback file reading logic in `skills/start-knowledge-base/SKILL.md`
- [ ] 6.4 Add feedback parsing to extract focus areas, corrections, and context
- [ ] 6.5 Modify learning plan generation to incorporate user feedback
- [ ] 6.6 Update topic prioritization based on focus areas from feedback
- [ ] 6.7 Apply corrections from feedback to code analysis and output generation

## 7. Status Display Updates

- [ ] 7.1 Modify `skills/check-kb-status/SKILL.md` to read runs-metadata.json
- [ ] 7.2 Add current run number and status display
- [ ] 7.3 Add run history table display (run_id, status, topics_learned, completion dates)
- [ ] 7.4 Add draft output location display for completed runs
- [ ] 7.5 Add recommendation to review latest draft before starting next run
- [ ] 7.6 Add detection and prompt for incomplete runs (offer resume or new run)

## 8. Cleanup Command

- [ ] 8.1 Create new skill `skills/cleanup-runs/SKILL.md` with cleanup functionality
- [ ] 8.2 Implement `--list` flag to show all runs with disk space usage
- [ ] 8.3 Implement `--run N` flag to remove specific run's directories
- [ ] 8.4 Add protection to prevent cleanup of current in-progress run
- [ ] 8.5 Update runs-metadata.json after cleanup to mark removed runs
- [ ] 8.6 Add cleanup command to plugin.json skills array
- [ ] 8.7 Document cleanup command in README.md

## 9. Backward Compatibility

- [x] 9.1 Add detection for legacy KB directories without run structure
- [x] 9.2 Implement migration logic to treat existing data as run-1
- [ ] 9.3 Add `--no-draft` flag support in start-knowledge-base skill
- [ ] 9.4 Test single-run workflow (run-1 → final output without additional runs)
- [ ] 9.5 Ensure final output generation works from any run's data

## 10. Integration and Testing

- [ ] 10.1 Update `skills/start-knowledge-base/SKILL.md` to orchestrate run workflow
- [ ] 10.2 Test complete flow: run-1 → draft → feedback → run-2 → draft → final output
- [ ] 10.3 Test incomplete run handling (interrupt mid-learning, resume or start new)
- [ ] 10.4 Test cleanup command with multiple runs
- [ ] 10.5 Test backward compatibility with non-run KB directories
- [ ] 10.6 Verify symlink backward compatibility for kb-analysis installations
- [ ] 10.7 Test status display with 0, 1, 2, and 3+ runs

## 11. Documentation

- [ ] 11.1 Update README.md with iterative learning workflow section
- [ ] 11.2 Add examples of user feedback format to README.md
- [ ] 11.3 Document new directory structure with run folders in README.md
- [ ] 11.4 Add best practices for run management (when to start new run, max active runs)
- [ ] 11.5 Update "How It Works" diagram to show iterative loop
- [ ] 11.6 Add migration guide for existing kb-analysis users
- [ ] 11.7 Update skills reference table with new cleanup-runs skill
- [ ] 11.8 Remove MCP/cloud source documentation and add note about manual export
