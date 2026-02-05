#!/usr/bin/env node

/**
 * List all available plugins with their metadata
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const pluginsDir = path.join(projectRoot, 'plugins');

console.log('Agent Toolkit Plugins\n');
console.log('='.repeat(80));

const plugins = fs.readdirSync(pluginsDir);

plugins.forEach(pluginName => {
  const pluginPath = path.join(pluginsDir, pluginName);
  const metadataPath = path.join(pluginPath, '.claude-plugin', 'plugin.json');

  if (!fs.existsSync(metadataPath)) {
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  console.log(`\n📦 ${metadata.name} v${metadata.version}`);
  console.log(`   ${metadata.description}`);

  if (metadata.commands && metadata.commands.length > 0) {
    console.log(`   Commands: /${metadata.commands.join(', /')}`);
  }

  if (metadata.skills && metadata.skills.length > 0) {
    console.log(`   Skills: ${metadata.skills.join(', ')}`);
  }

  if (metadata.agents && metadata.agents.length > 0) {
    console.log(`   Agents: ${metadata.agents.length} specialized agents`);
  }

  if (metadata.tags && metadata.tags.length > 0) {
    console.log(`   Tags: ${metadata.tags.join(', ')}`);
  }

  console.log('-'.repeat(80));
});

console.log('\nInstallation:');
console.log('  ./scripts/install-plugin.sh <plugin-name>');
console.log('  npm run install-plugin <plugin-name>');
