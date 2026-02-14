/** Supported Markdown AST node types that plugins must handle */
export type MarkdownNodeType =
  | "heading"
  | "paragraph"
  | "strong"
  | "emphasis"
  | "delete"
  | "link"
  | "image"
  | "inlineCode"
  | "code"
  | "blockquote"
  | "list"
  | "listItem"
  | "table"
  | "thematicBreak"
  | "text"
  | "html";

/** Render context passed to plugin render functions */
export interface RenderContext {
  pluginId: string;
  slideIndex: number;
  slideSize: { width: number; height: number };
}

/** Plugin interface that all renderers must implement */
export interface RendererPlugin {
  pluginId: string;
  version: string;
  displayName: string;
  supportedNodeTypes: MarkdownNodeType[];
  /** Return the plugin's CSS as a string */
  getStyles(): string;
}

/** Message sent from main thread to render worker */
export interface RenderRequest {
  id: string;
  markdown: string;
  pluginId: string;
  slideSize: { width: number; height: number };
  slideIndex: number;
}

/** Message sent from render worker back to main thread */
export interface RenderResponse {
  id: string;
  html: string;
  css: string;
  timeMs: number;
  error?: string;
}
