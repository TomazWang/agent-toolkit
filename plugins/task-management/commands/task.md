---
name: task
description: Manage development tasks with structured tracking and workflows
usage: |
  /task create <description> [--priority low|medium|high|critical] [--project <name>]
  /task list [--status <status>] [--project <name>] [--priority <priority>]
  /task show <task-id>
  /task update <task-id> [--status <status>] [--priority <priority>]
  /task start <task-id>
  /task link <task-id> <blocks|depends-on> <other-task-id>
  /task archive [--before <date>]
examples:
  - /task create "Implement OAuth2 flow" --priority high
  - /task list --status in-progress
  - /task update TASK-123 --status completed
  - /task start TASK-101
---

# Task Management Command

You are helping the user manage their development tasks. Parse the command arguments and execute the requested operation.

## Command Structure

The user's command will be in the format: `/task <subcommand> [args]`

## Subcommands

### create

Create a new task with optional metadata.

**Process:**
1. Parse the task description and optional flags
2. Generate a unique task ID (format: TASK-NNN)
3. Create task file in `.claude/tasks/<task-id>.md`
4. Add to task index
5. Confirm creation to user

**Task File Format:**
```yaml
---
id: TASK-123
title: Task description
status: backlog
priority: medium
created: 2026-02-05
updated: 2026-02-05
project:
assignee:
tags: []
blocks: []
depends_on: []
---

## Description

[Task description]

## Notes

[Task notes and updates]

## History

- 2026-02-05: Created
```

### list

List tasks with optional filtering.

**Process:**
1. Read task index
2. Apply filters (status, project, priority)
3. Format and display tasks in a table
4. Show summary statistics

**Output Format:**
```
ID        | Title                    | Status      | Priority | Project
----------|--------------------------|-------------|----------|----------
TASK-123  | Implement OAuth2 flow    | in-progress | high     | auth
TASK-124  | Add login form          | backlog     | medium   | auth
TASK-125  | Setup CI/CD             | ready       | high     | infra

3 tasks (1 in-progress, 1 ready, 1 backlog)
```

### show

Show detailed information about a specific task.

**Process:**
1. Read task file
2. Display full task details including:
   - Metadata (status, priority, dates)
   - Description
   - Dependencies (blocks/depends_on)
   - Notes and history
   - Related git branches/commits

### update

Update task metadata.

**Process:**
1. Read task file
2. Update specified fields
3. Add update to history
4. Save task file
5. Update task index
6. Confirm changes to user

### start

Start working on a task (sets status to in-progress and optionally creates git branch).

**Process:**
1. Read task file
2. Check for blocking dependencies
3. Update status to "in-progress"
4. If auto_create_branch enabled:
   - Create git branch: `task-<id>-<slugified-title>`
   - Checkout branch
5. Add TodoWrite items based on task description
6. Confirm task started

### link

Create dependency relationships between tasks.

**Process:**
1. Read both task files
2. Add relationship:
   - `blocks`: Task A blocks Task B (add to A.blocks, add to B.depends_on)
   - `depends-on`: Task A depends on Task B (add to A.depends_on, add to B.blocks)
3. Save both task files
4. Confirm link created

### archive

Archive completed or old tasks.

**Process:**
1. Find tasks matching criteria:
   - Status: completed
   - Optional: Updated before specific date
2. Move tasks to `.claude/tasks/archive/`
3. Update task index
4. Report archived count

## Implementation Notes

- Store tasks in `.claude/tasks/` directory
- Maintain index file at `.claude/tasks/index.json`
- Use YAML frontmatter for metadata
- Generate sequential task IDs
- Integrate with TodoWrite for active tasks
- Check `.claude/task-management.local.md` for project-specific config

## Error Handling

- If task ID doesn't exist: "Task not found: TASK-123"
- If invalid subcommand: Show usage help
- If missing required args: Show subcommand help
- If dependency cycle detected: "Cannot create circular dependency"

## Examples

**Create task:**
```
User: /task create "Implement user authentication" --priority high --project auth

You: Created task TASK-123: "Implement user authentication"
     Status: backlog
     Priority: high
     Project: auth
```

**List tasks:**
```
User: /task list --status in-progress

You: [Display table of in-progress tasks]
```

**Start task:**
```
User: /task start TASK-123

You: Started TASK-123: "Implement user authentication"
     Created branch: task-123-implement-user-authentication

     I've added the following items to your todo list:
     - Research authentication options
     - Design auth flow
     - Implement backend
     - Implement frontend
     - Write tests
```
