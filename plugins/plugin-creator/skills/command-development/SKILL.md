---
name: command-development
description: Creating slash commands with argument parsing and YAML frontmatter
---

# Command Development Skill

Guide to creating effective slash commands for Claude Code plugins.

## When to Use

Activate when:
- Creating new slash commands
- User asks about command structure
- Implementing command arguments
- Questions about YAML frontmatter

## What Are Commands?

Commands are **user-invoked actions** via slash syntax:
```bash
/plugin:command argument1 argument2 --flag value
```

**When to use commands**:
- User explicitly triggers action
- Interactive workflows needed
- Tool integration required
- Configuration management

**When NOT to use commands**:
- Automatic guidance → Use Skills
- Background analysis → Use Agents
- Event-driven automation → Use Hooks

## Command Structure

### File Location

```
plugin-name/
└── commands/
    ├── command1.md
    ├── command2.md
    └── subcommand/
        └── action.md      # For /plugin:subcommand:action
```

### Command Naming

**Plugin auto-prefixes command names**:

**File**: `commands/start.md`
**Plugin**: `workflow`
**Invoked as**: `/workflow:start`

**CRITICAL**: Don't duplicate prefix!
- ✓ File: `start.md` → `/workflow:start`
- ✗ File: `workflow:start.md` → `/workflow:workflow:start`

### Basic Command Format

```yaml
---
name: command-name
description: Brief description of what command does
usage: |
  /plugin:command <required-arg> [optional-arg] --flag value
examples:
  - /plugin:command example1
  - /plugin:command example2 --verbose
---

# Command Name

Detailed description of command purpose and behavior.

## Arguments

### Required
- `arg1` - Description of required argument

### Optional
- `arg2` - Description of optional argument (default: value)

### Flags
- `--flag` - Description of flag

## Process

1. Step one
2. Step two
3. Step three

## Examples

### Example 1: Basic Usage
```bash
/plugin:command basic-example
```

What happens:
- [Explain the outcome]

### Example 2: Advanced Usage
```bash
/plugin:command complex-example --flag value
```

What happens:
- [Explain the outcome]

## Integration

- Works with: [Related plugins/commands]
- Requires: [Dependencies if any]
```

## YAML Frontmatter

### Required Fields

```yaml
---
name: command-name        # Must match filename
description: Brief desc   # Shows in help text
---
```

### Full Frontmatter

```yaml
---
name: command-name
description: One-line description for command listing
usage: |
  /plugin:command <required> [optional] --flag value
  /plugin:command --help
examples:
  - /plugin:command example1
  - /plugin:command example2 --verbose
  - /plugin:command --interactive
aliases:
  - shortname
  - alternate-name
---
```

## Argument Patterns

### Positional Arguments

```yaml
---
usage: |
  /plugin:create <plugin-name> [directory]
---

# Create Command

## Arguments
- `plugin-name` (required) - Name of plugin to create
- `directory` (optional) - Target directory (default: ./plugins)

## Examples
```bash
/plugin:create my-plugin
/plugin:create my-plugin ./custom-dir
```
```

### Flags and Options

```yaml
---
usage: |
  /plugin:validate [path] --strict --format <json|text>
---

# Validate Command

## Flags
- `--strict` - Enable strict validation mode
- `--format <format>` - Output format: json or text (default: text)

## Examples
```bash
/plugin:validate                    # Current directory, text format
/plugin:validate --strict           # Strict mode
/plugin:validate --format json      # JSON output
/plugin:validate ./my-plugin --strict --format json
```
```

### Subcommands

```yaml
---
usage: |
  /plugin:add skill <name>
  /plugin:add command <name>
  /plugin:add agent <name>
  /plugin:add hook <event>
---

# Add Command

Adds a component to existing plugin.

## Subcommands

### skill
Add a new skill to the plugin.
```bash
/plugin:add skill my-skill
```

### command
Add a new command to the plugin.
```bash
/plugin:add command my-command
```

### agent
Add a new agent to the plugin.
```bash
/plugin:add agent my-agent
```

### hook
Add an event hook to the plugin.
```bash
/plugin:add hook PreToolUse
```
```

## Command Patterns

### Simple Action Command

**Purpose**: Single, straightforward action

```yaml
---
name: build
description: Build the project
usage: /plugin:build [--watch]
examples:
  - /plugin:build
  - /plugin:build --watch
---

# Build Command

Compiles the project.

## Process

1. Clean output directory
2. Compile source files
3. Copy assets
4. Generate build report

## Flags

- `--watch` - Watch mode for development
```

### Interactive Workflow Command

**Purpose**: Multi-step guided process

```yaml
---
name: init
description: Initialize new project interactively
usage: /plugin:init [project-name]
examples:
  - /plugin:init
  - /plugin:init my-project
---

# Init Command

Interactive project initialization.

## Process

1. **Prompt for project details**:
   - Project name (if not provided)
   - Description
   - License type
   - Dependencies

2. **Create structure**:
   - Generate directory layout
   - Create configuration files
   - Install dependencies

3. **Verify**:
   - Run validation
   - Show summary
```

### Multi-Action Command

**Purpose**: Multiple related actions in one command

```yaml
---
name: task
description: Manage tasks
usage: |
  /plugin:task create <title>
  /plugin:task list [--status pending|done]
  /plugin:task complete <id>
  /plugin:task delete <id>
examples:
  - /plugin:task create "Implement feature"
  - /plugin:task list
  - /plugin:task list --status pending
  - /plugin:task complete 1
---

# Task Command

Complete task management.

## Subcommands

### create
Create a new task.

### list
List all tasks, optionally filtered by status.

### complete
Mark a task as completed.

### delete
Delete a task.
```

### Delegating Command

**Purpose**: Routes to skills or agents

```yaml
---
name: start
description: Start workflow with auto-detection
usage: |
  /plugin:start <description>
  /plugin:start <description> --mode <auto|spec|plan|simple>
examples:
  - /plugin:start "Implement user authentication"
  - /plugin:start "Fix login bug" --mode simple
---

# Start Command

Initiates workflow with complexity detection.

## Process

1. **Analyze request**:
   - Parse description
   - Detect complexity
   - Identify project context

2. **Route to appropriate workflow**:
   - Complex → Spec + Validation
   - Medium → Spec + TDD
   - Simple → Simple Planning

3. **Hand off to skill/agent**:
   - Invoke appropriate skill
   - Or launch specialized agent
```

## Using AskUserQuestion

Commands can ask interactive questions:

```markdown
## Process

1. **Gather plugin details**:
   Use AskUserQuestion to ask:
   - Plugin name
   - Description
   - Components to include (commands, skills, agents, hooks)
   - Author name

2. **Create structure**:
   Based on user responses, generate plugin files

3. **Confirm**:
   Show what was created
```

Example in command:
```markdown
Ask user to choose components:
- [ ] Commands - User-invoked actions
- [ ] Skills - Guidance and workflows
- [ ] Agents - Autonomous workers
- [ ] Hooks - Event handlers

Then create the selected components.
```

## Integration Patterns

### With Skills

```markdown
## Process

1. Invoke related skill:
   - Skill provides the methodology
   - Command triggers the workflow

**Example**:
```bash
/tdd:start "User authentication"
```
→ Invokes `test-driven-development` skill
→ Guides through RED-GREEN-REFACTOR
```

### With Agents

```markdown
## Process

1. Launch specialized agent:
   ```
   Launch meta-validator agent to check spec
   ```

2. Wait for agent completion

3. Present results
```

### With Hooks

```markdown
## Process

1. Command performs action
2. Hook validates/logs automatically

**Example**:
- User runs: `/plugin:deploy`
- PreToolUse hook checks environment
- PostToolUse hook logs deployment
```

### With Other Commands

```markdown
## Process

1. Run prerequisite commands:
   ```bash
   /workflow:spec "Create API spec"
   /workflow:plan "Implement spec"
   /workflow:start
   ```

2. Chain commands for workflows
```

## Best Practices

### Clear Documentation

**Good**:
```yaml
---
name: validate
description: Validate plugin structure and metadata
usage: |
  /plugin:validate [path]
  /plugin:validate [path] --strict
examples:
  - /plugin:validate
  - /plugin:validate ./my-plugin
  - /plugin:validate ./my-plugin --strict
---

# Validate Command

Checks plugin for structural and metadata issues.

## What It Checks
- plugin.json exists and is valid JSON
- All referenced components exist
- YAML frontmatter is valid
- Skills are folders with SKILL.md
- README.md exists

## Output
Generates validation report with errors and warnings.
```

### Argument Validation

```markdown
## Process

1. **Validate arguments**:
   - Check required args provided
   - Validate arg formats
   - Check file paths exist

2. **If validation fails**:
   ```
   ❌ Invalid argument: <arg>

   Usage: /plugin:command <required> [optional]

   Examples:
   - /plugin:command valid-example
   ```

3. **If validation passes**:
   Continue with command logic
```

### Error Handling

```markdown
## Process

1. Attempt operation

2. **If error occurs**:
   ```
   ❌ Operation Failed

   Error: [Clear error message]

   Common solutions:
   - Check that [requirement]
   - Verify [dependency]

   Need help? /plugin:command --help
   ```

3. **If successful**:
   ```
   ✓ Operation completed

   Results:
   - [What was done]

   Next steps:
   - [Suggested actions]
   ```
```

### Progress Indication

For long-running commands:

```markdown
## Process

1. Show what's happening:
   ```
   Creating plugin structure...
   ✓ Created plugin.json
   ✓ Created commands/
   ✓ Created skills/
   ⏳ Installing dependencies...
   ```

2. Update as progress occurs

3. Show completion:
   ```
   ✓ Plugin created successfully

   Location: ./plugins/my-plugin

   Next: /plugin:add skill my-skill
   ```
```

## Advanced Techniques

### Dynamic Arguments

```markdown
## Process

1. **Detect context**:
   - If in git repo → offer git-related options
   - If package.json → offer npm-related options
   - If requirements.txt → offer pip-related options

2. **Adapt arguments**:
   - Show relevant flags for detected context
   - Hide irrelevant options
```

### Conditional Execution

```markdown
## Process

1. **Check prerequisites**:
   - Required files exist?
   - Required tools installed?
   - Valid configuration?

2. **If prerequisites missing**:
   ```
   ⚠️  Prerequisites Missing

   Required:
   - [Tool/file needed]

   Install: [How to install]
   ```

3. **If prerequisites met**:
   Proceed with command
```

### Command Composition

```markdown
## Process

1. **Run subcommands in sequence**:
   ```bash
   # Equivalent to running:
   /plugin:create my-plugin
   /plugin:add skill my-skill
   /plugin:add command start
   /plugin:validate
   ```

2. **Stop on first error**:
   - If any subcommand fails, stop
   - Show which step failed
   - Suggest how to recover
```

## Testing Commands

### Manual Testing Checklist

- [ ] Command invokes correctly
- [ ] Required arguments validated
- [ ] Optional arguments work
- [ ] Flags work as documented
- [ ] Error messages are clear
- [ ] Success messages are informative
- [ ] Help text is accurate
- [ ] Examples work as shown

### Test Scenarios

```markdown
Test /plugin:create:

1. **Valid input**:
   /plugin:create my-plugin
   Expected: Plugin created successfully

2. **Missing argument**:
   /plugin:create
   Expected: Error about missing plugin-name

3. **Invalid characters**:
   /plugin:create my@plugin
   Expected: Error about invalid name format

4. **Existing plugin**:
   /plugin:create my-plugin (when exists)
   Expected: Error or prompt to overwrite

5. **Help flag**:
   /plugin:create --help
   Expected: Show usage and examples
```

## Common Pitfalls

### Vague Usage Documentation

**Problem**:
```yaml
---
usage: /plugin:command [options]
---
```

**Fix**:
```yaml
---
usage: |
  /plugin:command <file> [--format json|yaml]
  /plugin:command --help
examples:
  - /plugin:command config.json
  - /plugin:command data.yaml --format yaml
---
```

### Missing Examples

**Problem**:
```yaml
---
name: deploy
description: Deploy application
---
```

**Fix**:
```yaml
---
name: deploy
description: Deploy application to production
usage: |
  /plugin:deploy [environment] [--dry-run]
examples:
  - /plugin:deploy staging
  - /plugin:deploy production
  - /plugin:deploy production --dry-run
---
```

### Poor Error Messages

**Problem**:
```
Error: Invalid input
```

**Fix**:
```
❌ Invalid plugin name: "my@plugin"

Plugin names must:
- Use lowercase letters
- Use hyphens for spaces
- No special characters

Examples:
- my-plugin ✓
- user-manager ✓
- my@plugin ✗

Try: /plugin:create my-plugin
```

## References

- Official commands documentation: https://code.claude.com/docs/en/commands
- Plugin reference: https://code.claude.com/docs/en/plugins-reference
- Official examples: https://github.com/anthropics/claude-code/tree/main/plugins
