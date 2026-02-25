export function getVintageStyles(): string {
  return `
.vintage-slide {
  font-family: 'Garamond', 'Palatino Linotype', 'Georgia', 'Times New Roman', serif;
  color: #3d3322;
  background:
    linear-gradient(rgba(245, 235, 200, 0.9), rgba(245, 235, 200, 0.9)),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  padding: 48px 64px;
  line-height: 1.6;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}
.vintage-slide::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 3px double #8b7355;
  pointer-events: none;
}
.vintage-slide::after {
  content: '';
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  bottom: 25px;
  border: 1px solid rgba(139, 115, 85, 0.3);
  pointer-events: none;
}
.vintage-slide.scrolling::before,
.vintage-slide.scrolling::after {
  border-bottom: none;
}
.vintage-slide h1 { 
  font-size: 2.2em; 
  font-weight: 700; 
  margin: 0 0 0.5em; 
  text-align: center;
  color: #2a2015;
  font-family: 'American Typewriter', Georgia, serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.vintage-slide h2 { 
  font-size: 1.6em; 
  font-weight: 600; 
  margin: 0.6em 0 0.35em; 
  color: #3a3020;
  border-bottom: 2px solid #8b7355;
  padding-bottom: 0.1em;
}
.vintage-slide h3 { font-size: 1.3em; font-weight: 600; margin: 0.5em 0 0.25em; color: #4a3f2f; }
.vintage-slide h4 { font-size: 1.1em; font-weight: 600; margin: 0.4em 0 0.2em; }
.vintage-slide h5 { font-size: 1em; font-weight: 600; margin: 0.35em 0 0.2em; }
.vintage-slide h6 { font-size: 0.9em; font-weight: 600; margin: 0.3em 0 0.2em; color: #665544; font-style: italic; }
.vintage-slide p { margin: 0.6em 0; text-align: left; }
.vintage-slide strong { font-weight: 700; color: #1a1510; }
.vintage-slide em { font-style: italic; }
.vintage-slide del { text-decoration: line-through; color: #887766; }
.vintage-slide a { color: #6b5344; text-decoration: underline; }
.vintage-slide a:hover { color: #4a3a2a; }
.vintage-slide img { display: block; max-width: 70%; margin: 1.2em auto; border: 4px solid #8b7355; padding: 4px; filter: sepia(30%) contrast(110%); }
.vintage-slide code { 
  background: rgba(139, 115, 85, 0.15); 
  padding: 2px 6px; 
  border-radius: 2px; 
  font-size: 0.85em; 
  font-family: 'Courier New', monospace; 
}
.vintage-slide pre.shiki { 
  border-radius: 3px; 
  padding: 16px; 
  overflow-x: auto; 
  margin: 1em 0; 
  border: 1px solid #8b7355;
  background: rgba(245, 235, 200, 0.95) !important;
}
.vintage-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.vintage-slide pre:not(.shiki) { background: rgba(139, 115, 85, 0.1); border: 1px solid #8b7355; border-radius: 3px; padding: 16px; overflow-x: auto; margin: 1em 0; }
.vintage-slide pre code { background: none; padding: 0; }
.vintage-slide blockquote { 
  border-left: 4px solid #8b7355; 
  margin: 1em 0; 
  padding: 0.5em 1.5em; 
  color: #554433; 
  background: rgba(139, 115, 85, 0.08);
  font-style: italic;
}
.vintage-slide ul { list-style: none; padding-left: 1.5em; margin: 0.5em 0; }
.vintage-slide ul li { margin: 0.3em 0; position: relative; }
.vintage-slide ul li::before {
  content: '✦';
  position: absolute;
  left: -1.3em;
  color: #8b7355;
  font-size: 0.8em;
}
.vintage-slide ol { list-style: upper-roman; padding-left: 1.5em; margin: 0.5em 0; }
.vintage-slide li { margin: 0.3em 0; }
.vintage-slide li input[type="checkbox"] { margin-right: 6px; }
.vintage-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.vintage-slide th { 
  background: rgba(139, 115, 85, 0.2); 
  font-weight: 600; 
  text-align: center; 
  padding: 10px 14px; 
  border: 2px solid #8b7355;
}
.vintage-slide td { padding: 10px 14px; border: 1px solid #a08060; }
.vintage-slide tr:nth-child(even) { background: rgba(139, 115, 85, 0.08); }
.vintage-slide hr { border: none; border-top: 3px double #8b7355; margin: 1.5em 0; }
.vintage-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.vintage-slide .mermaid-container svg { max-width: 100%; height: auto; }
.vintage-slide .mermaid-error { background: rgba(139, 115, 85, 0.15); border: 1px solid #8b7355; color: #6b4423; border-radius: 3px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}
