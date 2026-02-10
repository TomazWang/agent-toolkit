---
name: validate-skill-quality
description: Validates skill structure and frontmatter against schemas
argument-hint: [skill-path]
---

# Skill Validation

Schema-based skill validation for Claude Code skills.

## When to Use

Auto-activates when:
- User asks to "validate skill"
- After creating or modifying a skill
- User asks "check my skill"
- Skill not working as expected

## Validation Process

### 1. Locate Skill

```bash
# If in skill directory
/skill-creator:validate-skill-structure

# Or specify path
/skill-creator:validate-skill-structure skills/my-skill
```

### 2. Load Validation Schemas

Read schemas from `skills/validation/schema/`:
- `skill-frontmatter.md` - SKILL.md frontmatter validation
- `skill-structure.md` - Folder and file structure validation
- `when-to-use.md` - "When to Use" section requirements
- `content-quality.md` - Content completeness and clarity

### 3. Run Validation Checks

**Checks:**
1. Folder structure (skill-structure.md)
2. SKILL.md frontmatter (skill-frontmatter.md)
3. "When to Use" section (when-to-use.md)
4. Content quality (content-quality.md)

### 4. Report Results

```
Validating: my-skill/

Structure
=========
✓ Is a directory (not flat .md file)
✓ Contains SKILL.md (uppercase)
✓ Folder name matches skill name

Frontmatter
===========
✓ Valid YAML syntax
✓ name: my-skill (kebab-case)
✓ description: Clear and concise (42 chars)
⚠ user-invocable: Consider adding 'false' if auto-only

"When to Use"
=============
✓ Section present
✓ Clear triggering conditions
✓ User invocation format included
✓ Auto-activation keywords listed

Content Quality
===============
✓ Clear purpose statement
✓ Step-by-step process
✓ Examples provided
⚠ Consider adding edge cases

Summary
=======
✓ 12 passed
⚠ 2 warnings
✗ 0 errors

Ready to use!
```

## Validation Levels

**✓ PASS** - Skill is ready to use
**⚠ WARNING** - Works but has recommendations
**✗ ERROR** - Critical issues, must fix

## Schema Files

All schemas are in `skills/validation/schema/`:

### skill-frontmatter.md
Defines valid SKILL.md frontmatter:
- Required: name (kebab-case), description
- Optional: user-invocable (false for auto-only)

### skill-structure.md
Defines folder structure:
- Must be directory (not flat .md)
- Must contain SKILL.md (uppercase)
- Folder name must match skill name

### when-to-use.md
Defines "When to Use" section:
- Required section
- Clear triggering conditions
- User invocation format
- Auto-activation keywords

### content-quality.md
Defines content requirements:
- Clear purpose
- Step-by-step process
- Examples
- Edge cases

## Integration

Works with:
- `skill-validator` agent (uses schemas)
- `skill-creator:create` (creates valid structure)
- `skill-creator:edit` (validates after editing)
