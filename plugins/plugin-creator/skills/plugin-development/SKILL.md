---
name: plugin-development
description: Complete guide to Claude Code plugin architecture and development
---

# Plugin Development Skill

Comprehensive guide to creating Claude Code plugins following official specifications.

## When to Use

Activate when:
- User wants to create a new plugin
- Discussing plugin architecture
- Questions about plugin structure
- Planning plugin features

## Official Resources

**Always reference**:
- https://code.claude.com/docs/en/plugins - Main plugin documentation
- https://code.claude.com/docs/en/plugins-reference - Complete reference
- https://github.com/anthropics/claude-code/tree/main/plugins - Official examples

## Plugin Architecture

### Directory Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest (REQUIRED)
├── commands/                 # Slash commands
│   ├── start.md
│   └── validate.md
├── skills/                   # Guidance and workflows
│   ├── my-skill/
│   │   └── SKILL.md         # Skills are FOLDERS with SKILL.md
│   └── another-skill/
│       └── SKILL.md
├── agents/                   # Autonomous agents
│   ├── analyzer.md
│   └── validator.md
├── hooks/                    # Event handlers
│   ├── PreToolUse.sh
│   └── SessionStart.sh
└── README.md                 # Documentation (REQUIRED)
```

### plugin.json Format

**Required fields**:
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "What this plugin does"
}
```

**Full format**:
```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Clear description of plugin purpose",
  "author": "Your Name",
  "commands": ["command1", "command2"],
  "skills": ["skill1", "skill2"],
  "agents": ["agent1", "agent2"],
  "hooks": ["PreToolUse.sh", "SessionStart.sh"],
  "dependencies": ["other-plugin"],
  "tags": ["workflow", "development", "tools"]
}
```

## Component Types

### Commands

**Purpose**: User-invoked actions via slash commands

**When to use**:
- User needs to trigger specific actions
- Interactive workflows
- Tool integration
- Configuration management

**Structure**:
```yaml
---
name: command-name
description: What the command does
usage: |
  /plugin:command <args>
examples:
  - /plugin:command example
---

# Command Name

Command description and implementation guide.

## Arguments
- arg1: Description
- arg2: Description

## Process
1. Step one
2. Step two
```

**Naming**: Plugin name is auto-prefixed
- File: `commands/start.md`
- Plugin: `workflow`
- Invoked as: `/workflow:start`

### Skills

**Purpose**: Provide guidance, enforce workflows, share knowledge

**When to use**:
- Teaching concepts
- Enforcing methodologies (TDD, API-first)
- Multi-step workflows
- Best practices

**Structure**:
```
skills/
└── skill-name/              # MUST be a folder
    └── SKILL.md             # MUST be named SKILL.md
```

**SKILL.md format**:
```yaml
---
name: skill-name
description: What this skill teaches or enforces
---

# Skill Name

## When to Use
Activate when: [triggering conditions]

## Process
[Step-by-step workflow]

## Examples
[Concrete examples]
```

**Best practices**:
- Use progressive disclosure (simple → detailed)
- Include concrete examples
- Clear triggering conditions
- Actionable guidance, not just theory

### Agents

**Purpose**: Autonomous specialized workers

**When to use**:
- Focused analysis tasks
- Background processing
- Specialized expertise domains
- Repetitive workflows

**Structure**:
```yaml
---
name: agent-name
description: Agent's specialized purpose
color: blue|green|orange|cyan|purple
tools: [Read, Grep, Glob, Bash, Edit, Write]
---

# Agent Name

## Your Role
[Clear role definition]

## Process
[How agent works]

## Output Format
[Expected output structure]
```

**Tool selection**:
- Read-only agents: [Read, Grep, Glob]
- Analysis agents: [Read, Grep, Glob, Bash]
- Implementation agents: [Read, Grep, Glob, Bash, Edit, Write]

### Hooks

**Purpose**: React to events automatically

**When to use**:
- Validation before actions
- Automatic logging
- Workflow enforcement
- Integration points

**Available hooks**:
- PreToolUse - Before any tool execution
- PostToolUse - After tool execution
- SessionStart - Session initialization
- SessionEnd - Session cleanup
- Stop - Before session ends
- SubagentStop - Agent completion
- UserPromptSubmit - After user input
- PreCompact - Before context compression
- Notification - System notifications

**Structure**:
```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Exit 0: allow action
# Exit 1: block action
# Echo to stderr: show message to user
```

## Design Principles

### Single Responsibility
Each plugin should have ONE clear purpose:
- ✓ `task-management` - Task tracking only
- ✓ `tdd-workflow` - TDD enforcement only
- ✗ `super-tool` - Does everything

### Component Selection

**Use Commands when**:
- User explicitly invokes action
- Interactive prompts needed
- Configuration changes
- One-time operations

**Use Skills when**:
- Teaching methodology
- Enforcing workflows
- Multi-step processes
- Context-sensitive guidance

**Use Agents when**:
- Autonomous analysis needed
- Background processing
- Specialized domain expertise
- User wants focused work

**Use Hooks when**:
- Automatic validation needed
- Event-driven automation
- Cross-cutting concerns
- Safety checks

### Composition Over Monoliths

**Good**: Small focused plugins
```
workflow/          → Workflow routing
tdd-workflow/      → TDD enforcement
sdd-workflow/      → Spec-first enforcement
task-management/   → Task tracking
```

**Bad**: One giant plugin
```
super-workflow/    → Does everything (harder to maintain, test, reuse)
```

## Development Workflow

### 1. Design Phase

**Clarify purpose**:
- What problem does this solve?
- Who is the target user?
- What's the core workflow?

**Choose components**:
- Commands for user actions
- Skills for guidance
- Agents for automation
- Hooks for events

### 2. Implementation Phase

**Start with plugin.json**:
```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Clear purpose",
  "commands": [],
  "skills": [],
  "agents": []
}
```

**Build incrementally**:
1. Create basic structure
2. Implement one component fully
3. Test it works
4. Add next component
5. Repeat

### 3. Documentation Phase

**README.md must include**:
- What the plugin does
- When to use it
- Installation instructions
- Usage examples
- Component descriptions

### 4. Validation Phase

**Check**:
- [ ] plugin.json valid and complete
- [ ] All referenced components exist
- [ ] Skills are folders with SKILL.md
- [ ] Commands have frontmatter
- [ ] Agents have valid tools/colors
- [ ] README has examples
- [ ] Source attribution if applicable

## Common Patterns

### Workflow Plugin Pattern

Coordinates multi-step processes:
- Skill: Workflow routing logic
- Commands: Start, status, complete
- Agent: Specialized validation

Example: `workflow` plugin

### Methodology Enforcement Pattern

Ensures best practices:
- Skill: Methodology guide (TDD, API-first)
- Commands: Initialize workflow
- Hooks: Block violations

Example: `tdd-workflow` plugin

### Tool Integration Pattern

Wraps external tools:
- Commands: Tool operations
- Agent: Tool-specific tasks
- Hooks: Environment setup

Example: Database management plugin

### Meta Plugin Pattern

Helps create other plugins:
- Commands: Scaffolding operations
- Skills: Development guides
- Agent: Structure validation

Example: `plugin-creator` plugin

## Dependencies

### When to use dependencies
```json
{
  "dependencies": ["task-management"]
}
```

**Use when**:
- Your plugin extends another
- You integrate with specific tools
- You require specific functionality

**Avoid when**:
- Optional integration
- Can work standalone
- Just following similar patterns

### Optional Integration Pattern

Instead of hard dependency:
```javascript
// Check if task-management exists
if (hasPlugin('task-management')) {
  // Use it
} else {
  // Graceful degradation
}
```

## Testing

### Manual Testing Checklist
- [ ] Commands execute without errors
- [ ] Skills load and display correctly
- [ ] Agents complete tasks successfully
- [ ] Hooks trigger at right events
- [ ] Documentation is clear
- [ ] Examples work as shown

### Validation Testing
```bash
/plugin validate path/to/plugin
```

## Distribution

### Marketplace Preparation
1. Validate plugin structure
2. Complete README
3. Add source attribution
4. Specify version
5. Add tags for discovery

### Installation Methods
- Marketplace install
- Manual copy to ~/.claude/plugins/
- Symlink for development

## Examples

### Minimal Plugin
```
hello-world/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   └── greet.md
└── README.md
```

### Complete Plugin
```
workflow/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── start.md
│   ├── spec.md
│   ├── plan.md
│   └── status.md
├── skills/
│   ├── workflow-router/
│   │   └── SKILL.md
│   ├── block-a-spec-validation/
│   │   └── SKILL.md
│   └── meta-testing/
│       └── SKILL.md
├── agents/
│   └── meta-validator.md
└── README.md
```

## Troubleshooting

### "Skill not found"
- Skills must be FOLDERS with SKILL.md
- Not flat .md files in skills/

### "Command prefix duplicated"
- Commands auto-get plugin prefix
- Name: `start.md`, not `plugin:start.md`

### "Agent not loading"
- Check YAML frontmatter valid
- Verify tools list correct
- Color must be valid value

## References

- Official docs: https://code.claude.com/docs/en/plugins
- Plugin reference: https://code.claude.com/docs/en/plugins-reference
- Official examples: https://github.com/anthropics/claude-code/tree/main/plugins
- Superpowers methodology: https://github.com/obra/superpowers
