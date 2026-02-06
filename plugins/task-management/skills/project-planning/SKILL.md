---
name: project-planning
description: Use when planning a new project or large feature - guides requirements gathering and task decomposition
---

# Project Planning Skill

Use this skill when starting a new project or planning a substantial feature that requires coordination of multiple tasks and components.

## When to Use

- Starting a greenfield project
- Planning a major feature (>5 related tasks)
- Beginning a refactoring effort
- User asks "how should I structure this?"
- Before entering plan mode for complex work

## The Planning Process

### Phase 1: Requirements Gathering

**Ask clarifying questions:**
1. What problem does this solve?
2. Who are the users?
3. What are the core features (MVP)?
4. What are nice-to-haves?
5. Are there constraints (tech stack, timeline, resources)?
6. How will success be measured?

**Document answers** in `.claude/projects/<project-name>/requirements.md`

### Phase 2: Architecture Design

**Identify key components:**
- What are the major building blocks?
- How do they interact?
- What external dependencies exist?
- What are the data models?
- Where are the integration points?

**Consider approaches:**
- Present 2-3 architectural options
- Discuss trade-offs
- Recommend based on requirements
- Get user buy-in

### Phase 3: Task Decomposition

**Break down into tasks:**
1. Start with phases/milestones
2. Break phases into features
3. Break features into tasks
4. Identify dependencies
5. Group related tasks

**Example structure:**
```
Phase 1: Foundation
  - Setup project structure
  - Configure build system
  - Setup CI/CD

Phase 2: Core Features
  - Implement data layer
  - Create API endpoints
  - Build UI components

Phase 3: Integration
  - Connect frontend to backend
  - Add error handling
  - Implement authentication

Phase 4: Polish
  - Add tests
  - Optimize performance
  - Write documentation
```

### Phase 4: Prioritization

**Categorize tasks:**
- **Critical Path:** Must be done first, blocks other work
- **High Priority:** Important but not blocking
- **Medium Priority:** Valuable but can wait
- **Low Priority:** Nice-to-have

**Order considerations:**
- Dependencies (what blocks what)
- Risk (tackle uncertain parts early)
- Value (deliver working features incrementally)

### Phase 5: Create Task Records

**For each major task:**
```bash
/task create "Task description" --priority <level> --project <name>
```

**Link dependencies:**
```bash
/task link TASK-101 blocks TASK-102
```

### Phase 6: Document the Plan

**Create plan document:**
```markdown
# Project: <Name>

## Overview
Brief description and goals

## Requirements
Key requirements and constraints

## Architecture
High-level architecture description

## Tasks
- [ ] TASK-101: Setup foundation
- [ ] TASK-102: Implement core feature A
- [ ] TASK-103: Implement core feature B
...

## Milestones
1. Week 1: Foundation complete
2. Week 2: Core features functional
3. Week 3: Integration complete
4. Week 4: Polish and launch

## Risks and Mitigations
Known risks and how to handle them
```

Save to `docs/plans/YYYY-MM-DD-<project-name>.md`

## Integration with Other Skills

**Before brainstorming:**
- Use project-planning for overall structure
- Use brainstorming for individual feature designs

**Before task-workflow:**
- project-planning creates the task list
- task-workflow executes individual tasks

**With planning-workflow:**
- project-planning creates the strategic plan
- planning-workflow creates tactical implementation plans

## Example Usage

```
User: "I want to build a blog platform with user accounts and markdown posts"

Assistant (using project-planning):

I'll help you plan this blog platform project. Let me gather requirements:

Requirements:
- User authentication and accounts
- Markdown post creation/editing
- Post publishing and viewing
- Comments?
- Search?
- Tags/categories?

Let me propose an architecture:

Option A: Monolithic (Recommended for MVP)
- Single app with frontend and backend
- SQLite database
- Server-side rendering
- Pros: Simple deployment, faster development
- Cons: Harder to scale later

Option B: API-first
- Separate API and frontend
- PostgreSQL database
- Client-side rendering
- Pros: More flexible, better separation
- Cons: More complex, slower initial development

For an MVP, I recommend Option A. We can migrate to Option B later if needed.

Let me break this into tasks:

Phase 1: Foundation (2-3 days)
  TASK-101: Setup Node.js project with Express
  TASK-102: Setup SQLite database
  TASK-103: Create project structure
  TASK-104: Setup basic routing

Phase 2: Authentication (3-4 days)
  TASK-105: Implement user registration
  TASK-106: Implement login/logout
  TASK-107: Add session management
  TASK-108: Create user profile pages

Phase 3: Post Management (4-5 days)
  TASK-109: Create post data models
  TASK-110: Build post editor UI
  TASK-111: Implement markdown parsing
  TASK-112: Add post listing page
  TASK-113: Add post detail pages

Phase 4: Polish (2-3 days)
  TASK-114: Add styling
  TASK-115: Write tests
  TASK-116: Add documentation
  TASK-117: Deploy to production

I'll create these tasks with the /task command. Ready to proceed?
```

## Key Principles

- **Start with why** - Understand the problem before designing
- **MVP first** - Identify minimum viable functionality
- **Think in phases** - Break large projects into milestones
- **Visualize dependencies** - Use task linking to show critical path
- **Document decisions** - Write down the plan for future reference
- **Validate early** - Get user feedback on architecture before coding

## Red Flags

These situations need project-planning:

- User describes vague project goals → Use this skill to clarify
- Multiple features mentioned → Use this to organize them
- "Let's build X" without details → Use this to define X
- Starting to code without structure → STOP, plan first

Planning prevents wasted effort and ensures everyone is aligned on direction.
