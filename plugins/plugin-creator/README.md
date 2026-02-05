# Plugin Creator

Meta-plugin for creating, validating, and managing Claude Code plugins.

## Source Attribution

Based on patterns from:
- [Anthropic plugin-dev plugin](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev) - Plugin development workflows
- [Superpowers writing-skills](https://github.com/obra/superpowers) - Skill creation methodology

## Overview

This meta-plugin helps you create new plugins, skills, commands, agents, and hooks following best practices and the Claude Code plugin specification.

## Features

- Interactive plugin scaffolding
- Skill creation wizard
- Command template generation
- Agent development guide
- Hook implementation patterns
- Plugin validation and testing
- Publication preparation

## Commands

### `/plugin`

Manage plugin development.

```bash
# Create new plugin
/plugin create my-plugin

# Add components
/plugin add skill my-skill
/plugin add command my-command
/plugin add agent my-agent
/plugin add hook PreToolUse

# Validate plugin
/plugin validate

# Package for distribution
/plugin package
```

## Skills

### `plugin-development`

Complete guide to plugin architecture and structure.

### `skill-development`

How to create effective skills with proper triggering conditions.

### `command-development`

Creating slash commands with argument parsing and YAML frontmatter.

### `agent-development`

Developing specialized agents with focused expertise.

### `hook-development`

Implementing event hooks for PreToolUse, PostToolUse, SessionStart, etc.

## Usage

```bash
# Interactive creation
/plugin create my-workflow-plugin

# Follow prompts to specify:
# - Plugin metadata
# - Components (commands, skills, agents, hooks)
# - Dependencies
# - Configuration

# Creates complete plugin structure:
my-workflow-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
├── skills/
├── agents/
├── hooks/
└── README.md
```
