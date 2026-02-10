---
name: validate
description: Validate skill structure, frontmatter, and best practices
argument-hint: <skill-name>
---

# Validate Skill

Validates a skill for correct structure and best practices.

## When to Use

- User invokes `/skill-creator:validate <skill>`
- After creating or editing a skill
- Before committing skill

## Validation Process

### 1. Invoke Skill Validator Agent

Use `skill-validator` agent to check:

**Structure:**
- ✓ Skill is in folder (not flat .md)
- ✓ Contains SKILL.md file
- ✓ File is readable

**Frontmatter:**
- ✓ Valid YAML syntax
- ✓ Has `name` field
- ✓ Has `description` field
- ✓ `user-invocable` set correctly
  - `false` only if truly auto-only
  - Missing or `true` if user can invoke

**Content:**
- ✓ Has "When to Use" section
- ✓ Clear triggering conditions
- ✓ Examples provided
- ✓ Process/workflow defined

**Naming:**
- ✓ Folder name matches skill name
- ✓ Uses kebab-case
- ✓ No special characters

### 2. Report Findings

```
Validating: skills/analyze-code/

✓ Structure: Valid
✓ Frontmatter: Valid
✓ When to Use: Clear triggers
⚠ Missing examples section

Issues:
1. Add concrete usage examples

Suggestions:
- Add "## Examples" section
- Show before/after scenarios
```

### 3. Offer Fixes

For common issues, offer automatic fixes:
- Add missing sections
- Fix frontmatter format
- Correct user-invocable flag

## Output Levels

**✓ PASS** - Skill is ready to use
**⚠ WARNING** - Skill works but has suggestions
**✗ ERROR** - Skill has critical issues

## Common Issues

**Missing user-invocable:**
- If skill auto-activates, add `user-invocable: false`
- If user invokes, no flag needed

**Vague "When to Use":**
- Be specific about triggers
- Include keywords
- Define clear activation patterns

**Missing examples:**
- Add concrete scenarios
- Show input/output
- Demonstrate usage
