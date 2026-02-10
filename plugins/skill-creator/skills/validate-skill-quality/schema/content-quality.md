# Content Quality Schema

## Required Content Sections

A well-structured skill should include:

1. **Title** (# heading matching skill name)
2. **When to Use** (## heading, specific triggers)
3. **Purpose/Overview** (brief description of what skill does)
4. **Process/Workflow** (step-by-step instructions)
5. **Examples** (concrete usage examples)

## Content Quality Criteria

### 1. Clear Purpose

**Requirement**: Skill purpose is immediately clear

**Examples**:

**✓ Good:**
```markdown
# Plugin Validation Skill

Validates complete plugin structure using schema-based validation.
```

**✗ Bad:**
```markdown
# Validation

A skill.
```

### 2. Step-by-Step Process

**Requirement**: Clear workflow with numbered or bulleted steps

**✓ Good:**
```markdown
## Process

1. Locate the plugin directory
2. Load validation schemas
3. Check structure against schemas
4. Report findings with severity levels
5. Suggest fixes for issues
```

**✗ Bad:**
```markdown
## Process

Validate things.
```

### 3. Concrete Examples

**Requirement**: Real, runnable examples

**✓ Good:**
```markdown
## Examples

```bash
# Validate current directory
/plugin:validate

# Validate specific plugin
/plugin:validate /path/to/my-plugin

# Expected output:
# ✓ plugin.json valid
# ✗ skills/ contains flat files
```
```

**✗ Bad:**
```markdown
## Examples

Run the command.
```

### 4. Edge Cases (Recommended)

**Requirement**: Handle common edge cases

**Examples**:
- What if file doesn't exist?
- What if user is in wrong directory?
- What if validation fails?
- What if dependencies missing?

**✓ Good:**
```markdown
## Edge Cases

**If plugin.json not found:**
- Check if you're in plugin directory
- Skill will prompt for path

**If validation fails:**
- Review error messages
- Check schemas in validation/schema/
- Fix issues and re-run
```

### 5. Integration Points (If Applicable)

**Requirement**: Document how skill integrates with others

**✓ Good:**
```markdown
## Integration

Works with:
- `plugin-validator` agent (uses schemas)
- `workflow` plugin (validation in Stage C)
- `task-management` (creates fix tasks)
```

### 6. Progressive Disclosure

**Requirement**: Information is revealed progressively

**Pattern**:
1. Quick start / TL;DR
2. Basic usage
3. Detailed options
4. Advanced scenarios
5. Edge cases

**✓ Good:**
```markdown
# Quick Start

```bash
/plugin:create my-plugin
```

## Basic Usage

[Basic scenarios...]

## Advanced Options

[Advanced scenarios...]

## Troubleshooting

[Edge cases...]
```

## Content Anti-Patterns

### Too Generic

**✗ Avoid:**
```markdown
This skill helps with things.
Use it when needed.
```

### Too Specific to One Project

**✗ Avoid:**
```markdown
# Create Agent Toolkit Plugin

Only works in /Users/me/agent-toolkit
```

**✓ Fix:**
```markdown
# Create Plugin

Works in any Claude Code plugin project.
```

### Missing Context

**✗ Avoid:**
```markdown
Run validate command.
```

**✓ Fix:**
```markdown
Navigate to your plugin directory, then run:
```bash
/plugin:validate
```
```

### No Examples

**✗ Avoid:**
```markdown
## Usage

You can use this skill in various ways.
```

**✓ Fix:**
```markdown
## Usage

### Example 1: Create Workflow Plugin

```bash
/plugin:create my-workflow
# Select: workflow type
# Add: orchestrator skill
```

### Example 2: Create Analysis Plugin

```bash
/plugin:create code-analyzer
# Select: analysis type
# Add: multiple agents
```
```

## Validation Checklist

### Structure
- [ ] Title (# heading) matches skill name
- [ ] "When to Use" section present
- [ ] Purpose/overview clear
- [ ] Step-by-step process included
- [ ] Examples provided

### Quality
- [ ] Purpose is immediately clear
- [ ] Process has specific steps
- [ ] Examples are concrete and runnable
- [ ] Edge cases addressed
- [ ] Progressive disclosure (simple → advanced)

### Clarity
- [ ] No vague language ("things", "stuff", "etc.")
- [ ] No project-specific assumptions
- [ ] No missing context
- [ ] Technical terms explained

### Completeness
- [ ] Covers common use cases
- [ ] Addresses failure scenarios
- [ ] Documents integrations (if any)
- [ ] Provides troubleshooting guidance

## Content Length Guidelines

**Minimum**: ~100 lines (including examples)
**Optimal**: 150-300 lines
**Maximum**: No hard limit, but consider splitting if > 500 lines

**Exception**: Simple auto-activating skills may be shorter if purpose is straightforward.

## Formatting Guidelines

### Code Blocks

Use code blocks with language hints:

**✓ Good:**
````markdown
```bash
/plugin:create
```
````

**✗ Bad:**
```
/plugin:create (no code block)
```

### Headings

Use hierarchical headings:

```markdown
# Skill Name (level 1)
## When to Use (level 2)
## Process (level 2)
### Step 1: Initialize (level 3)
### Step 2: Configure (level 3)
```

### Lists

Use consistent list formatting:

**✓ Good:**
```markdown
- Item 1
- Item 2
- Item 3
```

**✗ Bad:**
```markdown
- Item 1
* Item 2
- Item 3
```

## Example Well-Structured Skill

```markdown
---
name: create-plugin
description: Interactive plugin creation wizard
---

# Create Plugin Skill

Interactive wizard for creating new Claude Code plugins.

## When to Use

- User invokes `/plugin:create`
- User asks "create a plugin"
- User wants to scaffold new plugin
- Mentions "new plugin structure"

## Overview

Guides you through creating a complete plugin with:
- Proper directory structure
- Valid plugin.json manifest
- Component scaffolding (skills, agents, hooks)

## Process

### 1. Initialize

```bash
/plugin:create my-plugin
```

Prompts for:
- Plugin name (kebab-case)
- Description
- Author
- Plugin type (workflow/analysis/utility)

### 2. Component Selection

Choose components to create:
- [ ] Skills (user-invocable workflows)
- [ ] Agents (specialized sub-agents)
- [ ] Hooks (event handlers)

### 3. Scaffold

Creates structure:
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
├── agents/
├── hooks/
└── README.md
```

### 4. Next Steps

After scaffolding:
1. Add components
2. Validate with `/plugin:validate`
3. Test with symlink
4. Iterate and refine

## Examples

### Example 1: Workflow Plugin

```bash
/plugin:create task-workflow

# Prompts:
# Type? → workflow
# Components? → skills, agents
```

### Example 2: Utility Plugin

```bash
/plugin:create dev-utils

# Prompts:
# Type? → utility
# Components? → skills
```

## Edge Cases

**If plugin already exists:**
- Skill will warn and prompt to overwrite or rename

**If invalid name provided:**
- Skill will reject and request kebab-case name

**If no components selected:**
- Skill creates minimal structure

## Integration

Works with:
- `plugin-architect` agent (suggests structure)
- `plugin-validator` agent (validates result)
- `skill-creator` plugin (add skills after)

## Troubleshooting

**Plugin not loading?**
- Check plugin.json syntax
- Ensure proper symlink

**Components not working?**
- Validate with `/plugin:validate`
- Check frontmatter syntax
```

This example demonstrates all quality criteria.
