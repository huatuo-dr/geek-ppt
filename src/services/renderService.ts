/**
 * RenderService — manages markdown rendering.
 * Uses main-thread async rendering with the unified/remark pipeline.
 * Code blocks are highlighted by Shiki via @shikijs/rehype.
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import type { RenderRequest, RenderResponse } from "@/types";
import { uid } from "@/lib/id";
import { getPlainStyles, getPlainWrapperClass } from "@/plugins/plain/plainStyles";
import { getCoolStyles, getCoolWrapperClass } from "@/plugins/cool/coolStyles";

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

async function render(req: RenderRequest): Promise<RenderResponse> {
  const start = performance.now();
  try {
    const file = await processor.process(req.markdown);
    const rawHtml = String(file);

    const isPlain = req.pluginId === "plain-renderer";
    const css = isPlain ? getPlainStyles() : getCoolStyles();
    const wrapperClass = isPlain ? getPlainWrapperClass() : getCoolWrapperClass();

    // Cool renderer needs an inner content wrapper for flex centering
    const inner = isPlain ? rawHtml : `<div class="cool-scroll"><div class="cool-content">${rawHtml}</div></div>`;
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
