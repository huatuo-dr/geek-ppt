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

// ---------------------------------------------------------------------------
// Mermaid helpers
// ---------------------------------------------------------------------------

let lastMermaidTheme: string | null = null;

/** (Re-)initialize mermaid when theme changes */
function ensureMermaidInit(isDark: boolean) {
  const theme = isDark ? "dark" : "default";
  if (lastMermaidTheme === theme) return;
  mermaid.initialize({
    startOnLoad: false,
    theme,
    securityLevel: "loose",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  });
  lastMermaidTheme = theme;
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

  const isDark = pluginId !== "plain-renderer";
  ensureMermaidInit(isDark);

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
    // 1. Torrent-specific: merge consecutive lines without blank line
    const preprocessed = req.pluginId === "torrent-renderer"
      ? torrentPreprocess(req.markdown)
      : req.markdown;

    // 2. Extract mermaid blocks before unified pipeline (Shiki won't touch them)
    const { markdown: cleanMd, blocks: mermaidBlocks } = extractMermaidBlocks(preprocessed);

    // 3. Run unified pipeline (remark → rehype → Shiki → stringify)
    const file = await processor.process(cleanMd);
    let rawHtml = String(file);

    // 4. Render mermaid blocks to SVG and inject
    rawHtml = await injectMermaidSvg(rawHtml, mermaidBlocks, req.pluginId);

    // Resolve plugin-specific styles, wrapper class, and inner HTML structure
    let css: string;
    let wrapperClass: string;
    let inner: string;

    if (req.pluginId === "plain-renderer") {
      css = getPlainStyles();
      wrapperClass = getPlainWrapperClass();
      inner = rawHtml;
    } else if (req.pluginId === "torrent-renderer") {
      css = getTorrentStyles();
      wrapperClass = getTorrentWrapperClass();
      inner = getTorrentInnerHtml(rawHtml);
    } else {
      css = getCoolStyles();
      wrapperClass = getCoolWrapperClass();
      inner = `<div class="cool-scroll"><div class="cool-content">${rawHtml}</div></div>`;
    }

    const html = `<div class="${wrapperClass}">${inner}</div>`;
    const timeMs = Math.round(performance.now() - start);

    return { id: req.id, html, css, timeMs };
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
): Promise<RenderResponse> {
  const id = uid();
  const req: RenderRequest = { id, markdown, pluginId, slideSize, slideIndex };
  return render(req);
}

/** No-op for API compatibility */
export function terminateWorker(): void {
  // No worker to terminate in main-thread mode
}
