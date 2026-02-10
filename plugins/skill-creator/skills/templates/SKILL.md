---
name: templates
description: Browse skill templates for common patterns
user-invocable: false
---

# Skill Templates

## When to Use

- User invokes `/skill-creator:templates`
- User asks "show me skill examples"
- User wants a starting point

## Available Templates

### 1. Auto-Activating Skill

**Use when:** Skill should trigger automatically based on context

```yaml
---
name: auto-formatter
description: Automatically formats code when pasted
user-invocable: false
---

## When to Use

Auto-activates when:
- User pastes code block
- Code has formatting issues
- Keywords detected: "format", "clean up"
```

### 2. User-Invocable Skill

**Use when:** Skill is explicitly called by user

```yaml
---
name: generate-docs
description: Generate documentation for code
---

## When to Use

- User invokes /plugin:generate-docs
- User asks "document this code"
- User requests documentation generation
```

### 3. Guide/Reference Skill

**Use when:** Skill provides learning material

```yaml
---
name: design-patterns
description: Reference guide for design patterns
---

## When to Use

- User invokes /plugin:design-patterns
- User asks "what are design patterns?"
- Can reference during code review
```

### 4. Workflow Orchestrator

**Use when:** Skill manages multi-step workflow

```yaml
---
name: orchestrator
description: Main workflow conductor
user-invocable: false
---

## When to Use

Auto-activates when:
- User invokes /plugin:start
- User begins structured workflow
```

### 5. Integration Skill

**Use when:** Skill integrates with another plugin

```yaml
---
name: task-integration
description: Integrates with task-management plugin
user-invocable: false
---

## When to Use

Auto-activates when:
- task-management plugin detected
- User creates workflow tasks
```

## Output

Shows template list with:
- Template name
- Use case
- Complete example
- When to use each pattern
