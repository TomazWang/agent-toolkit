# Planning Workflow Plugin

Create detailed implementation plans and execute them systematically.

## Source Attribution

Based on patterns from:
- [Superpowers writing-plans and executing-plans skills](https://github.com/obra/superpowers) - Planning methodology

## Overview

This plugin provides structured workflows for creating and executing implementation plans. It helps break down complex work into manageable steps with clear milestones and verification points.

## Features

- Detailed plan creation with file-level breakdowns
- Step-by-step plan execution
- Progress tracking and checkpoints
- Integration with git worktrees for isolation
- Automatic plan documentation

## Commands

### `/plan`

Create or execute an implementation plan.

```bash
# Create new plan
/plan create "Implement OAuth2 authentication"

# Execute existing plan
/plan execute docs/plans/2026-02-05-oauth-implementation.md

# Show plan status
/plan status
```

## Skills

### `writing-plans`

Use before implementation to create detailed, step-by-step plans.

### `executing-plans`

Use to systematically execute an existing plan with checkpoints.

## Usage

Plans follow this structure:
1. Overview and goals
2. Prerequisites
3. Step-by-step implementation (with file references)
4. Testing and verification
5. Documentation updates
6. Deployment considerations
