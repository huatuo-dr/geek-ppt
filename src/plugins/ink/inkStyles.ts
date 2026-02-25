export function getInkStyles(): string {
  return `
.ink-slide {
  font-family: 'Noto Serif SC', 'Songti SC', 'SimSun', 'STSong', serif;
  color: #2a2a2a;
  background: linear-gradient(135deg, #f5f5f0 0%, #e8e4dc 100%);
  padding: 48px 64px;
  line-height: 1.9;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}
.ink-slide::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px solid rgba(139, 90, 43, 0.3);
  pointer-events: none;
}
.ink-slide h1 { 
  font-size: 2.4em; 
  font-weight: 700; 
  margin: 0 0 0.6em; 
  text-align: center;
  color: #1a1a1a;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  font-family: 'Noto Serif SC', 'Kaiti SC', 'STKaiti', serif;
}
.ink-slide h2 { 
  font-size: 1.8em; 
  font-weight: 600; 
  margin: 0.6em 0 0.35em; 
  color: #3a3a3a;
  border-bottom: 2px solid rgba(139, 90, 43, 0.4);
  padding-bottom: 0.1em;
}
.ink-slide h3 { font-size: 1.4em; font-weight: 600; margin: 0.5em 0 0.25em; color: #444; }
.ink-slide h4 { font-size: 1.2em; font-weight: 600; margin: 0.4em 0 0.2em; }
.ink-slide h5 { font-size: 1em; font-weight: 600; margin: 0.35em 0 0.2em; }
.ink-slide h6 { font-size: 0.9em; font-weight: 600; margin: 0.3em 0 0.2em; color: #666; }
.ink-slide p { margin: 0.6em 0; text-indent: 2em; }
.ink-slide strong { font-weight: 700; color: #1a1a1a; }
.ink-slide em { font-style: italic; }
.ink-slide del { text-decoration: line-through; color: #888; }
.ink-slide a { color: #8b5a2b; text-decoration: underline; }
.ink-slide a:hover { color: #5a3a1b; }
.ink-slide img { display: block; max-width: 70%; margin: 1.2em auto; border: 3px solid rgba(139, 90, 43, 0.5); padding: 4px; background: #fff; }
.ink-slide code { 
  background: rgba(139, 90, 43, 0.1); 
  padding: 2px 6px; 
  border-radius: 2px; 
  font-size: 0.85em; 
  font-family: 'Courier New', monospace; 
  border: 1px solid rgba(139, 90, 43, 0.3);
}
.ink-slide pre.shiki { 
  border-radius: 4px; 
  padding: 16px; 
  overflow-x: auto; 
  margin: 1em 0; 
  border: 1px solid rgba(139, 90, 43, 0.3);
  background: rgba(255, 252, 245, 0.9) !important;
}
.ink-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.ink-slide pre:not(.shiki) { background: rgba(139, 90, 43, 0.08); border: 1px solid rgba(139, 90, 43, 0.3); border-radius: 4px; padding: 16px; overflow-x: auto; margin: 1em 0; }
.ink-slide pre code { background: none; padding: 0; }
.ink-slide blockquote { 
  border-left: 4px solid rgba(139, 90, 43, 0.6); 
  margin: 1em 0; 
  padding: 0.5em 1.5em; 
  color: #555; 
  background: rgba(139, 90, 43, 0.05);
  font-style: italic;
}
.ink-slide ul { list-style: none; padding-left: 1.5em; margin: 0.5em 0; }
.ink-slide ul li { margin: 0.3em 0; position: relative; }
.ink-slide ul li::before {
  content: '•';
  position: absolute;
  left: -1.2em;
  color: #8b5a2b;
}
.ink-slide ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.ink-slide li { margin: 0.3em 0; }
.ink-slide li input[type="checkbox"] { margin-right: 6px; }
.ink-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.ink-slide th { 
  background: rgba(139, 90, 43, 0.15); 
  font-weight: 600; 
  text-align: center; 
  padding: 10px 14px; 
  border: 2px solid rgba(139, 90, 43, 0.4);
}
.ink-slide td { padding: 10px 14px; border: 1px solid rgba(139, 90, 43, 0.3); }
.ink-slide tr:nth-child(even) { background: rgba(139, 90, 43, 0.05); }
.ink-slide hr { border: none; border-top: 2px solid rgba(139, 90, 43, 0.3); margin: 1.5em 0; }
.ink-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.ink-slide .mermaid-container svg { max-width: 100%; height: auto; }
.ink-slide .mermaid-error { background: rgba(139, 90, 43, 0.1); border: 1px solid rgba(139, 90, 43, 0.4); color: #8b0000; border-radius: 4px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}
