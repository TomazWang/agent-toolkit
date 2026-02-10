# Skill Structure Schema

## Required Structure

Skills MUST be folders containing SKILL.md:

**✓ Correct:**
```
skills/
└── my-skill/              # Folder
    └── SKILL.md           # Uppercase SKILL.md
```

**✗ Wrong:**
```
skills/
└── my-skill.md           # ✗ Flat file, should be folder
```

**✗ Also Wrong:**
```
skills/
└── my-skill/
    └── skill.md          # ✗ Lowercase, should be SKILL.md
```

## Validation Rules

### Folder Structure

**Rule**: Skill must be a directory, not a flat .md file

**Check**:
```bash
test -d skills/my-skill
```

**Examples**:
- ✓ `skills/create/` - Is a directory
- ✗ `skills/create.md` - Is a file

### SKILL.md File

**Rule**: Folder must contain SKILL.md (uppercase)

**Check**:
```bash
test -f skills/my-skill/SKILL.md
```

**Examples**:
- ✓ `skills/my-skill/SKILL.md` - Correct
- ✗ `skills/my-skill/skill.md` - Wrong case
- ✗ `skills/my-skill/Skill.md` - Wrong case

### Name Matching

**Rule**: Folder name must match skill name in frontmatter

**Example**:
```yaml
# File: skills/create-plugin/SKILL.md
---
name: create-plugin  # ✓ Matches folder name
---
```

**Wrong**:
```yaml
# File: skills/create-plugin/SKILL.md
---
name: create  # ✗ Doesn't match folder name
---
```

## Additional Files (Optional)

Skills may contain additional files:

```
skills/
└── my-skill/
    ├── SKILL.md           # Required
    ├── examples/          # Optional: example files
    ├── templates/         # Optional: templates
    └── README.md          # Optional: detailed docs
```

## Permissions

**SKILL.md**: Should be readable (644)

```bash
-rw-r--r-- SKILL.md  # ✓ Correct permissions
```

## Common Errors

### Flat .md file instead of folder

**Error:**
```
skills/
├── create.md          # ✗ Flat file
└── validate.md        # ✗ Flat file
```

**Fix:**
```
skills/
├── create/
│   └── SKILL.md       # ✓ Folder with SKILL.md
└── validate/
    └── SKILL.md       # ✓ Folder with SKILL.md
```

### Lowercase skill.md

**Error:**
```
skills/
└── my-skill/
    └── skill.md       # ✗ Lowercase
```

**Fix:**
```
skills/
└── my-skill/
    └── SKILL.md       # ✓ Uppercase
```

### Name mismatch

**Error:**
```
# Folder: skills/create-plugin/
# File: SKILL.md
---
name: create           # ✗ Doesn't match folder
---
```

**Fix:**
```
# Folder: skills/create-plugin/
# File: SKILL.md
---
name: create-plugin    # ✓ Matches folder
---
```

## Validation Checklist

- [ ] Skill is a directory (not flat .md file)
- [ ] Directory contains SKILL.md (uppercase)
- [ ] SKILL.md is readable
- [ ] Folder name is kebab-case
- [ ] Folder name matches `name` in frontmatter
- [ ] No typos in SKILL.md filename
