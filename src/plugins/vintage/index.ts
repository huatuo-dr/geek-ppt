import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getVintageStyles } from "./vintageStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const vintageRendererPlugin: RendererPlugin = {
  pluginId: "vintage-renderer",
  version: "1.0.0",
  displayName: "复古",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getVintageStyles,
};
