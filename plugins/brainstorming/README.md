# Brainstorming Plugin

Turn ideas into fully-formed designs through natural collaborative dialogue.

## Source Attribution

Based on patterns from:
- [Superpowers brainstorming skill](https://github.com/obra/superpowers) - Collaborative design approach

## Overview

This plugin helps transform vague ideas into detailed, validated designs before implementation. It guides you through understanding requirements, exploring approaches, and creating comprehensive design documents.

## Features

- Interactive question-driven requirements gathering
- Multiple approach exploration with trade-offs
- Incremental design validation
- Automatic design documentation
- Integration with planning workflow

## Commands

### `/brainstorm`

Start an interactive brainstorming session.

```bash
/brainstorm "Add user authentication system"
/brainstorm "Redesign the dashboard"
```

## Skills

### `idea-to-design`

Guides the process of turning an idea into a detailed design through questions and validation.

### `design-validation`

Validates a design document for completeness and feasibility.

## Usage

```bash
/brainstorm "New feature idea"
```

The agent will:
1. Ask clarifying questions one at a time
2. Propose 2-3 architectural approaches
3. Present design in sections for validation
4. Save validated design to docs/plans/
5. Optionally transition to implementation planning
