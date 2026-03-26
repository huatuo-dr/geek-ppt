# Slide Engine

The complete HTML template architecture including the JavaScript slide controller and Magic Move implementation.

---

## HTML Structure

Every generated presentation follows this structure:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentation Title</title>

    <!-- Google Fonts (CJK + Latin) -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap">

    <style>
        /* === CSS CUSTOM PROPERTIES (from preset) === */
        /* === BASE STYLES (from base-styles.md — include in FULL) === */
        /* === CJK TYPOGRAPHY (if CJK language) === */
        /* === PRESET-SPECIFIC STYLES === */
        /* === ANIMATION STYLES (from animation-catalog.md) === */
    </style>
</head>
<body>
    <!-- Navigation bar: prev button + progress bar + next button -->
    <div class="nav-controls">
        <button class="nav-btn" id="prevBtn" aria-label="Previous slide">&#9664;</button>
        <div class="nav-progress-track">
            <div class="nav-progress-fill" id="progressBar"></div>
        </div>
        <button class="nav-btn" id="nextBtn" aria-label="Next slide">&#9654;</button>
    </div>

    <!-- Slide counter -->
    <div class="nav-slide-counter" id="slideCounter">1 / N</div>

    <!-- Navigation dots (right side) -->
    <nav class="nav-dots" id="navDots"></nav>

    <!-- Slides -->
    <section class="slide active" id="slide-0">
        <div class="slide-content layout-center">
            <!-- slide content here -->
        </div>
    </section>

    <section class="slide" id="slide-1">
        <div class="slide-content layout-split">
            <!-- slide content here -->
        </div>
    </section>

    <!-- ... more slides ... -->

    <script>
        /* === MAGIC MOVE CONTROLLER === */
        /* === SLIDE PRESENTATION CONTROLLER === */
    </script>
</body>
</html>
```

### Key Rules

- Set `<html lang="zh">` for Chinese, `lang="en"` for English, `lang="zh"` for Mixed (CJK takes priority)
- The **first slide** gets the `active` class
- Each slide has an `id="slide-N"` (zero-indexed)
- Layout class goes on `.slide-content`, not on `.slide`
- All CSS and JS are inline — no external files

---

## SlidePresentation Class

The main controller for navigation and coordination. Copy this into every presentation's `<script>` block.

```javascript
/* === SLIDE PRESENTATION CONTROLLER === */
class SlidePresentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.magic = new MagicMoveController();

        this.setupKeyboardNav();
        this.setupTouchNav();
        this.setupNavDots();
        this.setupNavButtons();
        this.updateProgressBar();
        this.updateNavButtons();
        this.updateSlideCounter();
    }

    goToSlide(index) {
        if (index < 0 || index >= this.totalSlides) return;
        if (index === this.currentIndex) return;
        if (this.isAnimating) return;

        this.isAnimating = true;
        const fromSlide = this.slides[this.currentIndex];
        const toSlide = this.slides[index];
        const direction = index > this.currentIndex ? 1 : -1;

        // Attempt Magic Move; fall back to crossfade
        const hasMagic = this.magic.transition(fromSlide, toSlide, direction, () => {
            this.isAnimating = false;
        });

        if (!hasMagic) {
            // Simple crossfade fallback
            toSlide.classList.add('active');
            toSlide.style.opacity = '0';
            requestAnimationFrame(() => {
                toSlide.style.transition = 'opacity 0.4s ease';
                toSlide.style.opacity = '1';
                fromSlide.style.transition = 'opacity 0.3s ease';
                fromSlide.style.opacity = '0';
                setTimeout(() => {
                    fromSlide.classList.remove('active');
                    fromSlide.style.opacity = '';
                    fromSlide.style.transition = '';
                    toSlide.style.transition = '';
                    this.isAnimating = false;
                }, 400);
            });
        }

        this.currentIndex = index;
        this.updateNavDots();
        this.updateNavButtons();
        this.updateSlideCounter();
        this.updateProgressBar();
    }

    next() { this.goToSlide(this.currentIndex + 1); }
    prev() { this.goToSlide(this.currentIndex - 1); }

    setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.next();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });
    }

    setupTouchNav() {
        let startX = 0;
        let startY = 0;
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        document.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            // Require minimum 50px swipe and more horizontal/vertical intent
            if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
                if (dy < 0) this.next();
                else this.prev();
            } else if (Math.abs(dx) > 50) {
                if (dx < 0) this.next();
                else this.prev();
            }
        }, { passive: true });
    }

    setupNavDots() {
        const container = document.getElementById('navDots');
        if (!container) return;
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            container.appendChild(dot);
        }
    }

    updateNavDots() {
        const dots = document.querySelectorAll('.nav-dots .dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    setupNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
    }

    updateSlideCounter() {
        const counter = document.getElementById('slideCounter');
        if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
    }

    updateProgressBar() {
        const bar = document.getElementById('progressBar');
        if (!bar) return;
        const pct = ((this.currentIndex + 1) / this.totalSlides) * 100;
        bar.style.width = pct + '%';
    }
}
```

---

## MagicMoveController Class

The FLIP-based transition engine. This is the distinctive feature of geek-slides.

```javascript
/* === MAGIC MOVE CONTROLLER === */
class MagicMoveController {
    constructor(duration = 500) {
        this.duration = duration;
        this.easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
    }

    /**
     * Perform Magic Move transition between two slides.
     * Returns true if magic-id matches were found, false otherwise (use fallback).
     * Calls onComplete when animation finishes.
     */
    transition(fromSlide, toSlide, direction, onComplete) {
        const fromEls = fromSlide.querySelectorAll('[data-magic-id]');
        const toEls = toSlide.querySelectorAll('[data-magic-id]');

        if (fromEls.length === 0 && toEls.length === 0) {
            return false; // no magic elements, use fallback
        }

        // FIRST: capture outgoing element states
        const firstMap = new Map();
        fromEls.forEach(el => {
            const id = el.dataset.magicId;
            const rect = el.getBoundingClientRect();
            const styles = getComputedStyle(el);
            firstMap.set(id, {
                el,
                rect,
                bg: styles.backgroundColor,
                color: styles.color,
                fontSize: parseFloat(styles.fontSize),
                borderRadius: styles.borderRadius,
                opacity: parseFloat(styles.opacity) || 1,
            });
        });

        // LAST: show target slide and capture incoming element states
        toSlide.classList.add('active');
        const lastMap = new Map();
        toEls.forEach(el => {
            const id = el.dataset.magicId;
            const rect = el.getBoundingClientRect();
            const styles = getComputedStyle(el);
            lastMap.set(id, {
                el,
                rect,
                bg: styles.backgroundColor,
                color: styles.color,
                fontSize: parseFloat(styles.fontSize),
                borderRadius: styles.borderRadius,
                opacity: parseFloat(styles.opacity) || 1,
            });
        });

        // MATCH: find paired elements
        const matched = new Set();
        firstMap.forEach((_, id) => {
            if (lastMap.has(id)) matched.add(id);
        });

        // Hide real elements during animation
        matched.forEach(id => {
            firstMap.get(id).el.style.visibility = 'hidden';
            lastMap.get(id).el.style.visibility = 'hidden';
        });

        // Hide from-slide content (except magic clones will be visible)
        fromSlide.classList.remove('active');

        const clones = [];
        const dur = this.duration;
        const ease = this.easing;

        // INVERT + PLAY: animate matched pairs
        matched.forEach(id => {
            const first = firstMap.get(id);
            const last = lastMap.get(id);
            const isText = this.isTextElement(first.el);

            // Create clone at FIRST position
            const clone = document.createElement('div');
            clone.className = 'magic-clone';
            clone.innerHTML = first.el.innerHTML;

            // Copy computed styles to clone
            Object.assign(clone.style, {
                position: 'fixed',
                left: first.rect.left + 'px',
                top: first.rect.top + 'px',
                width: first.rect.width + 'px',
                height: first.rect.height + 'px',
                backgroundColor: first.bg,
                color: first.color,
                fontSize: first.fontSize + 'px',
                borderRadius: first.borderRadius,
                fontFamily: getComputedStyle(first.el).fontFamily,
                fontWeight: getComputedStyle(first.el).fontWeight,
                display: 'flex',
                alignItems: getComputedStyle(first.el).alignItems || 'start',
                justifyContent: getComputedStyle(first.el).justifyContent || 'start',
                overflow: 'hidden',
                lineHeight: getComputedStyle(first.el).lineHeight,
                letterSpacing: getComputedStyle(first.el).letterSpacing,
                padding: getComputedStyle(first.el).padding,
            });

            document.body.appendChild(clone);
            clones.push(clone);

            // Force reflow
            clone.getBoundingClientRect();

            // Build transition properties
            const transProps = [
                `left ${dur}ms ${ease}`,
                `top ${dur}ms ${ease}`,
                `width ${dur}ms ${ease}`,
                `height ${dur}ms ${ease}`,
                `background-color ${dur}ms ${ease}`,
                `color ${dur}ms ${ease}`,
                `border-radius ${dur}ms ${ease}`,
            ];

            // Text elements: animate font-size directly (avoid scale blur)
            if (isText) {
                transProps.push(`font-size ${dur}ms ${ease}`);
            }

            clone.style.transition = transProps.join(', ');

            // PLAY: animate to LAST position
            requestAnimationFrame(() => {
                clone.style.left = last.rect.left + 'px';
                clone.style.top = last.rect.top + 'px';
                clone.style.width = last.rect.width + 'px';
                clone.style.height = last.rect.height + 'px';
                clone.style.backgroundColor = last.bg;
                clone.style.color = last.color;
                clone.style.borderRadius = last.borderRadius;
                if (isText) {
                    clone.style.fontSize = last.fontSize + 'px';
                }
                // Update text content to target
                clone.innerHTML = last.el.innerHTML;
            });
        });

        // FADE: unmatched elements
        // Fade out unmatched FROM elements (clone and fade)
        firstMap.forEach((first, id) => {
            if (matched.has(id)) return;
            const ghost = document.createElement('div');
            ghost.className = 'magic-clone';
            ghost.innerHTML = first.el.innerHTML;
            Object.assign(ghost.style, {
                position: 'fixed',
                left: first.rect.left + 'px',
                top: first.rect.top + 'px',
                width: first.rect.width + 'px',
                height: first.rect.height + 'px',
                opacity: '1',
                transition: `opacity ${dur * 0.6}ms ease`,
                overflow: 'hidden',
                color: first.color,
                fontSize: first.fontSize + 'px',
                fontFamily: getComputedStyle(first.el).fontFamily,
            });
            document.body.appendChild(ghost);
            clones.push(ghost);
            requestAnimationFrame(() => { ghost.style.opacity = '0'; });
        });

        // Fade in unmatched TO elements
        lastMap.forEach((last, id) => {
            if (matched.has(id)) return;
            last.el.style.opacity = '0';
            last.el.style.transition = `opacity ${dur * 0.6}ms ease ${dur * 0.3}ms`;
            requestAnimationFrame(() => { last.el.style.opacity = '1'; });
        });

        // CLEANUP after animation
        setTimeout(() => {
            // Remove clones
            clones.forEach(c => c.remove());

            // Restore visibility of real elements
            matched.forEach(id => {
                lastMap.get(id).el.style.visibility = '';
            });

            // Clean up fade-in transitions
            lastMap.forEach((last, id) => {
                if (!matched.has(id)) {
                    last.el.style.transition = '';
                    last.el.style.opacity = '';
                }
            });

            if (onComplete) onComplete();
        }, dur + 50);

        return true;
    }

    isTextElement(el) {
        const tag = el.tagName.toLowerCase();
        return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'blockquote'].includes(tag);
    }
}
```

---

## Entrance Animation Trigger

Since geek-slides uses discrete slide switching (not scroll), entrance animations are triggered when a slide becomes active. Add this to the `goToSlide` method or as a separate initializer:

```javascript
// Call after slide becomes active
function triggerEntrance(slide) {
    const reveals = slide.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.1) + 's';
        // Force initial state
        el.classList.remove('visible');
        void el.offsetHeight; // trigger reflow
        el.classList.add('visible');
    });
}
```

Integrate into `SlidePresentation.goToSlide()` — call `triggerEntrance(toSlide)` after the slide becomes active and the magic move or crossfade completes.

---

## Image Embedding

When the user provides local images, embed them as base64 data URIs:

```html
<img src="data:image/png;base64,iVBORw0KGgo..." alt="Description of image">
<img src="data:image/jpeg;base64,/9j/4AAQ..." alt="Description of image">
<img src="data:image/svg+xml;base64,PHN2Zy..." alt="Description of image">
```

### Size Guidelines

| Image Size (original) | Action |
|------------------------|--------|
| < 200KB | Embed directly |
| 200KB - 500KB | Embed with warning to user |
| > 500KB | Warn user, suggest resizing before embedding |

### Encoding Command

```bash
base64 -w0 path/to/image.png
```

The `-w0` flag prevents line wrapping in the base64 output.

### MIME Types

| Extension | MIME Type |
|-----------|----------|
| .png | `image/png` |
| .jpg / .jpeg | `image/jpeg` |
| .gif | `image/gif` |
| .svg | `image/svg+xml` |
| .webp | `image/webp` |

---

## Code Quality Standards

### Comments

Every section in the generated HTML must have a clear comment:

```css
/* === CUSTOM PROPERTIES === */
/* === BASE STYLES === */
/* === PRESET: Ink Wash === */
/* === ANIMATIONS === */
/* === RESPONSIVE === */
```

```javascript
/* === MAGIC MOVE CONTROLLER === */
/* === SLIDE PRESENTATION CONTROLLER === */
```

### Accessibility

- **Keyboard navigation** — Arrow keys, Space, Page Up/Down, Home/End
- **ARIA labels** — nav dots have `aria-label="Go to slide N"`
- **Focus management** — focus visible on interactive elements
- **`prefers-reduced-motion`** — Magic Move disabled, instant slide switching
- **Semantic HTML** — `<section>`, `<nav>`, proper heading hierarchy
- **Alt text** — every `<img>` must have descriptive `alt` attribute

### Performance

- Use `will-change: transform, opacity` only on `.magic-clone` during animation
- Remove clones immediately after animation completes
- Limit Google Font families to ≤ 4 per presentation
- Avoid `filter: blur()` on large elements (causes GPU memory spikes)
