import { useCallback, useRef } from "react";

interface ResizeHandleProps {
  /** Direction of resize: vertical means drag left/right */
  direction: "vertical";
  /** Called when drag starts, before any delta */
  onDragStart?: () => void;
  /** Called continuously during drag with pixel delta from drag start */
  onResize: (delta: number) => void;
  /** Called when drag ends */
  onResizeEnd?: () => void;
}

/**
 * A draggable divider between panels.
 * Renders a narrow bar that changes cursor and highlights on hover/drag.
 */
export function ResizeHandle({ direction: _direction, onDragStart, onResize, onResizeEnd }: ResizeHandleProps) {
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startXRef.current = e.clientX;
      draggingRef.current = true;
      onDragStart?.();

      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);
      target.dataset.dragging = "true";

      const handleMove = (ev: PointerEvent) => {
        if (!draggingRef.current) return;
        const delta = ev.clientX - startXRef.current;
        onResize(delta);
      };

      const handleUp = () => {
        draggingRef.current = false;
        target.dataset.dragging = "false";
        onResizeEnd?.();
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [onDragStart, onResize, onResizeEnd],
  );

  return (
    <div
      onPointerDown={handlePointerDown}
      className="
        w-1.5 shrink-0 cursor-col-resize
        bg-zinc-700 hover:bg-indigo-500/50
        data-[dragging=true]:bg-indigo-500/70
        transition-colors
        flex items-center justify-center
        group
      "
    >
      {/* Visual grip dots */}
      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
      </div>
    </div>
  );
}
