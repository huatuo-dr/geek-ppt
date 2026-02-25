export function getCyberpunkStyles(): string {
  return `
.cyberpunk-slide {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  color: #e0e0e: linear0;
  background-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%);
  padding: 48px 64px;
  line-height: 1.7;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}
.cyberpunk-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 255, 0.03) 2px,
      rgba(0, 255, 255, 0.03) 4px
    );
  pointer-events: none;
}
.cyberpunk-slide h1 { 
  font-size: 2.4em; 
  font-weight: 700; 
  margin: 0 0 0.5em; 
  text-align: center;
  color: #00ffff;
  text-shadow: 
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 40px #00ffff;
  letter-spacing: 0.05em;
  animation: glitch 2s infinite;
}
@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, 2px); }
}
.cyberpunk-slide h2 { 
  font-size: 1.7em; 
  font-weight: 600; 
  margin: 0.6em 0 0.35em; 
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px rgba(255, 0, 255, 0.5);
  border-bottom: 1px solid rgba(255, 0, 255, 0.4);
  padding-bottom: 0.1em;
}
.cyberpunk-slide h3 { font-size: 1.4em; font-weight: 600; margin: 0.5em 0 0.25em; color: #00ff88; text-shadow: 0 0 8px rgba(0, 255, 136, 0.5); }
.cyberpunk-slide h4 { font-size: 1.2em; font-weight: 600; margin: 0.4em 0 0.2em; color: #ffaa00; }
.cyberpunk-slide h5 { font-size: 1em; font-weight: 600; margin: 0.35em 0 0.2em; color: #ff6600; }
.cyberpunk-slide h6 { font-size: 0.9em; font-weight: 600; margin: 0.3em 0 0.2em; color: #888; }
.cyberpunk-slide p { margin: 0.6em 0; }
.cyberpunk-slide strong { font-weight: 700; color: #ffff00; text-shadow: 0 0 5px rgba(255, 255, 0, 0.5); }
.cyberpunk-slide em { font-style: italic; color: #00ffff; }
.cyberpunk-slide del { text-decoration: line-through; color: #666; }
.cyberpunk-slide a { color: #00ffff; text-decoration: none; border-bottom: 1px solid #00ffff; }
.cyberpunk-slide a:hover { 
  color: #ff00ff; 
  border-color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff;
}
.cyberpunk-slide img { display: block; max-width: 70%; margin: 1.2em auto; border: 2px solid #00ffff; box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
.cyberpunk-slide code { 
  background: rgba(0, 255, 255, 0.15); 
  padding: 2px 6px; 
  border-radius: 3px; 
  font-size: 0.9em; 
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.4);
}
.cyberpunk-slide pre.shiki { 
  border-radius: 6px; 
  padding: 18px; 
  overflow-x: auto; 
  margin: 1em 0; 
  border: 1px solid rgba(255, 0, 255, 0.4);
  background: rgba(10, 10, 20, 0.9) !important;
  box-shadow: 
    0 0 10px rgba(255, 0, 255, 0.3),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
}
.cyberpunk-slide pre.shiki span { color: var(--shiki-light) !important; background-color: transparent !important; }
.cyberpunk-slide pre:not(.shiki) { background: rgba(10, 10, 20, 0.9); border: 1px solid rgba(0, 255, 255, 0.4); border-radius: 6px; padding: 18px; overflow-x: auto; margin: 1em 0; }
.cyberpunk-slide pre code { background: none; padding: 0; color: #00ff88; }
.cyberpunk-slide blockquote { 
  border-left: 4px solid #ff00ff; 
  margin: 1em 0; 
  padding: 0.5em 1.5em; 
  color: #cccccc; 
  background: rgba(255, 0, 255, 0.08);
  box-shadow: 4px 0 15px rgba(255, 0, 255, 0.2);
}
.cyberpunk-slide ul { list-style: none; padding-left: 1.5em; margin: 0.5em 0; }
.cyberpunk-slide ul li { margin: 0.3em 0; position: relative; }
.cyberpunk-slide ul li::before {
  content: '>';
  position: absolute;
  left: -1.2em;
  color: #ff00ff;
  text-shadow: 0 0 8px #ff00ff;
}
.cyberpunk-slide ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
.cyberpunk-slide li { margin: 0.3em 0; }
.cyberpunk-slide li input[type="checkbox"] { 
  margin-right: 8px; 
  appearance: none;
  width: 14px;
  height: 14px;
  border: 2px solid #00ffff;
  background: transparent;
}
.cyberpunk-slide li input[type="checkbox"]:checked {
  background: #00ffff;
  box-shadow: 0 0 10px #00ffff;
}
.cyberpunk-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.cyberpunk-slide th { 
  background: linear-gradient(180deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.2)); 
  font-weight: 600; 
  text-align: center; 
  padding: 12px 16px; 
  border: 1px solid #ff00ff;
  color: #00ffff;
  text-shadow: 0 0 5px #00ffff;
}
.cyberpunk-slide td { padding: 12px 16px; border: 1px solid rgba(0, 255, 255, 0.3); }
.cyberpunk-slide tr:nth-child(even) { background: rgba(0, 255, 255, 0.05); }
.cyberpunk-slide hr { border: none; border-top: 2px solid #ff00ff; margin: 1.5em 0; box-shadow: 0 0 10px #ff00ff; }
.cyberpunk-slide .mermaid-container { margin: 1em 0; display: flex; justify-content: center; }
.cyberpunk-slide .mermaid-container svg { max-width: 100%; height: auto; }
.cyberpunk-slide .mermaid-error { background: rgba(255, 0, 0, 0.15); border: 1px solid #ff0000; color: #ff6666; border-radius: 4px; padding: 12px 16px; margin: 1em 0; font-size: 0.85em; }
`;
}
