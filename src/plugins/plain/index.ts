import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getPlainStyles } from "./plainStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const plainRendererPlugin: RendererPlugin = {
  pluginId: "plain-renderer",
  version: "1.0.0",
  displayName: "朴素",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getPlainStyles,
};
