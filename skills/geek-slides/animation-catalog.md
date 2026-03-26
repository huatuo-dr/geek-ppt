# Animation Catalog

Animation categories, CSS/JS snippets, and the effect-to-feeling guide. Reference this when generating presentations in Phase 3.

---

## Effect-to-Feeling Guide

Choose animations based on the desired emotional impact:

| Feeling | Entrance | Slide Transition | Background | Signature |
|---------|----------|------------------|------------|-----------|
| **Dramatic / Cinematic** | `reveal-scale` (slow, 1s) | `zoom-through` | Gradient mesh | Spotlight vignette |
| **Techy / Futuristic** | `reveal-blur` | `slide-left` | Scanline overlay | Neon glow on text |
| **Playful / Friendly** | `reveal-up` (bouncy easing) | crossfade | Pastel gradient | Slight card rotation |
| **Professional / Clean** | `reveal-up` (fast, 0.3s) | crossfade | Solid or subtle grid | Thin borders |
| **Calm / Minimal** | `reveal-up` (very slow, 0.8s) | crossfade (slow) | Solid muted color | High whitespace |
| **Editorial / Literary** | `reveal-left` | crossfade | Paper texture | Drop caps |
| **Intense / Immersive** | `reveal-up` (stagger 0.2s) | crossfade | 3 animated glow orbs | Gradient text + breathing |

---

## Entrance Animations

Elements with `.reveal` class start hidden and animate in when the slide becomes active (the `.visible` class is added by `triggerEntrance()`).

### reveal-up (default)

```css
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1.2s var(--ease-out-expo),
                transform 1.2s var(--ease-out-expo);
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### reveal-scale

```css
.reveal-scale {
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 1.6s var(--ease-out-expo),
                transform 1.6s var(--ease-out-expo);
}
.reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
}
```

### reveal-left / reveal-right

```css
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 1.2s var(--ease-out-expo),
                transform 1.2s var(--ease-out-expo);
}
.reveal-left.visible {
    opacity: 1;
    transform: translateX(0);
}

.reveal-right {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 1.2s var(--ease-out-expo),
                transform 1.2s var(--ease-out-expo);
}
.reveal-right.visible {
    opacity: 1;
    transform: translateX(0);
}
```

### reveal-blur

```css
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 1.2s var(--ease-out-expo),
                filter 1.2s var(--ease-out-expo);
}
.reveal-blur.visible {
    opacity: 1;
    filter: blur(0);
}
```

### Stagger Pattern

Use `transition-delay` on children for sequential reveal:

```css
.reveal:nth-child(1) { transition-delay: 0s; }
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }
.reveal:nth-child(5) { transition-delay: 0.4s; }
.reveal:nth-child(6) { transition-delay: 0.5s; }
```

Or use the `triggerEntrance()` function from [slide-engine.md](slide-engine.md) which sets delays dynamically.

---

## Slide Transition Fallbacks

These CSS transitions are used when slides have no `data-magic-id` matches (Magic Move returns false).

### crossfade (default)

Handled in JS by the `SlidePresentation.goToSlide()` method — opacity swap over 400ms.

### slide-left / slide-right

```css
.slide.slide-enter-left {
    display: flex;
    transform: translateX(100%);
    animation: slideInLeft 0.5s var(--ease-out-expo) forwards;
}
.slide.slide-exit-left {
    animation: slideOutLeft 0.5s var(--ease-out-expo) forwards;
}

@keyframes slideInLeft {
    to { transform: translateX(0); }
}
@keyframes slideOutLeft {
    to { transform: translateX(-100%); }
}
```

### zoom-through

```css
.slide.zoom-enter {
    display: flex;
    opacity: 0;
    transform: scale(0.8);
    animation: zoomIn 0.6s var(--ease-out-expo) forwards;
}
.slide.zoom-exit {
    animation: zoomOut 0.4s ease forwards;
}

@keyframes zoomIn {
    to { opacity: 1; transform: scale(1); }
}
@keyframes zoomOut {
    to { opacity: 0; transform: scale(1.1); }
}
```

---

## Background Effects

### Gradient Mesh

Layered radial gradients for depth and atmosphere:

```css
.slide.gradient-mesh {
    background:
        radial-gradient(ellipse at 20% 50%, var(--accent-glow) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(120, 80, 200, 0.08) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 80%, rgba(60, 150, 200, 0.06) 0%, transparent 45%),
        var(--bg-primary);
}
```

### Noise Texture

Subtle grain via inline SVG for tactile feel:

```css
.slide.noise::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.03;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### Grid Pattern

Subtle structural lines for Swiss/Bauhaus-inspired presets:

```css
.slide.grid-bg {
    background-image:
        linear-gradient(var(--text-secondary) 1px, transparent 1px),
        linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px);
    background-size: 60px 60px;
    background-position: center center;
    background-blend-mode: overlay;
    /* Apply low opacity so it's subtle */
}
.slide.grid-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    opacity: 0.05;
    pointer-events: none;
}
```

### Scanline Overlay

For cyberpunk/tech presets:

```css
.slide.scanlines::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
    );
}
```

### Ink Wash

Soft radial gradients simulating Chinese ink diffusion:

```css
.slide.ink-wash {
    background:
        radial-gradient(ellipse at 30% 60%, rgba(200, 180, 150, 0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 30%, rgba(180, 160, 130, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 90%, rgba(160, 140, 110, 0.04) 0%, transparent 40%),
        var(--bg-primary);
}
```

---

## Interactive Effects

Use sparingly. Only add when the preset calls for it.

### Neon Glow on Headings

```css
.neon-text {
    text-shadow:
        0 0 10px var(--accent-glow),
        0 0 20px var(--accent-glow),
        0 0 40px var(--accent-glow);
}
```

### 3D Tilt on Hover (for cards)

```javascript
class TiltEffect {
    constructor(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.style.transition = 'transform 0.3s ease';
            el.style.transformStyle = 'preserve-3d';
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
            });
        });
    }
}
```

### Counter Animation (for numbers)

```javascript
function animateCounter(el, target, duration = 1000) {
    const start = parseInt(el.textContent) || 0;
    const startTime = performance.now();
    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out-cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
```

---

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| Fonts not loading | Missing `&display=swap` or wrong family name | Check Google Fonts URL, verify family names |
| Animations not firing | `.visible` class not added | Ensure `triggerEntrance()` is called after slide becomes active |
| Magic Move jumpy | Too many elements animating | Reduce to 3-4 `data-magic-id` elements per transition |
| Text blurry during Magic Move | Using `transform: scale()` on text | Use font-size interpolation instead (handled by MagicMoveController) |
| Layout broken on mobile | Missing responsive breakpoints | Include full base-styles.md CSS with media queries |
| CJK text cramped | `line-height` too low | Set `line-height: 1.8` for CJK body text |
| Performance lag | Too many gradients or filters | Reduce background layers, avoid `filter: blur()` on large elements |
