# Agent Toolkit

A curated collection of Claude Code plugins for enhanced development workflows with **SDD → BDD → TDD** integration.

## Overview

Agent Toolkit provides modular plugins that extend Claude Code with systematic workflows for specification-driven development, behavior testing, code review, task tracking, and plugin creation. Each plugin can be installed independently.

## 📦 Available Plugins

### 🔧 Workflow Plugin

**[workflow](plugins/workflow/README.md)** - Unified development workflow with intelligent orchestration

**Unified Flow**: SDD (Spec) → BDD (Behavior) → TDD (Test)
- **Stage A**: Specification (OpenSpec integration, PoC validation)
- **Stage B**: Development (BDD scenarios + TDD implementation)
- **Stage C**: Execution (Task tracking + verification)

**Complexity Modes**: Complex (full validation), Medium (streamlined), Simple (minimal)

**Skills**:
- `/workflow:start` - Auto-detect complexity and orchestrate workflow
- `/workflow:status` - Check current progress
- `/workflow:spec` - Work on specification stage
- `/workflow:plan` - Create simple plans

**Integrations**: OpenSpec, task-management, automatic complexity detection

**Auto-activating Skills**: `workflow-orchestrator`, `stage-spec`, `stage-dev`, `stage-exec`, `spec-driven-development`, `behavior-driven`, `test-driven-development`, `openspec-integration`, `task-integration`, `meta-testing`

**Agents**: `workflow-meta-validator`

---

### 📋 Task Management Plugin

**[task-management](plugins/task-management/README.md)** - Structured task tracking with TodoWrite integration

**Features**:
- Create, list, update tasks with metadata
- Task dependencies (blocks/depends-on)
- Git branch integration
- Priority levels and status tracking

**Skills**:
- `/task-management:tasks` - Create, list, update, manage tasks
- `/task-management:plan` - Project planning workflows
- `task-workflow` - Multi-step task breakdown (auto-activates)

**Agents**: `tm-task-organizer`

---

### 🔍 Code Review Plugin

**[code-review](plugins/code-review/README.md)** - Comprehensive multi-agent code review

**Features**:
- 5 parallel specialized review agents
- PR and commit review support
- Focus areas (architecture, security, testing, performance, style)
- Automated report generation

**Skills**:
- `/code-review:review` - Launch comprehensive review
- `reviewing-code` - Code review patterns (auto-activates)
- `security-analysis` - Security-focused review

**Agents**: `cr-architecture-reviewer`, `cr-security-reviewer`, `cr-test-coverage-reviewer`, `cr-performance-reviewer`, `cr-style-reviewer`

---

### 💡 Brainstorming Plugin

**[brainstorming](plugins/brainstorming/README.md)** - Collaborative design and specification development

**Features**:
- Idea → Design → Documentation workflow
- 5 brainstorming modes (free, structured, sprint, alternatives, roleplay)
- Incremental validation
- Living documentation

**Skills**:
- `/brainstorming:brainstorm` - Start brainstorming session
- `idea-to-design` - Idea transformation workflow
- `design-validation` - Validate design decisions

**Agents**: `design-architect`

---

### 🛠️ Plugin Creator

**[plugin-creator](plugins/plugin-creator/README.md)** - Meta-plugin for creating Claude Code plugins

**Features**:
- Guided plugin creation workflow
- Component scaffolding (commands, skills, agents, hooks)
- Plugin validation
- Best practices enforcement

**Skills**:
- `/plugin-creator:create` - Create new plugin
- `/plugin-creator:validation` - Validate plugin structure
- `plugin-development` - Plugin architecture guide (auto-activates)
- `skill-development` - Skill creation guide (auto-activates)
- `command-development` - Commands vs Skills guide (auto-activates)
- `agent-development` - Agent creation guide (auto-activates)
- `hook-development` - Hook creation guide (auto-activates)

**Agents**: `plugin-creator.plugin-architect`, `plugin-creator.plugin-validator`

---

### 📚 KB Analysis Plugin

**[kb-analysis](plugins/kb-analysis/README.md)** - Autonomous knowledge base builder

**Features**:
- One-trigger autonomous codebase learning
- Git history analysis
- Source code + docs + cloud integration
- Institutional knowledge capture

**Skills**:
- `/kb:start` - Autonomous learning (trigger once)
- `/kb:plan` - Create/update learning plan
- `/kb:status` - Check progress
- `/kb:add-source` - Add sources
- `git-analysis`, `doc-converter`, `sourceatlas`, `cloud-sources`, and more

**Agents**: `kb.guide`, `kb.topic-analyzer`, `kb.discrepancy-hunter`, `kb.code-investigator`

---

## 🚀 Installation

### Manual Installation (Recommended)

Clone this repository and symlink desired plugins:

```bash
git clone https://github.com/TomazWang/agent-toolkit.git
cd agent-toolkit

# Install specific plugin
./scripts/install-plugin.sh workflow

# Or manually symlink
ln -s $(pwd)/plugins/workflow ~/.claude/plugins/workflow
```

### Install Multiple Plugins

```bash
# Install workflow + task-management + code-review
./scripts/install-plugin.sh workflow
./scripts/install-plugin.sh task-management
./scripts/install-plugin.sh code-review
```

## 📖 Usage Examples

### Unified Workflow

```bash
# Start workflow with auto-complexity detection
/workflow:start "Add OAuth2 authentication"

# The orchestrator will:
# 1. Detect complexity (complex/medium/simple)
# 2. Execute Stage A: Specification (SDD + OpenSpec)
# 3. Execute Stage B: Development (BDD + TDD)
# 4. Execute Stage C: Execution (Tasks + Verification)
```

### Task Management

```bash
# Create task
/task-management:tasks create "Implement payment API" --priority high

# List tasks
/task-management:tasks list --status in-progress

# Start working on task
/task-management:tasks start TASK-123

# Plan a project
/task-management:plan
```

### Code Review

```bash
# Review current changes
/code-review:review

# Review specific PR
/code-review:review --pr 123

# Focus on security and performance
/code-review:review --focus security,performance
```

## 🏗️ Plugin Structure

Each plugin follows the standard Claude Code structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata
├── skills/                  # Skills (FOLDERS with SKILL.md)
│   └── skill-name/
│       └── SKILL.md         # Skill definition
├── agents/                  # Agents (flat .md files)
│   └── agent-name.md        # Agent definition
└── README.md                # Plugin documentation
```

**Note**: Skills are **FOLDERS** containing `SKILL.md`, not flat `.md` files.

## 🔗 Plugin Integration

Plugins work together seamlessly:

**workflow** + **task-management**:
- Workflow Stage C auto-creates tasks
- Task tracking integrated into workflow

**workflow** + **OpenSpec**:
- Auto-detects `openspec/` directory
- Uses OpenSpec format for specifications
- Fluid, iterative spec development

**workflow** includes **SDD + BDD + TDD**:
- No separate tdd-workflow or sdd-workflow needed
- All integrated into unified workflow

## 📚 Documentation

Each plugin has detailed documentation:

- [Workflow Plugin](plugins/workflow/README.md) - SDD → BDD → TDD unified workflow
- [Task Management Plugin](plugins/task-management/README.md) - Task tracking
- [Code Review Plugin](plugins/code-review/README.md) - Multi-agent review
- [Brainstorming Plugin](plugins/brainstorming/README.md) - Design collaboration
- [Plugin Creator](plugins/plugin-creator/README.md) - Create plugins
- [KB Analysis Plugin](plugins/kb-analysis/README.md) - Knowledge base builder

## 🎯 Key Features

✅ **Unified Workflow** - One streamlined flow (not parallel routes)
✅ **SDD → BDD → TDD** - Spec-driven, behavior-first, test-driven
✅ **OpenSpec Integration** - Fluid, iterative specifications
✅ **Intelligent Orchestration** - Auto-adapts to complexity
✅ **Task Tracking** - Integration with task-management
✅ **Multi-Agent Review** - Parallel specialized reviewers
✅ **Plugin Creator** - Meta-plugin for creating plugins

## 🔧 Development

### Creating New Plugins

Use the plugin-creator:

```bash
/plugin-creator:create my-custom-plugin
```

### Plugin Validation

```bash
# Validate plugin structure
cd plugins/my-plugin
/plugin-creator:validate
```

## 📖 References and Attribution

This project builds upon and references:

- **[Anthropic Claude Code Official Plugins](https://github.com/anthropics/claude-code/tree/main/plugins)** - Plugin structure, parallel agents pattern (code-review)
- **[Superpowers by obra](https://github.com/obra/superpowers)** - Workflow skills (TDD, BDD, planning, systematic debugging)
- **[OpenSpec by Fission-AI](https://github.com/Fission-AI/OpenSpec)** - Fluid specification philosophy, iterative development

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please:
1. Follow existing plugin structure
2. Add proper attribution for borrowed patterns
3. Include comprehensive README
4. Test plugins before submitting

## 🗺️ Project Status

**Current Version**: 2.0.0

**Recent Changes**:
- ✅ Merged TDD, SDD, BDD into unified workflow
- ✅ Added OpenSpec integration
- ✅ Renamed Block A/B/C to stages (not alternative routes)
- ✅ Removed marketplace plugin (manual installation only)
- ✅ Added workflow orchestrator
- ✅ No naming collisions with built-in Claude Code functionality
