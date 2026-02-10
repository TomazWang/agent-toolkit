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
- Component template generation (commands, agents, hooks)
- Development guides for each component type
- Plugin validation and testing
- Architecture planning with specialized agents

## Skills

### `/plugin-creator:create-plugin`

**Main skill** for interactive plugin scaffolding.

```bash
# Create new plugin
/plugin-creator:create-plugin my-workflow-plugin

# The skill guides you through:
# - Plugin metadata
# - Component selection (skills, agents, hooks)
# - Dependencies
# - Configuration
```

Creates complete plugin structure:
```
my-workflow-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/                  # Skill folders with SKILL.md
│   └── my-skill/
│       └── SKILL.md
├── agents/                  # Agent definitions
│   └── my-agent.md
├── hooks/                   # Event handlers
│   └── PreToolUse.sh
└── README.md
```

### `/plugin-creator:validate-plugin-structure`

Schema-based plugin validation using reference schemas.

```bash
# Validate current plugin
/plugin-creator:validate-plugin-structure

# Or specify path
/plugin-creator:validate-plugin-structure /path/to/plugin
```

Validates against schemas in `skills/validation/schema/`:
- Plugin structure and plugin.json format
- Skill frontmatter and folder structure
- Agent frontmatter and naming
- Hook structure and permissions

### Development Guide Skills (Auto-Activating)

These skills auto-activate when you're working on specific component types. They are **not user-invocable** - they activate automatically based on context:

#### `plugin-development` (Auto-activates)

Complete guide to Claude Code plugin architecture and structure.

**Auto-activates when:**
- Creating new plugins
- Discussing plugin architecture
- Questions about plugin structure

**Covers:**
- Plugin directory structure
- plugin.json manifest format
- Component organization
- Auto-discovery patterns
- Best practices

#### `skill-development` (Auto-activates)

How to create effective skills with proper triggering conditions.

**Auto-activates when:**
- Creating new skills
- Improving existing skills
- Skill not triggering properly

**Covers:**
- Skill structure (folders with SKILL.md)
- YAML frontmatter (`name`, `description`, `user-invocable`)
- "When to Use" sections
- Progressive disclosure
- Triggering patterns

**Note:** For focused skill creation, use the **skill-creator** spin-off plugin instead.

#### `command-development` (Auto-activates)

**Note:** Commands and skills are equivalent - both create slash commands. Skills are **preferred** because they support additional features (supporting files, `user-invocable` flag, etc.), but commands still work.

**Auto-activates when:**
- Creating new commands
- Questions about command vs skill choice

**Covers:**
- When to use `commands/` vs `skills/`
- Command structure and frontmatter
- Migration from commands to skills

#### `agent-development` (Auto-activates)

Developing specialized agents with focused expertise.

**Auto-activates when:**
- Creating new agents
- Questions about agent structure
- Designing specialized automation

**Covers:**
- Agent YAML frontmatter
- Tool selection
- System prompts
- Color coding (blue, green, orange, cyan, purple, red)
- Specialization patterns

#### `hook-development` (Auto-activates)

Implementing event hooks for PreToolUse, PostToolUse, SessionStart, etc.

**Auto-activates when:**
- Creating event hooks
- Questions about automation
- Implementing validation logic

**Covers:**
- Hook types (PreToolUse, PostToolUse, Stop, SessionStart, etc.)
- Bash script structure
- Prompt-based hooks API
- Event-driven automation
- Validation patterns

## Agents

### `plugin-creator.plugin-architect`

Designs plugin architecture and component structure.

**Use when:**
- Planning a new plugin
- Deciding component breakdown
- Architectural decisions

```bash
# The architect helps you:
# - Design plugin structure
# - Choose appropriate components
# - Plan skill interactions
# - Decide on agent specializations
```

### `plugin-creator.plugin-validator`

Validates plugin structure, metadata, and best practices compliance.

**Use when:**
- Validating completed plugin
- Checking manifest correctness
- Ensuring best practices

```bash
# The validator checks:
# - plugin.json format
# - Skill structure (folders with SKILL.md)
# - Agent frontmatter
# - Naming conventions
# - user-invocable flags
```

## Expected Workflow

### Phase 1: Initialize

```bash
/plugin-creator:create-plugin my-awesome-plugin
```

**What happens:**
1. Plugin-architect agent activates
2. Asks clarifying questions:
   - What's the plugin purpose?
   - What components needed? (skills, agents, hooks)
   - What type? (workflow, analysis, utility)
3. Suggests architecture
4. Creates base structure

### Phase 2: Add Components

**For each component type:**

#### Creating Skills → Use skill-creator plugin

```bash
# Spin-off plugin focused on skill creation
/skill-creator:create analyze-code

# Guides you through:
# - Skill name and description
# - When to Use triggers
# - user-invocable setting
# - Content structure
```

#### Creating Agents → Guided by auto-activating skill

The `agent-development` skill auto-activates and shows you:
- Agent frontmatter structure
- Tool selection (Read, Grep, Glob, Bash, Edit, Write, Task)
- System prompt patterns
- Color coding (blue, green, orange, cyan, purple, red)

Then you create the agent file manually or with assistance.

#### Creating Hooks → Guided by auto-activating skill

The `hook-development` skill auto-activates and shows you:
- Hook types (PreToolUse, PostToolUse, SessionStart, etc.)
- Bash script structure
- Event handling patterns

### Phase 3: Validate

```bash
# In your plugin directory
cd plugins/my-awesome-plugin

# Validate (invokes plugin-creator.plugin-validator agent)
/plugin-creator:validate-plugin-structure
```

**Validator checks:**
- ✓ plugin.json format (against schema)
- ✓ Skill structure (folders with SKILL.md)
- ✓ Frontmatter validity
- ✓ user-invocable flags
- ✓ Naming conventions (plugin-specific prefix for agents)
- ✓ README completeness

### Phase 4: Test

```bash
# Symlink plugin
ln -s $(pwd) ~/.claude/plugins/my-awesome-plugin

# Test skills
/my-awesome-plugin:analyze-code

# Check auto-activation of helper skills
```

### Phase 5: Iterate

Based on testing:
1. Refine skills
2. Adjust frontmatter
3. Improve documentation
4. Re-validate

## Usage Examples

### Creating a New Plugin

```bash
# Invoke the main skill
/plugin-creator:create-plugin task-automation

# Follow the interactive prompts
```

### Validating Your Plugin

```bash
# Create your plugin first
cd plugins/my-plugin

# Then validate it (the validator agent will be invoked)
/plugin-creator:validate-plugin-structure
```

## Key Concepts

### Skills vs Commands

**Both create slash commands** - The difference is features, not functionality:

**Skills (Recommended):**
- Structure: `skills/name/SKILL.md` (folder-based)
- Invocation: `/plugin:skill-name`
- Features: Supporting files, `user-invocable` flag, `disable-model-invocation`
- Auto-discovery: From `skills/` directory

**Commands (Backward Compatible):**
- Structure: `commands/name.md` (flat file)
- Invocation: `/plugin:command-name`
- Features: Basic frontmatter, arguments
- Auto-discovery: From `commands/` directory

**When to use each:**
- **Use skills** for new development (more features)
- **Commands still work** if you prefer flat files
- **Both are auto-discovered** - don't list in plugin.json

### Plugin Structure Best Practices

**DO:**
- Use skill folders with SKILL.md (not flat .md files)
- Add `user-invocable: false` to auto-only skills
- Prefix agents with plugin-specific name (e.g., `myplugin-` or `mp.`) to avoid collisions
- Include comprehensive README
- Add proper attribution

**DON'T:**
- Create flat .md skill files (should be folders)
- Use plugin-specific agent names (prefix with plugin abbreviation)
- Skip `user-invocable` flags on auto-activating skills
- Create commands (use skills instead)

### Component Organization

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Metadata
│
├── skills/                  # User-invocable or auto-activating
│   ├── main-skill/
│   │   └── SKILL.md
│   └── helper-skill/
│       └── SKILL.md         # user-invocable: false if auto-only
│
├── agents/                  # Specialized sub-agents
│   ├── myplugin-analyzer.md
│   └── myplugin-validator.md
│
├── hooks/                   # Event handlers
│   ├── PreToolUse.sh        # Must be executable
│   └── PostToolUse.sh
│
└── README.md                # User-facing documentation
```

## Validation Checklist

When creating a plugin, ensure:

- [ ] `plugin.json` has correct metadata
- [ ] All skills are **folders** with `SKILL.md`
- [ ] Auto-activating skills have `user-invocable: false`
- [ ] Agents have plugin-specific prefix to avoid collisions
- [ ] All frontmatter is valid YAML
- [ ] README includes attribution
- [ ] No hardcoded project-specific paths
- [ ] Hooks are executable (if using hooks)

## Integration with Workflow

The plugin-creator integrates with the workflow plugin:

```bash
# When building a complex plugin, use workflow
/workflow:start "Create code-quality plugin"

# The workflow will:
# 1. Stage A: Spec - Design plugin architecture
# 2. Stage B: Dev - Implement components with TDD
# 3. Stage C: Exec - Validate and test plugin
```

## Tips

- **Start with architecture**: The `plugin-creator.plugin-architect` agent will help design your plugin structure
- **Reference examples**: Look at existing plugins in agent-toolkit
- **Validate early**: Run `/plugin-creator:validate-plugin-structure` after creating each component
- **Use validation schemas**: Reference schema files in `skills/validation/schema/` for correct formats
- **Test thoroughly**: Install and test plugin before distributing
- **For skills**: Use the skill-creator spin-off plugin for focused skill development

## Validation Schemas

The validation skill uses schema files in `skills/validation/schema/`:

### Available Schemas

- **plugin-frontmatter.md** - Defines valid plugin.json structure
  - Required fields: name (kebab-case), version (semver), description, author
  - Optional fields: keywords, repository, license

- **skill-frontmatter.md** - Defines SKILL.md frontmatter rules
  - Required fields: name (kebab-case), description
  - Optional: user-invocable (false for auto-only skills)

- **agent-frontmatter.md** - Defines agent frontmatter structure
  - Required: name (plugin-specific prefix), description, color, tools
  - Valid colors: blue, green, orange, cyan, purple, red

- **directory-structure.md** - Defines expected plugin layout
  - Skills MUST be folders with SKILL.md (not flat .md files)
  - Agents are flat .md files
  - Hooks are executable .sh files

- **hook-structure.md** - Defines hook file requirements
  - Valid event names: PreToolUse, PostToolUse, SessionStart, etc.
  - Must be executable (chmod +x)
  - Must have shebang (#!/bin/bash)

These schemas are shared between the validation skill and validator agents, ensuring consistent validation across the plugin.

## Common Patterns

### Creating a Workflow Plugin

```bash
/plugin-creator:create-plugin my-workflow

# Add skills:
# - orchestrator (user-invocable)
# - stage-1, stage-2, stage-3 (user-invocable: false)
# - integration skills (user-invocable: false)
```

### Creating an Analysis Plugin

```bash
/plugin-creator:create-plugin code-analyzer

# Add agents (use plugin-specific prefix):
# - ca-security-analyzer
# - ca-performance-analyzer
# - ca-quality-analyzer

# Add main skill:
# - analyze (invokes all agents in parallel)
```

### Creating a Helper Plugin

```bash
/plugin-creator:create-plugin dev-utils

# Add skills:
# - format-code
# - generate-docs
# - update-deps

# All user-invocable
```

## Troubleshooting

**Skill not activating?**
- Check "When to Use" section has clear triggers
- Ensure skill is in a folder (not flat .md)
- Verify frontmatter is valid YAML

**Agent not available?**
- Check agent filename matches name in frontmatter
- Ensure agent has valid frontmatter
- Check tools list is correct

**Plugin not loading?**
- Validate plugin.json format
- Ensure plugin is symlinked to `~/.claude/plugins/`
- Check file permissions

## Resources

- [Claude Code Plugin Docs](https://code.claude.com/docs/en/plugins)
- [Skills Reference](https://code.claude.com/docs/en/skills)
- [Agent Development](https://code.claude.com/docs/en/agents)
- [Official plugin-dev Plugin](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev)
