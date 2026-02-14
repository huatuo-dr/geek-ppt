import { create } from "zustand";

export interface PreviewState {
  /** Rendered HTML for the current slide */
  renderedHtml: string;
  /** CSS string produced by the active plugin */
  renderedCss: string;
  /** Rendering duration in ms */
  renderTimeMs: number;
  /** Error message if rendering failed */
  renderError: string | null;
  /** Whether a render is in progress */
  rendering: boolean;

  // --- Actions ---
  setRenderResult: (html: string, css: string, timeMs: number) => void;
  setRenderError: (error: string) => void;
  setRendering: (v: boolean) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  renderedHtml: "",
  renderedCss: "",
  renderTimeMs: 0,
  renderError: null,
  rendering: false,

  setRenderResult: (html, css, timeMs) =>
    set({
      renderedHtml: html,
      renderedCss: css,
      renderTimeMs: timeMs,
      renderError: null,
      rendering: false,
    }),

  setRenderError: (error) =>
    set({ renderError: error, rendering: false }),

  setRendering: (v) => set({ rendering: v }),
}));
