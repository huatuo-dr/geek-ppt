import { useState, useCallback, useRef } from "react";
import { Toolbar } from "./Toolbar";
import { SlideList } from "./SlideList";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import { PresentationMode } from "./PresentationMode";
import { ResizeHandle } from "@/components/ResizeHandle";
import { initPlugins } from "@/plugins";
import { useGlobalShortcuts } from "./useGlobalShortcuts";

// Register plugins synchronously at module load, before any render
initPlugins();

/** Default widths (px) */
const DEFAULT_SLIDE_LIST_W = 192;
const DEFAULT_EDITOR_W = 560;
const MIN_SLIDE_LIST_W = 120;
const MAX_SLIDE_LIST_W = 360;
const MIN_EDITOR_W = 240;
const MIN_PREVIEW_W = 300;

export function App() {

  useGlobalShortcuts();

  // Panel widths: slide list + editor are explicit, preview fills remaining space
  const [slideListW, setSlideListW] = useState(DEFAULT_SLIDE_LIST_W);
  const [editorW, setEditorW] = useState(DEFAULT_EDITOR_W);

  // Snapshot values at drag start
  const snapRef = useRef({ slideListW: 0, editorW: 0 });

  // --- Handle 1: between SlideList and Editor ---
  const onHandle1Start = useCallback(() => {
    snapRef.current.slideListW = slideListW;
  }, [slideListW]);

  const onHandle1Resize = useCallback((delta: number) => {
    const newW = Math.max(MIN_SLIDE_LIST_W, Math.min(MAX_SLIDE_LIST_W, snapRef.current.slideListW + delta));
    setSlideListW(newW);
  }, []);

  // --- Handle 2: between Editor and Preview ---
  const onHandle2Start = useCallback(() => {
    snapRef.current.editorW = editorW;
  }, [editorW]);

  const onHandle2Resize = useCallback((delta: number) => {
    const totalW = window.innerWidth;
    const maxEditorW = totalW - slideListW - MIN_PREVIEW_W - 12; // 12 = 2 handles * 6px
    const newW = Math.max(MIN_EDITOR_W, Math.min(maxEditorW, snapRef.current.editorW + delta));
    setEditorW(newW);
  }, [slideListW]);

  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-100 flex flex-col overflow-hidden select-none">
      <Toolbar />
      <main className="flex-1 flex overflow-hidden">
        {/* Slide list — fixed width */}
        <div style={{ width: slideListW, minWidth: MIN_SLIDE_LIST_W }} className="shrink-0">
          <SlideList />
        </div>

        <ResizeHandle direction="vertical" onResize={onHandle1Resize} onResizeEnd={() => {}} onDragStart={onHandle1Start} />

        {/* Editor — fixed width */}
        <div style={{ width: editorW, minWidth: MIN_EDITOR_W }} className="shrink-0">
          <EditorPanel />
        </div>

        <ResizeHandle direction="vertical" onResize={onHandle2Resize} onResizeEnd={() => {}} onDragStart={onHandle2Start} />

        {/* Preview — fills remaining space */}
        <div className="flex-1 min-w-[300px]">
          <PreviewPanel />
        </div>
      </main>
      <PresentationMode />
    </div>
  );
}
