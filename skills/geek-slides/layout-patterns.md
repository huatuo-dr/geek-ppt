# Layout Patterns

Concrete HTML+CSS recipes for each layout type. Use these as templates when generating slides in Phase 3.

---

## Layout Selection Guide

| Content Type | Layout | Why |
|-------------|--------|-----|
| Title, key message, quote | `layout-center` | Focused, high-impact |
| Image + text explanation | `layout-split` | Natural reading flow |
| Feature list, team, options | `layout-grid` | Equal-weight items |
| Process, history, steps | `layout-timeline` | Sequential progression |
| Story, editorial, mixed media | `layout-magazine` | Visual hierarchy |
| Before/After, A vs B | `layout-comparison` | Direct contrast |

**Rule:** Never use the same layout for more than 3 consecutive slides. Variety keeps the audience engaged.

---

## Center Layout

The default. Single column, vertically and horizontally centered. Best for title slides, key messages, and quotes.

```html
<section class="slide" id="slide-0">
    <div class="slide-content layout-center">
        <h1 class="reveal" data-magic-id="title">Presentation Title</h1>
        <p class="reveal">Subtitle or tagline goes here</p>
        <small class="reveal">Author Name — Date</small>
    </div>
</section>
```

### Variations

**Quote slide:**
```html
<div class="slide-content layout-center">
    <blockquote class="reveal" style="max-width: min(80vw, 700px); font-size: var(--h2-size);">
        "The best way to predict the future is to invent it."
    </blockquote>
    <cite class="reveal" style="color: var(--text-secondary);">— Alan Kay</cite>
</div>
```

**Big number / stat:**
```html
<div class="slide-content layout-center">
    <div class="reveal" data-magic-id="big-number"
         style="font-size: clamp(3rem, 12vw, 10rem); font-weight: 900; color: var(--accent);">
        87%
    </div>
    <p class="reveal">of users reported improved productivity</p>
</div>
```

---

## Split Layout

Two columns. Ideal for image + text, code + explanation, or diagram + description.

```html
<section class="slide" id="slide-1">
    <div class="slide-content layout-split">
        <div class="split-left">
            <h2 class="reveal">Section Title</h2>
            <p class="reveal">Explanation text goes here. Keep it concise.</p>
            <ul>
                <li class="reveal">Key point one</li>
                <li class="reveal">Key point two</li>
                <li class="reveal">Key point three</li>
            </ul>
        </div>
        <div class="split-right">
            <img class="reveal-scale" src="data:image/png;base64,..."
                 alt="Descriptive alt text">
        </div>
    </div>
</section>
```

### Ratio Variations

```html
<!-- 60/40 split — larger text area -->
<div class="slide-content layout-split ratio-60-40">

<!-- 40/60 split — larger image area -->
<div class="slide-content layout-split ratio-40-60">
```

### Magic Move Tip

Use the same `data-magic-id` on an element that moves from the left panel to a full-width position on the next slide:

```html
<!-- Slide 3: split layout -->
<img data-magic-id="hero" src="..." style="max-height: 40vh;">

<!-- Slide 4: center layout, image expanded -->
<img data-magic-id="hero" src="..." style="max-height: 70vh;">
```

---

## Grid Layout

Card-based grid. Best for features, team members, options, or any equal-weight items.

```html
<section class="slide" id="slide-2">
    <div class="slide-content">
        <h2 class="reveal" style="text-align: center; margin-bottom: var(--content-gap);">
            Key Features
        </h2>
        <div class="layout-grid cols-3">
            <div class="card reveal" data-magic-id="card-1">
                <h3>Feature One</h3>
                <p>Brief description of this feature.</p>
            </div>
            <div class="card reveal" data-magic-id="card-2">
                <h3>Feature Two</h3>
                <p>Brief description of this feature.</p>
            </div>
            <div class="card reveal" data-magic-id="card-3">
                <h3>Feature Three</h3>
                <p>Brief description of this feature.</p>
            </div>
        </div>
    </div>
</section>
```

### Grid Options

- `cols-2` — 2 columns (good for 2 or 4 items)
- `cols-3` — 3 columns (good for 3 or 6 items)
- At `max-width: 768px`, `cols-3` collapses to single column
- At `max-width: 480px`, `cols-2` also collapses

### Card Styling

Cards inherit from the base `.card` class in base-styles.md. Override per preset:

```css
/* Paper Cut preset: layered shadow cards */
.card {
    background: var(--bg-secondary);
    border-radius: 16px;
    box-shadow:
        0 2px 4px rgba(0,0,0,0.04),
        0 8px 16px rgba(0,0,0,0.06),
        0 16px 32px rgba(0,0,0,0.04);
    transform: rotate(-0.5deg);
}

/* Signal Flare preset: minimal cards */
.card {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
}
```

### Magic Move Tip

Cards with `data-magic-id` can rearrange between slides — for example, 3 cards in a `cols-3` grid on slide A, then one card expanding to full-width on slide B.

---

## Timeline Layout

Vertical timeline with connecting line. Best for processes, history, project phases, or step-by-step flows.

```html
<section class="slide" id="slide-3">
    <div class="slide-content">
        <h2 class="reveal" style="margin-bottom: var(--content-gap);">Our Journey</h2>
        <div class="layout-timeline">
            <div class="timeline-item reveal">
                <h3>2020</h3>
                <p>Founded the company with a bold vision.</p>
            </div>
            <div class="timeline-item reveal">
                <h3>2022</h3>
                <p>Launched our flagship product.</p>
            </div>
            <div class="timeline-item reveal">
                <h3>2024</h3>
                <p>Reached 1 million active users.</p>
            </div>
            <div class="timeline-item reveal">
                <h3>2025</h3>
                <p>Expanding to international markets.</p>
            </div>
        </div>
    </div>
</section>
```

### Styling Notes

- The vertical line and dots are handled by base-styles.md (`::before` pseudo-elements)
- The line color is `var(--accent)` at 40% opacity
- Each dot is 10px solid circle in `var(--accent)`
- Max 4-5 timeline items per slide (content density limit)

---

## Magazine Layout

Asymmetric editorial grid. One large feature area + smaller supporting items. Best for storytelling, mixed media, or visual-heavy slides.

```html
<section class="slide" id="slide-4">
    <div class="slide-content layout-magazine">
        <div class="feature reveal-scale">
            <img src="data:image/png;base64,..." alt="Main visual"
                 style="width: 100%; max-height: min(70vh, 500px); object-fit: cover; border-radius: 12px;">
        </div>
        <div class="sidebar">
            <h2 class="reveal">Article Title</h2>
            <p class="reveal">Supporting text that provides context for the main visual.</p>
            <small class="reveal" style="color: var(--text-secondary);">Photo credit or note</small>
        </div>
    </div>
</section>
```

### Grid Structure

The default magazine layout is `2fr 1fr` (feature takes 2/3, sidebar takes 1/3). Override for different ratios:

```css
/* Equal halves with different vertical arrangement */
.layout-magazine.equal {
    grid-template-columns: 1fr 1fr;
}
```

---

## Comparison Layout

Side-by-side with central divider. Best for before/after, pros/cons, option A vs B, or any direct contrast.

```html
<section class="slide" id="slide-5">
    <div class="slide-content">
        <h2 class="reveal" style="text-align: center; margin-bottom: var(--content-gap);">
            Comparison
        </h2>
        <div class="layout-comparison">
            <div class="option-a reveal-left">
                <h3>Before</h3>
                <ul>
                    <li>Manual process</li>
                    <li>Error-prone</li>
                    <li>Slow iteration</li>
                </ul>
            </div>
            <div class="divider">
                <span>VS</span>
            </div>
            <div class="option-b reveal-right">
                <h3>After</h3>
                <ul>
                    <li>Fully automated</li>
                    <li>99.9% accuracy</li>
                    <li>10x faster</li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

### Divider Styling

The divider line and "VS" badge are handled by base-styles.md. The vertical lines extend above and below the text using `::before` and `::after` pseudo-elements.

On mobile (`max-width: 768px`), the comparison stacks vertically and the divider becomes horizontal.

---

## Responsive Behavior Summary

| Layout | Desktop | Mobile (< 768px) |
|--------|---------|-------------------|
| `layout-center` | Centered | Centered (no change) |
| `layout-split` | Side by side | Stacked vertically |
| `layout-grid cols-3` | 3 columns | Single column |
| `layout-grid cols-2` | 2 columns | Single column (< 480px) |
| `layout-timeline` | Left-aligned with line | Left-aligned (no change) |
| `layout-magazine` | 2fr + 1fr | Stacked vertically |
| `layout-comparison` | Side by side + divider | Stacked + horizontal divider |

---

## Combining Layouts with Magic Move

The most impactful Magic Move transitions happen when elements move between different layouts:

| From | To | Effect |
|------|-----|--------|
| `layout-grid` card | `layout-center` full-width | Card expands to fill the slide |
| `layout-split` image | `layout-center` hero image | Image grows from side panel to center |
| `layout-center` stat | `layout-grid` card | Key number moves into a dashboard card |
| `layout-comparison` option | `layout-center` winner | Chosen option slides to center stage |

Assign the same `data-magic-id` to the element in both slides. The MagicMoveController handles the position/size animation automatically.
