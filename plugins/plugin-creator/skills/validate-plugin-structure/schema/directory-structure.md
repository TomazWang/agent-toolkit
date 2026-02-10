# Directory Structure Schema

## Standard Plugin Layout

```
plugin-name/
├── .claude-plugin/           # Required: Plugin metadata
│   └── plugin.json           # Required: Plugin manifest
├── commands/                 # Optional: Slash commands
│   └── *.md                  # Flat .md files with YAML frontmatter
├── skills/                   # Optional: Reusable skills
│   └── skill-name/           # MUST be folders
│       └── SKILL.md          # MUST be named SKILL.md (uppercase)
├── agents/                   # Optional: Specialized agents
│   └── *.md                  # Flat .md files with YAML frontmatter
├── hooks/                    # Optional: Event handlers
│   └── *.sh                  # Executable bash scripts
└── README.md                 # Required: User-facing documentation
```

## Required Components

### .claude-plugin/ Directory

**Required**: Yes

**Contents**:
- `plugin.json` - Plugin manifest file

**Validation**:
- [ ] Directory exists
- [ ] plugin.json exists
- [ ] plugin.json is valid JSON

### plugin.json

**Required**: Yes

**Must contain**:
- `name` (kebab-case)
- `version` (semver)
- `description` (string)
- `author` (object with name)

See: `plugin-frontmatter.md` for full validation rules

### README.md

**Required**: Yes

**Must include**:
- Plugin name and description
- Installation instructions
- Usage examples
- Source attribution (if applicable)

**Validation**:
- [ ] File exists at root
- [ ] Contains installation section
- [ ] Contains usage examples

## Optional Components

### commands/

**Structure**: Flat .md files

**Naming**: kebab-case (e.g., `create-plugin.md`)

**Format**: YAML frontmatter + Markdown instructions

**Example**:
```
commands/
├── create.md
├── validate.md
└── publish.md
```

**Validation**:
- [ ] All files are .md format
- [ ] Each file has valid YAML frontmatter
- [ ] Command names match filenames (without .md)

### skills/

**Structure**: FOLDERS containing SKILL.md

**CRITICAL**: Skills are NOT flat .md files!

**✓ Correct:**
```
skills/
└── my-skill/
    └── SKILL.md
```

**✗ Wrong:**
```
skills/
└── my-skill.md  # ✗ Must be folder with SKILL.md inside
```

**Naming**: Folder name is kebab-case (e.g., `create-plugin/`)

**File**: MUST be named `SKILL.md` (uppercase, not `skill.md`)

**Validation**:
- [ ] All entries in skills/ are directories
- [ ] Each directory contains SKILL.md (uppercase)
- [ ] No flat .md files directly in skills/
- [ ] Each SKILL.md has valid YAML frontmatter
- [ ] Skill name matches folder name

See: `skill-frontmatter.md` for frontmatter validation rules

### agents/

**Structure**: Flat .md files

**Naming**: kebab-case with `custom-` prefix recommended (e.g., `custom-analyzer.md`)

**Format**: YAML frontmatter + Agent instructions

**Example**:
```
agents/
├── custom-plugin-architect.md
├── custom-plugin-validator.md
└── custom-skill-reviewer.md
```

**Validation**:
- [ ] All files are .md format
- [ ] Each file has valid YAML frontmatter
- [ ] Agent names have `custom-` prefix (recommended)
- [ ] Valid color specified
- [ ] Valid tools array

See: `agent-frontmatter.md` for frontmatter validation rules

### hooks/

**Structure**: Executable .sh files

**Naming**: Matches hook event name (e.g., `PreToolUse.sh`)

**Format**: Bash scripts with shebang

**Valid hook names**:
- `PreToolUse.sh` - Before tool execution
- `PostToolUse.sh` - After tool execution
- `SessionStart.sh` - When session starts
- `SessionEnd.sh` - When session ends

**Example**:
```
hooks/
├── PreToolUse.sh
└── PostToolUse.sh
```

**Validation**:
- [ ] All files are .sh format
- [ ] Files are executable (chmod +x)
- [ ] Files have valid bash shebang
- [ ] Hook names match valid events

See: `hook-structure.md` for detailed hook requirements

## Common Errors

### Flat skill files

**Error:**
```
skills/
├── my-skill.md        # ✗ Wrong
└── another-skill.md   # ✗ Wrong
```

**Fix:**
```
skills/
├── my-skill/
│   └── SKILL.md       # ✓ Correct
└── another-skill/
    └── SKILL.md       # ✓ Correct
```

### Lowercase SKILL.md

**Error:**
```
skills/
└── my-skill/
    └── skill.md       # ✗ Must be uppercase
```

**Fix:**
```
skills/
└── my-skill/
    └── SKILL.md       # ✓ Correct
```

### Missing .claude-plugin/

**Error:**
```
plugin-name/
├── commands/
├── skills/
└── README.md          # ✗ Missing .claude-plugin/
```

**Fix:**
```
plugin-name/
├── .claude-plugin/    # ✓ Add this
│   └── plugin.json
├── commands/
├── skills/
└── README.md
```

### Non-executable hooks

**Error:**
```bash
-rw-r--r-- hooks/PreToolUse.sh  # ✗ Not executable
```

**Fix:**
```bash
chmod +x hooks/PreToolUse.sh
-rwxr-xr-x hooks/PreToolUse.sh  # ✓ Executable
```

## Validation Checklist

### Required
- [ ] `.claude-plugin/` directory exists
- [ ] `.claude-plugin/plugin.json` exists and is valid
- [ ] `README.md` exists at root
- [ ] All required fields in plugin.json

### Optional Components (if present)
- [ ] `commands/` contains only .md files (if exists)
- [ ] `skills/` contains only folders with SKILL.md (if exists)
- [ ] No flat .md files in skills/
- [ ] All SKILL.md files are uppercase
- [ ] `agents/` contains only .md files (if exists)
- [ ] `hooks/` contains only .sh files (if exists)
- [ ] All hooks are executable

### Naming
- [ ] Plugin name is kebab-case
- [ ] Skill folder names are kebab-case
- [ ] Agent names have `custom-` prefix (recommended)
- [ ] Hook names match valid events

## Auto-Discovery

Claude Code auto-discovers components based on directory structure:

**Commands**: Auto-discovered from `commands/*.md`
**Skills**: Auto-discovered from `skills/*/SKILL.md`
**Agents**: Auto-discovered from `agents/*.md`
**Hooks**: Auto-discovered from `hooks/*.sh`

**Therefore**: Do NOT manually list these in plugin.json. Let auto-discovery work.

**Exception**: If you need to explicitly control load order or exclude certain files, you can list them in plugin.json, but this is rarely needed.

## Directory Permissions

**All directories**: 755 (drwxr-xr-x)
**All .md files**: 644 (-rw-r--r--)
**All .sh files**: 755 (-rwxr-xr-x)
**All .json files**: 644 (-rw-r--r--)

## Example Valid Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json              # Valid JSON with required fields
├── commands/
│   ├── start.md                 # Flat file, valid frontmatter
│   └── config.md                # Flat file, valid frontmatter
├── skills/
│   ├── workflow/                # Folder
│   │   └── SKILL.md             # Uppercase SKILL.md
│   └── validation/              # Folder
│       └── SKILL.md             # Uppercase SKILL.md
├── agents/
│   ├── custom-architect.md      # custom- prefix
│   └── custom-reviewer.md       # custom- prefix
├── hooks/
│   └── PreToolUse.sh            # Executable, valid event name
└── README.md                    # Complete documentation
```

This structure follows all validation rules and will be auto-discovered correctly by Claude Code.
