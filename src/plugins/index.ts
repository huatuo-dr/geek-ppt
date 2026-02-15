/**
 * Plugin initialization — register all built-in plugins at app startup.
 */

import { registerPlugin } from "@/services/pluginRegistry";
import { plainRendererPlugin } from "./plain";
import { coolRendererPlugin } from "./cool";
import { torrentRendererPlugin } from "./torrent";

export function initPlugins(): void {
  registerPlugin(plainRendererPlugin);
  registerPlugin(coolRendererPlugin);
  registerPlugin(torrentRendererPlugin);
}
