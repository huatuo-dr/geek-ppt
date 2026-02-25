import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getAcademicStyles } from "./academicStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const academicRendererPlugin: RendererPlugin = {
  pluginId: "academic-renderer",
  version: "1.0.0",
  displayName: "学术",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getAcademicStyles,
};
