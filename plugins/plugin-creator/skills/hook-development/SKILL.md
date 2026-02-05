---
name: hook-development
description: Implementing event hooks for PreToolUse, PostToolUse, SessionStart, and other events
---

# Hook Development Skill

Guide to creating event-driven hooks for Claude Code plugins.

## When to Use

Activate when:
- Creating event hooks
- User asks about automation
- Implementing validation logic
- Questions about hook events

## What Are Hooks?

Hooks are **executable scripts** that respond to events:
- PreToolUse - Before any tool execution
- PostToolUse - After tool execution
- SessionStart - Session initialization
- SessionEnd - Session cleanup
- Stop - Before session ends
- SubagentStop - When agent completes
- UserPromptSubmit - After user input
- PreCompact - Before context compression
- Notification - System notifications

**When to use hooks**:
- Automatic validation before actions
- Event-driven automation
- Logging and auditing
- Safety checks and enforcement

**When NOT to use hooks**:
- User-invoked actions → Use Commands
- Guidance and workflows → Use Skills
- Focused analysis → Use Agents

## Hook Structure

### File Location

```
plugin-name/
└── hooks/
    ├── PreToolUse.sh
    ├── PostToolUse.sh
    ├── SessionStart.sh
    └── Stop.sh
```

### Basic Hook Format

```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Hook receives event data via environment variables
# Exit codes:
#   0 - Allow action to proceed
#   1 - Block action
# Output to stderr - shown to user

# Example: Block dangerous operations
if [[ "$TOOL_NAME" == "Bash" ]] && [[ "$COMMAND" == *"rm -rf"* ]]; then
  echo "⛔ Dangerous command blocked: rm -rf" >&2
  exit 1
fi

# Allow all other actions
exit 0
```

### Making Hooks Executable

**CRITICAL**: Hooks must be executable:

```bash
chmod +x hooks/PreToolUse.sh
chmod +x hooks/PostToolUse.sh
```

## Available Hooks

### PreToolUse

**Triggers**: Before any tool execution

**Use cases**:
- Validate tool arguments
- Block dangerous operations
- Enforce workflow rules
- Check prerequisites

**Environment variables**:
- `TOOL_NAME` - Tool being invoked (Bash, Read, Edit, etc.)
- `TOOL_ARGS` - Tool arguments (JSON)
- Additional tool-specific vars

**Example - Block destructive commands**:
```bash
#!/bin/bash
# hooks/PreToolUse.sh

if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command')

  # Block force push to main
  if [[ "$COMMAND" == *"git push"*"--force"* ]] && [[ "$COMMAND" == *"main"* ]]; then
    echo "⛔ Force push to main blocked" >&2
    echo "This is dangerous. Use a feature branch." >&2
    exit 1
  fi
fi

exit 0
```

### PostToolUse

**Triggers**: After tool execution

**Use cases**:
- Log operations
- Trigger follow-up actions
- Update external systems
- Collect metrics

**Environment variables**:
- `TOOL_NAME` - Tool that was executed
- `TOOL_RESULT` - Tool output
- `EXIT_CODE` - Tool exit code

**Example - Log all bash commands**:
```bash
#!/bin/bash
# hooks/PostToolUse.sh

if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command')
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  echo "$TIMESTAMP | $COMMAND | Exit: $EXIT_CODE" >> ~/.claude/command.log
fi

exit 0
```

### SessionStart

**Triggers**: When Claude Code session begins

**Use cases**:
- Initialize environment
- Load configuration
- Check dependencies
- Set up workspace

**Example - Verify environment**:
```bash
#!/bin/bash
# hooks/SessionStart.sh

# Check required tools
MISSING=()

command -v git >/dev/null 2>&1 || MISSING+=("git")
command -v node >/dev/null 2>&1 || MISSING+=("node")
command -v jq >/dev/null 2>&1 || MISSING+=("jq")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "⚠️  Missing tools: ${MISSING[*]}" >&2
  echo "Some plugin features may not work." >&2
fi

# Load project config
if [ -f ".claude/config.json" ]; then
  echo "✓ Loaded project configuration" >&2
fi

exit 0
```

### SessionEnd

**Triggers**: When session ends normally

**Use cases**:
- Cleanup temporary files
- Save session state
- Push uncommitted work
- Generate reports

**Example - Cleanup**:
```bash
#!/bin/bash
# hooks/SessionEnd.sh

# Clean up temp files
rm -rf /tmp/claude-session-*

# Save session summary
SUMMARY_FILE="$HOME/.claude/sessions/$(date +%Y%m%d-%H%M%S).log"
echo "Session ended at $(date)" > "$SUMMARY_FILE"

exit 0
```

### Stop

**Triggers**: Before session stops (user can cancel)

**Use cases**:
- Warn about uncommitted changes
- Prompt for cleanup
- Check for running processes
- Save work in progress

**Example - Check uncommitted changes**:
```bash
#!/bin/bash
# hooks/Stop.sh

# Check for uncommitted changes
if git rev-parse --git-dir > /dev/null 2>&1; then
  if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes" >&2
    echo "Consider committing or stashing before exiting." >&2

    # Don't block, just warn
    exit 0
  fi
fi

exit 0
```

### SubagentStop

**Triggers**: When a spawned agent completes

**Use cases**:
- Process agent results
- Trigger next step in workflow
- Log agent completion
- Update task status

**Environment variables**:
- `AGENT_NAME` - Agent that completed
- `AGENT_RESULT` - Agent output
- `AGENT_STATUS` - Success/failure

**Example - Log agent completion**:
```bash
#!/bin/bash
# hooks/SubagentStop.sh

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "$TIMESTAMP | Agent: $AGENT_NAME | Status: $AGENT_STATUS" >> ~/.claude/agents.log

exit 0
```

### UserPromptSubmit

**Triggers**: After user submits a prompt

**Use cases**:
- Track user requests
- Analyze patterns
- Trigger automations
- Log interactions

**Environment variables**:
- `USER_PROMPT` - The user's input

**Example - Track prompts**:
```bash
#!/bin/bash
# hooks/UserPromptSubmit.sh

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "$TIMESTAMP | $USER_PROMPT" >> ~/.claude/prompts.log

exit 0
```

### PreCompact

**Triggers**: Before context window compression

**Use cases**:
- Save context snapshot
- Export important data
- Preserve state
- Generate checkpoint

**Example - Save context snapshot**:
```bash
#!/bin/bash
# hooks/PreCompact.sh

SNAPSHOT_DIR="$HOME/.claude/snapshots"
mkdir -p "$SNAPSHOT_DIR"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
SNAPSHOT_FILE="$SNAPSHOT_DIR/context-$TIMESTAMP.json"

# Save context metadata
cat > "$SNAPSHOT_FILE" <<EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "working_directory": "$(pwd)",
  "git_branch": "$(git branch --show-current 2>/dev/null || echo 'none')",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'none')"
}
EOF

exit 0
```

### Notification

**Triggers**: System notifications

**Use cases**:
- Send alerts
- Update external systems
- Trigger integrations
- Custom notifications

**Example - Send notification**:
```bash
#!/bin/bash
# hooks/Notification.sh

# Forward to system notification
osascript -e "display notification \"$NOTIFICATION_MESSAGE\" with title \"Claude Code\""

exit 0
```

## Hook Patterns

### Validation Hook

**Purpose**: Enforce rules and prevent mistakes

```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Enforce TDD: Block code changes without tests
if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]]; then
  FILE_PATH=$(echo "$TOOL_ARGS" | jq -r '.file_path')

  # If editing source code
  if [[ "$FILE_PATH" == *"/src/"* ]] && [[ "$FILE_PATH" != *".test."* ]]; then
    # Check if corresponding test exists
    TEST_FILE="${FILE_PATH/.ts/.test.ts}"

    if [ ! -f "$TEST_FILE" ]; then
      echo "⛔ TDD Violation" >&2
      echo "No test file found for: $FILE_PATH" >&2
      echo "Create test first: $TEST_FILE" >&2
      exit 1
    fi
  fi
fi

exit 0
```

### Logging Hook

**Purpose**: Audit trail of operations

```bash
#!/bin/bash
# hooks/PostToolUse.sh

LOG_FILE="$HOME/.claude/audit.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Log all tool usage
echo "$TIMESTAMP | $TOOL_NAME | $TOOL_ARGS" >> "$LOG_FILE"

# Rotate log if too large
if [ -f "$LOG_FILE" ] && [ $(wc -l < "$LOG_FILE") -gt 10000 ]; then
  mv "$LOG_FILE" "$LOG_FILE.old"
fi

exit 0
```

### Environment Setup Hook

**Purpose**: Prepare workspace

```bash
#!/bin/bash
# hooks/SessionStart.sh

# Load environment variables
if [ -f ".env" ]; then
  export $(cat .env | xargs)
fi

# Start required services
if command -v docker-compose >/dev/null 2>&1; then
  if [ -f "docker-compose.yml" ]; then
    echo "🐳 Starting Docker services..." >&2
    docker-compose up -d
  fi
fi

# Initialize git hooks
if [ -d ".git" ] && [ ! -f ".git/hooks/pre-commit" ]; then
  echo "⚙️  Setting up git hooks..." >&2
  # Install git hooks
fi

exit 0
```

### Workflow Enforcement Hook

**Purpose**: Ensure process compliance

```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Check if in workflow mode
WORKFLOW_STATE="$HOME/.claude/workflow-state.json"

if [ -f "$WORKFLOW_STATE" ]; then
  CURRENT_PHASE=$(jq -r '.phase' "$WORKFLOW_STATE")

  # If in SPEC phase, block implementation
  if [[ "$CURRENT_PHASE" == "spec" ]]; then
    if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]]; then
      FILE_PATH=$(echo "$TOOL_ARGS" | jq -r '.file_path')

      # Block implementation code during spec phase
      if [[ "$FILE_PATH" == *"/src/"* ]] && [[ "$FILE_PATH" != *".spec."* ]]; then
        echo "⛔ Workflow Violation" >&2
        echo "Currently in SPEC phase" >&2
        echo "Complete specification before implementation" >&2
        exit 1
      fi
    fi
  fi
fi

exit 0
```

## Advanced Techniques

### Conditional Hooks

```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Only enforce in CI environment
if [ -z "$CI" ]; then
  # Not in CI, allow everything
  exit 0
fi

# In CI, enforce strict rules
if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command')

  # Block interactive commands in CI
  if [[ "$COMMAND" == *"vim"* ]] || [[ "$COMMAND" == *"nano"* ]]; then
    echo "⛔ Interactive editors not allowed in CI" >&2
    exit 1
  fi
fi

exit 0
```

### State Management

```bash
#!/bin/bash
# hooks/PreToolUse.sh

STATE_FILE="$HOME/.claude/plugin-state.json"

# Initialize state if not exists
if [ ! -f "$STATE_FILE" ]; then
  echo '{"commits": 0, "tests_run": 0}' > "$STATE_FILE"
fi

# Update state based on tool usage
if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command')

  if [[ "$COMMAND" == *"git commit"* ]]; then
    # Increment commit counter
    COMMITS=$(jq -r '.commits' "$STATE_FILE")
    COMMITS=$((COMMITS + 1))
    jq ".commits = $COMMITS" "$STATE_FILE" > "$STATE_FILE.tmp"
    mv "$STATE_FILE.tmp" "$STATE_FILE"
  fi
fi

exit 0
```

### Integration with External Tools

```bash
#!/bin/bash
# hooks/PostToolUse.sh

# Send to external monitoring system
if [ -n "$MONITORING_WEBHOOK" ]; then
  curl -X POST "$MONITORING_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "{
      \"tool\": \"$TOOL_NAME\",
      \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
      \"status\": \"$EXIT_CODE\"
    }" \
    >/dev/null 2>&1
fi

exit 0
```

## Testing Hooks

### Manual Testing

```bash
# Test PreToolUse hook
TOOL_NAME="Bash" TOOL_ARGS='{"command":"echo test"}' ./hooks/PreToolUse.sh
echo "Exit code: $?"

# Test with blocked command
TOOL_NAME="Bash" TOOL_ARGS='{"command":"rm -rf /"}' ./hooks/PreToolUse.sh
echo "Exit code: $?"
```

### Test Checklist

- [ ] Hook is executable (`chmod +x`)
- [ ] Exit code 0 allows action
- [ ] Exit code 1 blocks action
- [ ] Error messages go to stderr
- [ ] Handles missing environment vars gracefully
- [ ] No infinite loops or hangs
- [ ] Fast execution (< 100ms if possible)
- [ ] Idempotent (can run multiple times safely)

## Best Practices

### Fast Execution

**Good**:
```bash
#!/bin/bash
# Quick check, minimal processing

if [[ "$TOOL_NAME" == "Bash" ]]; then
  # Simple string match
  if [[ "$COMMAND" == *"rm -rf"* ]]; then
    echo "⛔ Blocked" >&2
    exit 1
  fi
fi

exit 0
```

**Bad**:
```bash
#!/bin/bash
# Slow: Complex processing

# Don't do heavy computation in hooks
RESULT=$(find / -name "*.js" | xargs grep "pattern" | wc -l)
# This will block every tool call!
```

### Error Handling

```bash
#!/bin/bash
# hooks/PreToolUse.sh

set -euo pipefail  # Exit on error

# Check required commands exist
if ! command -v jq >/dev/null 2>&1; then
  # Graceful degradation
  exit 0
fi

# Your hook logic
# ...

exit 0
```

### Clear Messages

**Good**:
```bash
echo "⛔ Force push to main blocked" >&2
echo "" >&2
echo "Force push is dangerous and can destroy history." >&2
echo "" >&2
echo "To update main:" >&2
echo "  1. Create feature branch" >&2
echo "  2. Open pull request" >&2
echo "  3. Merge after review" >&2
```

**Bad**:
```bash
echo "Error: operation not allowed" >&2
```

### Configuration

```bash
#!/bin/bash
# hooks/PreToolUse.sh

# Allow configuration
CONFIG_FILE=".claude/hook-config.json"

if [ -f "$CONFIG_FILE" ]; then
  STRICT_MODE=$(jq -r '.strict_mode' "$CONFIG_FILE")
else
  STRICT_MODE="false"
fi

# Use configuration
if [[ "$STRICT_MODE" == "true" ]]; then
  # Enforce strict rules
else
  # Relaxed mode
fi
```

## Common Pitfalls

### Blocking Everything

**Problem**:
```bash
# This blocks ALL tool usage!
exit 1
```

**Fix**:
```bash
# Only block specific dangerous operations
if [[ dangerous_condition ]]; then
  exit 1
fi

# Allow everything else
exit 0
```

### Slow Hooks

**Problem**:
```bash
# This makes every tool call slow
sleep 5
```

**Fix**:
```bash
# Keep hooks fast
# Run heavy operations in background if needed
(heavy_operation &)
exit 0
```

### Not Executable

**Problem**:
```bash
# Hook file created but not executable
# Won't run at all
```

**Fix**:
```bash
chmod +x hooks/PreToolUse.sh
```

### Infinite Recursion

**Problem**:
```bash
# Hook triggers itself
if [[ "$TOOL_NAME" == "Bash" ]]; then
  # This triggers PreToolUse again!
  bash -c "echo test"
fi
```

**Fix**:
```bash
# Don't call tools from hooks
# Only validate and return
```

## Debugging Hooks

### Add Logging

```bash
#!/bin/bash
# hooks/PreToolUse.sh

DEBUG_LOG="$HOME/.claude/hook-debug.log"

if [ "$HOOK_DEBUG" = "true" ]; then
  echo "$(date) | PreToolUse | $TOOL_NAME | $TOOL_ARGS" >> "$DEBUG_LOG"
fi

# Your hook logic
```

### Test in Isolation

```bash
# Set environment variables manually
export TOOL_NAME="Bash"
export TOOL_ARGS='{"command":"rm -rf test"}'

# Run hook
./hooks/PreToolUse.sh

# Check exit code
echo "Exit code: $?"
```

## References

- Official hooks documentation: https://code.claude.com/docs/en/hooks
- Plugin reference: https://code.claude.com/docs/en/plugins-reference
- Bash best practices: https://www.gnu.org/software/bash/manual/
