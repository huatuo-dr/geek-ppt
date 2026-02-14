import { useProjectStore } from "@/modules/projectStore";
import { useEditorStore } from "@/modules/editorStore";
import { useCallback, useState, useRef, useEffect } from "react";

export function SlideList() {
  const slides = useProjectStore((s) => s.project.slides);
  const addSlide = useProjectStore((s) => s.addSlide);
  const deleteSlide = useProjectStore((s) => s.deleteSlide);
  const moveSlide = useProjectStore((s) => s.moveSlide);
  const updateSlideTitle = useProjectStore((s) => s.updateSlideTitle);
  const currentIndex = useEditorStore((s) => s.currentSlideIndex);
  const setCurrentIndex = useEditorStore((s) => s.setCurrentSlideIndex);

  // Track which slide is being renamed (-1 = none)
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startRename = useCallback((idx: number, currentTitle: string) => {
    setEditValue(currentTitle);
    setEditingIndex(idx);
  }, []);

  const commitRename = useCallback(() => {
    if (editingIndex < 0) return;
    const trimmed = editValue.trim();
    if (trimmed) {
      updateSlideTitle(editingIndex, trimmed);
    }
    setEditingIndex(-1);
  }, [editingIndex, editValue, updateSlideTitle]);

  const cancelRename = useCallback(() => {
    setEditingIndex(-1);
  }, []);

  // Auto-focus input when entering rename mode
  useEffect(() => {
    if (editingIndex >= 0) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editingIndex]);

  const handleAdd = useCallback(() => {
    addSlide(currentIndex);
    setCurrentIndex(currentIndex + 1);
  }, [addSlide, currentIndex, setCurrentIndex]);

  const handleDelete = useCallback(() => {
    if (slides.length <= 1) return;
    deleteSlide(currentIndex);
    setCurrentIndex(Math.min(currentIndex, slides.length - 2));
  }, [deleteSlide, currentIndex, slides.length, setCurrentIndex]);

  const handleMoveUp = useCallback(() => {
    if (currentIndex <= 0) return;
    moveSlide(currentIndex, currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
  }, [moveSlide, currentIndex, setCurrentIndex]);

  const handleMoveDown = useCallback(() => {
    if (currentIndex >= slides.length - 1) return;
    moveSlide(currentIndex, currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  }, [moveSlide, currentIndex, slides.length, setCurrentIndex]);

  return (
    <aside
      className="h-full flex flex-col overflow-hidden border-r border-zinc-700"
      style={{ backgroundColor: "rgb(30 30 32)" }}
    >
      {/* Header + actions */}
      <div className="h-9 flex items-center justify-between px-2 border-b border-zinc-700 shrink-0">
        <span className="text-xs text-zinc-400 font-medium pl-1">页面</span>
        <div className="flex items-center gap-0.5">
          <SmallBtn title="上移" onClick={handleMoveUp}>↑</SmallBtn>
          <SmallBtn title="下移" onClick={handleMoveDown}>↓</SmallBtn>
          <SmallBtn title="新增页面" onClick={handleAdd}>+</SmallBtn>
          <SmallBtn title="删除页面" onClick={handleDelete}>×</SmallBtn>
        </div>
      </div>

      {/* Slide items */}
      <div className="flex-1 overflow-y-auto py-1.5 px-2 space-y-1">
        {slides.map((slide, idx) => (
          <div
            key={slide.slideId}
            onClick={() => { if (editingIndex !== idx) setCurrentIndex(idx); }}
            onDoubleClick={() => startRename(idx, slide.title)}
            className={`
              w-full text-left px-2.5 py-2 rounded text-sm transition-colors cursor-pointer
              ${idx === currentIndex
                ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/40"
                : "text-zinc-400 hover:bg-zinc-700/60 border border-transparent"
              }
            `}
          >
            <span className="text-xs text-zinc-500 mr-1.5">{idx + 1}.</span>
            {editingIndex === idx ? (
              <input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitRename();
                  if (e.key === "Escape") cancelRename();
                  e.stopPropagation();
                }}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
                className="bg-zinc-700 border border-zinc-500 rounded px-1 py-0 text-sm text-zinc-200 w-[calc(100%-24px)] focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <span className="truncate" title="双击修改名称">{slide.title || "无标题"}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="h-7 flex items-center justify-center border-t border-zinc-700 shrink-0">
        <span className="text-[10px] text-zinc-500">{slides.length} 页</span>
      </div>
    </aside>
  );
}

function SmallBtn({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded transition-colors"
    >
      {children}
    </button>
  );
}
