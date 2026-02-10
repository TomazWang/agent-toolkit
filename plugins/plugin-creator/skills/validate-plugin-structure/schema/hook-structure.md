# Hook Structure Schema

## Valid Hook Events

Claude Code supports these hook events:

### Tool-Related Hooks
- **PreToolUse.sh** - Before any tool is executed
- **PostToolUse.sh** - After any tool completes
- **Stop.sh** - When user stops execution
- **SubagentStop.sh** - When a subagent is stopped

### Session Hooks
- **SessionStart.sh** - When Claude Code session starts
- **SessionEnd.sh** - When session ends
- **UserPromptSubmit.sh** - When user submits a prompt

### System Hooks
- **PreCompact.sh** - Before conversation compaction
- **Notification.sh** - When notification occurs

## Hook File Requirements

### File Format

**Extension**: `.sh` (bash scripts)

**Naming**: Exact match to event name (case-sensitive)

**Location**: `hooks/` directory in plugin root

**Shebang**: Required at start of file

**Example**:
```bash
#!/bin/bash
# PreToolUse hook - validates tool use before execution

# Hook implementation...
```

### Permissions

**Executable**: Hooks MUST be executable

```bash
chmod +x hooks/PreToolUse.sh
```

**Validation**:
```bash
ls -l hooks/PreToolUse.sh
-rwxr-xr-x  # ✓ Executable
-rw-r--r--  # ✗ Not executable
```

### Environment Variables

Hooks have access to:

**Plugin Context**:
- `${CLAUDE_PLUGIN_ROOT}` - Path to plugin directory
- `${CLAUDE_PLUGINS_DIR}` - Path to all plugins directory

**Tool Context** (PreToolUse/PostToolUse):
- Tool name
- Tool parameters
- Tool result (PostToolUse only)

### Exit Codes

**0** - Allow action to proceed (PreToolUse) or success (PostToolUse)
**Non-zero** - Block action (PreToolUse) or indicate error (PostToolUse)

**Example**:
```bash
#!/bin/bash
# Block dangerous commands

if [[ "$TOOL_NAME" == "Bash" ]] && [[ "$COMMAND" == *"rm -rf /"* ]]; then
  echo "ERROR: Dangerous command blocked"
  exit 1  # Block execution
fi

exit 0  # Allow execution
```

## Hook Examples

### PreToolUse.sh - Validate Before Execution

```bash
#!/bin/bash
# Validate tool use before execution

TOOL_NAME="$1"
TOOL_PARAMS="$2"

# Block dangerous git operations
if [[ "$TOOL_NAME" == "Bash" ]] && [[ "$TOOL_PARAMS" == *"git push --force"* ]]; then
  echo "⚠ WARNING: Force push blocked by plugin"
  exit 1
fi

# Allow all other tools
exit 0
```

### PostToolUse.sh - Process After Execution

```bash
#!/bin/bash
# Log tool usage after execution

TOOL_NAME="$1"
RESULT="$2"

# Log to plugin directory
echo "$(date): ${TOOL_NAME}" >> "${CLAUDE_PLUGIN_ROOT}/.tool-log"

exit 0
```

### SessionStart.sh - Initialize Session

```bash
#!/bin/bash
# Set up plugin environment at session start

# Create working directory
mkdir -p "${CLAUDE_PLUGIN_ROOT}/.workspace"

# Initialize state file
echo "session_start=$(date +%s)" > "${CLAUDE_PLUGIN_ROOT}/.state"

exit 0
```

### UserPromptSubmit.sh - React to User Input

```bash
#!/bin/bash
# Check user prompt for specific keywords

PROMPT="$1"

if [[ "$PROMPT" == *"urgent"* ]]; then
  # Set priority flag
  echo "URGENT=true" > "${CLAUDE_PLUGIN_ROOT}/.priority"
fi

exit 0
```

## Validation Rules

### File Structure

- [ ] File is .sh format
- [ ] File is in hooks/ directory
- [ ] Filename matches valid event name (exact case)
- [ ] File starts with shebang (#!/bin/bash)
- [ ] File is executable (chmod +x)

### Hook Name

Valid hook names (case-sensitive):
- [ ] PreToolUse.sh
- [ ] PostToolUse.sh
- [ ] Stop.sh
- [ ] SubagentStop.sh
- [ ] SessionStart.sh
- [ ] SessionEnd.sh
- [ ] UserPromptSubmit.sh
- [ ] PreCompact.sh
- [ ] Notification.sh

### Content

- [ ] Has shebang at start
- [ ] Uses valid bash syntax
- [ ] Returns appropriate exit codes
- [ ] Handles errors gracefully
- [ ] Does not block indefinitely

## Common Errors

### Missing shebang

**Error**:
```bash
# PreToolUse hook
echo "Validating..."
```

**Fix**:
```bash
#!/bin/bash
# PreToolUse hook
echo "Validating..."
```

### Wrong filename case

**Error**:
```
hooks/
└── pretooluse.sh      # ✗ Wrong case
```

**Fix**:
```
hooks/
└── PreToolUse.sh      # ✓ Correct case
```

### Not executable

**Error**:
```bash
-rw-r--r-- hooks/PreToolUse.sh
```

**Fix**:
```bash
chmod +x hooks/PreToolUse.sh
-rwxr-xr-x hooks/PreToolUse.sh
```

### Invalid event name

**Error**:
```
hooks/
└── OnToolExecution.sh  # ✗ Not a valid event
```

**Fix**:
```
hooks/
└── PreToolUse.sh       # ✓ Valid event name
```

### Missing exit code

**Error**:
```bash
#!/bin/bash
echo "Hook executed"
# No exit statement
```

**Fix**:
```bash
#!/bin/bash
echo "Hook executed"
exit 0  # Explicit exit code
```

## Best Practices

### Keep Hooks Fast

Hooks run synchronously and block execution. Keep them fast:

**✓ Good**:
```bash
#!/bin/bash
# Quick validation
[[ "$COMMAND" == *"rm -rf /"* ]] && exit 1
exit 0
```

**✗ Bad**:
```bash
#!/bin/bash
# Slow operation
curl https://api.example.com/validate  # Network call
sleep 5  # Unnecessary delay
exit 0
```

### Handle Errors Gracefully

**✓ Good**:
```bash
#!/bin/bash
set -euo pipefail  # Fail on errors

if ! command -v jq &> /dev/null; then
  echo "Warning: jq not found, skipping validation"
  exit 0  # Don't block on missing dependencies
fi
```

### Use Plugin Root

Store hook data in plugin directory:

**✓ Good**:
```bash
#!/bin/bash
LOG="${CLAUDE_PLUGIN_ROOT}/.hook-log"
echo "$(date): Event" >> "$LOG"
```

**✗ Bad**:
```bash
#!/bin/bash
LOG="/tmp/hook-log"  # Shared temp location
echo "$(date): Event" >> "$LOG"
```

### Provide User Feedback

**✓ Good**:
```bash
#!/bin/bash
if [[ "$DANGEROUS_OPERATION" ]]; then
  echo "⚠ Blocked: This operation requires manual approval"
  exit 1
fi
```

**✗ Bad**:
```bash
#!/bin/bash
if [[ "$DANGEROUS_OPERATION" ]]; then
  exit 1  # Silent failure, user doesn't know why
fi
```

## Testing Hooks

### Manual Testing

```bash
# Make hook executable
chmod +x hooks/PreToolUse.sh

# Test directly
bash hooks/PreToolUse.sh "Bash" "rm -rf /"
echo $?  # Check exit code (0 = allow, 1 = block)
```

### Validation Script

```bash
#!/bin/bash
# validate-hooks.sh - Test all hooks

for hook in hooks/*.sh; do
  echo "Testing: $hook"

  # Check executable
  if [[ ! -x "$hook" ]]; then
    echo "  ✗ Not executable"
    continue
  fi

  # Check shebang
  if ! head -n1 "$hook" | grep -q "^#!/bin/bash"; then
    echo "  ✗ Missing shebang"
    continue
  fi

  # Check syntax
  if ! bash -n "$hook"; then
    echo "  ✗ Syntax error"
    continue
  fi

  echo "  ✓ Valid"
done
```

## Validation Checklist

### File Requirements
- [ ] File extension is .sh
- [ ] Located in hooks/ directory
- [ ] Filename matches valid event (case-sensitive)
- [ ] File is executable (755 permissions)

### Content Requirements
- [ ] Starts with #!/bin/bash
- [ ] Valid bash syntax (no errors)
- [ ] Returns exit code (0 or non-zero)
- [ ] Handles errors gracefully
- [ ] Runs quickly (< 1 second)

### Best Practices
- [ ] Uses ${CLAUDE_PLUGIN_ROOT} for storage
- [ ] Provides user feedback on errors
- [ ] Doesn't block indefinitely
- [ ] Handles missing dependencies
- [ ] Documents what it does (comments)

## Integration with Plugin

Hooks are auto-discovered from `hooks/` directory. No need to list in plugin.json.

**Auto-discovery**:
```
hooks/
├── PreToolUse.sh     # Auto-discovered
├── PostToolUse.sh    # Auto-discovered
└── SessionStart.sh   # Auto-discovered
```

**Execution order**:
1. Plugin loads
2. Hooks registered automatically
3. Events trigger hooks
4. Hooks execute synchronously
5. Exit code determines behavior
