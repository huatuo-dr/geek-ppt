import { create } from "zustand";

export interface PresentationState {
  /** Whether presentation mode is active */
  active: boolean;
  /** Current slide index in presentation */
  currentSlide: number;
  /** Whether thumbnail grid is open */
  thumbnailGridOpen: boolean;

  // --- Actions ---
  enter: (startSlide?: number) => void;
  exit: () => void;
  goTo: (index: number) => void;
  next: (total: number) => void;
  prev: () => void;
  toggleThumbnailGrid: () => void;
  closeThumbnailGrid: () => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
  active: false,
  currentSlide: 0,
  thumbnailGridOpen: false,

  enter: (startSlide = 0) =>
    set({ active: true, currentSlide: startSlide, thumbnailGridOpen: false }),

  exit: () =>
    set({ active: false, thumbnailGridOpen: false }),

  goTo: (index) =>
    set({ currentSlide: index, thumbnailGridOpen: false }),

  next: (total) =>
    set((s) => ({
      currentSlide: Math.min(s.currentSlide + 1, total - 1),
    })),

  prev: () =>
    set((s) => ({
      currentSlide: Math.max(s.currentSlide - 1, 0),
    })),

  toggleThumbnailGrid: () =>
    set((s) => ({ thumbnailGridOpen: !s.thumbnailGridOpen })),

  closeThumbnailGrid: () =>
    set({ thumbnailGridOpen: false }),
}));
