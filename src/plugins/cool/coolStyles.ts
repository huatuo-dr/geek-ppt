/** CoolRenderer CSS — full syntax coverage with centered layout and neon effects */
export function getCoolStyles(): string {
  return `
.cool-slide {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #e2e8f0;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
/* Ambient glow orbs */
.cool-slide::before {
  content: '';
  position: absolute;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
  top: -100px; left: -100px;
  border-radius: 50%;
  pointer-events: none;
}
.cool-slide::after {
  content: '';
  position: absolute;
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%);
  bottom: -80px; right: -80px;
  border-radius: 50%;
  pointer-events: none;
}
/* Content container — centered, glass effect */
.cool-slide > .cool-content {
  position: relative;
  z-index: 1;
  max-width: 85%;
  width: 85%;
  text-align: center;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 48px 56px;
  line-height: 1.8;
  /* Ensure block-level children stack vertically */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cool-slide h1 {
  font-size: 3em; font-weight: 800; margin: 0 0 0.3em;
  background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: coolFadeIn 0.6s ease both;
}
.cool-slide h2 {
  font-size: 2.2em; font-weight: 700; margin: 0.4em 0 0.3em;
  background: linear-gradient(90deg, #06b6d4, #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: coolFadeIn 0.6s ease 0.1s both;
}
.cool-slide h3 { font-size: 1.7em; font-weight: 600; margin: 0.4em 0 0.3em; color: #c4b5fd; animation: coolFadeIn 0.5s ease 0.15s both; }
.cool-slide h4 { font-size: 1.4em; font-weight: 600; margin: 0.3em 0 0.2em; color: #a5b4fc; }
.cool-slide h5 { font-size: 1.15em; font-weight: 600; margin: 0.3em 0 0.2em; color: #93c5fd; }
.cool-slide h6 { font-size: 1em; font-weight: 600; margin: 0.2em 0; color: #7dd3fc; }
.cool-slide p { margin: 0.5em 0; animation: coolFadeIn 0.5s ease 0.2s both; }
.cool-slide strong { color: #fef08a; text-shadow: 0 0 8px rgba(250,204,21,0.3); }
.cool-slide em { font-style: italic; background: linear-gradient(90deg, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cool-slide del { text-decoration: line-through; opacity: 0.5; }
.cool-slide a { color: #67e8f9; text-decoration: none; border-bottom: 1px solid rgba(103,232,249,0.4); transition: all 0.2s; }
.cool-slide a:hover { text-shadow: 0 0 10px rgba(103,232,249,0.6); border-bottom-color: #67e8f9; }
.cool-slide img { display: block; max-width: 70%; margin: 1.2em auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
.cool-slide img:hover { transform: scale(1.02); transition: transform 0.3s ease; }
.cool-slide code { background: rgba(99,102,241,0.15); padding: 2px 8px; border-radius: 4px; font-size: 0.9em; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(99,102,241,0.3); }
/* Shiki code blocks — use dark (tokyo-night) theme for cool renderer */
.cool-slide pre.shiki { backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 1em 0; text-align: left; }
.cool-slide pre.shiki span { color: var(--shiki-dark) !important; background-color: transparent !important; }
.cool-slide pre.shiki { background-color: var(--shiki-dark-bg, rgba(0,0,0,0.4)) !important; }
/* Fallback for pre without Shiki */
.cool-slide pre:not(.shiki) { background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; overflow-x: auto; margin: 1em 0; text-align: left; }
.cool-slide pre code { background: none; border: none; padding: 0; font-size: 0.85em; }
.cool-slide blockquote { border-left: 4px solid; border-image: linear-gradient(to bottom, #06b6d4, #8b5cf6) 1; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px); margin: 1em 0; padding: 12px 24px; text-align: left; border-radius: 0 8px 8px 0; }
.cool-slide ul { list-style: none; padding-left: 1.2em; margin: 0.5em 0; text-align: left; }
.cool-slide ul li::before { content: '●'; background: linear-gradient(90deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-right: 8px; font-size: 0.7em; }
.cool-slide ol { list-style: none; padding-left: 1.2em; margin: 0.5em 0; counter-reset: cool-counter; text-align: left; }
.cool-slide ol li { counter-increment: cool-counter; }
.cool-slide ol li::before { content: counter(cool-counter); color: #fbbf24; font-weight: 700; margin-right: 10px; font-size: 1.1em; }
.cool-slide li { margin: 0.35em 0; animation: coolSlideIn 0.4s ease both; }
.cool-slide li:nth-child(1) { animation-delay: 0.1s; }
.cool-slide li:nth-child(2) { animation-delay: 0.2s; }
.cool-slide li:nth-child(3) { animation-delay: 0.3s; }
.cool-slide li:nth-child(4) { animation-delay: 0.4s; }
.cool-slide li:nth-child(5) { animation-delay: 0.5s; }
.cool-slide li input[type="checkbox"] { appearance: none; width: 16px; height: 16px; border: 2px solid #8b5cf6; border-radius: 3px; margin-right: 8px; vertical-align: middle; position: relative; }
.cool-slide li input[type="checkbox"]:checked { background: #8b5cf6; }
.cool-slide li input[type="checkbox"]:checked::after { content: '✓'; color: #fff; font-size: 11px; position: absolute; top: -1px; left: 2px; }
.cool-slide table { width: 100%; border-collapse: collapse; margin: 1em 0; text-align: left; }
.cool-slide th { background: linear-gradient(90deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3)); font-weight: 600; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.08); color: #c4b5fd; }
.cool-slide td { padding: 10px 14px; border: 1px solid rgba(255,255,255,0.06); }
.cool-slide tr:hover { background: rgba(255,255,255,0.04); }
.cool-slide hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, #8b5cf6, #ec4899, transparent); margin: 2em 0; width: 100%; }
/* Animations */
@keyframes coolFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes coolSlideIn {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}
`;
}

export function getCoolWrapperClass(): string {
  return "cool-slide";
}
