import { useProjectStore } from "@/modules/projectStore";
import { useEditorStore } from "@/modules/editorStore";
import { useExportStore } from "@/modules/exportStore";
import { getAllPlugins } from "@/services/pluginRegistry";
import { SLIDE_SIZE_PRESETS } from "@/lib/defaults";
import { usePresentationStore } from "@/modules/presentationStore";
import { saveProject, importProject, clearFileHandle } from "@/services/projectIO";
import { exportPresentation } from "@/services/exportService";
import { createTemplateSlides } from "@/lib/templateSlides";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState, useRef, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Pending action — what to do after the user confirms discard / save
// ---------------------------------------------------------------------------
type PendingAction = "new" | "import" | "template" | null;

export function Toolbar() {
  const projectName = useProjectStore((s) => s.project.name);
  const dirty = useProjectStore((s) => s.dirty);
  const pluginId = useProjectStore((s) => s.project.pluginConfig.activePluginId);
  const slideSize = useProjectStore((s) => s.project.slideSize);
  const project = useProjectStore((s) => s.project);
  const newProject = useProjectStore((s) => s.newProject);
  const loadProject = useProjectStore((s) => s.loadProject);
  const markSaved = useProjectStore((s) => s.markSaved);
  const setProjectName = useProjectStore((s) => s.setProjectName);
  const setPluginConfig = useProjectStore((s) => s.setPluginConfig);
  const setSlideSize = useProjectStore((s) => s.setSlideSize);
  const setCurrentSlideIndex = useEditorStore((s) => s.setCurrentSlideIndex);
  const setExportStatus = useExportStore((s) => s.setExportStatus);
  const exportStatus = useExportStore((s) => s.status);
  const enterPresentation = usePresentationStore((s) => s.enter);

  // --- Unsaved-changes confirmation dialog ---
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  /** Guard: if dirty, ask user first; if clean, execute immediately */
  const guardedAction = useCallback(
    (action: PendingAction, execute: () => void) => {
      if (dirty) {
        setPendingAction(action);
      } else {
        execute();
      }
    },
    [dirty],
  );

  // Concrete executors for each action
  const executeNew = useCallback(() => {
    clearFileHandle();
    newProject();
    setCurrentSlideIndex(0);
  }, [newProject, setCurrentSlideIndex]);

  const executeImport = useCallback(async () => {
    const imported = await importProject();
    if (imported) {
      loadProject(imported);
      setCurrentSlideIndex(0);
    }
  }, [loadProject, setCurrentSlideIndex]);

  const executeTemplate = useCallback(() => {
    const slides = createTemplateSlides();
    const now = new Date().toISOString();
    loadProject({
      projectId: "template",
      name: "语法模板预览",
      createdAt: now,
      updatedAt: now,
      slides,
      pluginConfig: { activePluginId: pluginId },
      slideSize: { ...slideSize },
      formatVersion: 1,
    });
    clearFileHandle();
    setCurrentSlideIndex(0);
  }, [loadProject, pluginId, slideSize, setCurrentSlideIndex]);

  const executePending = useCallback(() => {
    const action = pendingAction;
    setPendingAction(null);
    if (action === "new") executeNew();
    else if (action === "import") void executeImport();
    else if (action === "template") executeTemplate();
  }, [pendingAction, executeNew, executeImport, executeTemplate]);

  // --- Button handlers ---

  const handleNew = useCallback(() => guardedAction("new", executeNew), [guardedAction, executeNew]);
  const handleImport = useCallback(() => guardedAction("import", () => void executeImport()), [guardedAction, executeImport]);
  const handleTemplate = useCallback(() => guardedAction("template", executeTemplate), [guardedAction, executeTemplate]);

  const handleSave = useCallback(async () => {
    try {
      await saveProject(project);
      markSaved();
    } catch (err) {
      console.error("[save] Failed:", err);
    }
  }, [project, markSaved]);

  const handleExport = useCallback(async () => {
    setExportStatus("exporting", "导出中…");
    try {
      await exportPresentation(project);
      setExportStatus("success", "导出成功");
      setTimeout(() => setExportStatus("idle"), 2000);
    } catch (err) {
      setExportStatus("error", String(err));
      setTimeout(() => setExportStatus("idle"), 3000);
    }
  }, [project, setExportStatus]);

  const handlePreview = useCallback(() => {
    const currentIdx = useEditorStore.getState().currentSlideIndex;
    enterPresentation(currentIdx);
  }, [enterPresentation]);

  // --- Project name inline editing ---
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(projectName);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const startEditName = useCallback(() => {
    setNameInput(projectName);
    setEditingName(true);
  }, [projectName]);

  const commitName = useCallback(() => {
    const trimmed = nameInput.trim();
    if (trimmed && trimmed !== projectName) {
      setProjectName(trimmed);
    }
    setEditingName(false);
  }, [nameInput, projectName, setProjectName]);

  useEffect(() => {
    if (editingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [editingName]);

  // --- Dropdowns ---
  const [showPluginMenu, setShowPluginMenu] = useState(false);
  const pluginMenuRef = useRef<HTMLDivElement>(null);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const sizeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPluginMenu && !showSizeMenu) return;
    const handler = (e: MouseEvent) => {
      if (showPluginMenu && pluginMenuRef.current && !pluginMenuRef.current.contains(e.target as Node)) {
        setShowPluginMenu(false);
      }
      if (showSizeMenu && sizeMenuRef.current && !sizeMenuRef.current.contains(e.target as Node)) {
        setShowSizeMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPluginMenu, showSizeMenu]);

  const plugins = getAllPlugins();
  const currentPlugin = plugins.find((p) => p.pluginId === pluginId);

  // --- Dialog text based on pending action ---
  const dialogMessages: Record<string, { title: string; message: string }> = {
    new: { title: "新建项目", message: "当前项目有未保存的修改，新建将丢失这些内容。确定要继续吗？" },
    import: { title: "导入项目", message: "当前项目有未保存的修改，导入将丢失这些内容。确定要继续吗？" },
    template: { title: "加载模板", message: "模板将覆盖当前项目内容，未保存的修改会丢失。确定要继续吗？" },
  };
  const dialogInfo = pendingAction ? dialogMessages[pendingAction] : null;

  return (
    <>
      <header className="h-12 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 shrink-0 gap-3">
        {/* Logo */}
        <span className="text-sm font-bold tracking-wide text-zinc-100 mr-2">Geek PPT</span>

        {/* Project actions */}
        <div className="flex items-center gap-1">
          <ToolbarButton label="新建" onClick={handleNew} />
          <ToolbarButton label="导入" onClick={handleImport} />
          <ToolbarButton label="保存" onClick={handleSave} />
          <ToolbarButton label={exportStatus === "exporting" ? "导出中…" : "导出"} onClick={handleExport} />
        </div>

        <Sep />
        <ToolbarButton label="预览" onClick={handlePreview} />
        <Sep />

        {/* Renderer dropdown */}
        <div className="relative" ref={pluginMenuRef}>
          <ToolbarButton
            label={`渲染: ${currentPlugin?.displayName ?? pluginId}`}
            onClick={() => setShowPluginMenu(!showPluginMenu)}
          />
          {showPluginMenu && (
            <div className="absolute top-full left-0 mt-1 bg-zinc-800 border border-zinc-600 rounded shadow-lg z-50 py-1 min-w-[140px]">
              {plugins.map((p) => (
                <button
                  key={p.pluginId}
                  type="button"
                  onClick={() => {
                    setPluginConfig({ activePluginId: p.pluginId });
                    setShowPluginMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-700 transition-colors ${
                    p.pluginId === pluginId ? "text-indigo-300" : "text-zinc-300"
                  }`}
                >
                  {p.displayName}
                  {p.pluginId === pluginId && <span className="ml-2 text-indigo-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Template button */}
        <ToolbarButton label="模板" onClick={handleTemplate} />

        {/* Slide size dropdown */}
        <div className="relative" ref={sizeMenuRef}>
          <ToolbarButton
            label={`尺寸: ${slideSize.label}`}
            onClick={() => setShowSizeMenu(!showSizeMenu)}
          />
          {showSizeMenu && (
            <div className="absolute top-full left-0 mt-1 bg-zinc-800 border border-zinc-600 rounded shadow-lg z-50 py-1 min-w-[160px]">
              {SLIDE_SIZE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setSlideSize(preset);
                    setShowSizeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-700 transition-colors ${
                    preset.label === slideSize.label ? "text-indigo-300" : "text-zinc-300"
                  }`}
                >
                  {preset.label} ({preset.width}×{preset.height})
                  {preset.label === slideSize.label && <span className="ml-2 text-indigo-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Project name — click to edit */}
        {editingName ? (
          <input
            ref={nameInputRef}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitName();
              if (e.key === "Escape") setEditingName(false);
            }}
            className="text-xs text-zinc-200 bg-zinc-700 border border-zinc-500 rounded px-2 py-0.5 max-w-48 focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <button
            type="button"
            onClick={startEditName}
            title="点击修改项目名称"
            className="text-xs text-zinc-400 hover:text-zinc-200 truncate max-w-48 cursor-text hover:bg-zinc-700/50 px-1.5 py-0.5 rounded transition-colors"
          >
            {projectName}
          </button>
        )}

        {/* Dirty state */}
        <span className={`text-xs ${dirty ? "text-amber-400" : "text-emerald-400"}`}>
          {dirty ? "● 未保存" : "✓ 已保存"}
        </span>
      </header>

      {/* Unsaved-changes confirmation dialog */}
      <ConfirmDialog
        open={!!pendingAction}
        title={dialogInfo?.title ?? ""}
        message={dialogInfo?.message ?? ""}
        confirmLabel="不保存，继续"
        cancelLabel="取消"
        onConfirm={executePending}
        onCancel={() => setPendingAction(null)}
      />
    </>
  );
}

function Sep() {
  return <div className="w-px h-6 bg-zinc-600" />;
}

function ToolbarButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2.5 py-1 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700 rounded transition-colors"
    >
      {label}
    </button>
  );
}
