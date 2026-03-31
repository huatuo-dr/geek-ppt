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

### Step 3: Generate 9 Presentations

For each of the 9 presets, generate a complete HTML presentation following the geek-slides rules:

| # | Preset | Filename |
|---|--------|----------|
| 1 | Ink Wash 水墨 | `ink-wash.html` |
| 2 | Neon Shanghai 霓虹 | `neon-shanghai.html` |
| 3 | Bamboo Grid 竹简 | `bamboo-grid.html` |
| 4 | Silk Road 丝路 | `silk-road.html` |
| 5 | Paper Cut 剪纸 | `paper-cut.html` |
| 6 | Digital Garden 数字花园 | `digital-garden.html` |
| 7 | Signal Flare 信号弹 | `signal-flare.html` |
| 8 | Cloud Atlas 云图 | `cloud-atlas.html` |
| 9 | Torrent 激流 | `torrent.html` |

**All presentations use the same test content** from [test-content.md](test-content.md), only the visual style changes.

**Generation rules:**
- Follow ALL rules from geek-slides: viewport fitting, content density limits, CJK typography, Magic Move assignment, layout variety, navigation buttons, etc.
- Each file is a zero-dependency, self-contained HTML
- Apply the preset's fonts, colors, signature elements, and recommended animations
- Language is Mixed (Chinese + English), set `<html lang="zh">`

### Step 4: Generate Index Page

After all 9 presentations are generated, create an `index.html` navigation page in the same timestamped directory.

The index page should:
- Show the test run timestamp in the subtitle
- Display 9 cards in a responsive grid (3 columns on desktop, 1 on mobile)
- Each card shows: preset color preview, Chinese + English name, brief description, Dark/Light badge
- Cards link to the corresponding HTML file (relative path, same directory)
- Style: dark background (#0a0a0a), card hover lift effect

**Index page template:**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geek Slides Test — TIMESTAMP</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
            background: #0a0a0a;
            color: #f5f5f5;
            min-height: 100vh;
            padding: 3rem 2rem;
        }
        h1 {
            text-align: center;
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            margin-bottom: 0.5rem;
            letter-spacing: 0.02em;
        }
        .subtitle {
            text-align: center;
            color: #888;
            font-size: clamp(0.85rem, 1.5vw, 1rem);
            margin-bottom: 3rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            max-width: 1100px;
            margin: 0 auto;
        }
        .card {
            background: #161616;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, border-color 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .card:hover {
            transform: translateY(-4px);
            border-color: rgba(255,255,255,0.2);
        }
        .card-color {
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
        .card-body { padding: 1.25rem; }
        .card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.35rem; }
        .card-desc { font-size: 0.85rem; color: #888; line-height: 1.6; }
        .badge {
            display: inline-block;
            font-size: 0.7rem;
            padding: 2px 8px;
            border-radius: 4px;
            margin-top: 0.5rem;
            font-weight: 600;
        }
        .badge-dark { background: #333; color: #ccc; }
        .badge-light { background: #e8e8e8; color: #333; }
    </style>
</head>
<body>
    <h1>Geek Slides Test</h1>
    <p class="subtitle">TIMESTAMP | 9 Presets × 19 Slides | Click to view</p>
    <div class="grid">
        <a class="card" href="ink-wash.html">
            <div class="card-color" style="background: linear-gradient(135deg, #0d0d0d, #1a1814); color: #c4a87c;">水墨</div>
            <div class="card-body">
                <div class="card-title">Ink Wash 水墨</div>
                <div class="card-desc">Elegant, contemplative — ink wash gradients, brush-stroke dividers, serif typography</div>
                <span class="badge badge-dark">Dark</span>
            </div>
        </a>
        <a class="card" href="neon-shanghai.html">
            <div class="card-color" style="background: linear-gradient(135deg, #0a0e1a, #111827); color: #06ffa5;">霓虹</div>
            <div class="card-body">
                <div class="card-title">Neon Shanghai 霓虹</div>
                <div class="card-desc">Cyberpunk, electric — neon glow, scanline overlay, glassmorphism cards</div>
                <span class="badge badge-dark">Dark</span>
            </div>
        </a>
        <a class="card" href="bamboo-grid.html">
            <div class="card-color" style="background: linear-gradient(135deg, #fafafa, #f0f0f0); color: #2d6a4f;">竹简</div>
            <div class="card-body">
                <div class="card-title">Bamboo Grid 竹简</div>
                <div class="card-desc">Swiss Modern precision — visible grid, section numbers, clean alignment</div>
                <span class="badge badge-light">Light</span>
            </div>
        </a>
        <a class="card" href="silk-road.html">
            <div class="card-color" style="background: linear-gradient(135deg, #1a0f0a, #2a1f18); color: #d4a373;">丝路</div>
            <div class="card-body">
                <div class="card-title">Silk Road 丝路</div>
                <div class="card-desc">Premium, warm — golden gradients, corner flourishes, pull quotes</div>
                <span class="badge badge-dark">Dark</span>
            </div>
        </a>
        <a class="card" href="paper-cut.html">
            <div class="card-color" style="background: linear-gradient(135deg, #fef9f0, #fff5e6); color: #e85d4a;">剪纸</div>
            <div class="card-body">
                <div class="card-title">Paper Cut 剪纸</div>
                <div class="card-desc">Playful, layered — paper shadow cards, rounded corners, slight rotation</div>
                <span class="badge badge-light">Light</span>
            </div>
        </a>
        <a class="card" href="digital-garden.html">
            <div class="card-color" style="background: linear-gradient(135deg, #f8f6f1, #efeade); color: #3d7a5f;">数字花园</div>
            <div class="card-body">
                <div class="card-title">Digital Garden 数字花园</div>
                <div class="card-desc">Modern editorial — drop caps, pull quotes, serif + sans contrast</div>
                <span class="badge badge-light">Light</span>
            </div>
        </a>
        <a class="card" href="signal-flare.html">
            <div class="card-color" style="background: #000000; color: #ff4d00;">信号弹</div>
            <div class="card-body">
                <div class="card-title">Signal Flare 信号弹</div>
                <div class="card-desc">Bold, high-impact — massive headings, pure black, single accent color</div>
                <span class="badge badge-dark">Dark</span>
            </div>
        </a>
        <a class="card" href="cloud-atlas.html">
            <div class="card-color" style="background: linear-gradient(135deg, #f0f4f8, #e2e8f0); color: #6366f1;">云图</div>
            <div class="card-body">
                <div class="card-title">Cloud Atlas 云图</div>
                <div class="card-desc">Calm, spacious — generous whitespace, thin lines, soft containers</div>
                <span class="badge badge-light">Light</span>
            </div>
        </a>
        <a class="card" href="torrent.html">
            <div class="card-color" style="background: linear-gradient(135deg, #07060d, #1a1025); color: #fbbf24;">激流</div>
            <div class="card-body">
                <div class="card-title">Torrent 激流</div>
                <div class="card-desc">Intense, immersive — 3 animated glow orbs, gradient headings, glassmorphism</div>
                <span class="badge badge-dark">Dark</span>
            </div>
        </a>
    </div>
</body>
</html>
```

Replace `TIMESTAMP` with the actual directory timestamp (e.g. `2026-03-30 14:30:25`).

### Step 5: Summary

After generation, output:
- Total files generated (9 presentations + 1 index)
- The `index.html` path for the user to open in browser

**Path output rules:**
- Detect if running in WSL by checking for `/mnt/c/` or `WSL` in `uname -r`
- If WSL: convert the Linux path to Windows-accessible path and print both:
  - Linux path: `/home/user/project/.geek-slides-preview/20260330-143025/index.html`
  - Windows path: `\\wsl$\Ubuntu-22.04\home\user\project\.geek-slides-preview\20260330-143025\index.html`
- If not WSL: print the absolute path only

**Do NOT open the browser automatically.**
