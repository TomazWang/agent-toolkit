# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**agent-toolkit** is a comprehensive collection of Claude Code plugins, skills, commands, and agents designed to enhance development workflows. The project provides modular, installable plugins that extend Claude Code with capabilities for task management, code review, systematic development workflows, and more.

## Architecture

### Plugin-Based Architecture

The project follows a **distributed plugin architecture** where each workflow or capability is packaged as an independent plugin. This allows users to install only what they need.

**Key Design Principles:**
- **Modularity**: Each plugin is self-contained with its own commands, skills, and agents
- **Composability**: Plugins can work together (e.g., task-management + tdd-workflow)
- **Attribution**: All plugins clearly attribute their sources and inspirations
- **Standards**: Follow Claude Code plugin specification (`.claude-plugin/plugin.json`)

### Directory Structure

```
agent-toolkit/
├── plugins/                    # Individual plugins
│   ├── task-management/       # Task tracking and workflow
│   ├── code-review/           # Multi-agent code review
│   ├── brainstorming/         # Design collaboration
│   ├── planning-workflow/     # Plan creation and execution
│   ├── plugin-creator/        # Meta-plugin for creating plugins
│   ├── tdd-workflow/          # Test-Driven Development
│   ├── sdd-workflow/          # Specification-Driven Development
│   └── marketplace/           # Plugin discovery and installation
├── shared/                    # Shared components (future)
│   ├── skills/
│   ├── agents/
│   └── commands/
├── scripts/                   # Installation and utility scripts
│   ├── install-plugin.sh      # Bash installer
│   ├── install-plugin.js      # Node.js installer
│   └── list-plugins.js        # Plugin listing
├── marketplace/               # Marketplace registry
│   └── registry.json          # Plugin catalog
└── docs/                      # Documentation (future)
    └── plans/                 # Design documents
```

### Plugin Structure

Each plugin follows the standard Claude Code plugin structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json           # Metadata: name, version, commands, skills, agents
├── commands/                 # Slash commands (*.md)
│   └── command-name.md       # YAML frontmatter + markdown instructions
├── skills/                   # Reusable skills (*.md)
│   └── skill-name.md         # YAML frontmatter + skill instructions
├── agents/                   # Specialized agents (*.md)
│   └── agent-name.md         # YAML frontmatter + agent system prompt
├── hooks/                    # Event handlers (*.md or *.sh)
│   └── hook-name.md          # Event-based automation
└── README.md                 # User-facing documentation
```

## Plugin Categories

### Workflow Plugins
- **task-management**: Structured task tracking with TodoWrite integration, git branch linking, and dependency management
- **planning-workflow**: Plan creation (writing-plans) and systematic execution (executing-plans)
- **brainstorming**: Idea → Design → Documentation workflow with incremental validation

### Quality Plugins
- **code-review**: 5 parallel specialized agents (architecture, security, testing, performance, style) for comprehensive review

### Development Plugins
- **tdd-workflow**: Enforced RED-GREEN-REFACTOR cycle for Test-Driven Development
- **sdd-workflow**: OpenAPI/AsyncAPI spec-first development with code generation

### Meta Plugins
- **plugin-creator**: Tools for creating new plugins, skills, commands, agents, and hooks
- **marketplace**: Plugin discovery, installation, and management system

## Common Development Tasks

### Listing Plugins

```bash
# View all available plugins
node scripts/list-plugins.js

# Or manually
ls -la plugins/
```

### Installing a Plugin

```bash
# Bash script
./scripts/install-plugin.sh task-management

# Node.js script
npm run install-plugin task-management
node scripts/install-plugin.js task-management

# Manual symlink
ln -s $(pwd)/plugins/task-management ~/.claude/plugins/task-management
```

### Creating a New Plugin

1. **Create directory structure:**
```bash
mkdir -p plugins/my-plugin/{.claude-plugin,commands,skills,agents}
```

2. **Create plugin.json:**
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description",
  "author": "Agent Toolkit",
  "commands": ["my-command"],
  "skills": ["my-skill"],
  "agents": [],
  "hooks": [],
  "dependencies": [],
  "tags": ["category"]
}
```

3. **Create components:**
   - Commands: `commands/my-command.md` (YAML frontmatter + instructions)
   - Skills: `skills/my-skill.md` (YAML frontmatter + skill logic)
   - Agents: `agents/my-agent.md` (YAML frontmatter + system prompt)

4. **Add to marketplace registry:**
   Edit `marketplace/registry.json` to include new plugin

5. **Create README.md** with attribution, features, and usage

### Updating the Marketplace Registry

When adding or modifying plugins, update `marketplace/registry.json`:

```json
{
  "id": "plugin-id",
  "name": "Display Name",
  "version": "1.0.0",
  "description": "Brief description",
  "path": "plugins/plugin-id",
  "commands": ["list", "of", "commands"],
  "skills": ["list", "of", "skills"],
  "agents": ["list", "of", "agents"],
  "tags": ["category", "keywords"],
  "category": "workflow|quality|development|meta"
}
```

## Important Patterns

### Attribution

**ALWAYS** include source attribution in plugin READMEs:

```markdown
## Source Attribution

This plugin is inspired by:
- [Anthropic claude-code plugin-name](url) - What was borrowed
- [Superpowers skill-name](url) - What was borrowed
```

### Command Files (YAML + Markdown)

Commands use YAML frontmatter for metadata:

```markdown
---
name: command-name
description: Brief description
usage: |
  /command-name <args>
examples:
  - /command-name example
---

# Command Implementation

[Detailed instructions for Claude on how to execute this command]
```

### Skill Files (YAML + Markdown)

Skills define when and how they should be used:

```markdown
---
name: skill-name
description: When to use this skill
---

# Skill Name

## When to Use
[Triggering conditions]

## The Process
[Step-by-step workflow]

## Examples
[Usage examples]
```

### Agent Files (YAML + Markdown)

Agents are specialized with focused expertise:

```markdown
---
name: agent-name
description: Agent's specialty
color: blue|red|green|purple
tools: [Read, Grep, Glob, Bash]
---

# Agent Name

You are a specialized agent focused on [specialty].

## Your Role
[What this agent does]

## Process
[How to accomplish the role]
```

## Source References

This project builds upon and references:

### Official Anthropic Plugins
- **URL**: https://github.com/anthropics/claude-code/tree/main/plugins
- **Usage**: Plugin structure, parallel agents (code-review), workflow patterns (feature-dev)
- **Files referenced**: Plugin architecture, agent patterns, command structures

### Superpowers by obra
- **URL**: https://github.com/obra/superpowers
- **Usage**: Workflow skills (brainstorming, tdd, systematic-debugging, writing-plans, executing-plans)
- **Files referenced**: Skill organization, skill composition patterns, workflow enforcement

## Working with This Repository

### Adding New Plugins

1. Research existing similar plugins (Anthropic, Superpowers, community)
2. Create plugin structure following standard layout
3. Implement components (commands, skills, agents) with clear attribution
4. Add to marketplace registry
5. Write comprehensive README with usage examples
6. Test installation and functionality

### Modifying Existing Plugins

1. Read plugin README for context and attribution
2. Understand existing command/skill/agent logic
3. Make changes while preserving structure and patterns
4. Update version in plugin.json if significant changes
5. Update marketplace registry if metadata changes
6. Document changes in README

### Testing Plugins

```bash
# Install plugin locally
./scripts/install-plugin.sh plugin-name

# Test in Claude Code
claude
/plugin-command args

# Verify skill activation
# (Skills auto-activate based on their "When to Use" criteria)

# Check agent availability
# (Agents are invoked by commands or other agents)
```

### Code Standards

- **Markdown formatting**: Use proper headings, code blocks, and lists
- **YAML frontmatter**: Always validate syntax before committing
- **File naming**: Use kebab-case (my-plugin-name.md)
- **Comments**: Explain complex logic in agent instructions
- **Examples**: Include concrete examples in all documentation
- **Attribution**: Never omit source attribution

## Distribution Model

**Individual Plugin Distribution**: Each plugin can be installed independently. Users choose which plugins they need.

**Installation Methods:**
1. **Symlink** (recommended for development): `./scripts/install-plugin.sh plugin-name`
2. **Copy**: Manual copy to `~/.claude/plugins/`
3. **Marketplace**: `/marketplace install plugin-name` (future automated system)

## Key Concepts

### Commands vs Skills vs Agents

- **Commands**: User-invoked actions (`/task create`, `/review`)
- **Skills**: Auto-activating workflows that guide Claude's behavior (task-workflow, tdd)
- **Agents**: Specialized sub-agents for parallel execution (security-reviewer, architecture-reviewer)

### Plugin Dependencies

Currently, plugins are independent. Future versions may support:
- Shared skills/agents in `shared/` directory
- Plugin dependencies in plugin.json
- Version compatibility checking

### Marketplace System

The marketplace provides:
- Plugin discovery (`/marketplace browse`)
- Search by tags (`/marketplace search --tag workflow`)
- Installation (`/marketplace install plugin-name`)
- Updates (`/marketplace update plugin-name`)
- Registry at `marketplace/registry.json`

## Future Enhancements

Ideas for expansion (documented, not implemented):
- Shared component library in `shared/`
- Plugin dependency resolution
- Automated testing framework for plugins
- Plugin versioning and update system
- Community plugin submissions
- Hook examples (PreToolUse, PostToolUse, SessionStart)

## Notes for Future Claude Instances

- This is a **meta-project** for creating development tools
- Each plugin should be **fully functional independently**
- Always **attribute sources** - transparency is key
- Follow **Claude Code plugin spec** strictly
- Think **modularity** - avoid tight coupling between plugins
- **Test before committing** - install and verify functionality
- **Document thoroughly** - READMEs are user-facing
