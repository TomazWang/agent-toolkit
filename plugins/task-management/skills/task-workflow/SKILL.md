---
name: task-workflow
description: Use when starting any multi-step development task - provides structured workflow for task breakdown and tracking
---

# Task Workflow Skill

Use this skill when beginning any development task that involves multiple steps or requires structured tracking.

## When to Use

- User asks you to implement a feature
- Starting a bug fix that requires investigation
- Beginning any work that will span multiple files or steps
- User mentions "task" or "todo" explicitly

## The Workflow

### 1. Check for Existing Task

First, check if a task already exists for this work:

```bash
/task list --status backlog,ready,in-progress
```

If no task exists and this is non-trivial work, ask user:
"Should I create a task for tracking this work?"

### 2. Break Down the Work

Analyze the requested work and break it into concrete steps:

- **Understand scope:** What files/systems are involved?
- **Identify dependencies:** What must happen first?
- **Define success criteria:** How do we know it's done?
- **Estimate complexity:** Simple, moderate, complex?

### 3. Create Structured Todos

Use TodoWrite to create actionable items:

```
Principles:
- Each todo should be specific and measurable
- Order todos by dependency (prerequisites first)
- Include verification steps (testing, review)
- Mark one todo as in_progress at a time
```

Example:
```
1. Research existing authentication patterns in codebase
2. Design authentication flow
3. Implement backend authentication service
4. Add authentication middleware
5. Create login/logout endpoints
6. Implement frontend login form
7. Add authentication state management
8. Write unit tests for auth service
9. Write integration tests for auth flow
10. Update documentation
```

### 4. Link to Task (If Exists)

If a task was created, reference it in commits and updates:

```bash
git commit -m "Add authentication service [TASK-123]"
```

### 5. Track Progress

As you work:
- Update TodoWrite status in real-time
- Mark completed items immediately
- Add new todos if you discover additional work
- Update task notes with important decisions

### 6. Completion

When finished:
- Verify all todos are completed
- Run tests and validation
- Update task status: `/task update TASK-123 --status completed`
- Create commit or PR

## Integration with Other Skills

**With brainstorming:**
- Use brainstorming first to design the solution
- Then use task-workflow to break down implementation

**With tdd-workflow:**
- task-workflow provides the overall structure
- tdd-workflow guides each implementation step

**With planning-workflow:**
- planning-workflow creates the high-level plan
- task-workflow executes individual plan items

## Example Usage

```
User: "I need to add a dark mode toggle to the app"
Assistant (using task-workflow skill):

I'll help you add dark mode. Let me check if there's an existing task...

[Checks /task list]

No existing task found. Let me break this down:

Scope: Theme system, UI components, user preferences
Dependencies: Need to understand current styling approach first
Success: User can toggle dark mode, preference persists
Complexity: Moderate - touches many files but straightforward

I'll create todos for this work:

[Creates TodoWrite items:]
1. Explore current theme/styling system
2. Design dark mode color scheme
3. Implement theme context/provider
4. Update CSS variables for dark mode
5. Add toggle component to UI
6. Persist theme preference
7. Test all components in dark mode
8. Update documentation

Starting with exploring the current theme system...
```

## Key Principles

- **Always break work down** - Even "simple" tasks have multiple steps
- **Track in real-time** - Update todos as you work, not after
- **One thing at a time** - Only one todo in_progress at once
- **Verify completion** - Don't mark done until tests pass
- **Link to tasks** - Reference task IDs in commits for traceability

## Red Flags

These thoughts mean you should use this skill:

- "Let me just implement this quickly" → STOP, use task-workflow
- "This is straightforward" → Still break it down
- "I know what to do" → Document the steps anyway
- "This won't take long" → Time doesn't matter, structure does

The discipline of structured workflow prevents mistakes and missed steps.
