import { useCallback } from "react";
import { useProjectStore } from "@/modules/projectStore";
import { useEditorStore } from "@/modules/editorStore";
import { MarkdownEditor } from "@/components/MarkdownEditor";

export function EditorPanel() {
  const slides = useProjectStore((s) => s.project.slides);
  const updateContent = useProjectStore((s) => s.updateSlideContent);
  const updateNotes = useProjectStore((s) => s.updateSlideNotes);
  const currentIndex = useEditorStore((s) => s.currentSlideIndex);
  const currentSlide = slides[currentIndex];

  const handleContentChange = useCallback(
    (val: string) => {
      updateContent(currentIndex, val);
    },
    [updateContent, currentIndex],
  );

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNotes(currentIndex, e.target.value);
    },
    [updateNotes, currentIndex],
  );

  const handleSave = useCallback(() => {
    // Will be implemented in TICKET-004 save logic
    console.log("[save] Ctrl+S triggered");
  }, []);

  if (!currentSlide) {
    return (
      <section className="h-full flex items-center justify-center bg-zinc-900 border-r border-zinc-700">
        <span className="text-zinc-500 text-sm">无页面</span>
      </section>
    );
  }

  return (
    <section className="h-full flex flex-col bg-zinc-900 border-r border-zinc-700">
      {/* Header */}
      <div className="h-9 flex items-center px-3 border-b border-zinc-700 shrink-0">
        <span className="text-xs text-zinc-400 font-medium">编辑</span>
        <span className="text-[10px] text-zinc-500 ml-2">
          {currentSlide.title}
        </span>
      </div>

      {/* CodeMirror editor */}
      <div className="flex-1 overflow-hidden">
        <MarkdownEditor
          key={currentSlide.slideId}
          value={currentSlide.markdownContent}
          onChange={handleContentChange}
          onSave={handleSave}
        />
      </div>

      {/* Speaker notes */}
      <div className="border-t border-zinc-700 px-3 py-2 shrink-0">
        <span className="text-[10px] text-zinc-500 block mb-1">演讲者备注</span>
        <textarea
          value={currentSlide.notes}
          onChange={handleNotesChange}
          placeholder="在此输入备注…"
          className="w-full h-16 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 resize-none focus:outline-none focus:border-zinc-500"
        />
      </div>
    </section>
  );
}
