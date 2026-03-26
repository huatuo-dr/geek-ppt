# Style Presets

8 curated visual presets with CJK-aware font pairings. Each preset defines typography, colors, and signature design elements.

---

## Preset Format

Each preset specifies:
- **Vibe** — the emotional tone
- **Theme** — light or dark
- **Typography** — display + body fonts (CJK and Latin)
- **Colors** — CSS custom properties
- **Signature Elements** — 3-4 unique visual markers that define its identity
- **Magic Move Affinity** — which element transitions look best

---

## 1. Ink Wash 水墨

**Vibe:** Elegant, contemplative, cultural depth
**Theme:** Dark

**Typography:**
- Display (CJK): Noto Serif SC (700)
- Display (Latin): Playfair Display (700)
- Body (CJK): Noto Serif SC (400)
- Body (Latin): Playfair Display (400)
```css
--font-display: 'Playfair Display', 'Noto Serif SC', 'Songti SC', serif;
--font-body: 'Noto Serif SC', 'Playfair Display', 'Songti SC', serif;
```

**Colors:**
```css
--bg-primary: #0d0d0d;
--bg-secondary: #1a1814;
--text-primary: #e8e0d4;
--text-secondary: #8a7e6b;
--accent: #c4a87c;
--accent-glow: rgba(196, 168, 124, 0.2);
```

**Signature Elements:**
- Subtle ink-wash gradient backgrounds using layered `radial-gradient` with soft edges
- Horizontal brush-stroke dividers (CSS gradient simulating ink strokes)
- Serif headings with generous `letter-spacing: 0.1em`
- Muted gold accent on key words

**Magic Move Affinity:** Text morphing — headings that evolve feel like calligraphy strokes transforming.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Playfair+Display:wght@400;700&display=swap
```

---

## 2. Neon Shanghai 霓虹

**Vibe:** Cyberpunk, electric, urban energy
**Theme:** Dark

**Typography:**
- Display (CJK): ZCOOL KuaiLe (400)
- Display (Latin): Space Grotesk (700)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): Space Grotesk (400)
```css
--font-display: 'Space Grotesk', 'ZCOOL KuaiLe', sans-serif;
--font-body: 'Noto Sans SC', 'Space Grotesk', 'Microsoft YaHei', sans-serif;
```

**Colors:**
```css
--bg-primary: #0a0e1a;
--bg-secondary: #111827;
--text-primary: #f0f4ff;
--text-secondary: #64748b;
--accent: #06ffa5;
--accent-glow: rgba(6, 255, 165, 0.25);
```

**Signature Elements:**
- Neon glow text-shadow on headings: `0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)`
- Scanline overlay via repeating-linear-gradient (1px lines at 3px intervals)
- Animated border-bottom glow on active elements
- Dark glassmorphism cards with `backdrop-filter: blur(12px)`

**Magic Move Affinity:** Card transitions — glassmorphism cards sliding and resizing with neon trails.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap
```

---

## 3. Bamboo Grid 竹简

**Vibe:** Swiss Modern precision meets East Asian clarity
**Theme:** Light

**Typography:**
- Display (CJK): Noto Sans SC (700)
- Display (Latin): Archivo (700)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): Archivo (400)
```css
--font-display: 'Archivo', 'Noto Sans SC', 'PingFang SC', sans-serif;
--font-body: 'Noto Sans SC', 'Archivo', 'PingFang SC', sans-serif;
```

**Colors:**
```css
--bg-primary: #fafafa;
--bg-secondary: #f0f0f0;
--text-primary: #1a1a1a;
--text-secondary: #666666;
--accent: #2d6a4f;
--accent-glow: rgba(45, 106, 79, 0.15);
```

**Signature Elements:**
- Visible grid lines as background via `linear-gradient` (subtle 1px lines at 60px intervals)
- Large section numbers in accent color (e.g., "01", "02") aligned top-left
- Strict horizontal/vertical alignment — no diagonal or curved elements
- White card panels with thin 1px border

**Magic Move Affinity:** Grid item rearrangement — numbered sections sliding into new positions.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Archivo:wght@400;700&display=swap
```

---

## 4. Silk Road 丝路

**Vibe:** Premium, warm, storytelling
**Theme:** Dark

**Typography:**
- Display (CJK): LXGW WenKai (700)
- Display (Latin): Cormorant (700)
- Body (CJK): LXGW WenKai (400)
- Body (Latin): Cormorant (400)
```css
--font-display: 'Cormorant', 'LXGW WenKai', serif;
--font-body: 'LXGW WenKai', 'Cormorant', 'Songti SC', serif;
```

**Colors:**
```css
--bg-primary: #1a0f0a;
--bg-secondary: #2a1f18;
--text-primary: #f5ebe0;
--text-secondary: #a89080;
--accent: #d4a373;
--accent-glow: rgba(212, 163, 115, 0.2);
```

**Signature Elements:**
- Warm gradient overlays using golden tones
- Decorative corner flourishes via CSS `::before`/`::after` with border segments
- Pull-quote styling with large opening quotation mark in accent color
- Subtle pattern overlay (geometric tile pattern via CSS)

**Magic Move Affinity:** Image transitions — images gliding from small to large with warm glow.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@400;700&family=Cormorant:wght@400;700&display=swap
```

---

## 5. Paper Cut 剪纸

**Vibe:** Playful, layered, approachable
**Theme:** Light

**Typography:**
- Display (CJK): Noto Sans SC (700)
- Display (Latin): Plus Jakarta Sans (700)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): Plus Jakarta Sans (400)
```css
--font-display: 'Plus Jakarta Sans', 'Noto Sans SC', 'PingFang SC', sans-serif;
--font-body: 'Noto Sans SC', 'Plus Jakarta Sans', 'PingFang SC', sans-serif;
```

**Colors:**
```css
--bg-primary: #fef9f0;
--bg-secondary: #fff5e6;
--text-primary: #2d2d2d;
--text-secondary: #6b6b6b;
--accent: #e85d4a;
--accent-glow: rgba(232, 93, 74, 0.15);
```

**Signature Elements:**
- Layered paper cards with progressive `box-shadow` (3 layers of shadow for depth)
- Rounded corners everywhere (`border-radius: 16px`)
- Pastel accent badges/pills for categories
- Slight rotation on cards (`transform: rotate(-1deg)` / `rotate(1.5deg)`) for handmade feel

**Magic Move Affinity:** Card stacking — cards sliding, rotating, and layering with paper-like depth.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap
```

---

## 6. Digital Garden 数字花园

**Vibe:** Modern editorial, thoughtful, organic
**Theme:** Light

**Typography:**
- Display (CJK): Noto Serif SC (700)
- Display (Latin): Fraunces (700)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): DM Sans (400)
```css
--font-display: 'Fraunces', 'Noto Serif SC', serif;
--font-body: 'Noto Sans SC', 'DM Sans', 'PingFang SC', sans-serif;
```

**Colors:**
```css
--bg-primary: #f8f6f1;
--bg-secondary: #efeade;
--text-primary: #1f2937;
--text-secondary: #6b7280;
--accent: #3d7a5f;
--accent-glow: rgba(61, 122, 95, 0.12);
```

**Signature Elements:**
- Drop caps on opening paragraphs (first-letter pseudo-element, 3x font-size)
- Pull quotes with thick left border in accent color
- Mixed serif display + sans-serif body creates editorial contrast
- Subtle botanical-pattern background via CSS `radial-gradient` circles

**Magic Move Affinity:** Text block transitions — paragraphs and pull quotes repositioning between layouts.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;700&family=Fraunces:wght@400;700&family=DM+Sans:wght@400;700&display=swap
```

---

## 7. Signal Flare 信号弹

**Vibe:** Bold, confident, high-impact
**Theme:** Dark

**Typography:**
- Display (CJK): Noto Sans SC (900)
- Display (Latin): Syne (800)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): Syne (400)
```css
--font-display: 'Syne', 'Noto Sans SC', sans-serif;
--font-body: 'Noto Sans SC', 'Syne', 'Microsoft YaHei', sans-serif;
```

**Colors:**
```css
--bg-primary: #000000;
--bg-secondary: #111111;
--text-primary: #ffffff;
--text-secondary: #888888;
--accent: #ff4d00;
--accent-glow: rgba(255, 77, 0, 0.3);
```

**Signature Elements:**
- Extra-bold headings at massive scale (title can be 6vw+)
- Single accent color used sparingly — only on key words or numbers
- Large section numbers ("01", "02") as background watermarks (font-size: 20vw, opacity: 0.03)
- High contrast: pure black + pure white + one color only

**Magic Move Affinity:** Number/heading morphing — large bold text transitioning between states.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;900&family=Syne:wght@400;800&display=swap
```

---

## 8. Cloud Atlas 云图

**Vibe:** Calm, spacious, contemplative
**Theme:** Light

**Typography:**
- Display (CJK): LXGW WenKai (700)
- Display (Latin): IBM Plex Sans (600)
- Body (CJK): LXGW WenKai (400)
- Body (Latin): IBM Plex Sans (400)
```css
--font-display: 'IBM Plex Sans', 'LXGW WenKai', sans-serif;
--font-body: 'LXGW WenKai', 'IBM Plex Sans', 'PingFang SC', sans-serif;
```

**Colors:**
```css
--bg-primary: #f0f4f8;
--bg-secondary: #e2e8f0;
--text-primary: #334155;
--text-secondary: #94a3b8;
--accent: #6366f1;
--accent-glow: rgba(99, 102, 241, 0.1);
```

**Signature Elements:**
- Generous whitespace — content occupies max 60% of slide area
- Thin horizontal lines (1px, low opacity) as section dividers
- Soft rounded rectangles as containers (border-radius: 20px)
- Muted color palette — nothing demands attention; everything breathes

**Magic Move Affinity:** Minimal element transitions — subtle position shifts that feel meditative.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=LXGW+WenKai:wght@400;700&family=IBM+Plex+Sans:wght@400;600&display=swap
```

---

## 9. Torrent 激流

**Vibe:** Intense, energetic, immersive dark atmosphere with living light
**Theme:** Dark

**Typography:**
- Display (CJK): Noto Sans SC (900)
- Display (Latin): Space Grotesk (700)
- Body (CJK): Noto Sans SC (400)
- Body (Latin): Space Grotesk (400)
```css
--font-display: 'Space Grotesk', 'Noto Sans SC', sans-serif;
--font-body: 'Noto Sans SC', 'Space Grotesk', 'Microsoft YaHei', sans-serif;
```

**Colors:**
```css
--bg-primary: #07060d;
--bg-secondary: rgba(255,255,255,0.03);
--text-primary: #ffffff;
--text-secondary: #a0a0b0;
--accent: #fbbf24;
--accent-glow: rgba(251,191,36,0.3);
```

**Signature Elements:**
- **3 animated glow orbs** as background — indigo/purple, cyan/teal, pink/magenta radial gradients with `filter: blur(80px)`, each on a unique 15-23s looping bounce path via `@keyframes`. This is the defining visual feature.
- **Gradient headings** — H1 uses yellow→red gradient text (`background-clip: text`) with a subtle 3s breathing scale animation (1.0→1.1→1.0). H2 uses blue→purple gradient, H3 uses green→pink gradient.
- **Glassmorphism content card** — `backdrop-filter: blur(18px)`, `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 20px`
- **Neon glow on bold text** — `text-shadow: 0 0 10px rgba(251,191,36,0.5), 0 0 28px rgba(251,191,36,0.2)` in accent yellow
- **Line-by-line stagger entrance** — each child element delays 0.2s more than the previous (0.2s, 0.4s, 0.6s, ...), animation is `translateY(24px)` fade-in over 1s

**Background Orb CSS (MUST include):**
```css
.torrent-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  will-change: transform;
  z-index: 0;
}
.torrent-orb-1 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(129,90,246,0.45) 0%, transparent 70%);
  animation: orbFloat1 18s ease-in-out infinite;
}
.torrent-orb-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%);
  animation: orbFloat2 23s ease-in-out infinite;
}
.torrent-orb-3 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%);
  animation: orbFloat3 15s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%   { transform: translate(-15%, -15%) scale(1); }
  25%  { transform: translate(55%, 15%) scale(1.35); }
  50%  { transform: translate(25%, 65%) scale(0.8); }
  75%  { transform: translate(-10%, 40%) scale(1.2); }
  100% { transform: translate(-15%, -15%) scale(1); }
}
@keyframes orbFloat2 {
  0%   { transform: translate(75%, 65%) scale(1.1); }
  25%  { transform: translate(5%, 25%) scale(0.7); }
  50%  { transform: translate(55%, -10%) scale(1.3); }
  75%  { transform: translate(65%, 50%) scale(0.85); }
  100% { transform: translate(75%, 65%) scale(1.1); }
}
@keyframes orbFloat3 {
  0%   { transform: translate(40%, 80%) scale(0.9); }
  25%  { transform: translate(-20%, 15%) scale(1.4); }
  50%  { transform: translate(65%, -20%) scale(1.05); }
  75%  { transform: translate(15%, 55%) scale(1.3); }
  100% { transform: translate(40%, 80%) scale(0.9); }
}
```

**Slide HTML structure (Torrent preset requires 3 orb divs inside each `.slide`):**
```html
<section class="slide" id="slide-0">
    <div class="torrent-orb torrent-orb-1"></div>
    <div class="torrent-orb torrent-orb-2"></div>
    <div class="torrent-orb torrent-orb-3"></div>
    <div class="slide-content layout-center">
        <!-- content here -->
    </div>
</section>
```

**Magic Move Affinity:** Gradient heading morphing — text evolving with color-shifting gradients feels electric and alive.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;900&family=Space+Grotesk:wght@400;700&display=swap
```

---

## Mood-to-Preset Mapping

| Mood | Primary Picks | Alternative |
|------|--------------|-------------|
| Impressed/Confident | Signal Flare, Bamboo Grid | Silk Road |
| Excited/Energized | Torrent, Neon Shanghai, Paper Cut | Signal Flare |
| Calm/Focused | Cloud Atlas, Digital Garden | Bamboo Grid |
| Inspired/Moved | Ink Wash, Silk Road | Digital Garden |

---

## Font Pairing Quick Reference

| Preset | Display | Body | Google Fonts Families |
|--------|---------|------|----------------------|
| Ink Wash | Playfair Display + Noto Serif SC | Noto Serif SC | 2 |
| Neon Shanghai | Space Grotesk + ZCOOL KuaiLe | Noto Sans SC | 3 |
| Bamboo Grid | Archivo + Noto Sans SC | Noto Sans SC | 2 |
| Silk Road | Cormorant + LXGW WenKai | LXGW WenKai | 2 |
| Paper Cut | Plus Jakarta Sans + Noto Sans SC | Noto Sans SC | 2 |
| Digital Garden | Fraunces + Noto Serif SC | Noto Sans SC + DM Sans | 4 |
| Signal Flare | Syne + Noto Sans SC | Noto Sans SC | 2 |
| Cloud Atlas | IBM Plex Sans + LXGW WenKai | LXGW WenKai | 2 |
| Torrent | Space Grotesk + Noto Sans SC | Noto Sans SC | 2 |

---

## DO NOT USE

- **Inter, Roboto, Arial** as display fonts — generic, overused
- **System-only font stacks** — `font-family: sans-serif` without a named CJK font
- **Generic indigo** (#6366f1) as primary accent on dark themes — Cloud Atlas uses it on light, that's fine
- **Purple gradient on white** — the quintessential "AI slop" aesthetic
- **More than 4 Google Font families** per presentation — performance concern, especially with CJK
