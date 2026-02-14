import { create } from "zustand";

export interface EditorState {
  /** Index of the currently active slide */
  currentSlideIndex: number;
  /** Editing buffer (may differ from saved content while typing) */
  editBuffer: string;

  // --- Actions ---
  setCurrentSlideIndex: (index: number) => void;
  setEditBuffer: (content: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentSlideIndex: 0,
  editBuffer: "",

  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
  setEditBuffer: (content) => set({ editBuffer: content }),
}));
