# Workflow Plugin

**Unified development workflow**: SDD (Spec) → BDD (Behavior) → TDD (Test) with intelligent orchestration.

## Philosophy

One streamlined workflow with three **sequential stages** that adapt to complexity:

```
┌─────────────────────────────────────────┐
│  Stage A: SPECIFICATION                 │
│  Create spec using SDD + OpenSpec       │
│  Can be: Full / Light / Skip            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Stage B: DEVELOPMENT                   │
│  Define behaviors (BDD) + Implement (TDD)│
│  Can be: Full / Simplified              │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Stage C: EXECUTION                     │
│  Task tracking + Verification           │
│  Can be: Full / Standard / Minimal      │
└─────────────────────────────────────────┘
```

**The orchestrator** decides which parts to execute, simplify, or skip based on complexity.

## Source Attribution

This plugin synthesizes patterns from:
- [OpenSpec by Fission-AI](https://github.com/Fission-AI/OpenSpec) - Fluid, iterative specification
- [Superpowers](https://github.com/obra/superpowers) - TDD and BDD workflows
- Original design for orchestrated workflow integration

## How It Works

### Complexity Levels

**Complex Projects:**
- Stage A: FULL (complete spec + PoC validation)
- Stage B: FULL (BDD scenarios + TDD implementation)
- Stage C: FULL (task tracking + comprehensive verification)

**Medium Projects:**
- Stage A: LIGHT (spec change document)
- Stage B: FULL (BDD + TDD)
- Stage C: STANDARD (optional tasks + verification)

**Simple Tasks:**
- Stage A: SKIP
- Stage B: SIMPLIFIED (direct TDD)
- Stage C: MINIMAL (quick verification)

## The Three Stages

### Stage A: Specification (SDD)

**Purpose:** Define what to build

**Complex Mode:**
1. Research existing system
2. Create comprehensive spec (OpenAPI if API)
3. Generate PoC validation tests
4. Manual validation questions
5. Iterate spec based on feedback
6. Get user approval

**Light Mode:**
1. Review existing spec
2. Create spec change document
3. Get user approval

**Skip Mode:**
- No spec needed for simple tasks

**Uses:**
- `spec-driven-development` skill (auto-activates)
- `openspec-integration` skill (auto-activates if `openspec/` exists)
- `meta-testing` skill (auto-activates for PoC validation)

### Stage B: Development (BDD + TDD)

**Purpose:** Implement with behavior-first, test-driven approach

**Full Mode:**
1. Define BDD scenarios (Given-When-Then)
2. For each scenario:
   - Write failing test (RED)
   - Implement feature (GREEN)
   - Refactor (REFACTOR)
3. Update spec as you learn

**Simplified Mode:**
1. Write tests directly (TDD)
2. Implement
3. Refactor

**Uses:**
- `behavior-driven` skill (auto-activates for BDD scenarios)
- `test-driven-development` skill (auto-activates for TDD cycle)
- `openspec-integration` skill (auto-activates for spec updates)

### Stage C: Execution (Task Tracking)

**Purpose:** Track progress and verify completion

**Full Mode:**
1. Create tasks (if task-management plugin exists)
2. Break into subtasks
3. Execute with tracking
4. Comprehensive verification

**Standard Mode:**
1. Optional task tracking
2. Execute implementation
3. Standard verification

**Minimal Mode:**
1. Run tests
2. Quick verification
3. Done

**Uses:**
- `task-integration` skill (auto-activates if task-management available)

## Commands

### `/workflow:start-development-workflow <description>`

**Main entry point.** Analyzes complexity and orchestrates the flow.

```bash
# Auto-detect complexity
/workflow:start-development-workflow "Add OAuth2 authentication"

# Override complexity
/workflow:start-development-workflow "Build payment system" --complexity=complex
/workflow:start-development-workflow "Fix button styling" --complexity=simple
```

**The orchestrator will:**
1. Analyze the request
2. Detect complexity (complex/medium/simple)
3. Check for integrations (OpenSpec, task-management)
4. Show workflow plan
5. Execute stages sequentially

### `/workflow:check-workflow-status`

Check current workflow progress.

```bash
/workflow:check-workflow-status

# Shows:
# - Current stage (A/B/C)
# - Progress within stage
# - Completed steps
# - Next steps
```

### `/workflow:create-workflow-spec`

Manually work on Stage A (specification).

```bash
/workflow:create-workflow-spec "User Authentication API"
```

## Integration with Other Plugins

### OpenSpec

**Auto-detects `openspec/` directory:**
- Uses OpenSpec format for all specs
- Stores specs in `openspec/spec/`
- Follows fluid, iterative philosophy
- Version specs as they evolve

**Without OpenSpec:**
- Uses standard `docs/api/` or `docs/specs/` structure

### task-management Plugin

**If installed:**
- Stage C automatically creates tasks
- Breaks work into trackable subtasks
- Links workflow phases to task IDs
- Synchronized progress tracking

**If not installed:**
- Falls back to simple verification

## Workflow Orchestrator

The **workflow-orchestrator** skill is the brain of the system:

1. **Analyzes request** → Determines complexity
2. **Checks integrations** → Detects OpenSpec, task-management
3. **Plans workflow** → Decides which stages to execute/simplify/skip
4. **Executes sequentially** → Stage A → B → C
5. **Adapts dynamically** → Can switch modes mid-flow

## Example: Complex Project

```bash
User: /workflow:start-development-workflow "Add payment processing with Stripe"

Orchestrator Analysis:
  Complexity: COMPLEX
  Reason: Payment = security-critical, new integration
  Estimated steps: 25

Workflow Plan:
  Stage A: FULL (OpenAPI spec + PoC validation)
  Stage B: FULL (BDD scenarios + TDD)
  Stage C: FULL (Task tracking + verification)

Integrations:
  ✓ OpenSpec (openspec/ found)
  ✓ Task Management (plugin available)

Proceed? [Y/n]

─────────────────────────────────────────

Stage A: Specification
  ✓ Research existing payment code
  ✓ Create OpenAPI spec (openspec/spec/payment-api.yaml v0.1.0)
  ✓ Generate PoC tests
    ✓ Test Stripe connection
    ✓ Test payment creation
    ✓ Test webhook handling
  ✓ Manual validation
    Q: "How to handle concurrent payments?" → Add idempotency
    Q: "Webhook security?" → Add signature verification
  ✓ Update spec to v0.3.0
  ✓ User approval received

Stage B: Development
  ✓ Generate BDD scenarios (12 scenarios)
  ✓ TDD Implementation
    Scenario 1: Process credit card payment
      ✓ RED: Test written
      ✓ GREEN: Implementation passes
      ✓ REFACTOR: Code cleaned
    Scenario 2: Handle payment failure
      ✓ RED: Test written
      ✓ GREEN: Implementation passes
      ✓ REFACTOR: Code cleaned
    ... (10 more scenarios)
  ✓ Spec updated to v1.0.0 (marked STABLE)

Stage C: Execution
  ✓ Created TASK-456 "Payment Processing"
  ✓ Subtasks created (12 subtasks)
  ✓ All subtasks completed (12/12)
  ✓ All tests passing (47/47)
  ✓ Comprehensive verification complete

✅ Workflow complete!
```

## Example: Simple Task

```bash
User: /workflow:start-development-workflow "Fix login button alignment"

Orchestrator Analysis:
  Complexity: SIMPLE
  Reason: CSS fix, single file
  Estimated steps: 3

Workflow Plan:
  Stage A: SKIP
  Stage B: SIMPLIFIED (Direct TDD)
  Stage C: MINIMAL (Quick verify)

Proceed? [Y/n]

─────────────────────────────────────────

Stage A: Specification
  ⊘ Skipped (not needed for simple task)

Stage B: Development
  ✓ Write test: "Login button should be center-aligned"
  ✓ Implement: Update CSS
  ✓ Test passes

Stage C: Execution
  ✓ All tests passing
  ✓ Quick verification complete

✅ Workflow complete!
```

## Configuration

Create `.claude/workflow.local.md`:

```yaml
---
complexity_override: auto  # auto, complex, medium, simple
openspec_enabled: true
task_management_integration: true
auto_approve_specs: false
---

# Project Workflow Configuration

Custom settings and notes for this project.
```

## Skills Included

**User-invocable:**
- **start**: Start new workflow with complexity detection (`/workflow:start-development-workflow`)
- **spec**: Manually work on Stage A specification (`/workflow:create-workflow-spec`)
- **status**: Check current workflow progress (`/workflow:check-workflow-status`)
- **plan**: Create simple plans for straightforward tasks (`/workflow:plan-simple-workflow`)

**Auto-activating:**
- **workflow-orchestrator**: Main conductor that orchestrates stages
- **stage-spec**: Stage A (Specification) execution
- **stage-dev**: Stage B (Development) execution
- **stage-exec**: Stage C (Execution) execution
- **spec-driven-development**: SDD patterns (OpenAPI/AsyncAPI)
- **behavior-driven**: BDD scenarios (Given-When-Then)
- **test-driven-development**: TDD cycle (RED-GREEN-REFACTOR)
- **openspec-integration**: OpenSpec format support
- **task-integration**: task-management plugin integration
- **meta-testing**: PoC validation tests

## Tips

- **Let the orchestrator decide**: Trust complexity detection
- **Specs are fluid**: Update as you learn (OpenSpec philosophy)
- **BDD before TDD**: Define behaviors first, then test-drive implementation
- **Track with tasks**: Use task-management plugin for complex work
- **Iterate freely**: Stages are checkpoints, not barriers

## Workflow Benefits

✅ **One unified flow** (no parallel routes)
✅ **Adapts to complexity** (stages simplify/skip automatically)
✅ **Spec-driven** (SDD with OpenSpec)
✅ **Behavior-first** (BDD scenarios)
✅ **Test-driven** (TDD implementation)
✅ **Tracked** (task-management integration)
✅ **Validated** (PoC testing before implementation)

## Sources

- [OpenSpec](https://github.com/Fission-AI/OpenSpec) - Fluid specification philosophy
- [Superpowers](https://github.com/obra/superpowers) - TDD, BDD, systematic workflows
