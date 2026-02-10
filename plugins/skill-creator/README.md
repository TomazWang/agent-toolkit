# Skill Creator

Focused plugin for creating Claude Code skills with interactive wizard, templates, and validation.

## Overview

While `plugin-creator` handles full plugin scaffolding, `skill-creator` is specialized for creating **individual skills** with proper structure, frontmatter, and triggering conditions.

## Why Separate Plugin?

Skills are the most common component to create and require careful attention to:
- Proper folder structure (`skill-name/SKILL.md`)
- Correct frontmatter (`name`, `description`, `user-invocable`)
- Clear "When to Use" triggering conditions
- Progressive disclosure content

A dedicated skill-creator makes this process streamlined and error-free.

## Skills

### `/skill-creator:create-skill <skill-name>`

Interactive skill creation wizard.

```bash
/skill-creator:create-skill analyze-code

# Guides you through:
# 1. Skill metadata (name, description)
# 2. User-invocable setting
# 3. When to Use triggers
# 4. Content structure
# 5. Examples

# Creates:
# skills/analyze-code/
#   └── SKILL.md
```

### `/skill-creator:edit <skill-name>`

Edit existing skill with validation.

```bash
/skill-creator:edit analyze-code

# Opens skill for editing
# Validates on save
```

### `/skill-creator:test <skill-name>`

Test skill activation and invocation.

```bash
/skill-creator:test analyze-code

# Tests:
# - Frontmatter parsing
# - Triggering conditions
# - User invocation
```

### `/skill-creator:skill-templates`

Browse skill templates for common patterns.

```bash
/skill-creator:skill-templates

# Shows templates for:
# - Auto-activating skills
# - User-invocable skills
# - Guide/reference skills
# - Integration skills
```

## Agents

### `skill-architect`

Helps design skill structure and triggering conditions.

**Use when:**
- Creating a new skill
- Defining "When to Use" criteria
- Deciding user-invocable setting

### `skill-validator`

Validates skill structure and content.

**Use when:**
- Checking skill correctness
- Ensuring best practices
- Before committing skill

## Workflow

```bash
# 1. Create skill
/skill-creator:create-skill my-skill

# 2. Skill architect asks:
#    - What does this skill do?
#    - When should it activate?
#    - Should users invoke it directly?
#    - What content structure?

# 3. Generates skill template

# 4. You fill in content

# 5. Validate
/skill-creator:test my-skill

# 6. Iterate until perfect
```

## Skill Structure Template

```markdown
---
name: skill-name
description: Brief description (shows in listings)
user-invocable: false  # Only if auto-only
---

# Skill Name

Brief overview of what this skill does.

## When to Use

Clear triggering conditions:
- Specific user requests
- Keywords detected
- Context patterns
- Auto-activation criteria

## Overview

Detailed explanation.

## Process/Workflow

Step-by-step guide for Claude.

## Examples

Concrete usage examples.

## Integration

How it works with other skills/plugins.
```

## Best Practices

**DO:**
- Start with clear "When to Use" criteria
- Add `user-invocable: false` only if skill is truly auto-only
- Include concrete examples
- Test activation patterns

**DON'T:**
- Make "When to Use" too broad (causes unwanted activation)
- Forget frontmatter
- Use flat .md files (must be folders)
- Skip validation

## Common Patterns

### Auto-Activating Skill

```yaml
---
name: code-formatter
description: Auto-formats code when user pastes unformatted code
user-invocable: false
---

## When to Use

Auto-activates when:
- User pastes code block
- Code has inconsistent formatting
- Keywords: "format this", "clean up code"
```

### User-Invocable Skill

```yaml
---
name: generate-tests
description: Generate unit tests for given code
---

## When to Use

User explicitly invokes:
- /plugin:generate-tests
- User asks "create tests for this"
- User requests test generation
```

### Guide/Reference Skill

```yaml
---
name: tdd-guide
description: Test-Driven Development reference guide
---

## When to Use

User wants to learn TDD:
- /plugin:tdd-guide
- User asks "how do I do TDD?"
- Can also auto-activate during test creation
```

## Integration

### With plugin-creator

```bash
# Create plugin first
/plugin-creator:create my-plugin

# Then add skills
cd plugins/my-plugin
/skill-creator:create-skill analyze
/skill-creator:create-skill format
```

### With workflow

```bash
# Use workflow for complex skill development
/workflow:start "Create code-analysis skill"

# Stage A: Spec - Design skill structure
# Stage B: Dev - Write skill with TDD
# Stage C: Exec - Test and validate
```

## Templates

### Workflow Orchestrator

```yaml
---
name: orchestrator
description: Main workflow conductor
user-invocable: false
---

## When to Use

Auto-activates when:
- User invokes /plugin:start
- User requests structured workflow
```

### Analysis Skill

```yaml
---
name: analyze
description: Analyze code for patterns
---

## When to Use

- User invokes /plugin:analyze
- User asks to "analyze code"
- User requests pattern detection
```

## Tips

- **Test early:** Use `/skill-creator:test` often
- **Start simple:** Begin with basic structure, add complexity later
- **Reference examples:** Look at existing skills in agent-toolkit
- **Validate always:** Run validator before committing

## Resources

- [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)
- [Frontmatter Reference](https://code.claude.com/docs/en/skills#frontmatter-reference)
- [Triggering Patterns](https://code.claude.com/docs/en/skills#when-to-use)
