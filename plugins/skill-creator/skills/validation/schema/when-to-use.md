# "When to Use" Section Schema

## Required Section

Every skill MUST have a "When to Use" section.

## Format

```markdown
## When to Use

- Triggering condition 1
- Triggering condition 2
- User invocation: /plugin:skill-name
```

## Validation Rules

### Section Presence

**Rule**: SKILL.md must contain a "When to Use" section

**Pattern**: `## When to Use` (heading level 2)

**Examples**:
- ✓ `## When to Use`
- ✗ `# When to Use` (wrong level)
- ✗ Missing entirely

### Content Requirements

The section must include:

1. **Clear triggering conditions** - When should Claude activate this skill?
2. **Specific keywords** - What words/phrases trigger auto-activation?
3. **User invocation format** - How can users invoke it manually?

### Examples

**✓ Good "When to Use":**

```markdown
## When to Use

- User invokes `/plugin:create`
- User asks "create a plugin"
- User wants to scaffold new plugin
- Mentions "new plugin" or "plugin structure"
```

**✓ Also Good (Auto-Only Skill):**

```markdown
## When to Use

Auto-activates when:
- openspec/ directory detected
- During spec creation phase
- Spec file being modified
```

**✗ Bad (Too Vague):**

```markdown
## When to Use

Use this when appropriate.
```

**✗ Bad (Missing Keywords):**

```markdown
## When to Use

- User wants to create something
```

## Triggering Specificity

### User-Invocable Skills

Must include:
- Slash command format: `/plugin:skill-name`
- Common user phrases that trigger it
- Specific keywords

**Example**:
```markdown
## When to Use

- User invokes `/skill-creator:create`
- User asks "create a skill"
- User mentions "new skill" or "add skill"
- Questions about skill structure
```

### Auto-Only Skills

Must include:
- Specific auto-activation conditions
- Keywords that trigger activation
- Context requirements

**Example**:
```markdown
## When to Use

Auto-activates when:
- Creating or modifying skills
- User asks "validate skill"
- Skill structure questions
- user-invocable flag questions
```

## Common Patterns

### Interactive Wizard Skill

```markdown
## When to Use

- User invokes `/plugin:wizard`
- User asks "help me create [thing]"
- User needs interactive guidance
```

### Validation Skill

```markdown
## When to Use

- User invokes `/plugin:validate`
- User asks "check my [component]"
- After creating/modifying components
- Before publishing
```

### Integration Skill

```markdown
## When to Use

Auto-activates when:
- [External plugin] detected
- [Specific file/directory] present
- [Workflow stage] active
```

## Common Errors

### Missing slash command format

**Error:**
```markdown
## When to Use

- User wants to create plugins
```

**Fix:**
```markdown
## When to Use

- User invokes `/plugin:create`
- User asks "create a plugin"
```

### Too generic

**Error:**
```markdown
## When to Use

- When needed
- As appropriate
```

**Fix:**
```markdown
## When to Use

- User invokes `/plugin:analyze`
- User asks "analyze my code"
- Mentions "code quality" or "review"
```

### Missing auto-activation keywords

**Error:**
```markdown
## When to Use

Auto-activates sometimes
```

**Fix:**
```markdown
## When to Use

Auto-activates when:
- task-management plugin installed
- User creates tasks
- Workflow needs task integration
```

## Validation Checklist

### Structure
- [ ] "When to Use" section exists
- [ ] Is a level 2 heading (##)
- [ ] Appears early in SKILL.md (before detailed content)

### Content (User-Invocable)
- [ ] Includes slash command format
- [ ] Lists common user phrases
- [ ] Specifies triggering keywords
- [ ] Clear and specific

### Content (Auto-Only)
- [ ] Specifies auto-activation conditions
- [ ] Lists triggering keywords/context
- [ ] Explains integration points
- [ ] Clear when it activates

## Integration with user-invocable Flag

If skill has `user-invocable: false`:
- "When to Use" should focus on auto-activation
- Should NOT mention slash command
- Should explain triggering conditions clearly

If skill is user-invocable (default):
- "When to Use" should start with slash command
- Should include both direct invocation and auto-activation
- Should list common user phrases
