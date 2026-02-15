/** PlainRenderer CSS — full syntax coverage styles */
export function getPlainStyles(): string {
  return `
.plain-slide {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a2e;
  background: #ffffff;
  padding: 48px 64px;
  line-height: 1.7;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.plain-slide h1 { font-size: 2.5em; font-weight: 700; margin: 0 0 0.4em; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.2em; }
.plain-slide h2 { font-size: 2em; font-weight: 700; margin: 0.6em 0 0.3em; border-bottom: 1px solid #eee; padding-bottom: 0.15em; }
.plain-slide h3 { font-size: 1.6em; font-weight: 600; margin: 0.5em 0 0.3em; }
.plain-slide h4 { font-size: 1.3em; font-weight: 600; margin: 0.4em 0 0.2em; }
.plain-slide h5 { font-size: 1.1em; font-weight: 600; margin: 0.3em 0 0.2em; }
.plain-slide h6 { font-size: 1em; font-weight: 600; margin: 0.3em 0 0.2em; color: #555; }
.plain-slide p { margin: 0.6em 0; }
.plain-slide strong { font-weight: 700; }
.plain-slide em { font-style: italic; }
.plain-slide del { text-decoration: line-through; color: #999; }
.plain-slide a { color: #2563eb; text-decoration: underline; }
.plain-slide a:hover { color: #1d4ed8; }
.plain-slide img { display: block; max-width: 80%; margin: 1em auto; border-radius: 8px; }
.plain-slide code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-family: 'JetBrains Mono', monospace; }
/* Shiki code blocks — use light theme for plain renderer */
.plain-slide pre.shiki { border-radius: 8px; padding: 16px; overflow-x: auto; margin: 1em 0; border: 1px solid #e5e7eb; }
.plain-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.plain-slide pre.shiki { background-color: var(--shiki-light-bg, #f8f9fa) !important; }
/* Fallback for pre without Shiki */
.plain-slide pre:not(.shiki) { background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 1em 0; }
.plain-slide pre code { background: none; padding: 0; font-size: 0.85em; }
.plain-slide blockquote { border-left: 4px solid #d1d5db; background: #f9fafb; margin: 1em 0; padding: 12px 20px; color: #4b5563; }
.plain-slide ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
.plain-slide ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.plain-slide li { margin: 0.25em 0; }
.plain-slide li input[type="checkbox"] { margin-right: 6px; }
.plain-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.plain-slide th { background: #f3f4f6; font-weight: 600; text-align: left; padding: 8px 12px; border: 1px solid #e5e7eb; }
.plain-slide td { padding: 8px 12px; border: 1px solid #e5e7eb; }
.plain-slide tr:nth-child(even) { background: #f9fafb; }
.plain-slide hr { border: none; border-top: 1px solid #d1d5db; margin: 1.5em 0; width: 100%; }
/* Mermaid diagrams */
.plain-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.plain-slide .mermaid-container svg { max-width: 100%; height: auto; }
.plain-slide .mermaid-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; border-radius: 8px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}

export function getPlainWrapperClass(): string {
  return "plain-slide";
}
