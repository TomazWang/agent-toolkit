# Task Management Plugin

Structured task tracking and project workflow management for Claude Code.

## Source Attribution

This plugin is inspired by patterns from:
- [Anthropic Claude Code Official Plugins](https://github.com/anthropics/claude-code/tree/main/plugins) - Plugin architecture
- [Superpowers](https://github.com/obra/superpowers) - Workflow patterns

## Features

- Create and track tasks with structured metadata
- Organize tasks by project, priority, and status
- Built-in workflows for common development patterns
- Integration with git branches and commits
- Task dependencies and blocking relationships
- Auto-activating workflow guidance

## Skills

### `/task-management:tasks`

**Main task management skill** with subcommand-style arguments for managing development tasks.

```bash
# Create a new task
/task-management:tasks create "Implement user authentication"

# Create with metadata
/task-management:tasks create "Fix login bug" --priority high --project auth

# List tasks
/task-management:tasks list
/task-management:tasks list --status in-progress
/task-management:tasks list --project frontend

# Update task status
/task-management:tasks update TASK-123 --status completed

# Show task details
/task-management:tasks show TASK-123

# Link tasks with dependencies
/task-management:tasks link TASK-123 blocks TASK-124

# Archive completed tasks
/task-management:tasks archive --before 2026-01-01
```

**Subcommands:**
- `create` - Create a new task with optional metadata
- `list` - List tasks with optional filtering
- `show` - Show detailed task information
- `update` - Update task metadata
- `start` - Start working on a task (sets in-progress, creates git branch)
- `link` - Create dependency relationships between tasks
- `archive` - Archive completed or old tasks

### `/task-management:plan`

**Project planning skill** for planning new projects or large features.

```bash
# Invoke directly for planning
/task-management:plan
```

Guides you through:
- Requirements gathering
- Architecture design
- Task decomposition
- Priority setting
- Timeline estimation (as milestones, not dates)

**When to use:**
- Starting a greenfield project
- Planning a major feature (>5 related tasks)
- Beginning a refactoring effort
- User asks "how should I structure this?"

### `task-workflow` (Auto-activates)

**Automatically activates** when starting multi-step development tasks.

Provides structured workflow for:
- Breaking down complex tasks into manageable steps
- Creating task dependencies
- Tracking progress through TodoWrite integration
- Suggesting next steps based on current state

**Not directly invocable** - activates based on context.

## Agents

### `tm-task-organizer`

Specialized agent that analyzes your current work and:
- Identifies related tasks
- Suggests task groupings
- Detects blocking dependencies
- Recommends priority adjustments
- Finds circular dependencies
- Suggests task breakdowns for oversized tasks

## Usage

### Basic Workflow

1. **Create tasks** for your work:
   ```bash
   /task-management:tasks create "Add dark mode toggle"
   /task-management:tasks create "Update theme system"
   ```

2. **The task-workflow skill** automatically activates during implementation

3. **Tasks integrate** with TodoWrite for real-time progress tracking

4. **Mark complete** as you finish:
   ```bash
   /task-management:tasks update TASK-123 --status completed
   ```

### Advanced Features

#### Task Dependencies

Create relationships between tasks:

```bash
/task-management:tasks link TASK-101 blocks TASK-102
/task-management:tasks link TASK-102 depends-on TASK-101
```

#### Project Organization

Group related tasks:

```bash
/task-management:tasks create "Setup CI/CD" --project infrastructure
/task-management:tasks list --project infrastructure
```

#### Priority Management

Set and filter by priority:

```bash
/task-management:tasks update TASK-123 --priority critical
/task-management:tasks list --priority high,critical
```

#### Start Working on a Task

Sets status and creates git branch:

```bash
/task-management:tasks start TASK-123
# Creates branch: task-123-implement-auth
# Sets status: in-progress
# Adds TodoWrite items
```

## Configuration

Create `.claude/task-management.local.md` for project-specific settings:

```yaml
---
default_priority: medium
auto_create_branch: true
task_prefix: TASK
statuses:
  - backlog
  - ready
  - in-progress
  - blocked
  - completed
  - archived
---

# Project-specific task notes

Add any project-specific workflow notes here.
```

## Integration with Git

Tasks automatically create and track git branches:

```bash
# Creates branch: task-123-implement-auth
/task-management:tasks start TASK-123

# Automatically includes task ID in commits
git commit -m "Add login form [TASK-123]"
```

## Integration with Other Plugins

### With workflow plugin

Use task-management for tracking, workflow for execution:

```bash
# Plan the work
/task-management:plan

# Create tasks
/task-management:tasks create "Implement feature A"

# Execute with workflow
/workflow:start "Implement feature A"
```

### With brainstorming plugin

Use brainstorming for design, task-management for tracking:

```bash
# Design the solution
/brainstorming:brainstorm

# Create tasks from design
/task-management:tasks create "Implement design decisions"
```

## Task File Structure

Tasks are stored in `.claude/tasks/` directory:

```yaml
---
id: TASK-123
title: Implement user authentication
status: in-progress
priority: high
created: 2026-02-09
updated: 2026-02-09
project: auth
assignee: @me
tags: [security, backend]
blocks: [TASK-124]
depends_on: [TASK-120]
---

## Description

Implement OAuth2 authentication flow for user login.

## Notes

- Using Passport.js library
- Supporting Google and GitHub providers

## History

- 2026-02-09 10:30: Created
- 2026-02-09 11:15: Started work, created branch
- 2026-02-09 14:20: Completed backend implementation
```

## Task Statuses

Available statuses (configurable):
- `backlog` - Not yet ready to start
- `ready` - Ready to be worked on
- `in-progress` - Currently being worked on
- `blocked` - Cannot proceed due to dependency
- `completed` - Work finished
- `archived` - Historical record

## Tips

- Use `task-workflow` skill at the start of any feature work
- Create tasks **before** entering plan mode for better tracking
- Link blocking dependencies to identify critical path
- Archive old tasks regularly to keep list focused
- Use the `tm-task-organizer` agent to analyze and optimize your task list
- Leverage project grouping for better organization
- Set meaningful priorities based on business value and dependencies

## Example Session

```bash
# Plan a new feature
/task-management:plan
# > Guides through requirements and architecture

# Create tasks from plan
/task-management:tasks create "Setup database schema" --priority high --project blog
/task-management:tasks create "Implement post CRUD" --priority high --project blog
/task-management:tasks create "Add markdown rendering" --priority medium --project blog

# Link dependencies
/task-management:tasks link TASK-101 blocks TASK-102

# Start working
/task-management:tasks start TASK-101
# > Creates branch: task-101-setup-database-schema
# > Sets status: in-progress
# > Adds TodoWrite items

# ... work on task ...

# Complete task
/task-management:tasks update TASK-101 --status completed

# Check what's next
/task-management:tasks list --status ready
```

## Troubleshooting

**Tasks not showing up?**
- Check `.claude/tasks/` directory exists
- Verify task files have valid YAML frontmatter

**Git branch not created?**
- Check `auto_create_branch: true` in `.claude/task-management.local.md`
- Ensure you're in a git repository

**Task dependencies not working?**
- Use `link` subcommand to create relationships
- Check for circular dependencies

**TodoWrite integration not working?**
- Ensure TodoWrite tool is available in your environment
- Check task status is set to `in-progress`
