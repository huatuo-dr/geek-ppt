import { useEffect } from "react";
import { useProjectStore } from "@/modules/projectStore";
import { useEditorStore } from "@/modules/editorStore";
import { usePresentationStore } from "@/modules/presentationStore";
import { saveProject } from "@/services/projectIO";

/**
 * Register global keyboard shortcuts:
 * - F5: Enter presentation mode
 * - Ctrl+S: Save project
 * - Ctrl+N: Add new slide
 * - Ctrl+Delete: Delete current slide
 */
export function useGlobalShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // F5 -> presentation
      if (e.key === "F5") {
        e.preventDefault();
        const idx = useEditorStore.getState().currentSlideIndex;
        usePresentationStore.getState().enter(idx);
        return;
      }

      // Ctrl+S -> save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        const project = useProjectStore.getState().project;
        saveProject(project).then(() => {
          useProjectStore.getState().markSaved();
        });
        return;
      }

      // Ctrl+N -> add slide
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        const idx = useEditorStore.getState().currentSlideIndex;
        useProjectStore.getState().addSlide(idx);
        useEditorStore.getState().setCurrentSlideIndex(idx + 1);
        return;
      }

      // Ctrl+Delete -> delete slide
      if ((e.ctrlKey || e.metaKey) && e.key === "Delete") {
        e.preventDefault();
        const state = useProjectStore.getState();
        const editorState = useEditorStore.getState();
        if (state.project.slides.length <= 1) return;
        const idx = editorState.currentSlideIndex;
        state.deleteSlide(idx);
        editorState.setCurrentSlideIndex(Math.min(idx, state.project.slides.length - 2));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
