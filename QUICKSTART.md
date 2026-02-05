# Quick Start Guide

Get started with Agent Toolkit in 5 minutes.

## Installation

### Prerequisites

- Claude Code CLI installed
- Git
- Node.js 16+ (optional, for Node.js scripts)

### Clone Repository

```bash
git clone https://github.com/[username]/agent-toolkit.git
cd agent-toolkit
```

## Install Your First Plugin

### Option 1: Using Install Script (Recommended)

```bash
# Install task-management plugin
./scripts/install-plugin.sh task-management
```

### Option 2: Manual Installation

```bash
# Create symlink to Claude plugins directory
ln -s $(pwd)/plugins/task-management ~/.claude/plugins/task-management
```

### Option 3: Via Marketplace (Future)

```bash
claude
/marketplace install task-management
```

## Try It Out

### Task Management

```bash
claude

# Create a task
/task create "Implement user authentication" --priority high

# List tasks
/task list

# Start working on a task
/task start TASK-001
```

### Code Review

```bash
# Install code-review plugin
./scripts/install-plugin.sh code-review

# In Claude Code
/review

# Or focused review
/review --focus security,performance
```

### Test-Driven Development

```bash
# Install TDD workflow
./scripts/install-plugin.sh tdd-workflow

# Start TDD cycle
/tdd start "User login feature"
```

## Explore Available Plugins

```bash
# List all plugins
node scripts/list-plugins.js

# Or manually
ls -la plugins/
```

## Next Steps

### Learn More

- Read [CLAUDE.md](CLAUDE.md) for architecture and development guide
- Read [README.md](README.md) for full documentation
- Read individual plugin READMEs for detailed usage

### Install More Plugins

```bash
# Workflow plugins
./scripts/install-plugin.sh planning-workflow
./scripts/install-plugin.sh brainstorming

# Quality plugins
./scripts/install-plugin.sh code-review

# Development plugins
./scripts/install-plugin.sh tdd-workflow
./scripts/install-plugin.sh sdd-workflow

# Meta plugins
./scripts/install-plugin.sh plugin-creator
./scripts/install-plugin.sh marketplace
```

### Create Your Own Plugin

```bash
# Use the plugin-creator
./scripts/install-plugin.sh plugin-creator

# In Claude Code
/plugin create my-custom-plugin
```

## Common Workflows

### Feature Development Workflow

1. **Brainstorm** the design
   ```
   /brainstorm "New feature idea"
   ```

2. **Plan** the implementation
   ```
   /plan create "Feature implementation"
   ```

3. **Track** with tasks
   ```
   /task create "Implement feature" --project my-feature
   /task start TASK-001
   ```

4. **Use TDD** for implementation
   ```
   /tdd start "Feature component"
   ```

5. **Review** before committing
   ```
   /review
   ```

### Code Review Workflow

1. Make changes on a feature branch
2. Run comprehensive review
   ```
   /review
   ```
3. Fix critical and high-priority issues
4. Create pull request
5. Share review report with team

### Task Management Workflow

1. Create tasks for your work
   ```
   /task create "Setup database" --priority high
   /task create "Implement API" --priority high
   /task create "Add tests" --priority medium
   ```

2. Link dependencies
   ```
   /task link TASK-001 blocks TASK-002
   ```

3. Start working
   ```
   /task start TASK-001
   ```

4. Complete and move to next
   ```
   /task update TASK-001 --status completed
   /task start TASK-002
   ```

## Troubleshooting

### Plugin Not Found

Make sure you're in the Claude Code environment:
```bash
claude
/help
```

If plugin commands aren't available, verify installation:
```bash
ls -la ~/.claude/plugins/
```

### Permission Errors

Make scripts executable:
```bash
chmod +x scripts/*.sh
```

### Command Not Working

1. Check plugin is installed: `ls ~/.claude/plugins/`
2. Restart Claude Code
3. Check plugin.json is valid JSON
4. Read plugin README for usage instructions

## Getting Help

- **Documentation**: Read [CLAUDE.md](CLAUDE.md) and plugin READMEs
- **Issues**: https://github.com/[username]/agent-toolkit/issues
- **Contributions**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## What's Next?

- Explore advanced features in plugin READMEs
- Create custom plugins for your workflow
- Contribute improvements back to the project
- Share your plugins with the community

Happy coding! 🚀
