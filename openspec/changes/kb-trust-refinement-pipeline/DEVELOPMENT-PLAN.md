# KB Trust-Based Pipeline - Development Plan

## Overview

Incremental implementation strategy for the trust-based refinement pipeline, broken into phases that can be independently developed and tested.

## Phase 1: Foundation ✅ COMPLETE (5 tasks)

**Status**: Complete
**Duration**: 1 hour

**Deliverables**:
- ✅ `/kb:init` command - trust-based directory structure
- ✅ `/kb:continue` command - run iteration advancement
- ✅ Initialization checks and .gitignore

**Testing**: Manual verification of directory creation

---

## Phase 2: Core Workflow (47 tasks) ← NEXT

**Priority**: HIGH - Core functionality
**Duration**: 6-8 hours

### 2A: Source Categorization (7 tasks: 2.1-2.7, 1.6)

Modify `start-knowledge-base` to implement run-0 categorization:
- Detect run number automatically
- Analyze sources for baseline vs ephemeral vs deprecated
- Generate RUN-0-DECISIONS.md with rationale
- Implement trust hierarchy (code > tests > comments > docs)
- Move baseline sources to sources/baseline/

**Files Modified**:
- `skills/start-knowledge-base/SKILL.md`

**Testing**: Run with mixed sources (code, old docs, contradictory docs)

### 2B: Autonomous Input Selection (8 tasks: 3.1-3.8)

Create input selection algorithm for run-N:
- Include baseline + run-N sources
- Carry forward incomplete WIP
- Exclude deprecated sources
- Read USER-ANSWERS as high-priority corrections
- Generate INPUT-SELECTION.md
- Focus on low-confidence areas

**Files Modified**:
- `skills/start-knowledge-base/SKILL.md` (add input selection logic)
- `skills/prepare/SKILL.md` (update for run-N directories)

**Testing**: Run-1 with user answers, verify correct inputs selected

### 2C: WIP Draft Generation (7 tasks: 4.1-4.7)

Modify `distill-kb-knowledge` to generate WIP only:
- Write DRAFT-summary.md to wip/run-N/ (NOT output/)
- Add "⚠️ DRAFT" headers
- Generate findings.md for incomplete items
- Create DISCREPANCIES.md for code-vs-docs conflicts
- Never write to output/ directory

**Files Modified**:
- `skills/distill-kb-knowledge/SKILL.md`

**Testing**: Verify no output/ writes, drafts have DRAFT markers

### 2D: Questions System (7 tasks: 5.1-5.7)

Add question generation and answer parsing:
- Generate QUESTIONS-FOR-USER.md with prioritization
- Format questions with context/options/impact
- Parse USER-ANSWERS-RN.md files
- Apply answers as corrections (override previous understanding)
- Track resolved vs unresolved questions

**Files Modified**:
- `skills/distill-kb-knowledge/SKILL.md` (question generation)
- `skills/start-knowledge-base/SKILL.md` (answer parsing)

**Testing**: Generate questions, provide answers, verify corrections applied

### 2E: Output Creation (9 tasks: 6.1-6.9)

Create `/kb:create-output` command:
- Prompt for source run and version name
- Copy WIP from run-N to output/v{version}/
- Generate VERSION-INFO.md with metadata
- Transform QUESTIONS-FOR-USER → QUESTIONS-v{version}
- Remove DRAFT markers
- Create/update `latest` symlink
- Add version comparison
- Prevent overwriting

**Files Created**:
- `skills/create-output/SKILL.md`

**Testing**: Create v0.1 from run-1, verify structure and content

### 2F: Confidence Tracking (9 tasks: 7.1-7.9, includes 7.8 from earlier)

Implement confidence scoring:
- Calculate overall + per-domain confidence
- Document confidence factors (verified vs uncertain)
- Track improvements between versions
- Suggest focus areas for next run
- Integrate with input selection
- Display in VERSION-INFO.md and CONFIDENCE.md

**Files Modified**:
- `skills/distill-kb-knowledge/SKILL.md` (confidence calculation)
- `skills/create-output/SKILL.md` (confidence display)
- `skills/start-knowledge-base/SKILL.md` (confidence-based focus)

**Testing**: Verify confidence changes tracked across versions

**Phase 2 Milestone**: Full workflow functional (init → start → continue → create-output)

---

## Phase 3: Status & Integration (13 tasks)

**Priority**: MEDIUM - Quality of life improvements
**Duration**: 2-3 hours

### 3A: Status Display (7 tasks: 8.1-8.7)

Enhance `check-kb-status`:
- Show current run number
- Display overall confidence
- Show pending questions count
- Suggest next action
- List output versions
- Show run history
- Display deprecated sources count

**Files Modified**:
- `skills/check-kb-status/SKILL.md`

**Testing**: Verify status shows accurate information at each workflow stage

### 3B: Existing Skill Integration (6 tasks: 12.1-12.6)

Update existing skills for trust-based workflow:
- `prepare`: Support baseline vs run-N directories
- `learn-kb-topic`: Confidence-aware learning
- Agents: Flag deprecated sources
- `plan-kb-learning`: Incorporate USER-ANSWERS feedback
- Add question generation to topic learning
- Add confidence estimation to topic completion

**Files Modified**:
- `skills/prepare/SKILL.md`
- `skills/learn-kb-topic/SKILL.md`
- `skills/plan-kb-learning/SKILL.md`
- `agents/code-investigator.md`
- `agents/discrepancy-hunter.md`

**Testing**: Full workflow with all skills integrated

**Phase 3 Milestone**: Polished user experience

---

## Phase 4: Migration & Cleanup (6 tasks)

**Priority**: MEDIUM - Backward compatibility
**Duration**: 2 hours

### 4A: Migration (2 tasks: 9.1-9.2)

Support legacy KB structure:
- Detect legacy kb/ directories
- Offer migration to trust-based structure
- Preserve existing data

**Files Created**:
- `skills/migrate/SKILL.md` or integrate into init

**Testing**: Migrate existing KB, verify data preserved

### 4B: Cleanup (4 tasks: 9.3-9.6)

Add cleanup commands:
- `/kb:cleanup-runs` - archive old runs
- Implement run archival to kb/.archive/
- Archive deprecated sources after N runs
- Prompt after 5+ runs accumulate

**Files Created**:
- `skills/cleanup-runs/SKILL.md`

**Testing**: Archive runs, verify structure cleaned up

**Phase 4 Milestone**: Production-ready for existing users

---

## Phase 5: Testing (11 tasks)

**Priority**: HIGH - Validation
**Duration**: 3-4 hours

Tasks 10.1-10.11: Comprehensive testing of each workflow stage

**Approach**:
1. Unit tests for each command
2. Integration tests for full workflow
3. Edge case testing (errors, interruptions)
4. Legacy migration testing

**Deliverables**:
- Test suite or manual test checklist
- Known issues documented
- Edge cases handled

**Phase 5 Milestone**: Validated and stable

---

## Phase 6: Documentation (12 tasks)

**Priority**: HIGH - Usability
**Duration**: 2-3 hours

Tasks 11.1-11.12: Comprehensive documentation

**Sections**:
- README with trust-based workflow overview
- Command reference (/init, /continue, /create-output)
- Workflow diagrams
- Source categorization guide
- Confidence scoring methodology
- USER-ANSWERS template and examples
- Troubleshooting guide
- Migration guide

**Files Modified**:
- `README.md`
- Create `docs/` directory with guides

**Phase 6 Milestone**: User-ready documentation

---

## Phase 7: Advanced Features (6 tasks)

**Priority**: LOW - Future enhancements
**Duration**: 4-6 hours

Tasks 13.1-13.6: Nice-to-have features

- Automatic question generation
- ML-based confidence scoring
- Version diff tool
- Output promotion workflow
- Source reliability scoring
- Visual confidence dashboard

**Status**: Deferred to future releases

---

## Implementation Strategy

### Development Order

1. **Phase 1**: Foundation ✅ DONE
2. **Phase 2**: Core workflow (implement sections 2A → 2F sequentially)
3. **Phase 3**: Integration & status (parallel with testing)
4. **Phase 4**: Migration & cleanup (parallel with documentation)
5. **Phase 5**: Testing (continuous throughout)
6. **Phase 6**: Documentation (parallel with phases 3-4)
7. **Phase 7**: Advanced features (future)

### Testing Approach

**Per Phase**:
- Unit test each skill as implemented
- Integration test at phase boundaries
- Manual verification before moving to next phase

**Full Workflow Test** (after Phase 2):
```bash
/kb:init
# Add sources to run-0/
/kb:start        # Categorizes, runs run-0
# Review WIP, answer questions
/kb:continue     # Runs run-1
# Review WIP
/kb:create-output # Creates v0.1
/kb:status       # Verify state
```

### Risk Mitigation

**Risk**: Complex modifications to existing skills break current functionality
**Mitigation**: Test after each modification, keep git history clean

**Risk**: 100 tasks is large scope, may need course correction
**Mitigation**: Phased approach allows reassessment after each phase

**Risk**: Edge cases not covered
**Mitigation**: Comprehensive testing phase before release

---

## Current Status

- **Phase 1**: ✅ Complete (5/5 tasks)
- **Phase 2**: ⏳ Ready to start (0/47 tasks)
- **Phase 3**: ⏸ Blocked by Phase 2 (0/13 tasks)
- **Phase 4**: ⏸ Blocked by Phase 2 (0/6 tasks)
- **Phase 5**: ⏸ Blocked by Phase 2 (0/11 tasks)
- **Phase 6**: ⏸ Blocked by Phase 2 (0/12 tasks)
- **Phase 7**: 🔮 Future (0/6 tasks)

**Total Progress**: 5/100 tasks (5%)

**Next Action**: Begin Phase 2A - Source Categorization (7 tasks)

---

## Time Estimates

| Phase | Tasks | Duration | Status |
|-------|-------|----------|--------|
| 1. Foundation | 5 | 1 hour | ✅ Done |
| 2. Core Workflow | 47 | 6-8 hours | ⏳ Next |
| 3. Integration | 13 | 2-3 hours | ⏸ Waiting |
| 4. Migration | 6 | 2 hours | ⏸ Waiting |
| 5. Testing | 11 | 3-4 hours | ⏸ Waiting |
| 6. Documentation | 12 | 2-3 hours | ⏸ Waiting |
| 7. Advanced | 6 | 4-6 hours | 🔮 Future |
| **Total** | **100** | **20-27 hours** | 5% complete |

**Recommended Approach**: Complete Phases 1-6 (94 tasks), defer Phase 7
**Estimated Time to MVP**: ~18-24 hours of focused development
