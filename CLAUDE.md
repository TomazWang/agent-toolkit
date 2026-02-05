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
│   ├── workflow/              # Unified workflow with Block A/B/C routing
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
├── commands/                 # Slash commands (*.md files)
│   └── command-name.md       # YAML frontmatter + markdown instructions
├── skills/                   # Reusable skills (FOLDERS with SKILL.md)
│   └── skill-name/           # Each skill is a directory
│       └── SKILL.md          # YAML frontmatter + skill instructions
├── agents/                   # Specialized agents (*.md files)
│   └── agent-name.md         # YAML frontmatter + agent system prompt
├── hooks/                    # Event handlers (*.sh scripts)
│   └── PreToolUse.sh         # Executable bash scripts for events
└── README.md                 # User-facing documentation
```

**CRITICAL**: Skills are FOLDERS with SKILL.md inside, not flat .md files!

## Plugin Categories

### Workflow Plugins
- **workflow**: Unified workflow system with Block A/B/C complexity routing (Spec → Plan → Task)
  - Block A: Complex projects → Spec + Meta-Validation
  - Block B: Normal features → Spec Change + TDD
  - Block C: Simple tasks → Simple Planning
  - Auto-detects complexity and routes appropriately
  - Commands: `/workflow:start`, `/workflow:spec`, `/workflow:plan`, `/workflow:status`
- **task-management**: Structured task tracking with TodoWrite integration, git branch linking, and dependency management
- **brainstorming**: Idea → Design → Documentation workflow with incremental validation, 5 modes (free exploration, structured, sprint, alternatives, roleplay)

### Quality Plugins
- **code-review**: 5 parallel specialized agents (architecture, security, test-coverage, performance, style) for comprehensive review

### Development Plugins
- **tdd-workflow**: Enforced RED-GREEN-REFACTOR cycle for Test-Driven Development
  - Command: `/tdd-workflow:start`
- **sdd-workflow**: OpenAPI/AsyncAPI spec-first development with validation and code generation
  - Command: `/sdd-workflow:create`

### Meta Plugins
- **plugin-creator**: Complete toolkit for creating Claude Code plugins
  - Commands: `/plugin:create`, `/plugin:add`, `/plugin:validate`, `/plugin:package`
  - Skills: plugin-development, skill-development, command-development, agent-development, hook-development
  - Agents: plugin-architect, plugin-validator
- **marketplace**: Plugin discovery, installation, and management system
  - Command: `/marketplace:browse`, `/marketplace:install`

## Workflow Plugin: Block A/B/C Architecture

The **workflow** plugin implements a unified development workflow with automatic complexity routing:

### Block A: Spec + Meta-Validation (Complex)
**For**: New projects, architectural decisions, security-critical features, >15 steps

**Process**:
1. Define specification (OpenAPI/AsyncAPI for APIs, design docs for features)
2. Generate Proof-of-Concept tests to validate spec
3. Manual validation questions (scalability, complexity, requirements fit)
4. Approve spec before implementation
5. Implement against validated spec

**Command**: `/workflow:start "requirement"` → Auto-routes to Block A if complex

### Block B: Spec Change + TDD (Medium)
**For**: Normal features, existing spec, 8-15 steps, moderate complexity

**Process**:
1. Update specification with changes
2. Follow TDD workflow (RED-GREEN-REFACTOR)
3. Implement against spec
4. Validate with tests

**Command**: `/workflow:start "requirement"` → Auto-routes to Block B if medium

### Block C: Simple Planning (Simple)
**For**: Quick tasks, bug fixes, <8 steps, single-file changes

**Process**:
1. Create simple plan
2. Execute directly
3. Verify completion

**Command**: `/workflow:start "requirement"` → Auto-routes to Block C if simple

### Auto-Detection

The workflow-router skill analyzes requirements and routes to appropriate block:

```
/workflow:start "Implement user authentication"
  ↓
Detects: Complex (security-critical, new feature)
  ↓
Routes to: Block A (Spec + Meta-Validation)
  ↓
Guides through: Spec → PoC → Validation → Implementation
```

**Manual override**:
```bash
/workflow:start "requirement" --block a  # Force Block A
/workflow:start "requirement" --block b  # Force Block B
/workflow:start "requirement" --block c  # Force Block C
```

### Integration with Other Plugins

- **task-management**: Auto-integrates if available for task tracking
- **tdd-workflow**: Used in Block B for test-driven development
- **sdd-workflow**: Used in Block A/B for API specification
- **brainstorming**: Can be used before workflow for design exploration

### OpenSpec Integration

The workflow plugin auto-detects OpenSpec projects and adapts:
- If `openspec/` directory exists → Integrates with OpenSpec workflows
- Follows OpenSpec philosophy: "fluid not rigid, iterative not waterfall, easy not complex"
- Can use OpenSpec's plan/ directory for planning artifacts

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

**Option 1: Use plugin-creator plugin (recommended)**
```bash
/plugin:create my-plugin
```

**Option 2: Manual creation**

1. **Create directory structure:**
```bash
mkdir -p plugins/my-plugin/{.claude-plugin,commands,skills,agents,hooks}
```

2. **Create plugin.json:**
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description",
  "author": "Agent Toolkit",
  "commands": ["command1"],
  "skills": ["skill1"],
  "agents": ["agent1"],
  "hooks": [],
  "dependencies": [],
  "tags": ["category"]
}
```

**IMPORTANT**: Command names should NOT include plugin prefix (auto-added).
- ✓ `"commands": ["start"]` → invoked as `/my-plugin:start`
- ✗ `"commands": ["my-plugin:start"]` → would become `/my-plugin:my-plugin:start`

3. **Create components:**

**Commands** (flat .md files):
```bash
# Create: commands/start.md
```

**Skills** (FOLDERS with SKILL.md):
```bash
# Create: skills/my-skill/SKILL.md (not skills/my-skill.md!)
mkdir -p plugins/my-plugin/skills/my-skill
touch plugins/my-plugin/skills/my-skill/SKILL.md
```

**Agents** (flat .md files):
```bash
# Create: agents/analyzer.md
```

**Hooks** (executable .sh files):
```bash
# Create: hooks/PreToolUse.sh
chmod +x plugins/my-plugin/hooks/PreToolUse.sh
```

4. **Add to marketplace registry:**
   Edit `marketplace/registry.json` to include new plugin

5. **Create README.md** with attribution, features, and usage

6. **Validate plugin:**
```bash
/plugin:validate plugins/my-plugin
```

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

**IMPORTANT**: Skills are FOLDERS with SKILL.md inside:

```
skills/
└── my-skill/              # Folder named after skill
    └── SKILL.md           # Must be named SKILL.md
```

Skills define when and how they should be used:

```markdown
---
name: skill-name
description: When to use this skill
---

# Skill Name

## When to Use
[Triggering conditions - when should Claude activate this skill]

## The Process
[Step-by-step workflow]

## Examples
[Concrete usage examples]
```

### Agent Files (YAML + Markdown)

Agents are specialized with focused expertise:

```markdown
---
name: agent-name
description: Agent's specialty
color: blue|green|orange|cyan|purple
tools: [Read, Grep, Glob, Bash, Edit, Write, Task]
---

# Agent Name

Specialized agent for [specialty].

## Your Role
[Clear role definition]

## Process
[Step-by-step workflow]

## Output Format
[Expected output structure]
```

**Valid colors**: blue (general), green (testing), orange (performance), cyan (style), purple (architecture)

**Available tools**: Read, Grep, Glob, Bash, Edit, Write, Task

## Source References

This project builds upon and references:

### Official Anthropic Plugins
- **URL**: https://github.com/anthropics/claude-code/tree/main/plugins
- **Usage**: Plugin structure, parallel agents (code-review), plugin-dev patterns (plugin-creator)
- **Files referenced**: Plugin architecture, agent patterns, command structures, plugin.json format

### Superpowers by obra
- **URL**: https://github.com/obra/superpowers
- **Usage**: Workflow skills (brainstorming, tdd, systematic-debugging, verification), skill patterns
- **Files referenced**: Skill organization, skill composition patterns, workflow enforcement, progressive disclosure

### OpenSpec by Fission-AI
- **URL**: https://github.com/Fission-AI/OpenSpec
- **Usage**: Spec-first philosophy integration in workflow plugin
- **Philosophy**: "fluid not rigid, iterative not waterfall, easy not complex"
- **Integration**: Auto-detection in workflow plugin, respects openspec/ directory structure

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
