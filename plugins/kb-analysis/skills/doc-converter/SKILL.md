---
name: doc-converter
description: Convert documents to AI-readable markdown. Handles PPT, PDF, DOCX, etc. Use during kb:prepare to convert source documents.
argument-hint: [file or directory]
---

# KB Document Converter

Convert documents to markdown for AI analysis.

---

## Supported Formats

| Format | Tool | Notes |
|--------|------|-------|
| PPTX | python-pptx / LibreOffice | Preserves slide structure |
| PDF | pdftotext / PyMuPDF | Text extraction |
| DOCX | pandoc | Good formatting |
| HTML | pandoc | Clean conversion |
| Confluence | manual export | Export as HTML first |

---

## Usage

### Single File

```bash
/kb:doc-converter kb/sources/raw/architecture.pptx
```

### Directory

```bash
/kb:doc-converter kb/sources/raw/
```

Output goes to `kb/sources/docs/`.

---

## Conversion Methods

### PPTX to Markdown

Using LibreOffice:
```bash
libreoffice --headless --convert-to html --outdir /tmp/ file.pptx
pandoc /tmp/file.html -o kb/sources/docs/file.md
```

Or Python:
```python
from pptx import Presentation
prs = Presentation('file.pptx')
for slide in prs.slides:
    for shape in slide.shapes:
        if shape.has_text_frame:
            print(shape.text)
```

### PDF to Markdown

```bash
pdftotext -layout file.pdf - | pandoc -f plain -o file.md
```

Or with PyMuPDF for better quality:
```python
import fitz
doc = fitz.open("file.pdf")
for page in doc:
    text = page.get_text()
```

### DOCX to Markdown

```bash
pandoc file.docx -o file.md
```

---

## Output Format

Converted file should include:

```markdown
# {Document Title}

> Source: {original filename}
> Converted: {date}

## Slide 1 / Page 1 / Section 1

{content}

## Slide 2 / Page 2 / Section 2

{content}

---

_Converted from {format} on {date}_
```

---

## Manual Conversion

If tools fail:

1. Open in native app
2. Select all, copy
3. Paste into markdown file
4. Clean up formatting

Note in the file:
```markdown
> Note: Manual conversion - may have formatting issues
```

---

## Post-Conversion

After converting, update inventory:

```markdown
## Converted Docs

| Original | Converted | Method |
|----------|-----------|--------|
| arch.pptx | docs/arch.md | LibreOffice |
| spec.pdf | docs/spec.md | pdftotext |
```

---

## Tips

- Preserve original in `raw/`
- Put converted in `docs/`
- Note conversion method
- Check for missing content
- Images may not convert - note them
