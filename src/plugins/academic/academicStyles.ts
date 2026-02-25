export function getAcademicStyles(): string {
  return `
.academic-slide {
  font-family: 'Times New Roman', 'Songti SC', 'SimSun', serif;
  color: #1a1a1a;
  background: #fefefe;
  padding: 56px 72px;
  line-height: 1.8;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
.academic-slide h1 { 
  font-size: 2.2em; 
  font-weight: 700; 
  margin: 0 0 0.5em; 
  text-align: center;
  font-family: 'Times New Roman', serif;
  letter-spacing: 0.02em;
}
.academic-slide h2 { 
  font-size: 1.6em; 
  font-weight: 600; 
  margin: 0.8em 0 0.4em; 
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.15em;
}
.academic-slide h3 { font-size: 1.3em; font-weight: 600; margin: 0.6em 0 0.3em; }
.academic-slide h4 { font-size: 1.1em; font-weight: 600; margin: 0.5em 0 0.2em; }
.academic-slide h5 { font-size: 1em; font-weight: 600; margin: 0.4em 0 0.2em; }
.academic-slide h6 { font-size: 0.9em; font-weight: 600; margin: 0.4em 0 0.2em; color: #555; font-style: italic; }
.academic-slide p { margin: 0.6em 0; text-align: justify; }
.academic-slide strong { font-weight: 700; }
.academic-slide em { font-style: italic; }
.academic-slide del { text-decoration: line-through; color: #777; }
.academic-slide a { color: #1a3a5a; text-decoration: underline; }
.academic-slide a:hover { color: #2a5a8a; }
.academic-slide img { display: block; max-width: 70%; margin: 1.2em auto; border: 1px solid #ddd; padding: 4px; }
.academic-slide code { 
  background: #f4f4f4; 
  padding: 2px 6px; 
  border-radius: 3px; 
  font-size: 0.85em; 
  font-family: 'Courier New', monospace; 
}
.academic-slide pre.shiki { 
  border-radius: 4px; 
  padding: 16px; 
  overflow-x: auto; 
  margin: 1em 0; 
  border: 1px solid #ddd; 
  font-size: 0.85em;
}
.academic-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.academic-slide pre.shiki { background-color: var(--shiki-light-bg, #f8f8f8) !important; }
.academic-slide pre:not(.shiki) { background: #f8f8f8; border: 1px solid #ddd; border-radius: 4px; padding: 16px; overflow-x: auto; margin: 1em 0; }
.academic-slide pre code { background: none; padding: 0; }
.academic-slide blockquote { 
  border-left: 3px solid #666; 
  margin: 1em 0; 
  padding: 0.5em 1em; 
  color: #444; 
  font-style: italic;
  background: #f9f9f9;
}
.academic-slide ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
.academic-slide ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.academic-slide li { margin: 0.3em 0; }
.academic-slide li input[type="checkbox"] { margin-right: 6px; }
.academic-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em; }
.academic-slide th { 
  background: #f0f0f0; 
  font-weight: 600; 
  text-align: center; 
  padding: 8px 12px; 
  border: 1px solid #999;
}
.academic-slide td { padding: 8px 12px; border: 1px solid #ccc; text-align: center; }
.academic-slide tr:nth-child(even) { background: #f8f8f8; }
.academic-slide hr { border: none; border-top: 1px solid #ccc; margin: 1.5em 0; }
.academic-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.academic-slide .mermaid-container svg { max-width: 100%; height: auto; }
.academic-slide .mermaid-error { background: #f8f8f8; border: 1px solid #ccc; color: #8b0000; border-radius: 4px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}
