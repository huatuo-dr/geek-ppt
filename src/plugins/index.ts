/**
 * Plugin initialization — register all built-in plugins at app startup.
 */

import { registerPlugin } from "@/services/pluginRegistry";
import { plainRendererPlugin } from "./plain";
import { coolRendererPlugin } from "./cool";
import { torrentRendererPlugin } from "./torrent";
import { academicRendererPlugin } from "./academic";
import { inkRendererPlugin } from "./ink";
import { cyberpunkRendererPlugin } from "./cyberpunk";
import { vintageRendererPlugin } from "./vintage";
import { minimalRendererPlugin } from "./minimal";

export function initPlugins(): void {
  registerPlugin(plainRendererPlugin);
  registerPlugin(coolRendererPlugin);
  registerPlugin(torrentRendererPlugin);
  registerPlugin(academicRendererPlugin);
  registerPlugin(inkRendererPlugin);
  registerPlugin(cyberpunkRendererPlugin);
  registerPlugin(vintageRendererPlugin);
  registerPlugin(minimalRendererPlugin);
}
