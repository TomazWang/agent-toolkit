#!/bin/bash

# Install a specific plugin from agent-toolkit to Claude Code

set -e

PLUGIN_NAME=$1
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
CLAUDE_PLUGINS_DIR="${HOME}/.claude/plugins"

if [ -z "$PLUGIN_NAME" ]; then
    echo "Usage: $0 <plugin-name>"
    echo ""
    echo "Available plugins:"
    ls -1 "${PROJECT_ROOT}/plugins"
    exit 1
fi

PLUGIN_PATH="${PROJECT_ROOT}/plugins/${PLUGIN_NAME}"

if [ ! -d "$PLUGIN_PATH" ]; then
    echo "Error: Plugin '${PLUGIN_NAME}' not found at ${PLUGIN_PATH}"
    echo ""
    echo "Available plugins:"
    ls -1 "${PROJECT_ROOT}/plugins"
    exit 1
fi

# Create plugins directory if it doesn't exist
mkdir -p "${CLAUDE_PLUGINS_DIR}"

# Create symlink
TARGET="${CLAUDE_PLUGINS_DIR}/${PLUGIN_NAME}"

if [ -L "$TARGET" ] || [ -e "$TARGET" ]; then
    echo "Plugin '${PLUGIN_NAME}' is already installed at ${TARGET}"
    read -p "Reinstall? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
    rm -rf "$TARGET"
fi

ln -s "$PLUGIN_PATH" "$TARGET"

echo "✓ Installed ${PLUGIN_NAME} to ${TARGET}"
echo ""
echo "Plugin is now available in Claude Code!"

# Show plugin info
if [ -f "${PLUGIN_PATH}/README.md" ]; then
    echo ""
    echo "=== Plugin Information ==="
    head -20 "${PLUGIN_PATH}/README.md"
fi
