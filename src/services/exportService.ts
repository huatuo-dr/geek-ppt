/**
 * ExportService — export project as standalone HTML presentation.
 * Produces index.html + assets/ inside a ZIP for download.
 */

import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { Project } from "@/types";
import { requestRender } from "./renderService";

/** Generate the full HTML for the exported presentation */
async function generatePresentationHtml(project: Project): Promise<{ html: string; css: string }> {
  const pluginId = project.pluginConfig.activePluginId;
  const slideSize = project.slideSize;

  // Render all slides
  const renderResults = await Promise.all(
    project.slides.map((slide, i) =>
      requestRender(slide.markdownContent, pluginId, slideSize, i),
    ),
  );

  // Collect CSS (deduplicate since all slides use the same plugin)
  const css = renderResults[0]?.css || "";

  // Build slide HTML fragments
  const slidesHtml = renderResults
    .map(
      (r, i) =>
        `<section class="slide" data-slide="${i}" style="display:${i === 0 ? "block" : "none"};width:${slideSize.width}px;height:${slideSize.height}px;">${r.html}</section>`,
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(project.name)}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #111; display: flex; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }
.slide-container { position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
.slide { position: absolute; align-items: center; justify-content: center; transform-origin: center; overflow: hidden; }
/* Navigation controls */
.nav-bar { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; z-index: 100; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 8px 20px; border-radius: 24px; }
.nav-bar button { background: none; border: none; color: #ccc; font-size: 18px; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: all 0.2s; }
.nav-bar button:hover { color: #fff; background: rgba(255,255,255,0.1); }
.nav-bar .page-info { color: #aaa; font-size: 14px; min-width: 60px; text-align: center; cursor: pointer; user-select: none; }
.nav-bar .page-info:hover { color: #fff; }
/* Thumbnail grid overlay */
.thumb-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.85); backdrop-filter: blur(6px); display: none; align-items: center; justify-content: center; }
.thumb-overlay.open { display: flex; }
.thumb-grid { max-width: 90vw; max-height: 85vh; overflow: auto; padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.thumb-item { position: relative; border: 2px solid #444; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.2s; aspect-ratio: ${slideSize.width} / ${slideSize.height}; background: #222; }
.thumb-item:hover { border-color: #888; transform: scale(1.04); }
.thumb-item.active { border-color: #6366f1; box-shadow: 0 0 12px rgba(99,102,241,0.4); }
.thumb-inner { width: 100%; height: 100%; transform-origin: top left; pointer-events: none; overflow: hidden; position: absolute; top: 0; left: 0; }
.thumb-badge { position: absolute; bottom: 4px; right: 6px; background: rgba(0,0,0,0.7); color: #ccc; font-size: 11px; padding: 1px 6px; border-radius: 4px; }
/* Plugin styles */
${css}
</style>
</head>
<body>
<div class="slide-container" id="slideContainer">
${slidesHtml}
</div>
<div class="nav-bar">
  <button id="prevBtn" title="上一页">‹</button>
  <span class="page-info" id="pageInfo" title="点击查看全部页面">01 / ${String(project.slides.length).padStart(2, "0")}</span>
  <button id="nextBtn" title="下一页">›</button>
</div>
<div class="thumb-overlay" id="thumbOverlay">
  <div class="thumb-grid" id="thumbGrid"></div>
</div>
<script>
(function(){
  var slides = document.querySelectorAll('.slide');
  var total = slides.length;
  var current = 0;
  var sw = ${slideSize.width}, sh = ${slideSize.height};
  var pageInfo = document.getElementById('pageInfo');
  var overlay = document.getElementById('thumbOverlay');
  var grid = document.getElementById('thumbGrid');
  var thumbOpen = false;

  function show(idx) {
    slides.forEach(function(s,i){ s.style.display = i===idx ? 'block' : 'none'; });
    current = idx;
    pageInfo.textContent = String(idx+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
    fitSlide();
  }

  function fitSlide() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var scale = Math.min(vw/sw, vh/sh, 1);
    slides.forEach(function(s){ s.style.transform = 'scale('+scale+')'; });
  }

  /* Thumbnail grid */
  function buildThumbs() {
    grid.innerHTML = '';
    slides.forEach(function(s, i) {
      var item = document.createElement('div');
      item.className = 'thumb-item' + (i === current ? ' active' : '');
      /* Clone slide content scaled down to fit thumbnail */
      var inner = document.createElement('div');
      inner.className = 'thumb-inner';
      inner.innerHTML = s.innerHTML;
      /* Scale: thumbnail container is ~220px wide, slide is sw px */
      var thumbW = 220;
      var scaleT = thumbW / sw;
      inner.style.width = sw + 'px';
      inner.style.height = sh + 'px';
      inner.style.transform = 'scale(' + scaleT + ')';
      item.appendChild(inner);
      /* Page badge */
      var badge = document.createElement('div');
      badge.className = 'thumb-badge';
      badge.textContent = String(i + 1);
      item.appendChild(badge);
      item.onclick = function(e) {
        e.stopPropagation();
        closeThumbs();
        show(i);
      };
      grid.appendChild(item);
    });
  }

  function openThumbs() {
    buildThumbs();
    overlay.classList.add('open');
    thumbOpen = true;
  }

  function closeThumbs() {
    overlay.classList.remove('open');
    thumbOpen = false;
  }

  pageInfo.onclick = function() {
    if (thumbOpen) closeThumbs(); else openThumbs();
  };
  overlay.onclick = function(e) {
    if (e.target === overlay) closeThumbs();
  };

  /* Navigation */
  document.getElementById('prevBtn').onclick = function(){ if(current>0) show(current-1); };
  document.getElementById('nextBtn').onclick = function(){ if(current<total-1) show(current+1); };

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && thumbOpen) { closeThumbs(); return; }
    if (thumbOpen) return;
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='PageUp'){ if(current>0) show(current-1); }
    if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='PageDown'){ if(current<total-1) show(current+1); }
  });

  window.addEventListener('resize', fitSlide);
  show(0);
})();
</script>
</body>
</html>`;

  return { html, css };
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Export the project as a ZIP containing index.html + assets */
export async function exportPresentation(project: Project): Promise<void> {
  const { html } = await generatePresentationHtml(project);

  const zip = new JSZip();
  zip.file("index.html", html);
  zip.folder("assets");

  const blob = await zip.generateAsync({ type: "blob" });

  // Try File System Access API
  if ("showSaveFilePicker" in window) {
    try {
      const handle = await (window as unknown as { showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
        suggestedName: `${project.name}-presentation.zip`,
        types: [
          { description: "ZIP Archive", accept: { "application/zip": [".zip"] } },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
    }
  }

  saveAs(blob, `${project.name}-presentation.zip`);
}
