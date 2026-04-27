---
name: geek-slides
description: Create zero-dependency, animation-rich HTML presentations with CJK-first typography and Keynote-style Magic Move transitions. Use when the user wants to build a presentation, create slides for a talk, pitch, or teaching session.
---

# Geek Slides

Create zero-dependency, single-file HTML presentations with CJK-first typography, flexible layouts, and Keynote-style Magic Move transitions.

## Core Principles

1. **Zero Dependencies** — Single HTML file with inline CSS/JS. No npm, no build tools, no frameworks.
2. **CJK-First Typography** — Always specify CJK fonts explicitly. Never rely on system font stacks alone. CJK text uses `line-height: 1.8` and `letter-spacing: 0.05em`.
3. **Magic Move Transitions** — Elements with matching `data-magic-id` across slides animate smoothly (position, size, color, font-size) using the FLIP technique.
4. **Discrete Slide Navigation** — Slides are absolutely positioned, toggled via `.active` class. No scroll-snap (incompatible with Magic Move).
5. **Viewport Fitting (NON-NEGOTIABLE)** — Every slide MUST fit exactly within 100vh. No scrolling within slides. Content overflows? Split into multiple slides.
6. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted. Avoid overused fonts (Inter, Roboto, Arial), cliched purple gradients, and predictable layouts.

## Design Anti-Patterns

**Banned fonts:** Inter, Roboto, Arial, Helvetica as display fonts. System-only `font-family: sans-serif`.

**Banned colors:** Generic indigo (#6366f1), purple-on-white gradients, Bootstrap blue (#0d6efd).

**Banned patterns:** `line-height: 1.2` for CJK text, `font-family: sans-serif` without CJK font, identical layouts on every slide, walls of text without visual hierarchy.

---

## Phase 1: Discover

**Ask ALL questions in a single message** so the user fills everything out at once:

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for?
Options: Pitch deck / Teaching & Tutorial / Conference talk / Internal presentation

**Question 2 — Length** (header: "Length"):
How many slides?
Options: Short (5-10) / Medium (10-20) / Long (20+)

**Question 3 — Content** (header: "Content"):
Do you have content ready?
Options: All content ready / Rough notes / Topic only — help me generate

**Question 4 — Language** (header: "Language"):
Primary language?
Options: Chinese / English / Mixed (Chinese + English)

**Question 5 — Images** (header: "Images"):
Do you have local images to include?
Options: Yes (provide file paths) / No images needed

If user has content, ask them to share it.
If user provides image paths, read each image with the Read tool to evaluate it.

### Image Handling

When local images are provided:
1. **Read** each image file with the Read tool (multimodal — you can see it)
2. **Evaluate** — what it shows, whether it's usable, dominant colors
3. **Encode** — use `base64 -w0 <image_path>` to get base64 string
4. **Embed** — `<img src="data:image/<type>;base64,..." alt="descriptive text">`
5. **Size guard** — if base64 exceeds 500KB per image, warn user and suggest resizing

---

## Phase 2: Style

Read [style-presets.md](style-presets.md) and [cjk-typography.md](cjk-typography.md) before this phase.

### Step 2.1: Style Path

Ask how they want to choose:
- "Show me options" (recommended) — Generate 3 previews based on mood
- "I know what I want" — Pick from preset list directly

**If direct selection:** Show the 9 presets from [style-presets.md](style-presets.md) and let user pick. Skip to Phase 3.

### Step 2.2: Mood Selection

Ask (multiSelect, max 2):
What feeling should the audience have?
- **Impressed / Confident** — Professional, trustworthy
- **Excited / Energized** — Innovative, bold
- **Calm / Focused** — Clear, thoughtful
- **Inspired / Moved** — Emotional, memorable

### Step 2.3: Generate 3 Style Previews

Based on mood, generate 3 distinct single-slide HTML previews. Each preview should be a self-contained HTML file (~60-100 lines) showing one animated title slide with the preset's fonts, colors, and signature elements.

| Mood                | Suggested Presets                        |
| ------------------- | ---------------------------------------- |
| Impressed/Confident | Signal Flare, Bamboo Grid, Silk Road     |
| Excited/Energized   | Torrent, Neon Shanghai, Paper Cut        |
| Calm/Focused        | Cloud Atlas, Digital Garden, Bamboo Grid |
| Inspired/Moved      | Ink Wash, Silk Road, Digital Garden      |

Save previews to `.geek-slides-preview/` (style-a.html, style-b.html, style-c.html). Open each in browser automatically.

### Step 2.4: User Picks

Ask: Which style do you prefer?
Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

If "Mix elements," ask for specifics.

---

## Phase 3: Generate

**Before generating, read these supporting files:**
- [slide-engine.md](slide-engine.md) — HTML architecture and JS controller
- [base-styles.md](base-styles.md) — Mandatory CSS (include in full)
- [animation-catalog.md](animation-catalog.md) — Animation reference
- [layout-patterns.md](layout-patterns.md) — Layout recipes

### Generation Rules

1. **Single self-contained HTML file** — all CSS/JS inline
2. **Include the FULL contents of base CSS** from [base-styles.md](base-styles.md)
3. **Load fonts** from Google Fonts — include `&display=swap`, add `&subset=chinese-simplified` for CJK fonts
4. **Section comments** — every section needs `/* === SECTION NAME === */`
5. **Semantic HTML** — use `<section>`, `<h1>`–`<h4>`, `<p>`, `<ul>`, proper heading hierarchy

### Magic Move Assignment

When generating slides, identify content that semantically connects across slides:
- Headings that evolve (e.g., "Problem" → "Solution")
- Images that reposition (e.g., small thumbnail → full-width hero)
- Numbers that change (e.g., "$1M" → "$5M")
- Cards that rearrange between layouts

Assign `data-magic-id` to these elements in both source and target slides. **Limit to 3-4 magic-id elements per transition** for visual clarity.

Example:
```html
<!-- Slide 2 -->
<h2 data-magic-id="main-heading">The Problem</h2>
<div data-magic-id="stat-1" class="stat">23%</div>

<!-- Slide 3 -->
<h2 data-magic-id="main-heading">Our Solution</h2>
<div data-magic-id="stat-1" class="stat">87%</div>
```

### Layout Selection

Choose layouts based on content type. Available layouts from [layout-patterns.md](layout-patterns.md):

| Content Type          | Recommended Layout   |
| --------------------- | -------------------- |
| Title / Key message   | `layout-center`      |
| Image + text          | `layout-split`       |
| Feature list / Cards  | `layout-grid`        |
| Process / History     | `layout-timeline`    |
| Editorial / Story     | `layout-magazine`    |
| Before/After / A vs B | `layout-comparison`  |

**Vary layouts across slides.** Never use the same layout for more than 3 consecutive slides.

### Content Density Limits

| Slide Type    | Maximum Content (CJK)                     | Maximum Content (Latin)                    |
| ------------- | ----------------------------------------- | ------------------------------------------ |
| Title slide   | 1 heading (≤12 chars) + 1 subtitle (≤24)  | 1 heading (≤6 words) + 1 subtitle          |
| Content slide | 1 heading + 4 bullet points (≤60 chars)   | 1 heading + 6 bullet points                |
| Feature grid  | 1 heading + 4 cards maximum               | 1 heading + 6 cards maximum                |
| Code slide    | 1 heading + 8-10 lines of code            | 1 heading + 8-10 lines of code             |
| Quote slide   | 1 quote (≤40 chars) + attribution         | 1 quote (max 3 lines) + attribution        |
| Image slide   | 1 heading + 1 image (max 60vh)            | 1 heading + 1 image (max 60vh)             |

**Content exceeds limits? Split into multiple slides. Never cram, never scroll.**

### Content Splitting Strategy

When content overflows a single slide:
1. **Bullet lists > 4 items (CJK)** — split at natural topic breaks, add a continuation header (e.g., "核心特性（续）")
2. **Code blocks > 10 lines** — extract the most important fragment, add a "full code on next slide" note
3. **Tables > 5 rows** — split into "overview" slide (top 3 rows) + "details" slide (remaining rows)
4. **Mixed content (text + code + image)** — each content type gets its own slide

### Font Loading Resilience

Google Fonts may load slowly or fail (especially CJK fonts at ~2MB). The font stack in each preset already includes system fallbacks, so content remains readable during loading. No additional fallback logic is needed — `font-display: swap` handles this automatically.

### Magic Move: When NOT to Use

Skip `data-magic-id` assignment when:
- Two slides have completely unrelated content (no semantic connection)
- More than 4 elements would need to animate (visual clutter)
- The transition is between a content-heavy slide and a minimal slide (jarring size changes)
- Adjacent slides use the same layout with same element positions (no visible movement)

### Entrance Animation Integration

Every generated presentation MUST integrate `triggerEntrance()` from [slide-engine.md](slide-engine.md) into the slide controller. Call `triggerEntrance(toSlide)` in the `goToSlide()` method — specifically in the Magic Move `onComplete` callback and after the crossfade `setTimeout`. Without this, `.reveal` elements will stay invisible.

---

## Phase 4: Deliver

1. **Open** — use `open <filename>.html` (macOS) or `xdg-open <filename>.html` (Linux) to launch in browser
2. **Clean up** — delete `.geek-slides-preview/` if it exists
3. **Summarize** — tell the user:
   - File location and slide count
   - Navigation: Arrow keys, Space bar, click navigation dots
   - Magic Move highlights: which elements animate between which slides
   - Customization: `:root` CSS variables for colors, font link for typography

---

## Supporting Files

| File                                           | Purpose                                        | When to Read              |
| ---------------------------------------------- | ---------------------------------------------- | ------------------------- |
| [style-presets.md](style-presets.md)            | 9 CJK-aware visual presets                     | Phase 2 (style selection) |
| [cjk-typography.md](cjk-typography.md)         | CJK font stacks, spacing, punctuation rules    | Phase 2 + Phase 3         |
| [slide-engine.md](slide-engine.md)             | HTML template, JS controller, Magic Move       | Phase 3 (generation)      |
| [base-styles.md](base-styles.md)               | Mandatory CSS — viewport, layout, responsive   | Phase 3 (generation)      |
| [animation-catalog.md](animation-catalog.md)   | Animation snippets and effect-to-feeling guide | Phase 3 (generation)      |
| [layout-patterns.md](layout-patterns.md)       | HTML+CSS recipes for 7 layout types            | Phase 3 (generation)      |
