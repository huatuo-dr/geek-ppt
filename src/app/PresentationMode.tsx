import { useEffect, useRef, useState, useCallback } from "react";
import { useProjectStore } from "@/modules/projectStore";
import { usePresentationStore } from "@/modules/presentationStore";
import { requestRender } from "@/services/renderService";

export function PresentationMode() {
  const active = usePresentationStore((s) => s.active);
  const currentSlide = usePresentationStore((s) => s.currentSlide);
  const thumbnailGridOpen = usePresentationStore((s) => s.thumbnailGridOpen);
  const exit = usePresentationStore((s) => s.exit);
  const goTo = usePresentationStore((s) => s.goTo);
  const next = usePresentationStore((s) => s.next);
  const prev = usePresentationStore((s) => s.prev);
  const toggleThumbnailGrid = usePresentationStore((s) => s.toggleThumbnailGrid);
  const closeThumbnailGrid = usePresentationStore((s) => s.closeThumbnailGrid);

  const slides = useProjectStore((s) => s.project.slides);
  const pluginId = useProjectStore((s) => s.project.pluginConfig.activePluginId);
  const slideSize = useProjectStore((s) => s.project.slideSize);
  const total = slides.length;

  // Rendered cache
  const [renderedSlides, setRenderedSlides] = useState<Map<number, { html: string; css: string }>>(new Map());
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  // Init Shadow DOM
  useEffect(() => {
    if (shadowHostRef.current && !shadowRootRef.current) {
      shadowRootRef.current = shadowHostRef.current.attachShadow({ mode: "open" });
    }
  }, [active]);

  // Render current slide
  const renderSlide = useCallback(async (idx: number) => {
    const slide = slides[idx];
    if (!slide) return;
    if (renderedSlides.has(idx)) return;

    const resp = await requestRender(slide.markdownContent, pluginId, slideSize, idx);
    if (!resp.error) {
      setRenderedSlides((prev) => new Map(prev).set(idx, { html: resp.html, css: resp.css }));
    }
  }, [slides, pluginId, slideSize, renderedSlides]);

  // Pre-render current and adjacent slides
  useEffect(() => {
    if (!active) return;
    renderSlide(currentSlide);
    if (currentSlide > 0) renderSlide(currentSlide - 1);
    if (currentSlide < total - 1) renderSlide(currentSlide + 1);
  }, [active, currentSlide, total, renderSlide]);

  // Display current slide in Shadow DOM
  useEffect(() => {
    const shadowRoot = shadowRootRef.current;
    if (!shadowRoot || !active) return;
    const cached = renderedSlides.get(currentSlide);
    if (cached) {
      shadowRoot.innerHTML = `<style>${cached.css}</style>${cached.html}`;
    }
  }, [active, currentSlide, renderedSlides]);

  // Keyboard navigation
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (thumbnailGridOpen) {
          closeThumbnailGrid();
        } else {
          exit();
        }
        return;
      }
      if (thumbnailGridOpen) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        next(total);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, thumbnailGridOpen, total, next, prev, exit, closeThumbnailGrid]);

  // Clear cache when leaving
  useEffect(() => {
    if (!active) setRenderedSlides(new Map());
  }, [active]);

  if (!active) return null;

  const pageLabel = `${String(currentSlide + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          ref={shadowHostRef}
          style={{
            width: slideSize.width,
            height: slideSize.height,
            transformOrigin: "center",
            transform: `scale(var(--slide-scale, 1))`,
          }}
        />
        <SlideScaler slideSize={slideSize} />
      </div>

      {/* Navigation bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full z-[60]">
        <NavButton onClick={() => prev()} title="上一页">‹</NavButton>
        <button
          type="button"
          onClick={toggleThumbnailGrid}
          className="text-zinc-400 hover:text-white text-sm min-w-[60px] text-center transition-colors"
          title="查看全部页面"
        >
          {pageLabel}
        </button>
        <NavButton onClick={() => next(total)} title="下一页">›</NavButton>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={exit}
        className="fixed top-4 right-4 text-zinc-500 hover:text-white text-xl z-[60] w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        title="退出演示 (Esc)"
      >
        ✕
      </button>

      {/* Thumbnail grid overlay */}
      {thumbnailGridOpen && (
        <ThumbnailGrid
          slides={slides}
          currentSlide={currentSlide}
          renderedSlides={renderedSlides}
          pluginId={pluginId}
          slideSize={slideSize}
          onSelect={goTo}
          onClose={closeThumbnailGrid}
        />
      )}
    </div>
  );
}

/** Auto-scale slide to fit viewport */
function SlideScaler({ slideSize }: { slideSize: { width: number; height: number } }) {
  useEffect(() => {
    function update() {
      const scale = Math.min(
        window.innerWidth / slideSize.width,
        (window.innerHeight - 80) / slideSize.height,
        1,
      );
      document.documentElement.style.setProperty("--slide-scale", String(scale));
    }
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--slide-scale");
    };
  }, [slideSize]);
  return null;
}

function NavButton({ children, onClick, title }: { children: React.ReactNode; onClick: () => void; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="text-zinc-400 hover:text-white text-xl px-2 py-1 rounded transition-colors hover:bg-white/10"
    >
      {children}
    </button>
  );
}

/** Thumbnail grid overlay — shows all slides for quick navigation */
function ThumbnailGrid({
  slides,
  currentSlide,
  renderedSlides,
  pluginId: _pluginId,
  slideSize,
  onSelect,
  onClose,
}: {
  slides: Array<{ slideId: string; title: string; markdownContent: string }>;
  currentSlide: number;
  renderedSlides: Map<number, { html: string; css: string }>;
  pluginId: string;
  slideSize: { width: number; height: number };
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="max-w-[90vw] max-h-[85vh] overflow-auto p-6 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((slide, idx) => {
          const cached = renderedSlides.get(idx);
          return (
            <button
              key={slide.slideId}
              type="button"
              onClick={() => onSelect(idx)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                idx === currentSlide
                  ? "border-indigo-500 shadow-lg shadow-indigo-500/30"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
              style={{ aspectRatio: `${slideSize.width} / ${slideSize.height}` }}
            >
              {cached ? (
                <div
                  className="w-full h-full text-[4px] overflow-hidden bg-white"
                  dangerouslySetInnerHTML={{
                    __html: `<style>${cached.css}</style>${cached.html}`,
                  }}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-500 text-xs">{slide.title || `第${idx + 1}页`}</span>
                </div>
              )}
              {/* Page number badge */}
              <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-zinc-300 px-1.5 py-0.5 rounded">
                {idx + 1}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
