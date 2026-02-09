---
name: create
description: Interactive plugin creation wizard - guides you through scaffolding a new Claude Code plugin
argument-hint: <plugin-name>
---

# Create Plugin Skill

Interactive wizard for creating new Claude Code plugins with proper structure and validation.

## When to Use

- User invokes `/plugin-creator:create`
- User asks "create a plugin"
- User mentions "new plugin" or "scaffold plugin"
- User wants to start plugin development

## Official Documentation

Reference these official resources:
- [Plugin Structure](https://code.claude.com/docs/en/plugins)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference)
- [Skills Guide](https://code.claude.com/docs/en/skills)

## Process

### 1. Initialize Plugin

```bash
/plugin-creator:create my-awesome-plugin
```

**The wizard will:**
1. Invoke `custom-plugin-architect` agent
2. Ask clarifying questions:
   - What's the plugin purpose?
   - What type? (workflow, analysis, utility, meta)
   - What components needed? (skills, agents, hooks)
3. Suggest optimal architecture
4. Create base structure

### 2. Create Structure

Creates complete plugin directory:

```
my-awesome-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── skills/                   # User-invocable workflows
│   └── (empty, ready for skills)
├── agents/                   # Specialized sub-agents
│   └── (empty, ready for agents)
├── hooks/                    # Event handlers
│   └── (empty, ready for hooks)
└── README.md                 # User documentation
```

### 3. Generate plugin.json

Creates valid manifest with:

```json
{
  "name": "my-awesome-plugin",
  "version": "1.0.0",
  "description": "Brief description of plugin",
  "author": {
    "name": "Your Name"
  },
  "keywords": ["category", "tags"],
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "license": "MIT"
}
```

**Note**: Commands, skills, agents, hooks are **auto-discovered** from directories. Don't list them manually in plugin.json.

### 4. Next Steps

After scaffolding, the wizard guides you to:

1. **Add Skills** → Use `/skill-creator:create` for focused skill creation
2. **Add Agents** → The `custom-agent-development` skill auto-activates to guide
3. **Add Hooks** → The `custom-hook-development` skill auto-activates to guide
4. **Validate** → Run `/plugin-creator:validation` to check structure
5. **Test** → Symlink and test: `ln -s $(pwd) ~/.claude/plugins/my-awesome-plugin`

## Examples

### Example 1: Workflow Plugin

```bash
/plugin-creator:create task-workflow

# Wizard asks:
# - Purpose? "Structured task management with dependencies"
# - Type? workflow
# - Components? skills, agents
#
# Creates:
# - Base structure
# - README template
# - plugin.json with workflow tags
```

Next steps:
```bash
# Add orchestrator skill
/skill-creator:create orchestrator

# Add task-organizer agent
# (custom-agent-development skill guides you)
```

### Example 2: Analysis Plugin

```bash
/plugin-creator:create code-analyzer

# Wizard asks:
# - Purpose? "Multi-agent code quality analysis"
# - Type? analysis
# - Components? skills, agents
#
# Creates:
# - Base structure
# - README for analysis plugin
# - plugin.json with quality tags
```

Next steps:
```bash
# Add main analysis skill
/skill-creator:create analyze

# Add specialized agents manually
# (custom-agent-development skill guides you)
```

### Example 3: Utility Plugin

```bash
/plugin-creator:create dev-utils

# Wizard asks:
# - Purpose? "Developer utilities and helpers"
# - Type? utility
# - Components? skills
#
# Creates:
# - Minimal structure
# - Skills directory ready
```

## Component Types Guide

### Skills
**Purpose**: User-invocable workflows or auto-activating helpers

**When to use**:
- Main entry points for users
- Orchestration logic
- Workflow guidance
- Auto-activating helpers

**Create with**: `/skill-creator:create skill-name`

**Structure**:
```
skills/
└── skill-name/
    └── SKILL.md
```

### Agents
**Purpose**: Specialized autonomous workers for parallel execution

**When to use**:
- Specialized analysis (security, performance, etc.)
- Parallel execution tasks
- Focused expertise areas

**Create with**: Manual creation (auto-activating skill guides you)

**Structure**:
```
agents/
└── custom-agent-name.md
```

**Important**: Prefix with `custom-` to avoid collisions with built-in agents.

### Hooks
**Purpose**: Event-driven automation and validation

**When to use**:
- Validate before tool execution
- Process after tool completion
- Session initialization
- Custom notifications

**Create with**: Manual creation (auto-activating skill guides you)

**Structure**:
```
hooks/
└── PreToolUse.sh  # Must be executable
```

## Validation

After creating your plugin, validate it:

```bash
cd my-awesome-plugin
/plugin-creator:validation
```

Checks:
- ✓ plugin.json format (against schema)
- ✓ Directory structure
- ✓ Skills are folders with SKILL.md
- ✓ Agents have custom- prefix
- ✓ README completeness

## Best Practices

### Plugin Design
- **Single Responsibility**: One clear purpose per plugin
- **Modularity**: Independent, composable components
- **Documentation**: Clear README with examples
- **Attribution**: Credit sources and inspirations

### Naming Conventions
- **Plugin name**: kebab-case (e.g., `task-management`)
- **Skill names**: kebab-case (e.g., `workflow-router`)
- **Agent names**: `custom-` prefix + kebab-case (e.g., `custom-validator`)
- **Hook names**: Official event names (e.g., `PreToolUse.sh`)

### Structure Guidelines
- **Skills**: Always folders with SKILL.md (not flat .md files)
- **Agents**: Flat .md files with frontmatter
- **Hooks**: Executable .sh files (chmod +x)
- **Auto-discovery**: Don't manually list components in plugin.json

### user-invocable Flags
- **Default** (omit flag): Skill is user-invocable
- **Set to false**: Skill only auto-activates, never invoked directly

## Integration with Other Plugins

### skill-creator
For focused skill creation:
```bash
/skill-creator:create my-skill
```

### workflow
For structured plugin development:
```bash
/workflow:start "Create code-review plugin"
# Stages: Spec → Dev → Exec
```

### validation
Always validate before distributing:
```bash
/plugin-creator:validation
```

## Common Issues

**Plugin not loading?**
- Check plugin.json is valid JSON
- Ensure symlinked to `~/.claude/plugins/`
- Validate with `/plugin-creator:validation`

**Skills not activating?**
- Verify "When to Use" section is clear
- Check skills are folders (not flat .md)
- Ensure SKILL.md is uppercase

**Agents not available?**
- Confirm `custom-` prefix
- Check valid tools list
- Verify frontmatter syntax

## Resources

- [Official Plugin Docs](https://code.claude.com/docs/en/plugins)
- [Skills Reference](https://code.claude.com/docs/en/skills)
- [Example Plugins](https://github.com/anthropics/claude-code/tree/main/plugins)
- [Plugin-Dev Plugin](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev)
