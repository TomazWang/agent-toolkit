---
name: start
description: Start a new workflow - auto-detects complexity and orchestrates stages (Spec → Dev → Exec)
argument-hint: <requirement> [--complexity complex|medium|simple]
---

# Workflow Start Command

You are orchestrating a development workflow. Your job is to **detect complexity** and route to the appropriate stage (A/B/C).

## Process

### Step 1: Parse Input

Extract:
- **requirement**: What the user wants to build/fix
- **--stage**: Force specific stage (a/b/c) if provided
- **--research-first**: Do research before routing
- **--skip-research**: Skip research phase

### Step 2: Research Phase (if not skipped)

**Quick investigation:**
```bash
# Check for existing specs
ls openspec/changes/ docs/specs/ 2>/dev/null

# Check codebase structure
find . -name "*.md" -path "*/specs/*"

# Search for related code
grep -r "relevant keywords" --include="*.{js,ts,py}" | head -20
```

**Understand:**
- Does a spec already exist for this?
- What's the current architecture?
- How complex is the codebase?

### Step 3: Complexity Detection (if not forced)

**Analyze requirement to determine Stage A/B/C:**

#### → Stage A (Most Complex)

**Triggers:**
- Keywords: "new project", "architecture", "design", "system", "platform"
- Multiple subsystems involved
- No existing spec found
- Security/compliance critical (payments, auth, data)
- Estimated >15 steps
- User explicitly: `--stage a`

**Examples:**
- "Build multi-tenant SaaS"
- "Design payment system"
- "Architecture for microservices"

#### → Stage B (Normal Complexity)

**Triggers:**
- Keywords: "implement", "add feature", "refactor", "integrate"
- Existing spec found (can create spec change)
- Moderate scope (8-15 steps)
- Some design needed but not architectural
- User explicitly: `--stage b`

**Examples:**
- "Add email notifications"
- "Implement OAuth2"
- "Refactor authentication"

#### → Stage C (Simple)

**Triggers:**
- Keywords: "fix", "update", "quick", "simple", "bug"
- Small scope (<8 steps)
- Single file/component
- No design complexity
- User explicitly: `--stage c`

**Examples:**
- "Fix login button"
- "Update error message"
- "Add validation to form"

### Step 4: When Unclear → Ask User

If complexity is ambiguous:

```
🤔 This requirement could go multiple ways.

Analyzing: "[requirement]"

Recommendation: Stage B (Normal workflow)

Reasoning:
- [Why you think Stage B]
- [What makes it unclear]

Options:
1. **Stage B: Spec Change + TDD** (Recommended)
   - Create spec change document
   - Generate test cases
   - Implement with TDD
   - ~2-4 hours

2. Stage A: Full Spec + Meta-Validation
   - Design complete architecture
   - Validate with PoC tests
   - Then implement
   - ~1-2 days

3. Stage C: Simple Planning
   - Create quick plan
   - Break into tasks
   - Implement directly
   - ~30 min - 2 hours

Which approach? [1/2/3]
```

### Step 5: Route to Block

#### If Stage A:
```
✅ Routing to Stage A: Spec + Meta-Validation

This is a complex requirement that needs careful design.

Process:
1. Research phase (understanding context)
2. Create initial spec
3. Meta-testing (validate spec is workable)
4. Iterate based on test results
5. Finalize spec
6. → Move to Stage B for implementation

Starting Stage A workflow...

[Activate stage-spec skill]
```

#### If Stage B:
```
✅ Routing to Stage B: Spec Change + TDD

This is a standard feature requiring some design.

Process:
1. Research existing specs/code
2. Create spec change document
3. Generate test cases from spec
4. Create implementation plan
5. TDD workflow (RED→GREEN→REFACTOR)
6. Validate against tests

Starting Stage B workflow...

[Activate stage-dev skill]
```

#### If Stage C:
```
✅ Routing to Stage C: Simple Planning

This is a straightforward task.

Process:
1. Quick research (if needed)
2. Create implementation plan
3. Break into tasks (TodoWrite)
4. Implement with task tracking

Starting Stage C workflow...

[Activate stage-exec skill]
```

### Step 6: Integration Check

**Check for installed plugins:**

```bash
# Check for task-management
ls ~/.claude/plugins/task-management 2>/dev/null
→ If exists: Will use /task commands for tracking

# Check for tdd-workflow
ls ~/.claude/plugins/tdd-workflow 2>/dev/null
→ If exists: Will use /tdd commands in Stage B

# Check for openspec
ls openspec/ 2>/dev/null
→ If exists: Will use OpenSpec structure
```

**Inform user:**
```
Integration detected:
✓ task-management → Tasks will be created
✓ tdd-workflow → TDD integration available
✓ OpenSpec → Using openspec/ structure
```

### Step 7: Launch Workflow

**Invoke appropriate skill:**
- Stage A → `stage-spec` skill
- Stage B → `stage-dev` skill
- Stage C → `stage-exec` skill

The skill takes over and executes the workflow.

## Complexity Detection Examples

### Example 1: Clear Stage A

```
User: /workflow:start "Build multi-tenant SaaS platform"

Analysis:
- Keywords: "build", "platform" → Complex
- Scope: Entire system → Large
- Architecture needed: Yes
- Spec exists: No

Decision: Stage A (auto, no question needed)

Output:
✅ Routing to Stage A: Spec + Meta-Validation
This is a complex architectural project requiring careful design...
```

### Example 2: Clear Stage C

```
User: /workflow:start "Fix typo in login error message"

Analysis:
- Keywords: "fix", "typo" → Simple
- Scope: Single string → Tiny
- Steps: <5
- No design needed

Decision: Stage C (auto, no question needed)

Output:
✅ Routing to Stage C: Simple Planning
This is a quick fix...
```

### Example 3: Unclear → Ask

```
User: /workflow:start "Improve app performance"

Analysis:
- Could be Stage A: Complete performance architecture
- Could be Stage B: Targeted optimizations
- Could be Stage C: Quick fix for specific slow query
- Ambiguous scope

Decision: Ask user

Output:
🤔 This requirement could go multiple ways.

Recommendation: Stage B (start targeted, scale up if needed)
- Profile first to identify bottlenecks
- Then optimize specific areas
- Can design full architecture if needed later

Options:
1. Stage B: Profile → Target fixes (Recommended)
2. Stage A: Design complete performance architecture
3. Stage C: Fix specific known slow parts

Which? [1/2/3]
```

## Error Handling

**No requirement provided:**
```
Error: No requirement specified

Usage: /workflow:start <requirement>

Examples:
  /workflow:start "Add user authentication"
  /workflow:start "Fix login bug"
```

**Invalid block specified:**
```
Error: Invalid block 'x'. Must be a, b, or c.

Usage: /workflow:start "..." --stage <a|b|c>
```

**Research fails:**
```
⚠️ Could not complete research phase
Proceeding with workflow based on requirement only...
```

## State Tracking

**Create workflow state file:**

```bash
mkdir -p .claude/workflow/
cat > .claude/workflow/current.json << EOF
{
  "feature": "requirement-slug",
  "stage": "a|b|c",
  "phase": "current-phase",
  "started": "2026-02-05T12:00:00Z",
  "status": "in-progress",
  "tasks": [],
  "next_steps": []
}
EOF
```

This allows `/workflow:status` to show progress.

## Tips for Routing

**Lean toward simpler stages when unsure:**
- Better to start simple and escalate than over-engineer
- User can always use `--stage a` if they want full spec

**Look for these signals:**
- "new", "build", "create" → Potentially Stage A
- "add", "implement", "refactor" → Likely Stage B
- "fix", "update", "change" → Likely Stage C

**Check existing code:**
- Large codebase with specs → Probably Stage B
- No spec, greenfield → Maybe Stage A
- Single file change → Probably Stage C

Your job is to **make the right call** or **ask when uncertain**. The goal is to match complexity to need—not too heavy, not too light.
