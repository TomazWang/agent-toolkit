# Skill Frontmatter Schema

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
  - ✓ `<skill-name>`
  - ✓ `<file> [--force]`
  - ✓ `[options]`

## Common Errors

**Wrong case for name:**
```yaml
---
name: CreatePlugin  # ✗ Must be kebab-case
---
```
**Fix**: Use `create-plugin`

**Description too short:**
```yaml
---
description: Helper  # ✗ Too vague and short
---
```
**Fix**: Use detailed description like "Interactive wizard for creating plugins"

**Redundant user-invocable:**
```yaml
---
user-invocable: true  # ✗ Redundant, omit this
---
```
**Fix**: Remove the field (true is default)

## Validation Checklist

- [ ] Valid YAML syntax
- [ ] `name` field present (kebab-case)
- [ ] `name` matches folder name
- [ ] `description` field present (10-200 chars)
- [ ] `user-invocable` only if auto-only
- [ ] `argument-hint` if skill takes arguments
