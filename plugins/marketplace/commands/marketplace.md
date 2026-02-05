---
name: marketplace
description: Browse, install, and manage agent-toolkit plugins
usage: |
  /marketplace browse
  /marketplace search <query> [--tag <tag>]
  /marketplace info <plugin-name>
  /marketplace install <plugin-name>
  /marketplace update <plugin-name>
  /marketplace list [--installed]
  /marketplace uninstall <plugin-name>
examples:
  - /marketplace browse
  - /marketplace search "code review"
  - /marketplace install task-management
---

# Marketplace Command

Manage agent-toolkit plugins through a centralized marketplace interface.

## Command Structure

Parse the subcommand and execute the appropriate action.

## Subcommands

### browse

List all available plugins in the marketplace.

**Process:**
1. Read plugin registry from `marketplace/registry.json`
2. Display plugins with metadata
3. Group by category (workflow, quality, development, meta)

**Output:**
```
📦 Agent Toolkit Marketplace

=== Workflow Plugins ===
1. task-management v1.0.0
   Structured task tracking and project workflow management
   Commands: /task | Skills: 2 | Agents: 1

2. planning-workflow v1.0.0
   Planning and execution workflows for development tasks
   Commands: /plan | Skills: 2 | Agents: 1

=== Quality Plugins ===
3. code-review v1.0.0
   Comprehensive code review with parallel specialized agents
   Commands: /review | Skills: 2 | Agents: 5

=== Development Plugins ===
4. tdd-workflow v1.0.0
   Test-Driven Development workflow
   Commands: /tdd | Skills: 1 | Agents: 1

Use '/marketplace info <plugin-name>' for details
Use '/marketplace install <plugin-name>' to install
```

### search

Search for plugins by name, description, or tags.

**Process:**
1. Parse query and optional --tag filter
2. Search plugin registry
3. Match against name, description, tags
4. Display results

**Output:**
```
/marketplace search "review"

Found 1 plugin matching "review":

📦 code-review v1.0.0
   Comprehensive code review with parallel specialized agents
   Tags: code-quality, review, security, testing
   Commands: /review
```

### info

Show detailed information about a specific plugin.

**Process:**
1. Find plugin in registry
2. Read plugin README
3. Display comprehensive information

**Output:**
```
/marketplace info task-management

📦 task-management v1.0.0

Description:
  Structured task tracking and project workflow management

Commands:
  /task - Manage development tasks

Skills:
  - task-workflow: Multi-step task breakdown and tracking
  - project-planning: Project and feature planning

Agents:
  - task-organizer: Analyzes and organizes task lists

Tags: workflow, productivity, project-management

Repository: https://github.com/[user]/agent-toolkit
Path: plugins/task-management

Dependencies: None

Installation:
  /marketplace install task-management
```

### install

Install a plugin to Claude Code.

**Process:**
1. Check if already installed
2. Resolve dependencies
3. Install dependencies first (if any)
4. Download/symlink plugin
5. Verify plugin structure
6. Install to `~/.claude/plugins/`
7. Show success message and usage

**Implementation:**
```bash
# Use the install script
./scripts/install-plugin.sh <plugin-name>
```

**Output:**
```
/marketplace install task-management

📦 Installing task-management...
  ✓ Checking dependencies... None
  ✓ Downloading plugin
  ✓ Verifying structure
  ✓ Installing to ~/.claude/plugins/task-management

✅ task-management installed successfully!

Available commands:
  /task create "description" - Create a new task
  /task list - List all tasks
  /task start TASK-ID - Start working on a task

Available skills:
  - task-workflow (auto-activates for multi-step tasks)
  - project-planning (use for new projects)

Documentation: plugins/task-management/README.md
```

### update

Update an installed plugin to the latest version.

**Process:**
1. Check if plugin is installed
2. Check for updates
3. Pull latest changes (if git)
4. Re-install
5. Show what changed

**Output:**
```
/marketplace update task-management

📦 Updating task-management...
  Current version: 1.0.0
  Latest version: 1.1.0

  Changes:
  - Added task dependencies
  - Improved task-workflow skill
  - Bug fixes

  ✓ Updated successfully

Restart Claude Code for changes to take effect.
```

### list

List installed plugins.

**Process:**
1. Read `~/.claude/plugins/` directory
2. Identify agent-toolkit plugins
3. Display with status

**Output:**
```
/marketplace list --installed

📦 Installed Plugins (3)

✓ task-management v1.0.0
✓ code-review v1.0.0
✓ tdd-workflow v1.0.0

Use '/marketplace info <name>' for details
Use '/marketplace update <name>' to update
```

### uninstall

Remove an installed plugin.

**Process:**
1. Confirm uninstall
2. Remove symlink or directory
3. Update registry
4. Show success

**Output:**
```
/marketplace uninstall task-management

⚠️  This will remove task-management and all its data.
Continue? (y/N)

> y

📦 Uninstalling task-management...
  ✓ Removed from ~/.claude/plugins/
  ✓ Cleaned up configuration

✅ task-management uninstalled successfully
```

## Plugin Registry

Load from `marketplace/registry.json`:

```json
{
  "version": "1.0.0",
  "updated": "2026-02-05",
  "plugins": [
    {
      "id": "task-management",
      "name": "Task Management",
      "version": "1.0.0",
      "description": "Structured task tracking and project workflow management",
      "author": "Agent Toolkit",
      "repository": "https://github.com/[user]/agent-toolkit",
      "path": "plugins/task-management",
      "commands": ["task"],
      "skills": ["task-workflow", "project-planning"],
      "agents": ["task-organizer"],
      "tags": ["workflow", "productivity", "project-management"],
      "dependencies": [],
      "category": "workflow"
    }
  ]
}
```

## Error Handling

- **Plugin not found:** "Plugin 'foo' not found in marketplace"
- **Already installed:** "Plugin 'foo' is already installed. Use '/marketplace update foo' to update."
- **Installation failed:** "Failed to install 'foo': [error details]"
- **No permissions:** "Cannot install to ~/.claude/plugins/: Permission denied"

## Implementation Notes

- Store registry in `marketplace/registry.json`
- Use symlinks for installation (allows live updates)
- Validate plugin structure before installation
- Check for conflicts (command name collisions)
- Support dependency installation
- Track installed versions
