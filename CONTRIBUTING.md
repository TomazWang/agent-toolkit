# Contributing to Agent Toolkit

Thank you for your interest in contributing to Agent Toolkit! This document provides guidelines for contributing new plugins, skills, commands, or improvements.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/[your-username]/agent-toolkit.git`
3. Create a feature branch: `git checkout -b feature/my-new-plugin`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Project Structure

Please read [CLAUDE.md](CLAUDE.md) for a comprehensive overview of the project architecture and conventions.

## Adding a New Plugin

### 1. Research Existing Solutions

Before creating a new plugin, research:
- Anthropic's official plugins: https://github.com/anthropics/claude-code/tree/main/plugins
- Superpowers: https://github.com/obra/superpowers
- Other community plugins

If you're inspired by or building upon existing work, you **must** include proper attribution.

### 2. Create Plugin Structure

```bash
mkdir -p plugins/my-plugin/{.claude-plugin,commands,skills,agents}
```

### 3. Create Plugin Metadata

Create `plugins/my-plugin/.claude-plugin/plugin.json`:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what the plugin does",
  "author": "Your Name or Agent Toolkit",
  "commands": ["command-name"],
  "skills": ["skill-name"],
  "agents": ["agent-name"],
  "hooks": [],
  "dependencies": [],
  "tags": ["category", "keywords"]
}
```

### 4. Create README with Attribution

Create `plugins/my-plugin/README.md`:

```markdown
# My Plugin Name

Brief description.

## Source Attribution

This plugin is inspired by:
- [Source Name](url) - What was borrowed or inspired
- [Another Source](url) - What was borrowed or inspired

If original work, state:
Original implementation for agent-toolkit.

## Features
[List features]

## Commands
[Document commands]

## Skills
[Document skills]

## Usage
[Provide examples]
```

### 5. Implement Components

**Commands** (`commands/my-command.md`):
- YAML frontmatter with name, description, usage, examples
- Detailed instructions for Claude on how to execute the command
- Error handling guidelines
- Output format specifications

**Skills** (`skills/my-skill.md`):
- YAML frontmatter with name and description
- "When to Use" section with clear triggering conditions
- Step-by-step process/workflow
- Examples of usage
- Integration notes with other skills

**Agents** (`agents/my-agent.md`):
- YAML frontmatter with name, description, color, tools
- System prompt defining agent's role and expertise
- Process/methodology the agent follows
- Output format specifications
- Example interactions

### 6. Update Marketplace Registry

Add your plugin to `marketplace/registry.json`:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Brief description",
  "author": "Your Name",
  "repository": "https://github.com/[user]/agent-toolkit",
  "path": "plugins/my-plugin",
  "commands": ["my-command"],
  "skills": ["my-skill"],
  "agents": ["my-agent"],
  "tags": ["category", "keywords"],
  "dependencies": [],
  "category": "workflow|quality|development|meta"
}
```

### 7. Test Your Plugin

```bash
# Install locally
./scripts/install-plugin.sh my-plugin

# Test in Claude Code
claude
/my-command test-args

# Verify skill activation
# Verify agents work correctly
```

### 8. Submit Pull Request

- Title: `Add [plugin-name] plugin`
- Description: Explain what the plugin does, what inspired it, and how you tested it
- Reference any related issues

## Code Standards

### File Naming
- Use kebab-case: `my-plugin-name.md`
- Plugin directory name should match plugin ID

### Markdown Formatting
- Use proper ATX headings (# ## ###)
- Use fenced code blocks with language identifiers
- Use lists for structured information
- Use tables for comparison data

### YAML Frontmatter
- Always validate YAML syntax before committing
- Required fields: name, description
- Optional fields: usage, examples, color, tools

### Attribution
- **Required** for any code/ideas borrowed from others
- Include in README under "Source Attribution" section
- Include links to original sources
- Be specific about what was borrowed

### Documentation
- Every command must have usage examples
- Every skill must explain "When to Use"
- Every agent must define its role and process
- README must have Features, Usage, and Configuration sections

## Best Practices

### Plugin Design
- **Single Responsibility**: Each plugin should do one thing well
- **Modularity**: Plugins should work independently
- **Composability**: Plugins should work well together when combined
- **User-Friendly**: Clear documentation and intuitive commands

### Skills
- Define clear triggering conditions
- Provide step-by-step workflows
- Include examples
- Explain integration with other skills

### Agents
- Focus on a specific expertise area
- Define clear input/output expectations
- Specify which tools the agent needs
- Provide process/methodology

### Commands
- Use clear, consistent naming
- Accept standard arguments
- Provide helpful error messages
- Show progress for long operations

## Testing Checklist

Before submitting:

- [ ] Plugin installs without errors
- [ ] Commands execute correctly
- [ ] Skills activate at appropriate times
- [ ] Agents produce expected output
- [ ] README is complete with attribution
- [ ] plugin.json is valid JSON
- [ ] YAML frontmatter is valid
- [ ] Added to marketplace registry
- [ ] No broken links in documentation
- [ ] Follows project naming conventions

## Need Help?

- Read [CLAUDE.md](CLAUDE.md) for architecture overview
- Check existing plugins for examples
- Open an issue for questions or discussions
- Review Anthropic's plugin documentation
- Study Superpowers for skill patterns

## License

By contributing to Agent Toolkit, you agree that your contributions will be licensed under the MIT License.
