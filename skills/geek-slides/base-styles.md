# Base Styles

Mandatory CSS that MUST be included in full in every generated presentation. Copy-paste the entire CSS block below into the `<style>` section.

---

## Full Base CSS

```css
/* === RESET & VIEWPORT LOCK === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* === CSS CUSTOM PROPERTIES === */
:root {
  /* Typography scale — ALL use clamp() */
  --title-size: clamp(1.8rem, 5vw, 4rem);
  --h2-size: clamp(1.4rem, 3.5vw, 2.5rem);
  --h3-size: clamp(1.1rem, 2.5vw, 1.75rem);
  --body-size: clamp(0.8rem, 1.5vw, 1.125rem);
  --small-size: clamp(0.65rem, 1vw, 0.875rem);
  --code-size: clamp(0.7rem, 1.2vw, 0.95rem);

  /* CJK typography */
  --cjk-line-height: 1.8;
  --latin-line-height: 1.5;
  --cjk-letter-spacing: 0.05em;

  /* Spacing scale */
  --slide-padding: clamp(1.5rem, 4vw, 4rem);
  --content-gap: clamp(0.5rem, 2vw, 2rem);
  --element-gap: clamp(0.25rem, 1vw, 1rem);

  /* Animation timing — deliberately slow for elegance */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-normal: 1.2s;
  --duration-magic: 800ms;

  /* Colors — override per preset */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0a0;
  --accent: #ff6b35;
  --accent-glow: rgba(255, 107, 53, 0.3);
}

/* === SLIDE CONTAINER === */
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--slide-padding);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.slide.active {
  display: flex;
}

/* === SLIDE CONTENT WRAPPER === */
.slide-content {
  width: 100%;
  max-width: min(90vw, 1100px);
  max-height: min(85vh, 800px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--content-gap);
}

/* === TYPOGRAPHY BASE === */
h1 { font-size: var(--title-size); line-height: 1.2; font-weight: 800; }
h2 { font-size: var(--h2-size); line-height: 1.3; font-weight: 700; }
h3 { font-size: var(--h3-size); line-height: 1.4; font-weight: 600; }
p  { font-size: var(--body-size); line-height: var(--latin-line-height); }
small { font-size: var(--small-size); }
code { font-size: var(--code-size); }

/* CJK overrides */
:lang(zh) h1, :lang(ja) h1, :lang(ko) h1 { line-height: 1.4; }
:lang(zh) h2, :lang(ja) h2, :lang(ko) h2 { line-height: 1.5; }
:lang(zh) p, :lang(ja) p, :lang(ko) p {
  line-height: var(--cjk-line-height);
  letter-spacing: var(--cjk-letter-spacing);
}
:lang(zh) li, :lang(ja) li, :lang(ko) li {
  line-height: var(--cjk-line-height);
  letter-spacing: var(--cjk-letter-spacing);
}

/* === IMAGE CONSTRAINTS === */
img, .image-container {
  max-width: 100%;
  max-height: min(50vh, 400px);
  object-fit: contain;
  border-radius: 8px;
}

/* === LAYOUT SYSTEM === */

/* Center (default) */
.layout-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--content-gap);
}

/* Split — two columns */
.layout-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 3vw, 3rem);
  align-items: center;
  width: 100%;
  max-width: min(90vw, 1100px);
}

.layout-split.ratio-60-40 {
  grid-template-columns: 3fr 2fr;
}

.layout-split.ratio-40-60 {
  grid-template-columns: 2fr 3fr;
}

/* Grid — card layouts */
.layout-grid {
  display: grid;
  gap: var(--content-gap);
  width: 100%;
  max-width: min(90vw, 1100px);
}

.layout-grid.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.layout-grid.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.layout-grid .card {
  padding: clamp(0.75rem, 2vw, 1.5rem);
  border-radius: 12px;
  background: var(--bg-secondary);
  overflow: hidden;
}

/* Timeline */
.layout-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--element-gap);
  width: 100%;
  max-width: min(80vw, 800px);
  position: relative;
  padding-left: clamp(2rem, 4vw, 4rem);
}

.layout-timeline::before {
  content: '';
  position: absolute;
  left: clamp(0.75rem, 1.5vw, 1.25rem);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
  opacity: 0.4;
}

.layout-timeline .timeline-item {
  position: relative;
  padding-left: var(--element-gap);
}

.layout-timeline .timeline-item::before {
  content: '';
  position: absolute;
  left: calc(-1 * clamp(1.5rem, 3vw, 3rem));
  top: 0.5em;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

/* Magazine — asymmetric editorial */
.layout-magazine {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--content-gap);
  width: 100%;
  max-width: min(90vw, 1100px);
}

.layout-magazine .feature {
  grid-row: 1 / -1;
}

/* Comparison — side by side with divider */
.layout-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--content-gap);
  align-items: center;
  width: 100%;
  max-width: min(90vw, 1100px);
}

.layout-comparison .divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: var(--small-size);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.layout-comparison .divider::before,
.layout-comparison .divider::after {
  content: '';
  width: 1px;
  height: clamp(1rem, 4vh, 3rem);
  background: var(--text-secondary);
  opacity: 0.3;
}

/* === NAVIGATION BUTTONS (prev/next) === */
.nav-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
  pointer-events: none;
}

.nav-btn {
  pointer-events: auto;
  background: var(--bg-secondary);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-primary);
  width: 40px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s, opacity 0.2s;
  opacity: 0.6;
  flex-shrink: 0;
}

.nav-btn:hover {
  opacity: 1;
  background: var(--accent);
  color: var(--bg-primary);
}

.nav-btn:disabled {
  opacity: 0.15;
  cursor: default;
  pointer-events: none;
}

.nav-progress-track {
  flex: 1;
  height: 3px;
  background: rgba(255,255,255,0.08);
  margin: 0 12px;
  border-radius: 2px;
  overflow: hidden;
  pointer-events: none;
}

.nav-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.4s var(--ease-standard);
}

.nav-slide-counter {
  position: fixed;
  bottom: 56px;
  right: clamp(0.5rem, 2vw, 1.5rem);
  font-size: var(--small-size);
  color: var(--text-secondary);
  opacity: 0.5;
  z-index: 100;
}

/* === NAVIGATION UI === */
.nav-dots {
  position: fixed;
  right: clamp(0.5rem, 1.5vw, 1.5rem);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
}

.nav-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.3s;
  border: none;
  padding: 0;
}

.nav-dots .dot.active {
  opacity: 1;
  background: var(--accent);
  transform: scale(1.3);
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  z-index: 100;
  transition: width 0.3s var(--ease-standard);
}

/* === MAGIC MOVE CLONES === */
.magic-clone {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  will-change: transform, opacity;
}

/* === RESPONSIVE BREAKPOINTS === */

/* Short viewports */
@media (max-height: 700px) {
  :root {
    --slide-padding: clamp(1rem, 3vw, 2.5rem);
    --content-gap: clamp(0.4rem, 1.5vw, 1.25rem);
  }
}

/* Very short viewports — hide non-essential */
@media (max-height: 600px) {
  .nav-dots { display: none; }
  :root {
    --title-size: clamp(1.2rem, 4vw, 2.5rem);
    --slide-padding: clamp(0.75rem, 2vw, 2rem);
  }
}

/* Landscape phones */
@media (max-height: 500px) {
  :root {
    --title-size: clamp(1rem, 3.5vw, 2rem);
    --body-size: clamp(0.7rem, 1.2vw, 0.9rem);
    --slide-padding: clamp(0.5rem, 2vw, 1.5rem);
  }
}

/* Narrow viewports — stack layouts */
@media (max-width: 768px) {
  .layout-split {
    grid-template-columns: 1fr;
  }
  .layout-split.ratio-60-40,
  .layout-split.ratio-40-60 {
    grid-template-columns: 1fr;
  }
  .layout-grid.cols-3 {
    grid-template-columns: 1fr;
  }
  .layout-comparison {
    grid-template-columns: 1fr;
  }
  .layout-comparison .divider {
    flex-direction: row;
  }
  .layout-comparison .divider::before,
  .layout-comparison .divider::after {
    width: clamp(1rem, 10vw, 3rem);
    height: 1px;
  }
  .layout-magazine {
    grid-template-columns: 1fr;
  }
}

/* Very narrow */
@media (max-width: 480px) {
  .layout-grid.cols-2 {
    grid-template-columns: 1fr;
  }
  :root {
    --title-size: clamp(1.3rem, 7vw, 2.5rem);
  }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.2s !important;
  }
  .magic-clone {
    transition-duration: 0.01ms !important;
  }
}

/* === PRINT === */
@media print {
  .slide {
    position: relative;
    display: flex !important;
    page-break-after: always;
    height: 100vh;
  }
  .nav-dots, .progress-bar { display: none; }
}
```

---

## Usage Notes

- **Never modify the base CSS** in a presentation. Override via preset-specific styles using CSS custom properties.
- **All sizes use `clamp()`** — never hardcode px/rem values for typography or spacing.
- **CJK overrides** activate automatically when `<html lang="zh">` (or `ja`, `ko`) is set.
- **Layout classes** go on the `.slide-content` wrapper, not on `.slide` itself.
- **Never negate CSS functions directly** — `-clamp()` is silently ignored. Use `calc(-1 * clamp(...))` instead.
