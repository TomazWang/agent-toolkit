---
name: validation
description: Validates plugin structure, components, and best practices against schemas
argument-hint: [plugin-path]
---

# Plugin Validation Skill

Validates complete plugin structure using schema-based validation.

## When to Use

- User invokes `/plugin-creator:validation`
- User asks "validate my plugin"
- After creating or modifying plugin
- Before publishing plugin

## Validation Process

### 1. Locate Plugin

```bash
# If in plugin directory
/plugin-creator:validation

# Or specify path
/plugin-creator:validation /path/to/my-plugin
```

### 2. Load Validation Schemas

Read schemas from `skills/validation/schema/`:
- `plugin-frontmatter.md` - plugin.json validation
- `skill-frontmatter.md` - SKILL.md frontmatter validation
- `agent-frontmatter.md` - Agent frontmatter validation
- `directory-structure.md` - Directory layout validation
- `hook-structure.md` - Hook file validation

### 3. Run Validation Checks

**Invoke `custom-plugin-validator` agent with schemas:**

```
Validator checks against schemas:
1. Plugin structure (directory-structure.md)
2. plugin.json format (plugin-frontmatter.md)
3. All skills (skill-frontmatter.md)
4. All agents (agent-frontmatter.md)
5. All hooks (hook-structure.md)
```

### 4. Report Results

```
Validating: my-awesome-plugin/

Plugin Structure
================
✓ .claude-plugin/ exists
✓ plugin.json exists
✓ README.md exists

plugin.json
===========
✓ Valid JSON
✓ Required fields: name, version, description, author
✓ keywords: array of strings
⚠ Repository URL missing (recommended)

Skills (3 found)
================
✓ skills/create/ - Valid
✓ skills/analyze/ - Valid
⚠ skills/format/ - Missing examples section

Agents (2 found)
================
✓ agents/custom-analyzer.md - Valid
✗ agents/validator.md - Missing 'custom-' prefix

Hooks (1 found)
===============
✓ hooks/PreToolUse.sh - Valid, executable

Summary
=======
✓ 15 passed
⚠ 2 warnings
✗ 1 error

Fix errors before publishing!
```

## Schema Files

All schemas are in `skills/validation/schema/`:

### plugin-frontmatter.md
Defines valid plugin.json structure

### skill-frontmatter.md
Defines valid SKILL.md frontmatter

### agent-frontmatter.md
Defines valid agent frontmatter

### directory-structure.md
Defines expected plugin layout

### hook-structure.md
Defines hook file requirements

## Validation Levels

**✓ PASS** - Ready to publish
**⚠ WARNING** - Works but has recommendations
**✗ ERROR** - Critical issues, fix before use

## Integration

Works with:
- `custom-plugin-validator` agent (uses schemas)
- Workflow plugin (validation in Stage C)
- CI/CD pipelines (automated validation)
