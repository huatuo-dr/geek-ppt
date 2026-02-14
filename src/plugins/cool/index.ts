import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getCoolStyles } from "./coolStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const coolRendererPlugin: RendererPlugin = {
  pluginId: "cool-renderer",
  version: "1.0.0",
  displayName: "酷炫",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getCoolStyles,
};
