# Skill Frontmatter Schema (SKILL.md)

## Required Fields

```yaml
---
name: skill-name                    # Required: kebab-case
description: Brief description      # Required: 1-2 sentences
---
```

## Optional Fields

```yaml
---
name: skill-name
description: Brief description
user-invocable: false              # Optional: only if auto-only
argument-hint: <arg1> <arg2>       # Optional: usage hint
---
```

## Validation Rules

### name
- **Format**: kebab-case (lowercase, hyphens only)
- **Pattern**: `^[a-z][a-z0-9-]*$`
- **Must Match**: Folder name
- **Examples**:
  - ✓ `create-plugin`
  - ✓ `analyze-code`
  - ✗ `createPlugin` (camelCase)
  - ✗ `create_plugin` (underscores)

### description
- **Type**: string
- **Length**: 10-200 characters
- **Content**: Brief summary shown in listings
- **Examples**:
  - ✓ "Interactive wizard for creating Claude Code skills"
  - ✗ "Skill" (too short)

### user-invocable
- **Type**: boolean
- **Default**: true (if omitted)
- **Use**: Set to `false` ONLY if skill is auto-only
- **Examples**:
  - ✓ `user-invocable: false` (skill auto-activates only)
  - ✓ Omitted (skill is user-invocable)
  - ✗ `user-invocable: true` (redundant, omit instead)

### argument-hint
- **Type**: string
- **Format**: Command-line style hint
- **Examples**:
  - ✓ `<plugin-name>`
  - ✓ `<file> [--force]`
  - ✓ `[options]`

## Content Requirements

### "When to Use" Section

**Required**: Yes

**Format**:
```markdown
## When to Use

- Triggering condition 1
- Triggering condition 2
- User invocation: /plugin:skill-name
```

**Must Include**:
- Clear activation triggers
- Specific keywords (if auto-activates)
- User invocation format

**Examples**:

**Good:**
```markdown
## When to Use

- User invokes `/plugin:create`
- User asks "create a plugin"
- User wants to scaffold new plugin
```

**Bad:**
```markdown
## When to Use

Use this when appropriate.  # ✗ Too vague
```

## user-invocable Logic

### When to use `user-invocable: false`

**ONLY if skill is auto-only and should NEVER be invoked directly:**

```yaml
---
name: openspec-integration
description: Auto-detects openspec/ directory and integrates
user-invocable: false  # ✓ User never calls this directly
---

## When to Use

Auto-activates when:
- openspec/ directory detected
- During spec creation phase
```

### When to OMIT `user-invocable`

**If user CAN invoke the skill (even if it also auto-activates):**

```yaml
---
name: create
description: Interactive plugin creation wizard
# No user-invocable field
---

## When to Use

- User invokes `/plugin:create`
- User asks "create a plugin"
```

**If skill both auto-activates AND is user-invocable:**

```yaml
---
name: format-code
description: Format code with proper style
# No user-invocable field (user can invoke it)
---

## When to Use

- User invokes `/plugin:format`
- Auto-activates when code has formatting issues
```

## File Structure

Skills MUST be folders containing SKILL.md:

**✓ Correct:**
```
skills/
└── my-skill/
    └── SKILL.md
```

**✗ Wrong:**
```
skills/
└── my-skill.md  # ✗ Must be folder
```

## Example Valid Skill Frontmatter

### User-Invocable Skill

```yaml
---
name: create
description: Interactive plugin creation wizard
argument-hint: <plugin-name> [--type workflow|analysis]
---

# Create Plugin

Interactive wizard for creating plugins.

## When to Use

- User invokes `/plugin-creator:create`
- User asks "create a plugin"
- User wants to scaffold new plugin
```

### Auto-Only Skill

```yaml
---
name: task-integration
description: Integrates workflow with task-management plugin
user-invocable: false
---

# Task Integration

Auto-integrates when task-management detected.

## When to Use

Auto-activates when:
- task-management plugin installed
- Workflow creates tasks
```

## Validation Checklist

- [ ] Valid YAML syntax
- [ ] `name` field present (kebab-case)
- [ ] `name` matches folder name
- [ ] `description` field present (10-200 chars)
- [ ] `user-invocable` only if auto-only
- [ ] "When to Use" section present
- [ ] Clear triggering conditions
- [ ] File is in folder (not flat)
- [ ] Filename is `SKILL.md` (not `skill.md`)
