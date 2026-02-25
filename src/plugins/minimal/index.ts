import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getMinimalStyles } from "./minimalStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const minimalRendererPlugin: RendererPlugin = {
  pluginId: "minimal-renderer",
  version: "1.0.0",
  displayName: "极简",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getMinimalStyles,
};
