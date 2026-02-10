---
name: create-skill
description: Interactive wizard for creating Claude Code skills with proper structure and frontmatter
argument-hint: <skill-name>
---

# Create Skill

Interactive wizard that guides you through creating a properly structured Claude Code skill.

## When to Use

- User invokes `/skill-creator:create-skill <name>`
- User asks "create a skill"
- User wants to add a skill to their plugin

## Workflow

### 1. Invoke Skill Architect Agent

Use the `skill-architect` agent to help design the skill:

```
Agent asks:
1. What does this skill do? (Brief description)
2. When should it activate? (Triggering conditions)
3. Should users invoke it directly? (user-invocable)
4. What's the expected workflow? (Process steps)
```

### 2. Create Skill Structure

Based on architect's recommendations, create:

```
skills/<skill-name>/
  └── SKILL.md
```

### 3. Generate Frontmatter

```yaml
---
name: skill-name
description: Brief description from step 1
user-invocable: false  # Only if auto-only
---
```

### 4. Add Content Template

```markdown
# Skill Name

Brief overview.

## When to Use

[Triggering conditions from step 2]

## Overview

[Detailed explanation]

## Process

[Step-by-step workflow from step 4]

## Examples

[Concrete usage examples]
```

### 5. Save and Validate

- Write SKILL.md file
- Invoke `skill-validator` agent
- Report any issues
- Ask if user wants to make changes

## Output

```
✓ Created skills/analyze-code/SKILL.md

Structure:
- Frontmatter: Valid
- When to Use: Clear triggers
- Content: Complete template

Next steps:
1. Fill in detailed content
2. Test with: /skill-creator:test analyze-code
3. Validate with: /skill-creator:validate-skill-structure analyze-code
```

## Error Handling

- **Skill already exists:** Ask to overwrite or choose new name
- **Invalid name:** Suggest valid name (kebab-case)
- **Missing parent plugin:** Ensure we're in a plugin directory
