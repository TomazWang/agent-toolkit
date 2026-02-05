# Agent Toolkit

A comprehensive collection of Claude Code plugins, skills, commands, and agents for enhanced development workflows.

## Overview

Agent Toolkit provides a curated set of plugins that extend Claude Code with powerful workflows for task management, code review, systematic debugging, test-driven development, and more. Each plugin can be installed independently based on your needs.

## Available Plugins

### Workflow Plugins

- **task-management** - Structured task tracking and project workflow management
- **code-review** - Automated code review with multiple specialized agents
- **brainstorming** - Collaborative design and specification development
- **planning-workflow** - Plan creation and execution workflows
- **tdd-workflow** - Test-Driven Development workflow implementation
- **sdd-workflow** - Specification-Driven Development workflow

### Meta Plugins

- **plugin-creator** - Tools for creating and validating new plugins
- **marketplace** - Plugin discovery and installation system

## Installation

### Via Marketplace Plugin (Recommended)

```bash
# Install the marketplace plugin
claude plugin install agent-toolkit/marketplace

# Browse and install plugins
/marketplace browse
/marketplace install task-management
```

### Manual Installation

Clone this repository and symlink desired plugins:

```bash
git clone https://github.com/[username]/agent-toolkit.git
cd agent-toolkit

# Install specific plugin
./scripts/install-plugin.sh task-management

# Or manually symlink
ln -s $(pwd)/plugins/task-management ~/.claude/plugins/task-management
```

## Plugin Structure

Each plugin follows the standard Claude Code plugin structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json       # Plugin metadata
├── commands/             # Slash commands
├── agents/               # Specialized agents
├── skills/               # Reusable skills
├── hooks/                # Event handlers
└── README.md             # Plugin documentation
```

## Usage

After installation, plugins provide commands, skills, and agents:

```bash
# Task Management
/task create "Implement user authentication"
/task list

# Code Review
/review start

# Brainstorming
/brainstorm "New feature idea"

# TDD Workflow
/tdd start
```

## Development

### Building from Source

```bash
npm install
npm run build
npm test
```

### Creating New Plugins

Use the plugin-creator:

```bash
/plugin create my-custom-plugin
```

## References and Attribution

This project builds upon and references:

- [Anthropic Claude Code Official Plugins](https://github.com/anthropics/claude-code/tree/main/plugins) - Plugin structure and patterns
- [Superpowers by obra](https://github.com/obra/superpowers) - Workflow skills and systematic development approaches

## License

MIT

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.
