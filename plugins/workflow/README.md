# Workflow Plugin

Unified development workflow with automatic complexity detection: **Spec → Plan → Task**

## Philosophy

Three gears for three complexity levels:

> **Block A** (Complex): Spec + Meta-Validation → Implementation
> **Block B** (Normal): Spec Change + TDD → Implementation
> **Block C** (Simple): Plan → Tasks → Implementation

The system auto-detects complexity and routes to the appropriate workflow.

## Source Attribution

This plugin synthesizes patterns from:
- [OpenSpec by Fission-AI](https://github.com/Fission-AI/OpenSpec) - Spec-driven development
- [Superpowers](https://github.com/obra/superpowers) - Systematic workflows (TDD, planning)
- Original design for integrated workflow orchestration

## The Three Blocks

### Block A: Spec + Meta-Validation (Most Complex)

**When:** New projects, complex features, architectural decisions

**Process:**
1. Research (read existing specs/docs)
2. Create initial spec (temporary)
3. **Meta-testing** (validates spec is workable):
   - Auto-generated PoC tests
   - Manual validation questions
   - Complexity checks
4. Iterate spec based on test results
5. Finalize spec → Move to Block B

**Skip if:** Requirement doesn't need complex thinking/design

### Block B: Spec Change + TDD (Normal Job)

**When:** Standard features, changes with design impact

**Process:**
1. Create spec change document
2. Convert spec → Test cases + Plans
3. **TDD workflow** (integrates with tdd-workflow plugin):
   - Write failing tests (RED)
   - Implement to pass (GREEN)
   - Refactor (REFACTOR)
4. Validate against test cases

**Skip if:** Task is simple (<8 steps)

### Block C: Simple Planning (Simplest)

**When:** Small tasks, bug fixes, simple features

**Process:**
1. Create implementation plan
2. Plans → Tasks (TodoWrite)
3. Implement with task tracking

**Always active:** TodoWrite task tracking in all blocks

## Commands

### `/workflow:start <requirement>`

Main entry point. Auto-detects complexity and routes to A/B/C.

```bash
# Auto-detect
/workflow:start "Add OAuth2 authentication"

# Force specific block
/workflow:start "Build payment system" --block a
/workflow:start "Add notifications" --block b
/workflow:start "Fix button" --block c

# With context
/workflow:start "Refactor auth" --research-first
```

### `/workflow:spec`

Manually enter Block A (spec creation + meta-validation).

```bash
/workflow:spec create "Multi-tenant system"
/workflow:spec validate              # Run meta-tests
/workflow:spec finalize              # Move to Block B
```

### `/workflow:plan`

Manually enter Block C (simple planning).

```bash
/workflow:plan "Add dark mode"
/workflow:plan "Fix login" --skip-research
```

### `/workflow:status`

Check current workflow state and progress.

```bash
/workflow:status

# Shows:
# - Current block (A/B/C)
# - Feature being worked on
# - Phase/status
# - Tasks completed/remaining
# - Next steps
```

## Complexity Detection

**Auto-routes to Block A (Complex):**
- Keywords: "new project", "architecture", "design", "system"
- Estimated >15 steps
- Multiple subsystems
- No existing spec
- User: `--block a`

**Auto-routes to Block B (Normal):**
- Keywords: "implement", "add feature", "refactor"
- Existing spec found
- 8-15 estimated steps
- Moderate complexity
- User: `--block b`

**Auto-routes to Block C (Simple):**
- Keywords: "fix", "quick", "simple"
- <8 estimated steps
- Single file/component
- User: `--block c`

**When unclear:** Asks user with recommendation

## Integration with Other Plugins

### task-management Plugin

**If installed:**
- Creates tasks using `/task` commands
- Links workflow phases to task IDs
- Tasks visible in task-management UI
- Synchronized tracking

**If not installed:**
- Falls back to TodoWrite only

### tdd-workflow Plugin

**Block B auto-integrates:**
- Generates test cases from spec
- Launches `/tdd:start` with tests
- Validates implementation against tests

### OpenSpec

**Auto-detects `openspec/` directory:**
- Block A → `openspec/changes/[feature]/`
  - proposal.md, meta-tests.md, design.md
- Block B → `openspec/changes/[feature]/`
  - spec-change.md, tests.md, tasks.md

**Without OpenSpec:**
- Uses `docs/specs/` structure

## Meta-Testing (Block A)

Validates specs are workable before implementation.

**Two approaches:**

### 1. Auto-Generated PoC Tests
- System generates minimal test code
- Runs basic validation
- Example: "Can we connect to this API?"

### 2. Manual Validation Questions
- "Does this scale to N users?"
- "Is complexity justified?"
- "Are there simpler alternatives?"

**Both used case-by-case** for thorough validation.

## Example: Complete Flow

```
User: /workflow:start "Add payment processing"

Router Analysis:
→ Complexity: High (payments = sensitive)
→ Steps: ~20
→ Recommendation: Block A

Block A: Spec + Meta-Validation
→ Research existing code
→ Create initial spec (Stripe integration)
→ Auto PoC: Test Stripe connection ✅
→ Auto PoC: Test payment creation ✅
→ Manual Q: "Webhook security?" → Add verification
→ Iterate spec
→ Finalize: openspec/changes/payment/design.md

Block B: Implementation
→ Spec change: Phase 1 - Integration
→ Generate 12 test scenarios
→ Create 18-step plan
→ Integration: Create 18 tasks in task-management
→ Launch TDD workflow
→ Implement & validate
→ ✅ Complete

Status:
✅ All tests passing (12/12)
✅ All tasks completed (18/18)
```

## Configuration

Create `.claude/workflow.local.md`:

```yaml
---
default_block: auto  # auto, a, b, c
openspec_enabled: true
task_management_integration: true
tdd_integration: true
meta_testing_mode: both  # auto, manual, both
---

# Project Workflow Notes

Project-specific context and preferences.
```

## Skip Logic

**Automatic skips:**
- Skip Block A → B: Spec exists, small scope, no architecture
- Skip Block B → C: Very small (<8 steps), no tests needed

**Ask user when unclear:**
```
Recommendation: Block B (Recommended)
- [Reasoning]

Options:
1. Block B (Recommended)
2. Block A (Full spec)
3. Block C (Simple)

Which?
```

## Tips

- **Start simple:** Let system detect complexity
- **Override when needed:** Use `--block` flags
- **Iterate freely:** Specs and plans are living documents
- **Trust the routing:** System learns patterns over time

## Workflow Benefits

- **Always tracked:** TodoWrite integration in all blocks
- **Right-sized:** Complexity matches task needs
- **Validated:** Meta-testing prevents bad specs
- **Integrated:** Works with existing plugins
- **Flexible:** Manual override available

## Sources

- [OpenSpec](https://github.com/Fission-AI/OpenSpec) - Spec-driven development philosophy
- [Superpowers](https://github.com/obra/superpowers) - TDD and systematic workflows
