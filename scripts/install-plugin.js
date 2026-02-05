#!/usr/bin/env node

/**
 * Install agent-toolkit plugin to Claude Code
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const pluginName = process.argv[2];
const projectRoot = path.join(__dirname, '..');
const claudePluginsDir = path.join(os.homedir(), '.claude', 'plugins');

if (!pluginName) {
  console.error('Usage: node install-plugin.js <plugin-name>');
  console.log('\nAvailable plugins:');
  const plugins = fs.readdirSync(path.join(projectRoot, 'plugins'));
  plugins.forEach(p => console.log(`  - ${p}`));
  process.exit(1);
}

const pluginPath = path.join(projectRoot, 'plugins', pluginName);

if (!fs.existsSync(pluginPath)) {
  console.error(`Error: Plugin '${pluginName}' not found at ${pluginPath}`);
  console.log('\nAvailable plugins:');
  const plugins = fs.readdirSync(path.join(projectRoot, 'plugins'));
  plugins.forEach(p => console.log(`  - ${p}`));
  process.exit(1);
}

// Create plugins directory if it doesn't exist
if (!fs.existsSync(claudePluginsDir)) {
  fs.mkdirSync(claudePluginsDir, { recursive: true });
}

const targetPath = path.join(claudePluginsDir, pluginName);

// Check if already installed
if (fs.existsSync(targetPath)) {
  console.log(`Plugin '${pluginName}' is already installed at ${targetPath}`);
  console.log('Remove it first or use a different name.');
  process.exit(1);
}

// Create symlink
fs.symlinkSync(pluginPath, targetPath, 'dir');

console.log(`✓ Installed ${pluginName} to ${targetPath}`);
console.log('\nPlugin is now available in Claude Code!');

// Show plugin info
const readmePath = path.join(pluginPath, 'README.md');
if (fs.existsSync(readmePath)) {
  console.log('\n=== Plugin Information ===');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const lines = readme.split('\n').slice(0, 20);
  console.log(lines.join('\n'));
}
