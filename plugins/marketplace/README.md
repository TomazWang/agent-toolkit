# Marketplace Plugin

Plugin marketplace for discovering and installing agent-toolkit plugins.

## Overview

The marketplace plugin provides a centralized way to browse, install, and manage plugins from the agent-toolkit collection.

## Features

- Browse available plugins
- Search by tags and keywords
- Install plugins with dependencies
- Update installed plugins
- Uninstall plugins
- Manage plugin configuration

## Commands

### `/marketplace`

Interact with the plugin marketplace.

```bash
# Browse all available plugins
/marketplace browse

# Search for plugins
/marketplace search "code review"
/marketplace search --tag workflow

# Show plugin details
/marketplace info task-management

# Install plugin
/marketplace install task-management

# Install multiple plugins
/marketplace install task-management code-review

# Update plugin
/marketplace update task-management

# List installed plugins
/marketplace list --installed

# Uninstall plugin
/marketplace uninstall task-management
```

## Plugin Registry

The marketplace maintains a registry of available plugins:

```json
{
  "plugins": [
    {
      "id": "task-management",
      "name": "Task Management",
      "description": "Structured task tracking and workflow management",
      "version": "1.0.0",
      "tags": ["workflow", "productivity"],
      "author": "Agent Toolkit",
      "repository": "https://github.com/[user]/agent-toolkit",
      "path": "plugins/task-management",
      "dependencies": []
    },
    {
      "id": "code-review",
      "name": "Code Review",
      "description": "Comprehensive code review with specialized agents",
      "version": "1.0.0",
      "tags": ["quality", "review"],
      "dependencies": []
    }
  ]
}
```

## Installation Process

When installing a plugin:

1. **Resolve Dependencies**
   - Check for required plugins
   - Install dependencies first

2. **Download Plugin**
   - Clone or copy plugin directory
   - Verify plugin structure

3. **Install to Claude Code**
   - Symlink or copy to `~/.claude/plugins/`
   - Register in Claude Code settings

4. **Configure**
   - Create default configuration if needed
   - Show setup instructions

## Usage

```bash
# Discover workflows
/marketplace search --tag workflow

Output:
📦 Workflow Plugins (3 found)

1. task-management v1.0.0
   Structured task tracking and workflow management
   Tags: workflow, productivity

2. planning-workflow v1.0.0
   Planning and execution workflows
   Tags: planning, workflow, execution

3. tdd-workflow v1.0.0
   Test-Driven Development workflow
   Tags: testing, workflow, tdd

# Install specific plugin
/marketplace install task-management

Output:
📦 Installing task-management...
✓ Downloading plugin
✓ Verifying structure
✓ Installing to ~/.claude/plugins/task-management
✓ Plugin installed successfully!

Available commands:
  /task - Task management

Available skills:
  - task-workflow
  - project-planning

Run `/task --help` for usage information.
```

## Plugin Distribution

Plugins can be distributed via:

1. **Git Repository** (default)
   - Clone agent-toolkit repo
   - Symlink specific plugins

2. **NPM Package**
   - Publish to npm registry
   - Install via `npm install -g`

3. **Direct Download**
   - Download ZIP
   - Extract to plugins directory

## Maintenance

```bash
# Check for updates
/marketplace check-updates

# Update all plugins
/marketplace update --all

# Verify installations
/marketplace verify
```
