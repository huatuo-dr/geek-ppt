import { create } from "zustand";
import type { Project, Slide, SlideSize, PluginConfig } from "@/types";
import { DEFAULT_SLIDE_SIZE, DEFAULT_PLUGIN_ID } from "@/lib/defaults";
import { uid } from "@/lib/id";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function createDefaultSlide(order: number): Slide {
  return {
    slideId: uid(),
    order,
    title: order === 0 ? "封面" : `第 ${order + 1} 页`,
    markdownContent: order === 0 ? "# 欢迎使用 Geek PPT\n" : "",
    notes: "",
    template: order === 0 ? "cover" : "content",
  };
}

function createDefaultProject(): Project {
  const now = new Date().toISOString();
  return {
    projectId: uid(),
    name: "未命名演示",
    createdAt: now,
    updatedAt: now,
    slides: [createDefaultSlide(0)],
    pluginConfig: { activePluginId: DEFAULT_PLUGIN_ID },
    customThemes: [],
    slideSize: { ...DEFAULT_SLIDE_SIZE },
    formatVersion: 1,
  };
}

/** Re-number slide order fields after mutation */
function reorder(slides: Slide[]): Slide[] {
  return slides.map((s, i) => ({ ...s, order: i }));
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface ProjectState {
  project: Project;
  dirty: boolean;

  // --- Project lifecycle ---
  newProject: () => void;
  loadProject: (project: Project) => void;
  markSaved: () => void;
  setProjectName: (name: string) => void;
  setSlideSize: (size: SlideSize) => void;
  setPluginConfig: (config: PluginConfig) => void;

  // --- Custom Themes ---
  addCustomTheme: (theme: CustomTheme) => void;
  updateCustomTheme: (themeId: string, updates: Partial<CustomTheme>) => void;
  deleteCustomTheme: (themeId: string) => void;

  // --- Slide CRUD ---
  addSlide: (afterIndex: number) => void;
  deleteSlide: (index: number) => void;
  moveSlide: (fromIndex: number, toIndex: number) => void;
  updateSlideContent: (index: number, markdownContent: string) => void;
  updateSlideTitle: (index: number, title: string) => void;
  updateSlideNotes: (index: number, notes: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: createDefaultProject(),
  dirty: false,

  // --- Project lifecycle ---

  newProject: () =>
    set({ project: createDefaultProject(), dirty: false }),

  loadProject: (project) =>
    set({ project, dirty: false }),

  markSaved: () =>
    set((s) => ({
      dirty: false,
      project: { ...s.project, updatedAt: new Date().toISOString() },
    })),

  setProjectName: (name) =>
    set((s) => ({
      dirty: true,
      project: { ...s.project, name },
    })),

  setSlideSize: (size) =>
    set((s) => ({
      dirty: true,
      project: { ...s.project, slideSize: size },
    })),

  setPluginConfig: (config) =>
    set((s) => ({
      dirty: true,
      project: { ...s.project, pluginConfig: config },
    })),

  // --- Custom Themes ---

  addCustomTheme: (theme) =>
    set((s) => ({
      dirty: true,
      project: {
        ...s.project,
        customThemes: [...(s.project.customThemes || []), theme],
      },
    })),

  updateCustomTheme: (themeId, updates) =>
    set((s) => ({
      dirty: true,
      project: {
        ...s.project,
        customThemes: (s.project.customThemes || []).map((t) =>
          t.themeId === themeId ? { ...t, ...updates } : t,
        ),
      },
    })),

  deleteCustomTheme: (themeId) =>
    set((s) => ({
      dirty: true,
      project: {
        ...s.project,
        customThemes: (s.project.customThemes || []).filter(
          (t) => t.themeId !== themeId,
        ),
      },
    })),

  // --- Slide CRUD ---

  addSlide: (afterIndex) =>
    set((s) => {
      const newSlide = createDefaultSlide(afterIndex + 1);
      const slides = [...s.project.slides];
      slides.splice(afterIndex + 1, 0, newSlide);
      return {
        dirty: true,
        project: { ...s.project, slides: reorder(slides) },
      };
    }),

  deleteSlide: (index) =>
    set((s) => {
      if (s.project.slides.length <= 1) return s;
      const slides = s.project.slides.filter((_, i) => i !== index);
      return {
        dirty: true,
        project: { ...s.project, slides: reorder(slides) },
      };
    }),

  moveSlide: (fromIndex, toIndex) =>
    set((s) => {
      const slides = [...s.project.slides];
      const [moved] = slides.splice(fromIndex, 1);
      if (!moved) return s;
      slides.splice(toIndex, 0, moved);
      return {
        dirty: true,
        project: { ...s.project, slides: reorder(slides) },
      };
    }),

  updateSlideContent: (index, markdownContent) =>
    set((s) => {
      const slides = s.project.slides.map((slide, i) =>
        i === index ? { ...slide, markdownContent } : slide,
      );
      return { dirty: true, project: { ...s.project, slides } };
    }),

  updateSlideTitle: (index, title) =>
    set((s) => {
      const slides = s.project.slides.map((slide, i) =>
        i === index ? { ...slide, title } : slide,
      );
      return { dirty: true, project: { ...s.project, slides } };
    }),

  updateSlideNotes: (index, notes) =>
    set((s) => {
      const slides = s.project.slides.map((slide, i) =>
        i === index ? { ...slide, notes } : slide,
      );
      return { dirty: true, project: { ...s.project, slides } };
    }),
}));
