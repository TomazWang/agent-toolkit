# Brainstorming Plugin

Flexible AI-assisted brainstorming for any creative challenge - not just software development.

## Source Attribution

This plugin is inspired by:
- [Superpowers brainstorming skill](https://github.com/obra/superpowers) - Collaborative design approach
- Modern AI brainstorming research (2026):
  - [AI for Brainstorming Ideas: Intelligent Ideation](https://www.jenova.ai/en/resources/ai-for-brainstorming-ideas)
  - [Best Practices for Virtual Brainstorming with AI](https://www.sowork.com/blog/best-practices-virtual-brainstorming-ai-tools)
  - [Claude 4.5 Best Practices for Creative Writing & Ideation](https://skywork.ai/blog/claude-4-5-best-practices-creative-writing-brainstorming-ideation-2025/)

## Philosophy

**Human-AI Partnership Model:**
- **AI handles divergent thinking**: Generating volume, exploring alternatives, challenging assumptions
- **Human handles convergent thinking**: Selecting best ideas, combining concepts, making decisions
- **Free-form and flexible**: Not a rigid process, adapts to your needs
- **Universal application**: Works for software, products, business, content, art, anything

## Features

- **Adaptive workflow** - Adjusts to your domain and style
- **Multi-perspective exploration** - See ideas from different angles
- **Alternative worlds** - Explore "what if" scenarios
- **Time-boxed sprints** - Focused bursts of creativity
- **Incremental refinement** - Build ideas layer by layer
- **Document templates** - Multiple formats for different needs

## Commands

### `/brainstorm`

Start a flexible brainstorming session for **any creative challenge**.

```bash
# Software examples
/brainstorm "User authentication system"
/brainstorm "Improve app performance"

# Product design examples
/brainstorm "Coffee maker for remote workers"
/brainstorm "Redesign shopping cart experience"

# Business examples
/brainstorm "Launch strategy for new market"
/brainstorm "Reduce customer churn"

# Content examples
/brainstorm "Blog post about AI ethics"
/brainstorm "Marketing campaign for Q2"

# Personal examples
/brainstorm "Plan my wedding reception"
/brainstorm "Organize home office"
```

## Brainstorming Modes

The `/brainstorm` command adapts to different modes:

### 1. Free Exploration (Default)
- Open-ended, no constraints
- AI generates diverse alternatives
- You guide direction through conversation

### 2. Structured Discovery
- Guided questions to understand context
- Systematic exploration of options
- Document output in structured format

### 3. Rapid Ideation Sprint
- Time-boxed (5-15 minutes)
- Generate maximum volume of ideas
- Quick filtering and ranking

### 4. Alternative Worlds
- Explore "what if" scenarios
- Challenge assumptions
- See multiple radically different approaches

### 5. Role-Play Perspectives
- View from different stakeholder angles
- User perspective, business perspective, technical perspective
- Identify conflicts and synergies

## Skills

### `idea-to-design`

**Universal brainstorming skill** that works for any domain.

**When to use:**
- Starting any creative project
- Stuck on a problem
- Need fresh perspectives
- Want to explore alternatives

**Workflow:**
1. **Understand** - What are we creating/solving?
2. **Diverge** - Generate many diverse ideas (AI strength)
3. **Explore** - Examine alternatives from multiple angles
4. **Converge** - Select and combine best ideas (human strength)
5. **Refine** - Develop chosen direction
6. **Document** - Capture decisions and rationale

### `design-validation`

Validates a design/plan for completeness.

**Checks:**
- Are goals clearly defined?
- Are alternatives explored?
- Are trade-offs understood?
- Are decisions justified?
- Are next steps actionable?

## Example Outputs

### Example 1: Software Architecture

```
Challenge: "Design a file upload system"

After brainstorming, you might see:

Approach A: Direct Upload to Cloud Storage
Pros: Simple, fast, scalable
Cons: Large files slow, no processing
Best for: Small files, simple use cases
Example: Dropbox-style simple upload

Approach B: Chunked Upload with Queue Processing
Pros: Handles large files, resumable, background processing
Cons: More complex, needs queue infrastructure
Best for: Large files, batch processing
Example: YouTube-style upload with processing

Approach C: CDN-Direct Upload with Edge Processing
Pros: Fast worldwide, automatic optimization
Cons: Expensive, vendor lock-in
Best for: Global users, image/video heavy
Example: Cloudflare Images pattern

Recommendation: Start with A for MVP, migrate to B as scale grows
```

### Example 2: Product Design

```
Challenge: "Design a meditation app"

After brainstorming:

Approach A: Guided Sessions Library
- Curated collection of guided meditations
- Categories: sleep, focus, anxiety, etc.
- Celebrity/expert instructors
- Similar to: Headspace, Calm

Approach B: Adaptive AI Coach
- Learns your patterns and preferences
- Generates personalized sessions
- Adjusts in real-time to your state
- Similar to: Personalized fitness apps

Approach C: Community-Driven Practice
- Practice with others in real-time
- Social accountability features
- User-generated content
- Similar to: Strava for meditation

Hybrid Recommendation:
Start with curated library (A) for quality content, add AI personalization (B)
for retention, layer in community (C) for engagement
```

### Example 3: Business Strategy

```
Challenge: "Enter the enterprise market"

After brainstorming:

Approach A: Bottom-Up Adoption
- Free tier for individual users
- Viral growth within companies
- Upsell to team/enterprise
- Example: Slack, Dropbox

Approach B: Top-Down Sales
- Direct sales to executives
- Custom implementation
- High-touch onboarding
- Example: Salesforce, SAP

Approach C: Partner Channel
- Integrate with existing enterprise tools
- Partner with consultancies
- Co-sell with complementary vendors
- Example: Zoom's partnership strategy

Risk Analysis:
A: Slow revenue ramp, but high retention
B: Fast revenue, but high CAC
C: Fastest path to enterprise, but margin sharing
```

## Design Document Templates

The plugin generates documents in your preferred format:

### Template 1: Lightweight Decision Doc

```markdown
# [Project Name]

## Goal
What we're trying to achieve

## Options Considered
1. Option A - [Brief description]
2. Option B - [Brief description]
3. Option C - [Brief description]

## Decision
We chose [X] because [rationale]

## Trade-offs
What we're giving up: [Y]
What we're gaining: [Z]

## Next Steps
- [ ] Action 1
- [ ] Action 2
```

### Template 2: Detailed Design Spec

```markdown
# [Project Name] - Design Document

## Context & Goals
### Background
[Why we're doing this]

### Objectives
- Objective 1
- Objective 2

### Non-Goals
- What we're explicitly NOT doing

## Exploration

### Approach A: [Name]
**Description**: [How it works]
**Pros**: [Benefits]
**Cons**: [Drawbacks]
**Examples**: [Similar patterns/products]

### Approach B: [Name]
[Same structure]

### Approach C: [Name]
[Same structure]

## Decision

### Chosen Approach
[Which one and why]

### Trade-off Analysis
| Criteria | Approach A | Approach B | Approach C |
|----------|-----------|-----------|-----------|
| Speed    | ⭐⭐⭐ | ⭐⭐   | ⭐⭐⭐⭐ |
| Cost     | ⭐⭐   | ⭐⭐⭐⭐ | ⭐     |
| Quality  | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐  |

### Risks & Mitigations
- Risk 1 → Mitigation
- Risk 2 → Mitigation

## Implementation Plan
1. Phase 1: [Description]
2. Phase 2: [Description]

## Success Metrics
- Metric 1: [How we measure success]
- Metric 2: [How we measure success]
```

### Template 3: Creative Brief

```markdown
# [Project Name] - Creative Brief

## The Challenge
[One sentence problem statement]

## Target Audience
[Who is this for?]

## Key Message
[What's the main thing they should understand/feel?]

## Inspiration & References
- Reference 1: [What we like about it]
- Reference 2: [What we like about it]

## Ideas Explored

### Direction 1: [Name/Theme]
[Description, mood, example]

### Direction 2: [Name/Theme]
[Description, mood, example]

### Direction 3: [Name/Theme]
[Description, mood, example]

## Chosen Direction
[Which one and why it resonates]

## Deliverables
- [ ] Deliverable 1
- [ ] Deliverable 2

## Timeline
[Key milestones]
```

## Brainstorming Techniques Available

### 1. Question Storm
AI asks provocative questions to challenge assumptions

### 2. Reverse Brainstorm
Start with the opposite: "How could we make this WORSE?"

### 3. SCAMPER
Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse

### 4. Six Thinking Hats
View from 6 perspectives: Facts, Emotions, Caution, Benefits, Creativity, Process

### 5. First Principles
Break down to fundamental truths and rebuild from scratch

### 6. Analogies
"This is like [X] but for [Y]"

### 7. Constraints
Add artificial constraints to spark creativity

## Configuration

Create `.claude/brainstorming.local.md` for preferences:

```yaml
---
default_mode: free_exploration
document_format: lightweight
save_location: docs/brainstorm/
auto_create_tasks: false
time_limit: 15
perspectives:
  - user
  - business
  - technical
---

# Project-Specific Brainstorming Notes

Add context about your project, team preferences, or constraints here.
```

## Usage Tips

### Starting a Session

```
You: /brainstorm "Improve onboarding"

AI: I'll help you brainstorm onboarding improvements.

What mode would you like?
1. Free exploration - open conversation
2. Structured discovery - guided questions
3. Rapid sprint - quick idea generation (15 min)
4. Alternative worlds - explore "what if" scenarios
5. Role-play - view from different perspectives

Or just tell me your initial thoughts and we'll flow naturally.
```

### During Brainstorming

- **Say "more like this"** - Generate variations on a theme
- **Say "alternative"** - Explore completely different direction
- **Say "combine"** - Merge multiple ideas
- **Say "deeper"** - Drill into one specific idea
- **Say "what if [constraint]"** - Add creative constraints
- **Say "document"** - Capture current state

### Ending a Session

```
You: I think we've explored enough. Let's document.

AI: I'll create a design document with the 3 approaches we discussed:

A) Gamified onboarding with progress tracking
B) AI-guided personalized tour
C) Community mentorship pairing

Which template would you like?
1. Lightweight decision doc
2. Detailed design spec
3. Creative brief
4. Custom format
```

## Integration with Other Plugins

- **→ planning-workflow**: Turn brainstorm output into implementation plan
- **→ task-management**: Create tasks from "Next Steps"
- **→ plugin-creator**: Use for designing new plugins
- **← tdd-workflow**: Brainstorm test scenarios

## Non-Software Examples

### Wedding Planning
```
/brainstorm "Outdoor wedding reception layout"

Explores: Traditional seated dinner, cocktail party style, food truck festival,
picnic blanket casual, etc.
```

### Content Strategy
```
/brainstorm "YouTube channel content pillars"

Explores: Educational deep-dives, quick tips, behind-scenes, interviews,
case studies, community Q&A, etc.
```

### Home Organization
```
/brainstorm "Reorganize garage for workshop and storage"

Explores: Wall-mounted tool systems, zone-based layout, overhead storage,
mobile workbench, seasonal rotation systems, etc.
```

## The Brainstorming Philosophy

> "AI generates volume and diversity. You provide judgment and taste.
> Together, you explore more territory than either could alone."

- **No idea is too wild** during divergent phase
- **Quantity over quality** initially
- **Defer judgment** until convergent phase
- **Build on each other** - yes, and...
- **Challenge assumptions** - what if the opposite is true?
- **Document decisions** - capture your reasoning

## Sources

Based on research and best practices from:
- [AI for Brainstorming Ideas: Intelligent Ideation](https://www.jenova.ai/en/resources/ai-for-brainstorming-ideas)
- [Best Practices for Virtual Brainstorming with AI Tools](https://www.sowork.com/blog/best-practices-virtual-brainstorming-ai-tools)
- [Claude 4.5 Best Practices for Creative Writing & Ideation](https://skywork.ai/blog/claude-4-5-best-practices-creative-writing-brainstorming-ideation-2025/)
- [13 Best AI Brainstorming Tools](https://thedigitalprojectmanager.com/tools/best-ai-brainstorming-tools/)
- [How to Brainstorm Effectively with AI](https://fryga.io/blog/how-to-brainstorm-with-ai-claude-skill)
