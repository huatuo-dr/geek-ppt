export function getMinimalStyles(): string {
  return `
.minimal-slide {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #000000;
  background: #ffffff;
  padding: 56px 72px;
  line-height: 1.5;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.minimal-slide h1 { 
  font-size: 2em; 
  font-weight: 300; 
  margin: 0 0 0.6em; 
  letter-spacing: -0.02em;
}
.minimal-slide h2 { 
  font-size: 1.4em; 
  font-weight: 400; 
  margin: 0.8em 0 0.4em; 
  letter-spacing: -0.01em;
}
.minimal-slide h3 { font-size: 1.1em; font-weight: 500; margin: 0.6em 0 0.3em; }
.minimal-slide h4 { font-size: 1em; font-weight: 500; margin: 0.5em 0 0.2em; }
.minimal-slide h5 { font-size: 0.9em; font-weight: 500; margin: 0.4em 0 0.2em; }
.minimal-slide h6 { font-size: 0.85em; font-weight: 500; margin: 0.3em 0 0.2em; text-transform: uppercase; letter-spacing: 0.1em; }
.minimal-slide p { margin: 0.6em 0; }
.minimal-slide strong { font-weight: 600; }
.minimal-slide em { font-style: italic; }
.minimal-slide del { text-decoration: line-through; }
.minimal-slide a { color: #000; text-decoration: underline; text-decoration-thickness: 1px; }
.minimal-slide a:hover { background: #000; color: #fff; text-decoration: none; }
.minimal-slide img { display: block; max-width: 80%; margin: 1.5em auto; }
.minimal-slide code { 
  background: #f5f5f5; 
  padding: 2px 5px; 
  font-size: 0.9em; 
  font-family: 'SF Mono', 'Monaco', 'Menlo', monospace; 
}
.minimal-slide pre.shiki { 
  padding: 14px; 
  overflow-x: auto; 
  margin: 1em 0; 
  background: #fafafa !important;
  border-left: 2px solid #000;
}
.minimal-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.minimal-slide pre:not(.shiki) { background: #fafafa; border-left: 2px solid #000; padding: 14px; overflow-x: auto; margin: 1em 0; }
.minimal-slide pre code { background: none; padding: 0; }
.minimal-slide blockquote { 
  border-left: 2px solid #000; 
  margin: 1em 0; 
  padding: 0.2em 0 0.2em 1em; 
  font-style: italic;
}
.minimal-slide ul { list-style: none; padding-left: 0; margin: 0.5em 0; }
.minimal-slide ul li { margin: 0.4em 0; padding-left: 1.2em; position: relative; }
.minimal-slide ul li::before {
  content: '—';
  position: absolute;
  left: 0;
}
.minimal-slide ol { list-style: none; padding-left: 0; margin: 0.5em 0; counter-reset: item; }
.minimal-slide ol li { margin: 0.4em 0; padding-left: 1.5em; position: relative; counter-increment: item; }
.minimal-slide ol li::before {
  content: counter(item) ".";
  position: absolute;
  left: 0;
  font-weight: 500;
}
.minimal-slide li { margin: 0.3em 0; }
.minimal-slide li input[type="checkbox"] { margin-right: 8px; }
.minimal-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.minimal-slide th { 
  font-weight: 600; 
  text-align: left; 
  padding: 8px 0; 
  border-bottom: 2px solid #000;
}
.minimal-slide td { padding: 8px 0; border-bottom: 1px solid #eee; }
.minimal-slide tr:last-child td { border-bottom: none; }
.minimal-slide hr { border: none; border-top: 1px solid #000; margin: 1.5em 0; }
.minimal-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.minimal-slide .mermaid-container svg { max-width: 100%; height: auto; }
.minimal-slide .mermaid-error { background: #f5f5f5; border-left: 2px solid #000; color: #000; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}
