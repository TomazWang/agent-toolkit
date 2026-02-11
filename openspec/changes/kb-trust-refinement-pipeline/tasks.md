# Implementation Tasks: KB Trust-Based Refinement Pipeline

## 1. Core Structure & Commands

- [x] 1.1 Create `/kb:init` command skill
- [x] 1.2 Implement trust-based directory creation (sources/wip/output)
- [x] 1.3 Add `.gitignore` generation in init
- [x] 1.4 Create `/kb:continue` command skill (alias for next run)
- [x] 1.5 Add initialization check (prevent double-init)
- [ ] 1.6 Update `start-knowledge-base` to detect run number automatically

## 2. Source Categorization (Run-0)

- [ ] 2.1 Implement run-0 categorization logic in `start-knowledge-base`
- [ ] 2.2 Add code-vs-docs discrepancy detection
- [ ] 2.3 Implement baseline source identification and moving to sources/baseline/
- [ ] 2.4 Add ephemeral source detection (keep in run-0/)
- [ ] 2.5 Implement deprecated source marking (don't delete, just mark)
- [ ] 2.6 Create RUN-0-DECISIONS.md generation with rationale
- [ ] 2.7 Add trust hierarchy logic (code > tests > comments > docs)

## 3. Autonomous Input Selection

- [ ] 3.1 Create input selection algorithm for run-N
- [ ] 3.2 Always include sources/baseline/ in selection
- [ ] 3.3 Include sources/run-N/ for current run
- [ ] 3.4 Carry forward incomplete WIP from run-{N-1}
- [ ] 3.5 Exclude deprecated sources automatically
- [ ] 3.6 Read USER-ANSWERS-RN.md as high-priority source
- [ ] 3.7 Generate INPUT-SELECTION.md documenting choices
- [ ] 3.8 Add confidence-based focus area selection

## 4. WIP Draft Generation

- [ ] 4.1 Modify `distill-kb-knowledge` to generate WIP drafts only
- [ ] 4.2 Create DRAFT-summary.md in wip/run-N/ (not output/)
- [ ] 4.3 Add "⚠️ DRAFT" header to all WIP documents
- [ ] 4.4 Remove automatic output/ directory creation
- [ ] 4.5 Generate findings.md for unresolved items
- [ ] 4.6 Create DISCREPANCIES.md for code-vs-docs mismatches
- [ ] 4.7 Ensure distill skill does NOT write to output/ directory

## 5. Questions System

- [ ] 5.1 Create QUESTIONS-FOR-USER.md generation in distill skill
- [ ] 5.2 Implement question prioritization (Critical/High/Medium/Low)
- [ ] 5.3 Add question format with context, options, and impact
- [ ] 5.4 Create USER-ANSWERS-RN.md template for users
- [ ] 5.5 Implement answer parsing from USER-ANSWERS files
- [ ] 5.6 Add answer-as-correction logic (override previous understanding)
- [ ] 5.7 Track resolved vs unresolved questions across runs

## 6. Output Creation

- [ ] 6.1 Create `/kb:create-output` command skill
- [ ] 6.2 Prompt user for source run and version name
- [ ] 6.3 Copy WIP content from run-N to output/v{version}/
- [ ] 6.4 Generate VERSION-INFO.md with run source, timestamp, confidence
- [ ] 6.5 Transform QUESTIONS-FOR-USER.md to QUESTIONS-v{version}.md
- [ ] 6.6 Remove DRAFT markers from output documents
- [ ] 6.7 Create or update `output/latest` symlink
- [ ] 6.8 Add version comparison (changes from previous version)
- [ ] 6.9 Prevent overwriting existing versions (prompt for confirmation)

## 7. Confidence Tracking

- [ ] 7.1 Create CONFIDENCE.md generation logic
- [ ] 7.2 Implement overall confidence calculation
- [ ] 7.3 Add per-domain confidence tracking
- [ ] 7.4 Document confidence factors (verified sources, gaps)
- [ ] 7.5 Calculate confidence improvements between versions
- [ ] 7.6 Add confidence-based suggestions for next run focus
- [ ] 7.7 Integrate confidence scores with input selection
- [ ] 7.8 Display confidence in VERSION-INFO.md

## 8. Status Display

- [ ] 8.1 Modify `check-kb-status` to show current run number
- [ ] 8.2 Display overall confidence if output exists
- [ ] 8.3 Show pending questions count
- [ ] 8.4 Display suggested next action (continue, create-output, answer questions)
- [ ] 8.5 List available output versions
- [ ] 8.6 Show run history (run-0, run-1, run-2 status)
- [ ] 8.7 Display deprecated sources count

## 9. Migration & Cleanup

- [ ] 9.1 Create migration script for existing kb/ directories
- [ ] 9.2 Detect legacy structure and offer migration
- [ ] 9.3 Add `/kb:cleanup-runs` command to archive old runs
- [ ] 9.4 Implement run archival (move to kb/.archive/)
- [ ] 9.5 Add deprecated source archival after N unused runs
- [ ] 9.6 Create cleanup prompt after 5+ runs accumulate

## 10. Testing

- [ ] 10.1 Test `/kb:init` command creates correct structure
- [ ] 10.2 Test run-0 categorization with mixed sources
- [ ] 10.3 Test autonomous input selection logic
- [ ] 10.4 Test WIP draft generation (no output/ writes)
- [ ] 10.5 Test question generation and user answer parsing
- [ ] 10.6 Test output creation from run-N WIP
- [ ] 10.7 Test confidence tracking across versions
- [ ] 10.8 Test deprecated source exclusion
- [ ] 10.9 Test USER-ANSWERS override logic
- [ ] 10.10 Test full workflow: init → start → continue → create-output
- [ ] 10.11 Test migration from legacy KB structure

## 11. Documentation

- [ ] 11.1 Update README with trust-based workflow overview
- [ ] 11.2 Document new commands (/init, /continue, /create-output)
- [ ] 11.3 Add workflow diagram showing trust hierarchy
- [ ] 11.4 Document source categorization logic and rationale
- [ ] 11.5 Explain confidence scoring methodology
- [ ] 11.6 Provide USER-ANSWERS-RN.md template and examples
- [ ] 11.7 Document RUN-0-DECISIONS.md format
- [ ] 11.8 Add troubleshooting guide (common issues)
- [ ] 11.9 Update "How It Works" section with new workflow
- [ ] 11.10 Document output versioning strategy
- [ ] 11.11 Add migration guide for existing users
- [ ] 11.12 Document deprecated source management

## 12. Integration with Existing Code

- [ ] 12.1 Update `prepare` skill to support baseline vs run-N directories
- [ ] 12.2 Modify `learn-kb-topic` to use confidence-aware learning
- [ ] 12.3 Update agents (code-investigator, discrepancy-hunter) to flag deprecated sources
- [ ] 12.4 Integrate question generation into topic learning loop
- [ ] 12.5 Add confidence estimation to topic completion
- [ ] 12.6 Update `plan-kb-learning` to incorporate USER-ANSWERS feedback

## 13. Advanced Features (Future Enhancements)

- [ ] 13.1 Implement automatic question generation from knowledge gaps
- [ ] 13.2 Add ML-based confidence scoring (vs manual estimation)
- [ ] 13.3 Create version diff tool (compare v0.1 vs v0.2)
- [ ] 13.4 Add output promotion workflow (v0.x → v1.0 criteria)
- [ ] 13.5 Implement source reliability scoring over time
- [ ] 13.6 Add visual confidence dashboard
