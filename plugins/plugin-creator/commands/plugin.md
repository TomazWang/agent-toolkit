---
name: plugin
description: Create, manage, and validate Claude Code plugins
usage: |
  /plugin create <name>
  /plugin add <type> <name>
  /plugin validate [path]
  /plugin package [path]
examples:
  - /plugin create my-workflow
  - /plugin add skill my-skill
  - /plugin add command my-command
  - /plugin add agent my-agent
  - /plugin validate
  - /plugin package
---

# Plugin Management Command

Comprehensive plugin development workflow for Claude Code.

## Official Documentation

**IMPORTANT**: Always reference the official Claude Code plugin documentation:
- Main docs: https://code.claude.com/docs/en/plugins
- Plugin reference: https://code.claude.com/docs/en/plugins-reference
- Skills guide: https://code.claude.com/docs/en/skills
- Commands guide: https://code.claude.com/docs/en/commands

## Subcommands

### create

Create a new plugin from scratch.

```bash
/plugin create <plugin-name>
```

**Process**:
1. Ask for plugin metadata (name, description, author)
2. Ask what components to include (commands, skills, agents, hooks)
3. Create plugin structure:
   ```
   plugin-name/
   ├── .claude-plugin/
   │   └── plugin.json
   ├── commands/           # Markdown files with YAML frontmatter
   ├── skills/             # Directories with SKILL.md
   ├── agents/             # Markdown files with YAML frontmatter
   ├── hooks/              # Executable scripts
   └── README.md
   ```
4. Generate plugin.json with proper structure
5. Create README with usage documentation

**plugin.json format** (per official spec):
```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "Plugin description",
  "author": "Your Name",
  "commands": ["command1", "command2"],
  "skills": ["skill1", "skill2"],
  "agents": ["agent1"],
  "hooks": ["PreToolUse.sh"],
  "dependencies": [],
  "tags": ["category1", "category2"]
}
```

### add

Add a component to existing plugin.

```bash
/plugin add skill <name>
/plugin add command <name>
/plugin add agent <name>
/plugin add hook <PreToolUse|PostToolUse|SessionStart|etc>
```

**Skill Structure** (per official spec):
- Create folder: `skills/<skill-name>/`
- Create file: `skills/<skill-name>/SKILL.md`
- YAML frontmatter:
  ```yaml
  ---
  name: skill-name
  description: What this skill does
  ---
  ```

**Command Structure**:
- Create file: `commands/<command-name>.md`
- YAML frontmatter:
  ```yaml
  ---
  name: command-name
  description: Command description
  usage: |
    /<plugin>:<command> <args>
  examples:
    - /<plugin>:<command> example
  ---
  ```

**Agent Structure**:
- Create file: `agents/<agent-name>.md`
- YAML frontmatter:
  ```yaml
  ---
  name: agent-name
  description: Agent purpose
  color: blue|green|orange|cyan|purple
  tools: [Read, Grep, Glob, Bash, Edit, Write]
  ---
  ```

**Hook Structure**:
- Create file: `hooks/<HookName>.sh`
- Executable bash script
- Available hooks: PreToolUse, PostToolUse, SessionStart, SessionEnd, Stop, SubagentStop, UserPromptSubmit, PreCompact, Notification

### validate

Validate plugin structure and metadata.

```bash
/plugin validate [path-to-plugin]
```

**Checks**:
1. plugin.json exists and is valid JSON
2. Required fields: name, version, description
3. All referenced commands/skills/agents/hooks exist
4. File naming matches component names
5. YAML frontmatter is valid
6. Skills are folders with SKILL.md (not flat .md files)
7. Commands have proper usage documentation
8. Agents have valid tool lists and colors
9. README.md exists

**Validation Report**:
```markdown
# Plugin Validation Report

## Structure ✓
- plugin.json valid
- All directories present

## Components
- Commands: 3/3 found ✓
- Skills: 2/2 found ✓
- Agents: 1/1 found ✓
- Hooks: 0 (optional)

## Issues
- ⚠️ Skill 'my-skill' should be folder with SKILL.md
- ❌ Command 'my-cmd' missing description in frontmatter

## Recommendations
- Add tags for better discoverability
- Include usage examples in README
```

### package

Prepare plugin for distribution.

```bash
/plugin package [path-to-plugin]
```

**Process**:
1. Validate plugin structure
2. Check README completeness
3. Verify all metadata is present
4. Create distribution checklist:
   - [ ] plugin.json complete
   - [ ] README with usage examples
   - [ ] All components documented
   - [ ] Source attribution if applicable
   - [ ] License specified
   - [ ] Installation instructions

**Output**:
```
Plugin packaged: my-plugin v1.0.0

Distribution checklist:
✓ plugin.json complete
✓ README with examples
⚠️ No LICENSE file
✓ All components documented

Ready to publish to marketplace.
```

## Best Practices

### Plugin Design
- **Single Responsibility**: Each plugin should have a clear, focused purpose
- **Component Organization**: Use appropriate component types (commands for actions, skills for guidance, agents for autonomous work)
- **Documentation**: README should explain when and how to use the plugin
- **Dependencies**: Minimize dependencies, document any required external tools

### Naming Conventions
- Plugin names: lowercase, hyphens (e.g., `task-management`)
- Commands: lowercase, no plugin prefix (auto-added)
- Skills: lowercase, hyphens, descriptive (e.g., `workflow-router`)
- Agents: lowercase, hyphens, role-based (e.g., `meta-validator`)

### Skill Development
- Use progressive disclosure (start simple, add detail)
- Include concrete examples
- Specify triggering conditions clearly
- Make skills actionable, not just informational

### Command Development
- Clear usage documentation
- Examples for common cases
- Argument parsing guidance
- Integration with relevant skills

## Examples

### Create Simple Plugin
```bash
/plugin create hello-world
# Prompts for:
# - Description: "A simple greeting plugin"
# - Commands: "greet"
# - Skills: none
# - Agents: none
```

### Create Complex Workflow Plugin
```bash
/plugin create workflow-manager
# Creates plugin with:
# - Commands: start, status, complete
# - Skills: workflow-router, task-integration
# - Agents: workflow-planner
# - README with full documentation
```

### Add Components to Existing Plugin
```bash
cd my-plugin
/plugin add skill validation-checker
/plugin add command validate
/plugin add agent validator
```

### Validate Before Publishing
```bash
/plugin validate ./plugins/my-plugin
# Checks all structure, metadata, documentation
# Reports issues and recommendations
```

## Integration with Other Plugins

- Works with `task-management` for plugin development tracking
- Uses `workflow` plugin patterns for structured development
- Follows `brainstorming` approach for plugin ideation

## Reference

- Official plugin specification: https://code.claude.com/docs/en/plugins
- Official plugin reference: https://code.claude.com/docs/en/plugins-reference
- Example plugins: https://github.com/anthropics/claude-code/tree/main/plugins
- Superpowers skills guide: https://github.com/obra/superpowers
