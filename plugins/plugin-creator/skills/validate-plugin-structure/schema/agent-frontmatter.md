# Agent Frontmatter Schema

## Required Fields

```yaml
---
name: agent-name                    # Required: kebab-case
description: Brief description      # Required: what agent does
color: blue                         # Required: agent color
tools: [Read, Grep, Glob]          # Required: tool list
---
```

## Validation Rules

### name
- **Format**: kebab-case (lowercase, hyphens)
- **Pattern**: `^[a-z][a-z0-9-]*$`
- **Recommendation**: Prefix with `custom-` if might collide with built-ins
- **Examples**:
  - ✓ `custom-plugin-architect`
  - ✓ `custom-security-reviewer`
  - ⚠ `plugin-architect` (might collide)
  - ✗ `pluginArchitect` (camelCase)

### description
- **Type**: string
- **Length**: 10-200 characters
- **Content**: What the agent specializes in
- **Examples**:
  - ✓ "Designs plugin architecture and component structure"
  - ✗ "Helper" (too vague)

### color
- **Type**: string (enum)
- **Valid values**:
  - `blue` - General purpose
  - `green` - Testing/validation
  - `orange` - Performance
  - `cyan` - Style/formatting
  - `purple` - Architecture/design
  - `red` - Security
- **Examples**:
  - ✓ `color: purple` (architecture agent)
  - ✓ `color: green` (validator agent)
  - ✗ `color: yellow` (not valid)

### tools
- **Type**: array of tool names
- **Valid tools**:
  - `Read` - Read files
  - `Write` - Write files
  - `Edit` - Edit files
  - `Grep` - Search content
  - `Glob` - Find files
  - `Bash` - Execute commands
  - `Task` - Launch subagents
- **Examples**:
  - ✓ `[Read, Grep, Glob]` (read-only agent)
  - ✓ `[Read, Write, Bash]` (agent that modifies)
  - ✗ `[read, grep]` (lowercase not valid)
  - ✗ `[]` (empty not allowed)

## File Structure

Agents are flat .md files (not folders):

**✓ Correct:**
```
agents/
├── custom-plugin-architect.md
└── custom-plugin-validator.md
```

**✗ Wrong:**
```
agents/
└── architect/
    └── AGENT.md  # ✗ Should be flat file
```

## Filename Rules

### With custom- Prefix (Recommended)

To avoid collisions with built-in agents:

```
agents/custom-security-reviewer.md
---
name: custom-security-reviewer
---
```

**Filename must match frontmatter name.**

### Without Prefix (Use with caution)

```
agents/analyzer.md
---
name: analyzer
---
```

**Only if you're certain it won't collide.**

## Example Valid Agent

```yaml
---
name: custom-plugin-architect
description: Designs plugin architecture and component structure
color: purple
tools: [Read, Grep, Glob]
---

# Plugin Architect Agent

Specialized agent for designing Claude Code plugin architecture.

## Your Role

You help users design effective plugins by:
1. Understanding plugin purpose
2. Suggesting component structure
3. Recommending patterns

## Process

[Detailed agent instructions...]
```

## Agent Colors Guide

**blue** - General/versatile
- General-purpose agents
- Multi-function agents
- Default choice

**green** - Testing/validation
- Test runners
- Validators
- Quality checkers

**orange** - Performance
- Performance analyzers
- Optimization agents
- Profiling agents

**cyan** - Style/formatting
- Code formatters
- Style checkers
- Documentation agents

**purple** - Architecture/design
- Architecture planners
- Design agents
- System designers

**red** - Security
- Security scanners
- Vulnerability detectors
- Security reviewers

## Tool Selection Guide

**Read-only agents** (exploration, analysis):
```yaml
tools: [Read, Grep, Glob]
```

**Validation agents** (check + report):
```yaml
tools: [Read, Grep, Glob, Bash]  # Bash for running validators
```

**Creation agents** (generate code/files):
```yaml
tools: [Read, Write, Bash]
```

**Editing agents** (modify existing):
```yaml
tools: [Read, Edit, Grep, Glob]
```

**Orchestrator agents** (manage subagents):
```yaml
tools: [Read, Grep, Glob, Task]
```

## Common Errors

**Missing custom- prefix:**
```yaml
---
name: security-reviewer  # ⚠ Might collide with built-in
---
```
**Fix**: Use `custom-security-reviewer`

**Invalid color:**
```yaml
---
color: yellow  # ✗ Not a valid color
---
```
**Fix**: Use one of: blue, green, orange, cyan, purple, red

**Empty tools:**
```yaml
---
tools: []  # ✗ Must have at least one tool
---
```
**Fix**: Add required tools

**Lowercase tools:**
```yaml
---
tools: [read, write]  # ✗ Must be capitalized
---
```
**Fix**: `[Read, Write]`

## Validation Checklist

- [ ] Valid YAML syntax
- [ ] `name` field present (kebab-case)
- [ ] `name` matches filename (without .md)
- [ ] `name` has `custom-` prefix (if might collide)
- [ ] `description` field present (10-200 chars)
- [ ] `color` field present (valid color)
- [ ] `tools` array present (not empty)
- [ ] All tools are capitalized correctly
- [ ] File is flat .md (not folder)
