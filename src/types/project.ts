/** Slide size preset */
export interface SlideSize {
  width: number;
  height: number;
  label: string;
}

/** Single slide in a project */
export interface Slide {
  slideId: string;
  order: number;
  title: string;
  markdownContent: string;
  notes: string;
  template?: "cover" | "content" | "two-column";
}

/** Plugin configuration reference */
export interface PluginConfig {
  activePluginId: string;
}



/** Custom CSS-based theme */
export interface CustomTheme {
  themeId: string;
  displayName: string;
  css: string;
}

/** Project root model */
export interface Project {
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slides: Slide[];
  pluginConfig: PluginConfig;
  customThemes?: CustomTheme[];
  slideSize: SlideSize;
  formatVersion: number;
}

/** Asset metadata */
export interface Asset {
  assetId: string;
  path: string;
  type: "image" | "video" | "font" | "other";
  hash: string;
  size: number;
}
