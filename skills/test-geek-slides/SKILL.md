---
name: test-geek-slides
description: Batch-generate all 9 geek-slides style presets from a unified test document. Outputs to a timestamped directory with a navigation index page for visual comparison across styles and test runs.
---

# Test Geek Slides

Batch-generate all 9 style presets of the geek-slides skill from a single test content file. Each run outputs to a timestamped directory for cross-run comparison.

## Workflow

### Step 1: Prepare Output Directory

Create a timestamped output directory:

```
.geek-slides-preview/YYYYMMDD-HHmmss/
```

Use the current date and time for the directory name, e.g. `20260330-143025`.

If the directory already exists (unlikely but possible on fast re-runs), append `-2`, `-3` etc.

### Step 2: Read All Source Files

Read the following files before generating:

**Test content:**
- [test-content.md](test-content.md) — the 19-slide test presentation content

**Geek-slides skill files (all required):**
- [../geek-slides/slide-engine.md](../geek-slides/slide-engine.md) — HTML template and JS controller
- [../geek-slides/base-styles.md](../geek-slides/base-styles.md) — Mandatory base CSS
- [../geek-slides/style-presets.md](../geek-slides/style-presets.md) — 9 preset definitions
- [../geek-slides/animation-catalog.md](../geek-slides/animation-catalog.md) — Animation snippets
- [../geek-slides/layout-patterns.md](../geek-slides/layout-patterns.md) — Layout recipes
- [../geek-slides/cjk-typography.md](../geek-slides/cjk-typography.md) — CJK typography rules

### Step 3: Generate First Preset as Pilot

Generate **Ink Wash (水墨)** first as a pilot run, saved as `ink-wash.html`.

**Key rules checklist** (apply to every preset):
- Single self-contained HTML file, all CSS/JS inline, zero dependencies
- Include the FULL base CSS from base-styles.md
- Include the FULL SlidePresentation + MagicMoveController JS from slide-engine.md
- Include triggerEntrance() and integrate it into goToSlide() completion callback
- Load preset fonts from Google Fonts with `&display=swap` and `&subset=chinese-simplified`
- Apply the preset's colors as `:root` CSS custom properties
- Apply the preset's signature elements (e.g., Torrent requires 3 orb divs per slide)
- Use CJK typography CSS block from cjk-typography.md
- Set `<html lang="zh">` (Mixed language content)
- Respect content density limits: CJK title ≤12 chars, max 4 bullets per slide
- Vary layouts across slides — never use the same layout 3+ times in a row
- Assign `data-magic-id` to semantically connected elements across slides (limit 3-4 per transition)
- Viewport fitting: every slide MUST fit within 100vh, no scrolling

**After generating the pilot, open it in browser and ask the user to confirm quality before continuing.** This checkpoint prevents wasting time if there's a systemic issue.

### Step 4: Generate Remaining 8 Presets

After user confirms the pilot looks good, generate the remaining 8 presets:

| # | Preset | Filename |
|---|--------|----------|
| 2 | Neon Shanghai 霓虹 | `neon-shanghai.html` |
| 3 | Bamboo Grid 竹简 | `bamboo-grid.html` |
| 4 | Silk Road 丝路 | `silk-road.html` |
| 5 | Paper Cut 剪纸 | `paper-cut.html` |
| 6 | Digital Garden 数字花园 | `digital-garden.html` |
| 7 | Signal Flare 信号弹 | `signal-flare.html` |
| 8 | Cloud Atlas 云图 | `cloud-atlas.html` |
| 9 | Torrent 激流 | `torrent.html` |

**All presentations use the same test content** from [test-content.md](test-content.md), only the visual style changes.

**Error handling:** If a single preset fails to generate (e.g., context limit), log the error, skip it, and continue with the next preset. Report skipped presets in the final summary.

### Step 5: Generate Index Page

Read [index-template.html](index-template.html) and copy it to the timestamped directory as `index.html`.

Replace `TIMESTAMP` with the actual directory timestamp (e.g. `2026-03-30 14:30:25`).

If any presets were skipped in Step 4, remove their cards from the index or mark them as "Failed".

### Step 6: Summary

After generation, output:
- Total files generated (N presentations + 1 index)
- Any skipped/failed presets and why
- The `index.html` path for the user to open in browser

**Path output rules:**
- Detect if running in WSL by checking for `WSL` or `microsoft` in `uname -r` output
- If WSL: convert the Linux path to Windows-accessible path and print both:
  - Linux path: `/home/user/project/.geek-slides-preview/20260330-143025/index.html`
  - Windows path: `\\wsl$\Ubuntu-22.04\home\user\project\.geek-slides-preview\20260330-143025\index.html`
- If not WSL: print the absolute path only

**Do NOT open the browser automatically.**
