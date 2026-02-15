/**
 * TorrentRenderer CSS — "激流" style
 * Features:
 *  - Frosted glass background with 3 animated neon glow orbs
 *  - H1-H3 share H1 size, H4-H6 share H2 size
 *  - Gradient headings with H1 breathing animation
 *  - Line-by-line entrance animation
 *  - 1.5x base font size compared to Cool renderer
 */
export function getTorrentStyles(): string {
  return `
/* ================================================================
   Base container
   ================================================================ */
.torrent-slide {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #ffffff;
  background: #07060d;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ================================================================
   Animated glow orbs — 3 light sources with bouncing paths
   ================================================================ */
.torrent-slide .torrent-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  will-change: transform;
  z-index: 0;
}
/* Orb 1: Indigo / Purple */
.torrent-slide .torrent-orb-1 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(129,90,246,0.45) 0%, transparent 70%);
  animation: torrentOrb1 18s ease-in-out infinite;
}
/* Orb 2: Cyan / Teal */
.torrent-slide .torrent-orb-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%);
  animation: torrentOrb2 23s ease-in-out infinite;
}
/* Orb 3: Pink / Magenta */
.torrent-slide .torrent-orb-3 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%);
  animation: torrentOrb3 15s ease-in-out infinite;
}

@keyframes torrentOrb1 {
  0%   { transform: translate(-15%, -15%) scale(1); }
  25%  { transform: translate(55%, 15%) scale(1.35); }
  50%  { transform: translate(25%, 65%) scale(0.8); }
  75%  { transform: translate(-10%, 40%) scale(1.2); }
  100% { transform: translate(-15%, -15%) scale(1); }
}
@keyframes torrentOrb2 {
  0%   { transform: translate(75%, 65%) scale(1.1); }
  25%  { transform: translate(5%, 25%) scale(0.7); }
  50%  { transform: translate(55%, -10%) scale(1.3); }
  75%  { transform: translate(65%, 50%) scale(0.85); }
  100% { transform: translate(75%, 65%) scale(1.1); }
}
@keyframes torrentOrb3 {
  0%   { transform: translate(40%, 80%) scale(0.9); }
  25%  { transform: translate(-20%, 15%) scale(1.4); }
  50%  { transform: translate(65%, -20%) scale(1.05); }
  75%  { transform: translate(15%, 55%) scale(1.3); }
  100% { transform: translate(40%, 80%) scale(0.9); }
}

/* ================================================================
   Scroll layer — above orbs, handles overflow
   ================================================================ */
.torrent-slide > .torrent-scroll {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ================================================================
   Content container — glass card, 1.5x base font
   ================================================================ */
.torrent-scroll > .torrent-content {
  position: relative;
  z-index: 1;
  max-width: 88%;
  width: 88%;
  text-align: center;
  backdrop-filter: blur(18px);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 52px 60px;
  line-height: 1.8;
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  flex-shrink: 0;
}

/* ================================================================
   Line-by-line entrance animation
   ================================================================ */
.torrent-content > * {
  --d: 0s;
  opacity: 0;
  animation: torrentLineIn 0.5s ease var(--d) both;
}
.torrent-content > *:nth-child(1)  { --d: 0.2s; }
.torrent-content > *:nth-child(2)  { --d: 0.4s; }
.torrent-content > *:nth-child(3)  { --d: 0.6s; }
.torrent-content > *:nth-child(4)  { --d: 0.8s; }
.torrent-content > *:nth-child(5)  { --d: 1.0s; }
.torrent-content > *:nth-child(6)  { --d: 1.2s; }
.torrent-content > *:nth-child(7)  { --d: 1.4s; }
.torrent-content > *:nth-child(8)  { --d: 1.6s; }
.torrent-content > *:nth-child(9)  { --d: 1.8s; }
.torrent-content > *:nth-child(10) { --d: 2.0s; }
.torrent-content > *:nth-child(11) { --d: 2.2s; }
.torrent-content > *:nth-child(12) { --d: 2.4s; }
.torrent-content > *:nth-child(n+13) { --d: 2.6s; }

@keyframes torrentLineIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ================================================================
   Headings — H1-H3 share H1 size, H4-H6 share H2 size
   ================================================================ */
/* Size groups */
.torrent-slide h1,
.torrent-slide h2,
.torrent-slide h3 {
  font-size: 3em; font-weight: 800; margin: 0 0 0.3em;
}
.torrent-slide h4,
.torrent-slide h5,
.torrent-slide h6 {
  font-size: 2.2em; font-weight: 700; margin: 0.3em 0 0.2em;
}

/* H1: Yellow-red gradient + breathing scale (10%) */
.torrent-slide h1 {
  background: linear-gradient(90deg, #fbbf24, #ef4444);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: torrentLineIn 0.5s ease var(--d) both, torrentBreath 3s ease-in-out calc(var(--d) + 0.5s) infinite;
}
/* H2: Blue-purple gradient */
.torrent-slide h2 {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* H3: Green-pink gradient */
.torrent-slide h3 {
  background: linear-gradient(90deg, #22c55e, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* H4: Yellow-red gradient (same color as H1, H2 size) */
.torrent-slide h4 {
  background: linear-gradient(90deg, #fbbf24, #ef4444);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* H5: Blue-purple gradient (same color as H2, H2 size) */
.torrent-slide h5 {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* H6: White solid */
.torrent-slide h6 { color: #ffffff; }

@keyframes torrentBreath {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.1); }
}

/* ================================================================
   Inline text styles
   ================================================================ */
.torrent-slide p { margin: 0.5em 0; }

/* Bold: inherit parent + yellow with neon glow */
.torrent-slide strong {
  color: #fbbf24;
  -webkit-text-fill-color: #fbbf24;
  text-shadow: 0 0 10px rgba(251,191,36,0.5), 0 0 28px rgba(251,191,36,0.2);
}
/* Italic: inherit parent + 50% opacity */
.torrent-slide em {
  font-style: italic;
  opacity: 0.5;
}
/* Strikethrough: inherit parent + line-through */
.torrent-slide del {
  text-decoration: line-through;
}

/* ================================================================
   Links
   ================================================================ */
.torrent-slide a { color: #67e8f9; text-decoration: none; border-bottom: 1px solid rgba(103,232,249,0.4); transition: all 0.2s; }
.torrent-slide a:hover { text-shadow: 0 0 10px rgba(103,232,249,0.6); border-bottom-color: #67e8f9; }

/* ================================================================
   Images
   ================================================================ */
.torrent-slide img { display: block; max-width: 70%; margin: 1.2em auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
.torrent-slide img:hover { transform: scale(1.02); transition: transform 0.3s ease; }

/* ================================================================
   Inline code
   ================================================================ */
.torrent-slide code { background: rgba(99,102,241,0.15); padding: 2px 8px; border-radius: 4px; font-size: 0.9em; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(99,102,241,0.3); }

/* ================================================================
   Code blocks (Shiki + fallback)
   ================================================================ */
.torrent-slide pre.shiki { backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 1em 0; text-align: left; }
.torrent-slide pre.shiki span { color: var(--shiki-dark) !important; background-color: transparent !important; }
.torrent-slide pre.shiki { background-color: var(--shiki-dark-bg, rgba(0,0,0,0.4)) !important; }
.torrent-slide pre:not(.shiki) { background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 1em 0; text-align: left; }
.torrent-slide pre code { background: none; border: none; padding: 0; font-size: 0.85em; }

/* ================================================================
   Blockquote
   ================================================================ */
.torrent-slide blockquote { border-left: 4px solid; border-image: linear-gradient(to bottom, #fbbf24, #ef4444) 1; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px); margin: 1em 0; padding: 12px 24px; text-align: left; border-radius: 0 8px 8px 0; }

/* ================================================================
   Lists
   ================================================================ */
.torrent-slide ul { list-style: none; padding-left: 1.2em; margin: 0.5em 0; text-align: left; }
.torrent-slide ul li::before { content: '●'; background: linear-gradient(90deg, #fbbf24, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-right: 8px; font-size: 0.7em; }
.torrent-slide ol { list-style: none; padding-left: 1.2em; margin: 0.5em 0; counter-reset: torrent-counter; text-align: left; }
.torrent-slide ol li { counter-increment: torrent-counter; }
.torrent-slide ol li::before { content: counter(torrent-counter); color: #fbbf24; font-weight: 700; margin-right: 10px; font-size: 1.1em; }
.torrent-slide li { margin: 0.35em 0; }
.torrent-slide li input[type="checkbox"] { appearance: none; width: 16px; height: 16px; border: 2px solid #fbbf24; border-radius: 3px; margin-right: 8px; vertical-align: middle; position: relative; }
.torrent-slide li input[type="checkbox"]:checked { background: #fbbf24; }
.torrent-slide li input[type="checkbox"]:checked::after { content: '\\2713'; color: #000; font-size: 11px; position: absolute; top: -1px; left: 2px; }

/* ================================================================
   Table
   ================================================================ */
.torrent-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; text-align: left; }
.torrent-slide th { background: linear-gradient(90deg, rgba(251,191,36,0.2), rgba(239,68,68,0.2)); font-weight: 600; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.08); color: #fbbf24; }
.torrent-slide td { padding: 10px 14px; border: 1px solid rgba(255,255,255,0.06); }
.torrent-slide tr:hover { background: rgba(255,255,255,0.04); }

/* ================================================================
   Thematic break
   ================================================================ */
.torrent-slide hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, #fbbf24, #ef4444, transparent); margin: 2em 0; width: 100%; }

/* ================================================================
   Merged line container (consecutive lines without blank line)
   ================================================================ */
.torrent-slide .torrent-line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.4em;
  margin: 0.3em 0;
  justify-content: center;
}
/* Inline heading spans — same visual as block headings */
.torrent-slide .th1,
.torrent-slide .th2,
.torrent-slide .th3 { font-size: 3em; font-weight: 800; }
.torrent-slide .th4,
.torrent-slide .th5,
.torrent-slide .th6 { font-size: 2.2em; font-weight: 700; }
.torrent-slide .th1 {
  background: linear-gradient(90deg, #fbbf24, #ef4444);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: torrentBreath 3s ease-in-out infinite;
}
.torrent-slide .th2 {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.torrent-slide .th3 {
  background: linear-gradient(90deg, #22c55e, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.torrent-slide .th4 {
  background: linear-gradient(90deg, #fbbf24, #ef4444);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.torrent-slide .th5 {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.torrent-slide .th6 { color: #ffffff; }

/* Inline strong/em/del inside merged lines */
.torrent-slide .torrent-line strong {
  color: #fbbf24; -webkit-text-fill-color: #fbbf24;
  text-shadow: 0 0 10px rgba(251,191,36,0.5), 0 0 28px rgba(251,191,36,0.2);
}
.torrent-slide .torrent-line em  { font-style: italic; opacity: 0.5; }
.torrent-slide .torrent-line del { text-decoration: line-through; }
.torrent-slide .torrent-line code { background: rgba(99,102,241,0.15); padding: 2px 8px; border-radius: 4px; font-size: 0.9em; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(99,102,241,0.3); }
.torrent-slide .torrent-line a { color: #67e8f9; text-decoration: none; border-bottom: 1px solid rgba(103,232,249,0.4); }

/* ================================================================
   Mermaid
   ================================================================ */
.torrent-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.torrent-slide .mermaid-container svg { max-width: 100%; height: auto; }
.torrent-slide .mermaid-error { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; border-radius: 8px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}

export function getTorrentWrapperClass(): string {
  return "torrent-slide";
}

/** Build the inner HTML structure for torrent renderer (orbs + scroll + content) */
export function getTorrentInnerHtml(rawHtml: string): string {
  return [
    '<div class="torrent-orb torrent-orb-1"></div>',
    '<div class="torrent-orb torrent-orb-2"></div>',
    '<div class="torrent-orb torrent-orb-3"></div>',
    '<div class="torrent-scroll"><div class="torrent-content">',
    rawHtml,
    "</div></div>",
  ].join("");
}

// ---------------------------------------------------------------------------
// Markdown pre-processor — merge consecutive lines without blank line
// ---------------------------------------------------------------------------

/** Check if a line is block-level markdown syntax (should not be merged) */
function isBlockSyntax(line: string): boolean {
  const t = line.trim();
  return (
    t.startsWith("```") ||
    t.startsWith("> ") ||
    t.startsWith("- ") ||
    t.startsWith("* ") && !t.startsWith("**") ||
    t.startsWith("+ ") ||
    /^\d+\.\s/.test(t) ||
    t.startsWith("| ") ||
    /^[-*_]{3,}\s*$/.test(t) ||
    t.startsWith("<")
  );
}

/** Minimal inline markdown → HTML (for merged-line spans) */
function processInline(text: string): string {
  let r = text;
  // Bold: **text**
  r = r.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  r = r.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Strikethrough: ~~text~~
  r = r.replace(/~~(.+?)~~/g, "<del>$1</del>");
  // Inline code: `text`
  r = r.replace(/`(.+?)`/g, "<code>$1</code>");
  // Links: [text](url)
  r = r.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return r;
}

/**
 * Pre-process markdown for the torrent renderer:
 * consecutive lines NOT separated by a blank line are merged into a single visual line.
 * Block-level syntax (code fences, lists, tables, etc.) is left untouched.
 */
export function torrentPreprocess(markdown: string): string {
  // 1. Protect fenced code blocks from being split
  const codeBlocks: string[] = [];
  let safeMarkdown = markdown.replace(/```[\s\S]*?```/g, (match) => {
    const idx = codeBlocks.length;
    codeBlocks.push(match);
    return `\n\n__TORRENT_CODE_${idx}__\n\n`;
  });

  // 2. Split by blank lines into groups
  const groups = safeMarkdown.split(/\n(?:\s*\n)+/);

  const result = groups
    .map((group) => {
      const lines = group.split("\n").filter((l) => l.trim() !== "");

      // Single line — keep as standard markdown
      if (lines.length <= 1) return group;

      // If any line is block syntax, keep the whole group as-is
      const hasBlock = lines.some((l) => isBlockSyntax(l));
      if (hasBlock) return group;

      // Merge into one visual line
      const spans = lines.map((line) => {
        const hMatch = line.trim().match(/^(#{1,6})\s+(.+)$/);
        if (hMatch) {
          const level = hMatch[1]!.length;
          return `<span class="th${level}">${processInline(hMatch[2]!)}</span>`;
        }
        return `<span>${processInline(line.trim())}</span>`;
      });

      return `<div class="torrent-line">${spans.join(" ")}</div>`;
    })
    .join("\n\n");

  // 3. Restore code blocks
  return result.replace(/__TORRENT_CODE_(\d+)__/g, (_match, idx: string) => {
    return codeBlocks[parseInt(idx)] ?? "";
  });
}
