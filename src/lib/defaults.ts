import type { SlideSize } from "@/types";

/** Available slide size presets */
export const SLIDE_SIZE_PRESETS: SlideSize[] = [
  { width: 1920, height: 1080, label: "16:9" },
  { width: 1024, height: 768, label: "4:3" },
  { width: 2560, height: 1080, label: "21:9" },
  { width: 1080, height: 1920, label: "9:16" },
  { width: 1123, height: 794, label: "A4" },
];

/** Default slide size (16:9) */
export const DEFAULT_SLIDE_SIZE: SlideSize = SLIDE_SIZE_PRESETS[0]!;

/** Default active plugin */
export const DEFAULT_PLUGIN_ID = "plain-renderer";
