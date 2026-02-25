/**
 * RenderService — manages markdown rendering.
 * Uses main-thread async rendering with the unified/remark pipeline.
 * Code blocks are highlighted by Shiki via @shikijs/rehype.
 * Mermaid diagrams are rendered to SVG via the mermaid library.
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import mermaid from "mermaid";
import type { RenderRequest, RenderResponse } from "@/types";
import { uid } from "@/lib/id";
import { getPlainStyles, getPlainWrapperClass } from "@/plugins/plain/plainStyles";
import { getCoolStyles, getCoolWrapperClass } from "@/plugins/cool/coolStyles";
import { getTorrentStyles, getTorrentWrapperClass, getTorrentInnerHtml, torrentPreprocess } from "@/plugins/torrent/torrentStyles";
import { getAcademicStyles } from "@/plugins/academic/academicStyles";
import { getInkStyles } from "@/plugins/ink/inkStyles";
import { getCyberpunkStyles } from "@/plugins/cyberpunk/cyberpunkStyles";
import { getVintageStyles } from "@/plugins/vintage/vintageStyles";
import { getMinimalStyles } from "@/plugins/minimal/minimalStyles";

export { getPlainStyles, getPlainWrapperClass, getCoolStyles, getCoolWrapperClass, getTorrentStyles, getTorrentWrapperClass, getTorrentInnerHtml, torrentPreprocess, getAcademicStyles, getInkStyles, getCyberpunkStyles, getVintageStyles, getMinimalStyles };

// ---------------------------------------------------------------------------
// Mermaid helpers
// ---------------------------------------------------------------------------

let lastMermaidPlugin: string | null = null;

const MERMAID_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/** Per-renderer Mermaid configuration */
function getMermaidConfig(pluginId: string): Parameters<typeof mermaid.initialize>[0] {
  const base = { startOnLoad: false, securityLevel: "loose" as const, fontFamily: MERMAID_FONT };

  if (pluginId === "plain-renderer") {
    return { ...base, theme: "default" as const };
  }

  if (pluginId === "torrent-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: MERMAID_FONT,
        fontSize: "14px",
        primaryColor: "rgba(251,191,36,0.18)",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#fbbf24",
        secondaryColor: "rgba(139,92,246,0.18)",
        secondaryTextColor: "#e2e8f0",
        secondaryBorderColor: "#8b5cf6",
        tertiaryColor: "rgba(236,72,153,0.14)",
        tertiaryTextColor: "#e2e8f0",
        tertiaryBorderColor: "#ec4899",
        lineColor: "#a78bfa",
        textColor: "#e2e8f0",
        nodeBorder: "#fbbf24",
        mainBkg: "rgba(251,191,36,0.15)",
        clusterBkg: "rgba(139,92,246,0.08)",
        clusterBorder: "#8b5cf6",
        titleColor: "#fbbf24",
        edgeLabelBackground: "rgba(7,6,13,0.7)",
        actorBkg: "rgba(251,191,36,0.15)",
        actorBorder: "#fbbf24",
        actorTextColor: "#ffffff",
        signalColor: "#a78bfa",
        signalTextColor: "#e2e8f0",
        labelBoxBkgColor: "rgba(139,92,246,0.15)",
        labelBoxBorderColor: "#8b5cf6",
        labelTextColor: "#e2e8f0",
        loopTextColor: "#fbbf24",
        noteBkgColor: "rgba(251,191,36,0.12)",
        noteBorderColor: "#fbbf24",
        noteTextColor: "#ffffff",
        pie1: "#fbbf24",
        pie2: "#8b5cf6",
        pie3: "#ec4899",
        pie4: "#06b6d4",
        pie5: "#22c55e",
        pie6: "#ef4444",
        pie7: "#a78bfa",
        pie8: "#f472b6",
        pieStrokeColor: "rgba(255,255,255,0.15)",
        pieSectionTextColor: "#ffffff",
        pieTitleTextColor: "#fbbf24",
        pieLegendTextColor: "#e2e8f0",
        xyChart: {
          backgroundColor: "transparent",
          titleColor: "#fbbf24",
          xAxisTitleColor: "#e2e8f0",
          yAxisTitleColor: "#e2e8f0",
          xAxisLabelColor: "#a1a1aa",
          yAxisLabelColor: "#a1a1aa",
          xAxisLineColor: "rgba(255,255,255,0.15)",
          yAxisLineColor: "rgba(255,255,255,0.15)",
          plotColorPalette: "#fbbf24,#8b5cf6,#ec4899,#06b6d4,#22c55e,#ef4444",
        },
      },
    };
  }

  if (pluginId === "cool-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: MERMAID_FONT,
        fontSize: "14px",
        primaryColor: "rgba(99,102,241,0.22)",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#6366f1",
        secondaryColor: "rgba(236,72,153,0.18)",
        secondaryTextColor: "#e2e8f0",
        secondaryBorderColor: "#ec4899",
        tertiaryColor: "rgba(6,182,212,0.15)",
        tertiaryTextColor: "#e2e8f0",
        tertiaryBorderColor: "#06b6d4",
        lineColor: "#8b5cf6",
        textColor: "#e2e8f0",
        nodeBorder: "#6366f1",
        mainBkg: "rgba(99,102,241,0.18)",
        clusterBkg: "rgba(99,102,241,0.08)",
        clusterBorder: "#6366f1",
        titleColor: "#c4b5fd",
        edgeLabelBackground: "rgba(15,12,41,0.7)",
        actorBkg: "rgba(99,102,241,0.18)",
        actorBorder: "#6366f1",
        actorTextColor: "#e2e8f0",
        signalColor: "#8b5cf6",
        signalTextColor: "#e2e8f0",
        noteBkgColor: "rgba(99,102,241,0.12)",
        noteBorderColor: "#6366f1",
        noteTextColor: "#e2e8f0",
        pie1: "#6366f1",
        pie2: "#ec4899",
        pie3: "#06b6d4",
        pie4: "#a78bfa",
        pie5: "#f472b6",
        pie6: "#22d3ee",
        pieStrokeColor: "rgba(255,255,255,0.1)",
        pieSectionTextColor: "#ffffff",
        pieTitleTextColor: "#c4b5fd",
        pieLegendTextColor: "#e2e8f0",
        xyChart: {
          backgroundColor: "transparent",
          titleColor: "#c4b5fd",
          xAxisTitleColor: "#e2e8f0",
          yAxisTitleColor: "#e2e8f0",
          xAxisLabelColor: "#a1a1aa",
          yAxisLabelColor: "#a1a1aa",
          xAxisLineColor: "rgba(255,255,255,0.1)",
          yAxisLineColor: "rgba(255,255,255,0.1)",
          plotColorPalette: "#6366f1,#ec4899,#06b6d4,#a78bfa,#f472b6,#22d3ee",
        },
      },
    };
  }

  if (pluginId === "academic-renderer") {
    return { ...base, theme: "default" as const };
  }

  if (pluginId === "ink-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: "'Noto Serif SC', serif",
        fontSize: "14px",
        primaryColor: "rgba(139, 90, 43, 0.2)",
        primaryTextColor: "#3a3a3a",
        primaryBorderColor: "#8b5a2b",
        secondaryColor: "rgba(139, 90, 43, 0.15)",
        secondaryTextColor: "#555",
        secondaryBorderColor: "#a08060",
        tertiaryColor: "rgba(139, 90, 43, 0.1)",
        tertiaryTextColor: "#666",
        tertiaryBorderColor: "#b09070",
        lineColor: "#8b5a2b",
        textColor: "#3a3a3a",
        nodeBorder: "#8b5a2b",
        mainBkg: "rgba(139, 90, 43, 0.1)",
        clusterBkg: "rgba(139, 90, 43, 0.05)",
        clusterBorder: "#a08060",
        titleColor: "#5a3a1b",
        actorBkg: "rgba(139, 90, 43, 0.15)",
        actorBorder: "#8b5a2b",
        actorTextColor: "#3a3a3a",
        noteBkgColor: "rgba(139, 90, 43, 0.1)",
        noteBorderColor: "#8b5a2b",
        noteTextColor: "#3a3a3a",
        pie1: "#8b5a2b",
        pie2: "#a08060",
        pie3: "#c0a080",
        pie4: "#6b4a1b",
      },
    };
  }

  if (pluginId === "cyberpunk-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "14px",
        primaryColor: "rgba(0, 255, 255, 0.2)",
        primaryTextColor: "#00ffff",
        primaryBorderColor: "#00ffff",
        secondaryColor: "rgba(255, 0, 255, 0.2)",
        secondaryTextColor: "#ff00ff",
        secondaryBorderColor: "#ff00ff",
        tertiaryColor: "rgba(255, 170, 0, 0.2)",
        tertiaryTextColor: "#ffaa00",
        tertiaryBorderColor: "#ffaa00",
        lineColor: "#00ffff",
        textColor: "#e0e0e0",
        nodeBorder: "#00ffff",
        mainBkg: "rgba(0, 255, 255, 0.1)",
        clusterBkg: "rgba(255, 0, 255, 0.05)",
        clusterBorder: "#ff00ff",
        titleColor: "#ff00ff",
        actorBkg: "rgba(0, 255, 255, 0.15)",
        actorBorder: "#00ffff",
        actorTextColor: "#00ffff",
        noteBkgColor: "rgba(255, 0, 255, 0.1)",
        noteBorderColor: "#ff00ff",
        noteTextColor: "#ff00ff",
        pie1: "#00ffff",
        pie2: "#ff00ff",
        pie3: "#ffaa00",
        pie4: "#00ff88",
      },
    };
  }

  if (pluginId === "vintage-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: "'Courier New', serif",
        fontSize: "14px",
        primaryColor: "rgba(139, 115, 85, 0.2)",
        primaryTextColor: "#3d3322",
        primaryBorderColor: "#8b7355",
        secondaryColor: "rgba(139, 115, 85, 0.15)",
        secondaryTextColor: "#554433",
        secondaryBorderColor: "#a08060",
        tertiaryColor: "rgba(139, 115, 85, 0.1)",
        tertiaryTextColor: "#665544",
        tertiaryBorderColor: "#b09070",
        lineColor: "#8b7355",
        textColor: "#3d3322",
        nodeBorder: "#8b7355",
        mainBkg: "rgba(139, 115, 85, 0.1)",
        clusterBkg: "rgba(139, 115, 85, 0.05)",
        clusterBorder: "#a08060",
        titleColor: "#5a4030",
        actorBkg: "rgba(139, 115, 85, 0.15)",
        actorBorder: "#8b7355",
        actorTextColor: "#3d3322",
        noteBkgColor: "rgba(139, 115, 85, 0.1)",
        noteBorderColor: "#8b7355",
        noteTextColor: "#3d3322",
        pie1: "#8b7355",
        pie2: "#a08060",
        pie3: "#c0a080",
        pie4: "#6b5344",
      },
    };
  }

  if (pluginId === "minimal-renderer") {
    return {
      ...base,
      theme: "base" as const,
      themeVariables: {
        background: "transparent",
        fontFamily: "'Helvetica Neue', sans-serif",
        fontSize: "14px",
        primaryColor: "#000000",
        primaryTextColor: "#000000",
        primaryBorderColor: "#000000",
        secondaryColor: "#333333",
        secondaryTextColor: "#333333",
        secondaryBorderColor: "#333333",
        tertiaryColor: "#666666",
        tertiaryTextColor: "#666666",
        tertiaryBorderColor: "#666666",
        lineColor: "#000000",
        textColor: "#000000",
        nodeBorder: "#000000",
        mainBkg: "#ffffff",
        clusterBkg: "#f5f5f5",
        clusterBorder: "#000000",
        titleColor: "#000000",
        actorBkg: "#ffffff",
        actorBorder: "#000000",
        actorTextColor: "#000000",
        noteBkgColor: "#f5f5f5",
        noteBorderColor: "#000000",
        noteTextColor: "#000000",
        pie1: "#000000",
        pie2: "#333333",
        pie3: "#666666",
        pie4: "#999999",
      },
    };
  }

  return { ...base, theme: "default" as const };
}

/** (Re-)initialize mermaid when renderer changes */
function ensureMermaidInit(pluginId: string) {
  if (lastMermaidPlugin === pluginId) return;
  mermaid.initialize(getMermaidConfig(pluginId));
  lastMermaidPlugin = pluginId;
}

/**
 * Extract ```mermaid code blocks from raw markdown, replace with HTML
 * placeholders so Shiki won't process them.
 */
function extractMermaidBlocks(markdown: string): { markdown: string; blocks: string[] } {
  const blocks: string[] = [];
  const processed = markdown.replace(/```mermaid\s*\n([\s\S]*?)```/g, (_match, code: string) => {
    const idx = blocks.length;
    blocks.push(code.trim());
    // Raw HTML placeholder — survives remark-rehype with allowDangerousHtml
    return `<div class="mermaid-placeholder" data-mermaid-idx="${idx}"></div>`;
  });
  return { markdown: processed, blocks };
}

/** Render extracted mermaid blocks to SVG and replace placeholders in HTML */
async function injectMermaidSvg(
  html: string,
  blocks: string[],
  pluginId: string,
): Promise<string> {
  if (blocks.length === 0) return html;

  ensureMermaidInit(pluginId);

  let result = html;
  for (let i = 0; i < blocks.length; i++) {
    const placeholder = `<div class="mermaid-placeholder" data-mermaid-idx="${i}"></div>`;
    try {
      const renderId = `mmd-${Date.now()}-${i}`;
      const { svg } = await mermaid.render(renderId, blocks[i]!);
      result = result.replace(placeholder, `<div class="mermaid-container">${svg}</div>`);
    } catch (err) {
      console.warn("[mermaid] render failed for block", i, ":", err);
      const msg = err instanceof Error ? err.message : String(err);
      result = result.replace(
        placeholder,
        `<div class="mermaid-error">Mermaid 渲染失败: ${msg}</div>`,
      );
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Rehype plugins
// ---------------------------------------------------------------------------

/** Rehype plugin: force all <a> tags to open in a new tab */
function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "a") {
        node.properties ??= {};
        node.properties["target"] = "_blank";
        node.properties["rel"] = "noopener noreferrer";
      }
    });
  };
}

// ---------------------------------------------------------------------------
// Unified pipeline
// ---------------------------------------------------------------------------

/** Build the unified pipeline with Shiki code highlighting */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeShiki, {
    themes: {
      light: "github-light",
      dark: "tokyo-night",
    },
    defaultColor: false,
  })
  .use(rehypeExternalLinks)
  .use(rehypeStringify, { allowDangerousHtml: true });

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

async function render(req: RenderRequest): Promise<RenderResponse> {
  const start = performance.now();
  try {
    // 1. Identify effective base renderer (standard or custom-defined via magic comment)
    let effectiveBase = req.pluginId;
    if (req.customCss) {
      const match = req.customCss.match(/\/\*\s*@theme-base:\s*(\w+)\s*\*\//);
      if (match?.[1]) {
        effectiveBase = `${match[1]}-renderer`;
      }
    }

    // 2. Pre-processing (torrent specific logic)
    const preprocessed = effectiveBase === "torrent-renderer"
      ? torrentPreprocess(req.markdown)
      : req.markdown;

    // 3. Extract mermaid blocks
    const { markdown: cleanMd, blocks: mermaidBlocks } = extractMermaidBlocks(preprocessed);

    // 4. Run unified pipeline
    const file = await processor.process(cleanMd);
    let rawHtml = String(file);

    // 5. Render/Inject mermaid
    rawHtml = await injectMermaidSvg(rawHtml, mermaidBlocks, effectiveBase);

    // 6. Resolve final layout components
    let css: string = req.customCss || "";
    let wrapperClass: string;
    let inner: string;

    if (effectiveBase === "torrent-renderer") {
      css = req.customCss ? getTorrentStyles() + "\n" + css : getTorrentStyles();
      wrapperClass = getTorrentWrapperClass();
      inner = getTorrentInnerHtml(rawHtml);
    } else if (effectiveBase === "cool-renderer") {
      css = req.customCss ? getCoolStyles() + "\n" + css : getCoolStyles();
      wrapperClass = getCoolWrapperClass();
      inner = `<div class="cool-scroll"><div class="cool-content">${rawHtml}</div></div>`;
    } else if (effectiveBase === "plain-renderer") {
      css = req.customCss ? getPlainStyles() + "\n" + css : getPlainStyles();
      wrapperClass = getPlainWrapperClass();
      inner = rawHtml;
    } else if (effectiveBase === "academic-renderer") {
      css = req.customCss ? getAcademicStyles() + "\n" + css : getAcademicStyles();
      wrapperClass = "academic-slide";
      inner = rawHtml;
    } else if (effectiveBase === "ink-renderer") {
      css = req.customCss ? getInkStyles() + "\n" + css : getInkStyles();
      wrapperClass = "ink-slide";
      inner = rawHtml;
    } else if (effectiveBase === "cyberpunk-renderer") {
      css = req.customCss ? getCyberpunkStyles() + "\n" + css : getCyberpunkStyles();
      wrapperClass = "cyberpunk-slide";
      inner = rawHtml;
    } else if (effectiveBase === "vintage-renderer") {
      css = req.customCss ? getVintageStyles() + "\n" + css : getVintageStyles();
      wrapperClass = "vintage-slide";
      inner = rawHtml;
    } else if (effectiveBase === "minimal-renderer") {
      css = req.customCss ? getMinimalStyles() + "\n" + css : getMinimalStyles();
      wrapperClass = "minimal-slide";
      inner = rawHtml;
    } else if (req.customCss) {
      css = getPlainStyles() + "\n" + css;
      wrapperClass = getPlainWrapperClass();
      inner = rawHtml;
    } else {
      css = getCoolStyles();
      wrapperClass = getCoolWrapperClass();
      inner = `<div class="cool-scroll"><div class="cool-content">${rawHtml}</div></div>`;
    }

    const html = `<div class="${wrapperClass}">${inner}</div>`;
    const timeMs = Math.round(performance.now() - start);

    return { id: req.id, html, css, timeMs, isCustom: !!req.customCss };
  } catch (err) {
    const timeMs = Math.round(performance.now() - start);
    return {
      id: req.id,
      html: "",
      css: "",
      timeMs,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/** Request a render (async, runs on main thread) */
export function requestRender(
  markdown: string,
  pluginId: string,
  slideSize: { width: number; height: number },
  slideIndex: number,
  customCss?: string,
): Promise<RenderResponse> {
  const id = uid();
  const req: RenderRequest = { id, markdown, pluginId, slideSize, slideIndex, customCss };
  return render(req);
}

/** No-op for API compatibility */
export function terminateWorker(): void {
  // No worker to terminate in main-thread mode
}
