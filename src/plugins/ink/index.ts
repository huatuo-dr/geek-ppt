import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getInkStyles } from "./inkStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const inkRendererPlugin: RendererPlugin = {
  pluginId: "ink-renderer",
  version: "1.0.0",
  displayName: "水墨",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getInkStyles,
};
