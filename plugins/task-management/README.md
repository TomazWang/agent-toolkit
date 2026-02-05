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

## Commands

### `/task`

Main task management command with subcommands:

```bash
# Create a new task
/task create "Implement user authentication"

# Create with metadata
/task create "Fix login bug" --priority high --assignee @me

# List tasks
/task list
/task list --status in-progress
/task list --project frontend

# Update task status
/task update TASK-123 --status completed

# Show task details
/task show TASK-123

# Link tasks
/task link TASK-123 blocks TASK-124

# Archive completed tasks
/task archive --before 2026-01-01
```

## Skills

### `task-workflow`

Use when starting any multi-step development task. Automatically:
- Breaks down complex tasks into manageable steps
- Creates task dependencies
- Tracks progress through TodoWrite integration
- Suggests next steps based on current state

### `project-planning`

Use when planning a new project or feature. Guides you through:
- Requirements gathering
- Task decomposition
- Priority setting
- Timeline estimation (as milestones, not dates)

## Agents

### `task-organizer`

Specialized agent that analyzes your current work and:
- Identifies related tasks
- Suggests task groupings
- Detects blocking dependencies
- Recommends priority adjustments

## Usage

### Basic Workflow

1. Create tasks for your work:
   ```bash
   /task create "Add dark mode toggle"
   /task create "Update theme system"
   ```

2. The task-workflow skill automatically activates during implementation

3. Tasks integrate with TodoWrite for real-time progress tracking

4. Mark tasks complete as you finish them:
   ```bash
   /task update TASK-123 --status completed
   ```

### Advanced Features

**Task Dependencies:**
```bash
/task link TASK-101 blocks TASK-102
/task link TASK-102 depends-on TASK-101
```

**Project Organization:**
```bash
/task create "Setup CI/CD" --project infrastructure
/task list --project infrastructure
```

**Priority Management:**
```bash
/task update TASK-123 --priority critical
/task list --priority high,critical
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

Tasks can automatically create and track git branches:

```bash
# Creates branch: task-123-implement-auth
/task start TASK-123

# Automatically includes task ID in commits
git commit -m "Add login form [TASK-123]"
```

## Tips

- Use task-workflow skill at the start of any feature work
- Create tasks before entering plan mode for better tracking
- Link blocking dependencies to identify critical path
- Archive old tasks regularly to keep list focused
