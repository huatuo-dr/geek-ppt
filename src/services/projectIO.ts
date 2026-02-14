/**
 * ProjectIO — save/load .geek-ppt files (ZIP) via File System Access API.
 * Remembers the file handle after first save/import for subsequent saves.
 * Fallback: download/upload for browsers without FSAA support.
 */

import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { Project } from "@/types";

// ---------------------------------------------------------------------------
// File handle persistence — stored on window to survive Vite HMR reloads
// ---------------------------------------------------------------------------

const WIN = window as unknown as { __geekPptFileHandle?: FileSystemFileHandle | null };

function getHandle(): FileSystemFileHandle | null {
  return WIN.__geekPptFileHandle ?? null;
}

function setHandle(handle: FileSystemFileHandle | null): void {
  WIN.__geekPptFileHandle = handle;
}

/** Get the current file handle (if any) */
export function getCurrentFileHandle(): FileSystemFileHandle | null {
  return getHandle();
}

/** Clear the file handle (e.g. on "new project") */
export function clearFileHandle(): void {
  setHandle(null);
}

// ---------------------------------------------------------------------------
// Save
// ---------------------------------------------------------------------------

/** Pack a Project into a .geek-ppt ZIP Blob */
export async function packProject(project: Project): Promise<Blob> {
  const zip = new JSZip();

  // project.json
  const meta = { ...project, slides: undefined };
  const slideOrder = project.slides.map((s) => ({
    slideId: s.slideId,
    order: s.order,
    title: s.title,
    notes: s.notes,
    template: s.template,
  }));
  zip.file("project.json", JSON.stringify({ ...meta, slideOrder }, null, 2));

  // slides/*.md
  const slidesFolder = zip.folder("slides")!;
  project.slides.forEach((slide, i) => {
    const filename = String(i + 1).padStart(3, "0") + ".md";
    slidesFolder.file(filename, slide.markdownContent);
  });

  // assets/ — placeholder
  zip.folder("assets");

  // plugins/lock.json
  zip.file("plugins/lock.json", JSON.stringify({
    activePluginId: project.pluginConfig.activePluginId,
    lockedAt: new Date().toISOString(),
  }, null, 2));

  return zip.generateAsync({ type: "blob" });
}

/** Write blob to an existing file handle */
async function writeToHandle(handle: FileSystemFileHandle, blob: Blob): Promise<void> {
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

/** Save project to disk. Reuses last file handle if available. */
export async function saveProject(project: Project): Promise<void> {
  const blob = await packProject(project);

  // If we already have a handle, write directly without prompting
  const existingHandle = getHandle();
  console.log("[save] existingHandle:", existingHandle);
  if (existingHandle) {
    try {
      await writeToHandle(existingHandle, blob);
      console.log("[save] wrote to existing handle OK");
      return;
    } catch (err) {
      console.warn("[save] writeToHandle failed, clearing handle:", err);
      setHandle(null);
    }
  }

  // First save or handle lost — show file picker
  if ("showSaveFilePicker" in window) {
    try {
      const handle = await (window as unknown as { showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
        suggestedName: `${project.name}.geekppt`,
        types: [
          {
            description: "Geek PPT Project",
            accept: { "application/zip": [".geekppt"] },
          },
        ],
      });
      await writeToHandle(handle, blob);
      setHandle(handle);
      console.log("[save] new handle saved:", handle.name);
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      console.error("[save] showSaveFilePicker failed:", err);
    }
  }

  // Fallback: browser download
  saveAs(blob, `${project.name}.geekppt`);
}

/** Save to a new location (always shows picker, like "另存为") */
export async function saveProjectAs(project: Project): Promise<void> {
  setHandle(null);
  await saveProject(project);
}

// ---------------------------------------------------------------------------
// Load / Import
// ---------------------------------------------------------------------------

/** Unpack a .geek-ppt ZIP blob into a Project */
export async function unpackProject(blob: Blob): Promise<Project> {
  const zip = await JSZip.loadAsync(blob);

  const metaFile = zip.file("project.json");
  if (!metaFile) throw new Error("Invalid .geek-ppt: missing project.json");
  const metaJson = JSON.parse(await metaFile.async("string"));

  const slideOrder: Array<{
    slideId: string;
    order: number;
    title: string;
    notes: string;
    template?: string;
  }> = metaJson.slideOrder || [];

  const slidesFolder = zip.folder("slides");
  const slideFiles = slidesFolder
    ? Object.keys(slidesFolder.files)
        .filter((f) => f.startsWith("slides/") && f.endsWith(".md"))
        .sort()
    : [];

  const slides = await Promise.all(
    slideFiles.map(async (path, i) => {
      const file = zip.file(path);
      const content = file ? await file.async("string") : "";
      const meta = slideOrder[i];
      return {
        slideId: meta?.slideId || `imported-${i}`,
        order: i,
        title: meta?.title || `第 ${i + 1} 页`,
        markdownContent: content,
        notes: meta?.notes || "",
        template: (meta?.template as "cover" | "content" | "two-column") || "content",
      };
    }),
  );

  if (slides.length === 0) {
    throw new Error("Invalid .geek-ppt: no slides found");
  }

  const lockFile = zip.file("plugins/lock.json");
  const lockJson = lockFile ? JSON.parse(await lockFile.async("string")) : {};

  return {
    projectId: metaJson.projectId || "imported",
    name: metaJson.name || "导入的演示",
    createdAt: metaJson.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slides,
    pluginConfig: { activePluginId: lockJson.activePluginId || "plain-renderer" },
    slideSize: metaJson.slideSize || { width: 1920, height: 1080, label: "16:9" },
    formatVersion: metaJson.formatVersion || 1,
  };
}

/** Open a .geek-ppt file and return the parsed Project */
export async function importProject(): Promise<Project | null> {
  if ("showOpenFilePicker" in window) {
    try {
      const handles = await (window as unknown as { showOpenFilePicker: (opts: unknown) => Promise<FileSystemFileHandle[]> }).showOpenFilePicker({
        types: [
          {
            description: "Geek PPT Project",
            accept: { "application/zip": [".geekppt"] },
          },
        ],
        multiple: false,
      });
      const handle = handles[0];
      if (!handle) return null;
      const file = await handle.getFile();
      const project = await unpackProject(file);
      setHandle(handle); // Remember handle so subsequent saves go to this file
      return project;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return null;
    }
  }

  // Fallback: file input
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".geekppt";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) { resolve(null); return; }
      try {
        resolve(await unpackProject(file));
      } catch (err) {
        console.error("[import] Failed:", err);
        resolve(null);
      }
    };
    input.click();
  });
}
