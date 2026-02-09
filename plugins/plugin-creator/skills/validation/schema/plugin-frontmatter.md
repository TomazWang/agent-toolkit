# Plugin Frontmatter Schema (plugin.json)

## Required Fields

```json
{
  "name": "plugin-name",              // Required: kebab-case, no spaces
  "version": "1.0.0",                 // Required: semver format
  "description": "Brief description", // Required: 1-2 sentences
  "author": {                         // Required
    "name": "Author Name"             // Required
  }
}
```

## Optional Fields

```json
{
  "keywords": ["tag1", "tag2"],       // Recommended: array of strings
  "repository": {                     // Recommended
    "type": "git",
    "url": "https://github.com/user/repo"
  },
  "license": "MIT",                   // Optional
  "homepage": "https://...",          // Optional
  "dependencies": []                  // Optional: array of plugin names
}
```

## Validation Rules

### name
- **Format**: kebab-case (lowercase, hyphens only)
- **Pattern**: `^[a-z][a-z0-9-]*$`
- **Examples**:
  - ✓ `task-management`
  - ✓ `code-review`
  - ✗ `TaskManagement` (camelCase)
  - ✗ `task_management` (underscores)

### version
- **Format**: Semantic versioning (semver)
- **Pattern**: `^\d+\.\d+\.\d+$`
- **Examples**:
  - ✓ `1.0.0`
  - ✓ `2.1.3`
  - ✗ `1.0` (missing patch)
  - ✗ `v1.0.0` (no 'v' prefix)

### description
- **Type**: string
- **Length**: 10-200 characters
- **Content**: Brief summary of plugin purpose
- **Examples**:
  - ✓ "Structured task tracking and project workflow management"
  - ✗ "Plugin" (too short)

### author.name
- **Type**: string
- **Required**: Yes
- **Examples**:
  - ✓ "Agent Toolkit"
  - ✓ "John Doe"

### keywords
- **Type**: array of strings
- **Recommended**: Yes
- **Format**: lowercase, descriptive tags
- **Examples**:
  - ✓ `["workflow", "tasks", "productivity"]`
  - ✗ `["Workflow"]` (capitalize)

## Auto-Discovery (Recommended)

**Claude Code auto-discovers components from directories.** You should NOT manually list them in plugin.json:

**✓ Recommended** (auto-discovery):
```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description",
  "author": { "name": "Your Name" }
}
```

**✗ Not recommended** (manual listing):
```json
{
  "commands": [],  // Don't list - auto-discovered from commands/
  "skills": [],    // Don't list - auto-discovered from skills/
  "agents": [],    // Don't list - auto-discovered from agents/
  "hooks": []      // Don't list - auto-discovered from hooks/
}
```

**Why auto-discovery?**
- Less maintenance (no sync between files and manifest)
- Prevents errors from outdated lists
- Standard practice in official plugins

## Example Valid plugin.json

```json
{
  "name": "task-automation",
  "version": "1.0.0",
  "description": "Automated task management with smart scheduling and priority handling",
  "author": {
    "name": "Agent Toolkit"
  },
  "keywords": ["tasks", "automation", "workflow", "productivity"],
  "repository": {
    "type": "git",
    "url": "https://github.com/user/agent-toolkit"
  },
  "license": "MIT"
}
```

## Common Errors

**Missing required field:**
```json
{
  "name": "my-plugin"
  // ✗ Missing version, description, author
}
```

**Invalid name format:**
```json
{
  "name": "My Plugin"  // ✗ Spaces not allowed
}
```

**Invalid version:**
```json
{
  "version": "1.0"  // ✗ Must be semver (1.0.0)
}
```

## Validation Checklist

- [ ] Valid JSON syntax
- [ ] `name` field present (kebab-case)
- [ ] `version` field present (semver)
- [ ] `description` field present (10-200 chars)
- [ ] `author.name` field present
- [ ] `keywords` array (recommended)
- [ ] `repository` object (recommended)
- [ ] No auto-discovery fields (commands, skills, agents, hooks)
