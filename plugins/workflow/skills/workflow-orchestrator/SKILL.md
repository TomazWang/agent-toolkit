---
name: workflow-orchestrator
description: Main conductor for unified workflow - orchestrates workflow stages
user-invocable: false
---

# Workflow Orchestrator Skill

## When to Use

Auto-activates when:
- User invokes `/workflow:start`
- User requests to "build", "implement", "add", "create" features
- Any development task requiring structured workflow

## Overview

The orchestrator manages a **unified workflow** with three sequential stages. Based on complexity, stages can be:
- **Executed fully** (complex)
- **Simplified** (medium)
- **Skipped** (simple)

## Unified Workflow

```
┌─────────────────────────────────────────┐
│  WORKFLOW ORCHESTRATOR                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  STAGE A: SPECIFICATION STAGE           │
│  - Analyze requirements                 │
│  - Create spec (SDD + OpenSpec)         │
│  - Validate with PoC (if complex)       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  STAGE B: DEVELOPMENT STAGE             │
│  - Define behaviors (BDD scenarios)     │
│  - Test-driven implementation (TDD)     │
│  - Iterative refinement                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  STAGE C: EXECUTION STAGE               │
│  - Task tracking (if available)         │
│  - Implementation execution             │
│  - Verification & completion            │
└─────────────────────────────────────────┘
```

## Complexity Detection

### Complex Projects (Full Flow)
**Triggers:**
- New system/architecture
- Security-critical features
- >15 steps estimated
- Multiple subsystems
- Unknown requirements

**Workflow:**
```
Stage A: FULL
  ├─ Research existing system
  ├─ Create comprehensive spec (OpenSpec if available)
  ├─ Generate PoC validation tests
  └─ Manual validation questions

Stage B: FULL
  ├─ Define BDD scenarios for all features
  ├─ TDD implementation (RED-GREEN-REFACTOR)
  └─ Continuous spec updates

Stage C: FULL
  ├─ Create tasks (if task-management exists)
  ├─ Track progress per task
  └─ Comprehensive verification
```

### Medium Projects (Streamlined Flow)
**Triggers:**
- Feature additions
- Refactoring
- 8-15 steps estimated
- Existing spec can be extended

**Workflow:**
```
Stage A: SIMPLIFIED
  ├─ Review existing spec
  ├─ Create spec change document
  └─ Skip PoC validation

Stage B: FULL
  ├─ Define BDD scenarios
  ├─ TDD implementation
  └─ Update spec as needed

Stage C: SIMPLIFIED
  ├─ Optional task tracking
  └─ Standard verification
```

### Simple Tasks (Minimal Flow)
**Triggers:**
- Bug fixes
- Small updates
- <8 steps estimated
- Single file/component

**Workflow:**
```
Stage A: SKIP
  └─ No formal spec needed

Stage B: SIMPLIFIED
  ├─ Write tests directly (TDD)
  └─ Implement

Stage C: MINIMAL
  └─ Quick verification
```

## Orchestration Process

### 1. Initialize

```bash
User: /workflow:start "Add user authentication"

Orchestrator:
  1. Analyze request
  2. Detect complexity → COMPLEX
  3. Check integrations:
     - ✓ task-management available
     - ✓ openspec/ directory found
  4. Prepare workflow plan
```

### 2. Execute Stage A (Specification)

**Complex:**
```
→ Invoke: /workflow:spec-stage --mode=full
  1. Research phase
  2. Create OpenAPI spec (using OpenSpec format)
  3. Generate PoC tests (invoke meta-validator agent)
  4. Manual validation questions
  5. Get user approval
```

**Medium:**
```
→ Invoke: /workflow:spec-stage --mode=light
  1. Review existing spec
  2. Create spec change document
  3. Get user approval
```

**Simple:**
```
→ Skip Stage A entirely
```

### 3. Execute Stage B (Development)

**Complex/Medium:**
```
→ Invoke: /workflow:dev-stage --mode=full
  1. Generate BDD scenarios from spec
     - Use /workflow:behavior-driven
  2. For each scenario:
     - Write failing test (RED)
     - Implement feature (GREEN)
     - Refactor (REFACTOR)
     - Use /workflow:test-driven
  3. Update spec as you learn
     - Use /workflow:openspec-integration
```

**Simple:**
```
→ Invoke: /workflow:dev-stage --mode=simple
  1. Write tests directly (TDD)
  2. Implement
  3. Refactor
```

### 4. Execute Stage C (Execution)

**Complex:**
```
→ Invoke: /workflow:exec-stage --mode=full
  1. Create tasks (if task-management exists)
     - Use /workflow:task-integration
  2. For each task:
     - Mark in_progress
     - Execute
     - Mark completed
  3. Comprehensive verification
  4. Final review
```

**Medium:**
```
→ Invoke: /workflow:exec-stage --mode=standard
  1. Optional task tracking
  2. Execute implementation
  3. Standard verification
```

**Simple:**
```
→ Invoke: /workflow:exec-stage --mode=minimal
  1. Run tests
  2. Quick verification
  3. Done
```

## Integration Points

### OpenSpec Integration
```
if [ -d "openspec/" ]; then
  USE_OPENSPEC=true
  BLOCK_A_FORMAT="openspec"
fi
```

### Task Management Integration
```
if task-management plugin exists; then
  USE_TASKS=true
  BLOCK_C_TRACKING="task-based"
fi
```

### SDD Integration
```
For Stage A:
  - Use /workflow:spec-driven-development
  - Create OpenAPI/AsyncAPI specs
```

### BDD Integration
```
For Stage B:
  - Use /workflow:behavior-driven
  - Generate Given-When-Then scenarios
```

### TDD Integration
```
For Stage B:
  - Use /workflow:test-driven-development
  - RED-GREEN-REFACTOR cycle
```

## State Management

Track workflow state in `.claude/workflow-state.md`:

```yaml
---
workflow_id: WF-2026-02-09-001
started: 2026-02-09T10:30:00Z
complexity: complex
status: in_progress
current_block: B
---

# Workflow State

## Request
"Add user authentication with OAuth2"

## Complexity Analysis
- Type: Complex
- Reason: Security-critical, new system
- Estimated steps: 20

## Stage A: Specification ✓
- Spec created: openspec/spec/auth-api.yaml
- PoC validated: Yes
- Approved: 2026-02-09T11:00:00Z

## Stage B: Development (IN PROGRESS)
- BDD scenarios: 8/8 defined
- TDD progress: 4/8 implemented
- Current: Implementing OAuth2 token refresh

## Stage C: Execution (PENDING)
- Tasks created: Yes (TASK-123)
- Subtasks: 0/8 completed
```

## User Interface

**Starting workflow:**
```
User: /workflow:start "Add payment processing"

Orchestrator:
  🔍 Analyzing request...

  Complexity: MEDIUM
  Reason: Feature addition to existing system

  Workflow Plan:
  ┌─ Stage A: Specification (LIGHT)
  │  └─ Update existing payment spec
  ├─ Stage B: Development (FULL)
  │  ├─ BDD scenarios
  │  └─ TDD implementation
  └─ Stage C: Execution (STANDARD)
     └─ Task tracking + verification

  Integrations:
  ✓ OpenSpec (openspec/ found)
  ✓ Task Management (plugin available)

  Proceed? [Y/n]
```

**During execution:**
```
[Stage A] ━━━━━━━━━━━━━━━━━━━━ 100% Complete
[Stage B] ━━━━━━━━━━░░░░░░░░░░  45% In Progress
[Stage C] ░░░░░░░░░░░░░░░░░░░░   0% Pending

Current: Implementing payment validation (TDD)
  RED: Test written ✓
  GREEN: Implementation...
```

## Commands

The orchestrator provides:

**Start workflow:**
```bash
/workflow:start "<description>"
```

**Check status:**
```bash
/workflow:status
# Shows current block, progress, next steps
```

**Skip to block:**
```bash
/workflow:skip-to-b
# Skip Stage A, jump to Stage B
```

**Override complexity:**
```bash
/workflow:start "<description>" --complexity=simple
# Force simple workflow
```

## Decision Matrix

| Complexity | Stage A | Stage B | Stage C |
|------------|---------|---------|---------|
| **Complex** | Full spec + PoC validation | BDD + TDD | Full task tracking |
| **Medium** | Light spec change | BDD + TDD | Standard tracking |
| **Simple** | SKIP | TDD only | Minimal |

## Error Handling

**Block fails:**
```
Stage B failed at step 3/8
  Error: Test failure in OAuth2 validation

Options:
  1. Fix and resume Stage B
  2. Go back to Stage A (update spec)
  3. Switch to simple workflow
```

**User interrupt:**
```
Workflow paused at Stage B, step 4/8
State saved to: .claude/workflow-state.md

Resume anytime with: /workflow:resume
```

## Best Practices

**DO:**
- Let orchestrator decide complexity
- Follow block sequence (A → B → C)
- Save state between sessions
- Use integrations when available

**DON'T:**
- Skip stages manually (unless justified)
- Mix workflows (stay in one flow)
- Ignore orchestrator recommendations
- Force complexity level without reason

## Example Flows

**Complex Project:**
```
/workflow:start "Build real-time chat system"
→ Complexity: COMPLEX
→ Stage A: Full spec + PoC (30 min)
→ Stage B: BDD + TDD (2 hours)
→ Stage C: Task execution (3 hours)
Total: ~5.5 hours
```

**Medium Feature:**
```
/workflow:start "Add email notifications"
→ Complexity: MEDIUM
→ Stage A: Spec change (10 min)
→ Stage B: BDD + TDD (1 hour)
→ Stage C: Implementation (1 hour)
Total: ~2 hours
```

**Simple Fix:**
```
/workflow:start "Fix login button styling"
→ Complexity: SIMPLE
→ Stage A: SKIP
→ Stage B: Direct TDD (15 min)
→ Stage C: Quick verify (5 min)
Total: ~20 minutes
```
