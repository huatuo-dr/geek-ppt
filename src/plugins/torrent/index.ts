import type { RendererPlugin, MarkdownNodeType } from "@/types";
import { getTorrentStyles } from "./torrentStyles";

const ALL_NODE_TYPES: MarkdownNodeType[] = [
  "heading", "paragraph", "strong", "emphasis", "delete",
  "link", "image", "inlineCode", "code", "blockquote",
  "list", "listItem", "table", "thematicBreak", "text", "html",
];

export const torrentRendererPlugin: RendererPlugin = {
  pluginId: "torrent-renderer",
  version: "1.0.0",
  displayName: "激流",
  supportedNodeTypes: ALL_NODE_TYPES,
  getStyles: getTorrentStyles,
};
