import { useEffect, useRef, useCallback } from "react";
import { useProjectStore } from "@/modules/projectStore";
import { useEditorStore } from "@/modules/editorStore";
import { usePreviewStore } from "@/modules/previewStore";
import { requestRender } from "@/services/renderService";

export function PreviewPanel() {
  const slides = useProjectStore((s) => s.project.slides);
  const pluginId = useProjectStore((s) => s.project.pluginConfig.activePluginId);
  const customThemes = useProjectStore((s) => s.project.customThemes);
  const slideSize = useProjectStore((s) => s.project.slideSize);
  const currentIndex = useEditorStore((s) => s.currentSlideIndex);
  const renderedHtml = usePreviewStore((s) => s.renderedHtml);
  const renderedCss = usePreviewStore((s) => s.renderedCss);
  const rendering = usePreviewStore((s) => s.rendering);
  const renderError = usePreviewStore((s) => s.renderError);
  const renderTimeMs = usePreviewStore((s) => s.renderTimeMs);
  const setRenderResult = usePreviewStore((s) => s.setRenderResult);
  const setRenderError = usePreviewStore((s) => s.setRenderError);
  const setRendering = usePreviewStore((s) => s.setRendering);

  const currentSlide = slides[currentIndex];
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  // Initialize Shadow DOM once
  useEffect(() => {
    if (shadowHostRef.current && !shadowRootRef.current) {
      shadowRootRef.current = shadowHostRef.current.attachShadow({ mode: "open" });
    }
  }, []);

  // Render into Shadow DOM when html/css change
  useEffect(() => {
    const shadowRoot = shadowRootRef.current;
    if (!shadowRoot) return;
    shadowRoot.innerHTML = `<style>${renderedCss}</style>${renderedHtml}`;

    // Check for scrolling and add class for ink/vintage themes
    if (pluginId === "ink-renderer" || pluginId === "vintage-renderer") {
      const slideEl = shadowRoot.querySelector('.ink-slide, .vintage-slide') as HTMLElement;
      if (slideEl) {
        const checkScroll = () => {
          const hasScroll = slideEl.scrollHeight > slideEl.clientHeight;
          slideEl.classList.toggle('scrolling', hasScroll);
        };
        checkScroll();
        const observer = new MutationObserver(checkScroll);
        observer.observe(slideEl, { childList: true, subtree: true });
        return () => observer.disconnect();
      }
    }
  }, [renderedHtml, renderedCss, pluginId]);

  // Debounced render trigger
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const triggerRender = useCallback(() => {
    if (!currentSlide) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setRendering(true);
      const customTheme = (customThemes || []).find(t => t.themeId === pluginId);
      const resp = await requestRender(
        currentSlide.markdownContent,
        pluginId,
        slideSize,
        currentIndex,
        customTheme?.css,
      );
      if (resp.error) {
        setRenderError(resp.error);
      } else {
        setRenderResult(resp.html, resp.css, resp.timeMs);
      }
    }, 200);
  }, [currentSlide, pluginId, slideSize, currentIndex, setRendering, setRenderResult, setRenderError]);

  // Re-render when content, plugin, or slide changes
  useEffect(() => {
    triggerRender();
    return () => clearTimeout(timerRef.current);
  }, [triggerRender]);

  return (
    <section className="h-full w-full flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="h-9 flex items-center px-3 border-b border-zinc-700 shrink-0 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">预览</span>
          {rendering && <span className="text-[10px] text-amber-400 animate-pulse">渲染中…</span>}
          {!rendering && renderTimeMs > 0 && (
            <span className="text-[10px] text-zinc-600">{renderTimeMs}ms</span>
          )}
        </div>
        <span className="text-[10px] text-zinc-500">
          {slideSize.label} · {slideSize.width}×{slideSize.height}
        </span>
      </div>

      {/* Preview canvas */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          className="rounded-lg shadow-xl overflow-hidden relative bg-white"
          style={{
            aspectRatio: `${slideSize.width} / ${slideSize.height}`,
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
          }}
        >
          {renderError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-400 text-xs px-4 text-center">{renderError}</span>
            </div>
          ) : (
            <div ref={shadowHostRef} className="w-full h-full" />
          )}
        </div>
      </div>
    </section>
  );
}
