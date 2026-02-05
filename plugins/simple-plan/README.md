# Simple Plan Plugin

Simple, flexible planning that works standalone or integrates with OpenSpec.

## Source Attribution

This plugin is inspired by:
- [OpenSpec by Fission-AI](https://github.com/Fission-AI/OpenSpec) - Spec-driven development philosophy
- [Superpowers writing-plans](https://github.com/obra/superpowers) - Planning workflows

## Philosophy

Aligned with OpenSpec's principles:

> **"fluid not rigid → iterative not waterfall → easy not complex"**

- **Lightweight**: No ceremony, just useful planning
- **Flexible**: Works with or without OpenSpec
- **Iterative**: Plans evolve, they're not set in stone
- **AI-native**: Designed for human-AI collaboration

## Features

- **Auto-detection**: Detects if you're using OpenSpec
- **Simple by default**: Doesn't force structure
- **Structured when needed**: Full OpenSpec support
- **Iterative**: Plans are living documents
- **Fast**: Quick planning without overhead

## Commands

### `/plan`

Create a simple plan or OpenSpec feature spec.

```bash
# Simple mode (default)
/plan "Add dark mode support"

# Auto-detects OpenSpec if openspec/ exists
/plan "New API endpoint"

# Force mode
/plan "Quick fix" --simple
/plan "Major feature" --openspec
```

## OpenSpec Integration

If you have an `openspec/` directory, automatically creates:

```
openspec/changes/[feature-name]/
├── proposal.md   # The "why" and scope
├── design.md     # Technical approach
└── tasks.md      # Implementation checklist
```

Compatible with OpenSpec commands (`/opsx:*`)

## Standalone Mode

No `openspec/`? Creates simple plan:

```
docs/plans/YYYY-MM-DD-feature-name.md
```

## Skills

### `simple-planning`

Lightweight planning skill for any implementation task.

### `openspec-integration`

Detects and integrates with OpenSpec when present.

## Usage

See README for full examples and OpenSpec integration details.
