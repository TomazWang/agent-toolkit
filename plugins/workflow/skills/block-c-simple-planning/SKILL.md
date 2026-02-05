---
name: block-c-simple-planning
description: Block C workflow - Simple planning and task-based implementation
---

# Block C: Simple Planning Skill

Quick planning for straightforward tasks.

## Process

### 1. Quick Research (if needed)
- Read relevant code
- Understand current implementation
- ~5 minutes max

### 2. Create Plan

**Format:**
```
docs/plans/YYYY-MM-DD-[feature].md
```

**Structure:**
```markdown
# [Feature/Fix Name]

## Goal
What we're achieving

## Steps
1. [First step]
2. [Second step]
...

## Files to Modify
- file1.ts
- file2.ts

## Success Criteria
- [How we know it's done]
```

### 3. Convert to Tasks

**If task-management installed:**
```bash
/task create "Step 1" --project [name]
/task create "Step 2" --project [name]
...
```

**Otherwise:**
Use TodoWrite:
```
- [ ] Step 1
- [ ] Step 2
...
```

### 4. Implement

Work through tasks with live tracking.

## Keep It Simple

- Don't over-plan
- <8 steps total
- Focus on getting it done
- Can always escalate to Block B if it grows

## Example

```
User: /workflow:plan "Add email validation"

Quick research: (30 seconds)
→ Signup form has no validation

Plan:
1. Add email regex to form
2. Show error if invalid
3. Update test
4. Manual test in browser

Tasks created (4)
→ Start implementing!
```

No ceremony, just useful structure.
