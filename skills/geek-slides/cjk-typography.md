# CJK Typography

Rules for Chinese, Japanese, and Korean text rendering. These rules are mandatory whenever the user selects Chinese, Japanese, or Mixed language in Phase 1.

---

## Font Stack Rules

### Primary Rule

Always specify a CJK web font explicitly. Never rely on system defaults alone.

**Font-family order:** `'CJK Web Font', 'Latin Web Font', system-CJK-fallbacks, generic`

### System Fallback Chains

**Sans-serif (Chinese Simplified):**
```css
'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif
```

**Serif (Chinese Simplified):**
```css
'Songti SC', 'STSong', 'SimSun', 'Noto Serif CJK SC', serif
```

**Monospace (Chinese):**
```css
'LXGW WenKai Mono', 'Sarasa Mono SC', 'Noto Sans Mono CJK SC', monospace
```

### Recommended Google Fonts for CJK

| Font | Style | Weight | Best For |
|------|-------|--------|----------|
| Noto Sans SC | Sans-serif | 400, 700, 900 | Universal, clean |
| Noto Serif SC | Serif | 400, 700 | Formal, editorial |
| LXGW WenKai | Handwriting-esque | 400, 700 | Warm, literary |
| ZCOOL KuaiLe | Display | 400 | Bold, playful |
| LXGW WenKai Mono | Monospace | 400 | Code, terminal |
| Ma Shan Zheng | Brush script | 400 | Traditional, calligraphic |

### Google Fonts Loading

Always include `&subset=chinese-simplified` (or `chinese-traditional`) and `&display=swap`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&family=Space+Grotesk:wght@400;700&subset=chinese-simplified&display=swap">
```

**Warning:** CJK font files are large (Noto Sans SC ~2MB). Always use `font-display: swap` so content is immediately readable with fallback fonts while the web font loads.

---

## Line Height and Spacing

### Line Height

CJK characters are taller and more visually dense than Latin characters. Tighter line-height causes CJK text to feel cramped.

| Element | CJK | Latin |
|---------|-----|-------|
| Body text | `1.8` | `1.5` |
| Headings (h1) | `1.4` | `1.2` |
| Headings (h2-h3) | `1.5` | `1.3` |
| Bullet items | `1.8` | `1.5` |
| Code blocks | `1.6` | `1.5` |

### Letter Spacing

```css
/* CJK body text */
:lang(zh) p, :lang(zh) li {
  letter-spacing: 0.05em;
}

/* CJK headings — tighter */
:lang(zh) h1, :lang(zh) h2, :lang(zh) h3 {
  letter-spacing: 0.02em;
}
```

### Paragraph Spacing

In slide context, use `margin-bottom` for paragraph separation, NOT `text-indent` (text-indent is for print/long-form).

```css
:lang(zh) p + p {
  margin-top: clamp(0.5rem, 1.5vw, 1rem);
}
```

---

## Punctuation Rules

### Full-Width Punctuation

CJK punctuation MUST remain full-width. Never convert to half-width.

```css
:lang(zh) {
  font-feature-settings: "halt" 1;  /* proper CJK punctuation width */
}
```

### Character Conventions

| Use | Correct | Wrong |
|-----|---------|-------|
| Quotation marks | 「内容」or "内容" | "内容" |
| Ellipsis | …… (two full-width) | ... |
| Dash | —— (two em-dash) | -- |
| Separator | 、 | , |
| Parentheses | （中文括号） | (English parens for CJK) |

### Word Breaking

```css
:lang(zh) {
  word-break: break-all;        /* allow break at any CJK character */
  overflow-wrap: break-word;    /* safety net for long strings */
  word-spacing: 0.25em;         /* thin space around Latin words within CJK */
}
```

---

## Content Density for CJK

CJK characters carry more information per character than Latin characters but are roughly 2x width. This affects how much content fits on a slide.

### Limits Per Slide

| Element | CJK Limit | Latin Limit |
|---------|-----------|-------------|
| Title | ≤12 characters | ≤6 words |
| Subtitle | ≤24 characters | ≤12 words |
| Bullet points | Max 4 per slide | Max 6 per slide |
| Chars per bullet | ≤60 characters | No hard limit |
| Paragraph | ≤80 characters | ≤3 sentences |

### Mixed Language Handling

When CJK and Latin text coexist:

1. **Font stack order** — CJK font first: `'Noto Sans SC', 'Space Grotesk', sans-serif`
   - The CJK font handles CJK characters; Latin characters fall through to the Latin font
2. **`:lang()` selector** — Set `<html lang="zh">` for Chinese-primary content
3. **Code within CJK slides** — Use the monospace font from the stack. Same syntax highlighting as English.
4. **English words in Chinese text** — The Latin font in the stack handles these automatically. No special markup needed.

---

## Quick Reference CSS Block

Copy this into presentations with CJK content:

```css
/* === CJK TYPOGRAPHY === */
:lang(zh), :lang(ja), :lang(ko) {
  font-feature-settings: "kern" 1, "liga" 1, "halt" 1;
  word-break: break-all;
  overflow-wrap: break-word;
}

:lang(zh) p, :lang(zh) li,
:lang(ja) p, :lang(ja) li,
:lang(ko) p, :lang(ko) li {
  line-height: 1.8;
  letter-spacing: 0.05em;
}

:lang(zh) h1, :lang(ja) h1, :lang(ko) h1 {
  line-height: 1.4;
  letter-spacing: 0.02em;
}

:lang(zh) h2, :lang(zh) h3,
:lang(ja) h2, :lang(ja) h3,
:lang(ko) h2, :lang(ko) h3 {
  line-height: 1.5;
  letter-spacing: 0.02em;
}
```
