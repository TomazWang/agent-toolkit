---
name: status
description: |
  KB workflow status and coordination. Use when:
  - User asks "what's the KB status?", "where am I in the learning?"
  - User invokes /kb:status
  - Need to check progress or resume interrupted learning

  This skill shows current state and can resume autonomous learning.
---

# KB Workflow Status & Coordinator

Check knowledge base status and coordinate the learning process.

---

## When Invoked: Show Status Dashboard

Read and display current state:

```bash
# Check if KB exists
if [ ! -d "kb" ]; then
  echo "❌ KB not initialized. Run /kb:start to begin."
  exit 0
fi
```

### Status Dashboard

```
╔═══════════════════════════════════════════════════════════════╗
║                    KB ANALYSIS STATUS                          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  📁 Structure:  ✅ Initialized                                 ║
║  ⚙️  Config:     ✅ Present / ❌ Missing                        ║
║  📚 Sources:    N repos, N docs, N raw files                   ║
║                                                                ║
╠═══════════════════════════════════════════════════════════════╣
║  LEARNING PROGRESS                                             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  ✅ Completed:   N topics                                      ║
║  🔄 In Progress: {current topic or "none"}                     ║
║  ⏳ Pending:     N topics                                      ║
║                                                                ║
║  Progress: [████████░░░░░░░░░░░░] 40%                         ║
║                                                                ║
╠═══════════════════════════════════════════════════════════════╣
║  ACTIONS                                                       ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  /kb:start      - Start/resume autonomous learning             ║
║  /kb:learn X    - Learn specific topic X                       ║
║  /kb:distill    - Generate final knowledge base                ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Status Checks

### 1. Check Structure

```bash
for dir in kb/sources/{repos,docs,raw,cloud} kb/wip kb/output/domains; do
  if [ -d "$dir" ]; then
    echo "✅ $dir"
  else
    echo "❌ $dir (missing)"
  fi
done
```

### 2. Check Sources

```bash
echo "=== Sources ==="
echo "Repos: $(ls kb/sources/repos 2>/dev/null | wc -l)"
echo "Docs: $(ls kb/sources/docs 2>/dev/null | wc -l)"
echo "Raw: $(ls kb/sources/raw 2>/dev/null | wc -l)"
echo "Cloud: $(ls kb/sources/cloud 2>/dev/null | wc -l)"
```

### 3. Check Learning Progress

Read `kb/wip/learning-plan.md` and count:
- Lines with ✅ = completed
- Lines with 🔄 = in progress
- Lines with ⏳ = pending

### 4. Check Output

```bash
if [ -d "kb/output/domains" ]; then
  echo "Domains: $(ls kb/output/domains | wc -l)"
fi
if [ -f "kb/output/summary.md" ]; then
  echo "✅ Summary generated"
fi
```

---

## Resume Capability

If learning was interrupted (🔄 topic exists):

```
⚠️  INTERRUPTED LEARNING DETECTED

Last topic: {topic-name}
Status: 🔄 In Progress

Options:
1. /kb:start - Resume from where you left off
2. /kb:learn {topic} - Restart current topic
3. /kb:skip {topic} - Skip and continue to next
```

---

## Recommendations

Based on status, recommend next action:

| State | Recommendation |
|-------|----------------|
| No KB | `/kb:start` to initialize |
| No sources | Add repos/docs to `kb/sources/` |
| No plan | `/kb:start` will create plan |
| Has pending topics | `/kb:start` to continue learning |
| All topics done | `/kb:distill` to generate output |
| Has output | Review `kb/output/summary.md` |

---

## Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `/kb:start` | Initialize and start autonomous learning |
| `/kb:status` | Show this status dashboard |
| `/kb:learn <topic>` | Learn specific topic manually |
| `/kb:distill` | Generate final knowledge base |
| `/kb:add-source <path>` | Add source files |
