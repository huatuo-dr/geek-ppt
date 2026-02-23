import { useState, useEffect, useMemo, useCallback } from "react";
import { useProjectStore } from "@/modules/projectStore";
import { requestRender, getPlainStyles, getCoolStyles, getTorrentStyles } from "@/services/renderService";
import { uid } from "@/lib/id";
import { saveAs } from "file-saver";
import type { CustomTheme } from "@/types";

interface CustomThemeModalProps {
    open: boolean;
    onClose: () => void;
    editingThemeId?: string | null;
}

interface StyleElement {
    id: string;
    label: string;
    selector: string;
    defaultCss: string;
    previewMd: string;
}

const STYLE_ELEMENTS: StyleElement[] = [
    { id: "container", label: "PPT 容器/整体背景", selector: ".plain-slide", defaultCss: "background: #ffffff;\ncolor: #1a1a2e;\npadding: 48px 64px;\nfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\nfont-size: 16px;\nline-height: 1.7;\nheight: 100%;\nbox-sizing: border-box;\noverflow-y: auto;", previewMd: "# 容器样式展示\n这是背景和基础文字样式的综合预览。" },
    { id: "h1", label: "一级标题 (h1)", selector: ".plain-slide h1", defaultCss: "font-size: 2.5em;\nfont-weight: 700;\nmargin: 0 0 0.4em;\ncolor: #1a1a2e;\nborder-bottom: 2px solid #e0e0e0;\npadding-bottom: 0.2em;", previewMd: "# 这是一个非常长的一级标题示例查看换行表现" },
    { id: "h2", label: "二级标题 (h2)", selector: ".plain-slide h2", defaultCss: "font-size: 2em;\nfont-weight: 700;\nmargin: 0.6em 0 0.3em;\ncolor: #1a1a2e;\nborder-bottom: 1px solid #eee;\npadding-bottom: 0.15em;", previewMd: "## 这是一个二级标题示例" },
    { id: "h3", label: "三级标题 (h3)", selector: ".plain-slide h3", defaultCss: "font-size: 1.6em;\nfont-weight: 600;\nmargin: 0.5em 0 0.3em;\ncolor: #1a1a2e;", previewMd: "### 这是一个三级标题示例" },
    { id: "h4", label: "四级标题 (h4)", selector: ".plain-slide h4", defaultCss: "font-size: 1.3em;\nfont-weight: 600;\nmargin: 0.4em 0 0.2em;\ncolor: #1a1a2e;", previewMd: "#### 这是一个四级标题示例" },
    { id: "h5", label: "五级标题 (h5)", selector: ".plain-slide h5", defaultCss: "font-size: 1.1em;\nfont-weight: 600;\nmargin: 0.3em 0 0.2em;\ncolor: #1a1a2e;", previewMd: "##### 这是一个五级标题示例" },
    { id: "h6", label: "六级标题 (h6)", selector: ".plain-slide h6", defaultCss: "font-size: 1em;\nfont-weight: 600;\nmargin: 0.3em 0 0.2em;\ncolor: #555;", previewMd: "###### 这是一个六级标题示例" },
    { id: "hr", label: "分割线 (hr)", selector: ".plain-slide hr", defaultCss: "border: none;\nborder-top: 1px solid #d1d5db;\nmargin: 1.5em 0;\nwidth: 100%;", previewMd: "上面是文字\n\n---\n\n下面是文字" },
    { id: "paragraph", label: "正文段落 (p)", selector: ".plain-slide p", defaultCss: "margin: 0.6em 0;\nfont-size: 1em;\ncolor: #1a1a2e;", previewMd: "这是一段普通的正文内容示例。用于预览段落及其行高、字间距等渲染效果。" },
    { id: "strong", label: "加粗 (strong)", selector: ".plain-slide strong", defaultCss: "font-weight: 700;\ncolor: #1a1a2e;", previewMd: "展示一段含有 **加粗文字** 的正文。" },
    { id: "emphasis", label: "斜体 (em)", selector: ".plain-slide em", defaultCss: "font-style: italic;\ncolor: #1a1a2e;", previewMd: "展示一段含有 *斜体文字* 的正文。" },
    { id: "delete", label: "删除线 (del)", selector: ".plain-slide del", defaultCss: "text-decoration: line-through;\ncolor: #999;", previewMd: "展示一段含有 ~~删除线文字~~ 的正文。" },
    { id: "link", label: "超链接 (a)", selector: ".plain-slide a", defaultCss: "color: #2563eb;\ntext-decoration: underline;", previewMd: "这是一个 [超链接示例](https://geek-ppt.com)。" },
    { id: "ul", label: "无序列表 (ul)", selector: ".plain-slide ul", defaultCss: "padding-left: 1.5em;\nmargin: 0.5em 0;\nlist-style-type: disc;", previewMd: "- 第一项\n- 第二项\n  - 子项目 A\n  - 子项目 B" },
    { id: "ol", label: "有序列表 (ol)", selector: ".plain-slide ol", defaultCss: "padding-left: 1.5em;\nmargin: 0.5em 0;\nlist-style-type: decimal;", previewMd: "1. 步骤一\n2. 步骤二\n3. 步骤三" },
    { id: "li", label: "列表项 (li)", selector: ".plain-slide li", defaultCss: "margin: 0.25em 0;\nline-height: 1.7;", previewMd: "- 重点关注列表中**每一行**的间距和样式。" },
    { id: "blockquote", label: "引用块 (quote)", selector: ".plain-slide blockquote", defaultCss: "border-left: 4px solid #d1d5db;\nbackground: #f9fafb;\nmargin: 1em 0;\npadding: 12px 20px;\ncolor: #4b5563;", previewMd: "> 书山有路勤为径，学海无涯苦作舟。\n> —— 这是一个引用块示例。" },
    { id: "code", label: "行内代码 (code)", selector: ".plain-slide code:not(pre code)", defaultCss: "background: #f3f4f6;\ncolor: #1a1a2e;\npadding: 2px 6px;\nborder-radius: 4px;\nfont-family: 'JetBrains Mono', monospace;\nfont-size: 0.9em;", previewMd: "这是一个 \`inline code\` 行内代码示例。" },
    { id: "pre", label: "代码块 (pre)", selector: ".plain-slide pre.shiki", defaultCss: "background-color: var(--shiki-light-bg, #f8f9fa) !important;\npadding: 16px;\nborder-radius: 8px;\nmargin: 1em 0;\nfont-size: 0.85em;\nline-height: 1.4;\nborder: 1px solid #e5e7eb;\noverflow-x: auto;", previewMd: "\`\`\`javascript\nfunction hello() {\n  console.log(\"Hello Geek PPT!\");\n}\n\`\`\`" },
    { id: "table", label: "表格 (table)", selector: ".plain-slide table", defaultCss: "width: 100%;\nborder-collapse: collapse;\nmargin: 1em 0;", previewMd: "| 属性 | 说明 |\n| :--- | :--- |\n| 样式 | 表格内容 |" },
    { id: "th", label: "表格表头 (th)", selector: ".plain-slide th", defaultCss: "background: #f3f4f6;\nborder: 1px solid #e5e7eb;\npadding: 8px 12px;\nfont-weight: 600;\ntext-align: left;", previewMd: "| 这里是表头示例 |\n| :--- |\n| 内容 |" },
    { id: "td", label: "表格单元格 (td)", selector: ".plain-slide td", defaultCss: "border: 1px solid #e5e7eb;\npadding: 8px 12px;\ncolor: #1a1a2e;", previewMd: "| 标题 |\n| :--- |\n| 这里是单元格内容示例 |" },
];

export function CustomThemeModal({ open, onClose, editingThemeId }: CustomThemeModalProps) {
    const customThemes = useProjectStore((s) => s.project.customThemes || []);
    const addCustomTheme = useProjectStore((s) => s.addCustomTheme);
    const updateCustomTheme = useProjectStore((s) => s.updateCustomTheme);
    const deleteCustomTheme = useProjectStore((s) => s.deleteCustomTheme);
    const slideSize = useProjectStore((s) => s.project.slideSize);
    const setPluginConfig = useProjectStore((s) => s.setPluginConfig);

    const existingTheme = useMemo(
        () => customThemes.find((t) => t.themeId === editingThemeId),
        [customThemes, editingThemeId]
    );

    const [displayName, setDisplayName] = useState("");
    const [selectedElementId, setSelectedElementId] = useState(STYLE_ELEMENTS[0]!.id);
    const [cssMap, setCssMap] = useState<Record<string, string>>({});
    const [baseTheme, setBaseTheme] = useState<string>("plain");

    /**
     * Parse full CSS string into:
     * 1. baseTheme (from @theme-base comment)
     * 2. cssMap (per element rules)
     * 3. extraCss (anything else, like animations)
     */
    const parseThemeCss = useCallback((fullCss: string, overrideBase?: string) => {
        // 1. Detect base theme
        const baseMatch = fullCss.match(/\/\*\s*@theme-base:\s*(\w+)\s*\*\//);
        const detectedBase = overrideBase || baseMatch?.[1] || "plain";

        // 2. Identify selectors to look for
        const wrapperClass = `.${detectedBase}-slide`;

        // 3. Extract element rules
        const newMap: Record<string, string> = {};
        let processedCss = fullCss;

        STYLE_ELEMENTS.forEach(el => {
            // Map selector to current base (e.g. .plain-slide h1 -> .cool-slide h1)
            const targetSelector = el.selector.replace(/^\.plain-slide/, wrapperClass);
            const escaped = targetSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(escaped + "\\s*\\{([^}]*)\\}", "s");

            const match = processedCss.match(regex);
            if (match) {
                newMap[el.id] = match[1].split("\n").map(l => l.trim()).filter(Boolean).join("\n");
            } else {
                newMap[el.id] = "";
            }
        });

        return { detectedBase, newMap };
    }, []);



    const [previewHtml, setPreviewHtml] = useState("");
    const [previewCss, setPreviewCss] = useState("");

    const selectedElement = useMemo(
        () => STYLE_ELEMENTS.find(e => e.id === selectedElementId)!,
        [selectedElementId]
    );

    // Initialize
    useEffect(() => {
        if (open) {
            if (existingTheme) {
                setDisplayName(existingTheme.displayName);
                const { detectedBase, newMap } = parseThemeCss(existingTheme.css || "");
                setBaseTheme(detectedBase);
                setCssMap(newMap);
            } else {
                setDisplayName("新样式");
                setBaseTheme("plain");
                const initialMap: Record<string, string> = {};
                STYLE_ELEMENTS.forEach(el => {
                    initialMap[el.id] = el.defaultCss;
                });
                setCssMap(initialMap);
            }
        }
    }, [open, existingTheme, parseThemeCss]);

    // Current focused CSS editor content
    const currentCss = cssMap[selectedElementId] || "";

    const handleCssChange = (val: string) => {
        setCssMap(prev => ({ ...prev, [selectedElementId]: val }));
    };

    // Build full CSS for preview and saving
    const fullCss = useMemo(() => {
        const wrapperClass = `.${baseTheme}-slide`;
        const baseComment = baseTheme !== "plain" ? `/* @theme-base: ${baseTheme} */\n` : "";

        const coreCss = STYLE_ELEMENTS
            .filter(el => el.selector !== "")
            .filter(el => {
                // Skip empty per-element fields to avoid overriding base CSS in 'extra'
                const content = cssMap[el.id];
                return content !== undefined && content.trim() !== "";
            })
            .map(el => {
                const content = cssMap[el.id]!;
                const targetSelector = el.selector.replace(/^\.plain-slide/, wrapperClass);
                return `${targetSelector} {\n${content}\n}`;
            }).join("\n\n");

        return [baseComment, coreCss].filter(Boolean).join("\n\n");
    }, [cssMap, baseTheme]);

    // Update individual preview
    useEffect(() => {
        if (!open) return;
        const updatePreview = async () => {
            // Render only the preview MD of the selected element
            const resp = await requestRender(selectedElement.previewMd, "custom-preview", slideSize, 0, fullCss);
            if (!resp.error) {
                setPreviewHtml(resp.html);
                setPreviewCss(resp.css);
            }
        };
        const timer = setTimeout(updatePreview, 300);
        return () => clearTimeout(timer);
    }, [open, selectedElement, fullCss, slideSize]);

    const handleSave = () => {
        const themeData: CustomTheme = {
            themeId: editingThemeId || `custom-${uid()}`,
            displayName,
            css: fullCss,
        };

        if (editingThemeId) {
            updateCustomTheme(editingThemeId, themeData);
        } else {
            addCustomTheme(themeData);
        }
        setPluginConfig({ activePluginId: themeData.themeId });
        onClose();
    };

    const handleDelete = () => {
        if (editingThemeId && confirm("确定要删除这个自定义样式吗？")) {
            deleteCustomTheme(editingThemeId);
            onClose();
        }
    };

    const handleExport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const themeData: CustomTheme = {
            themeId: editingThemeId || `custom-${uid()}`,
            displayName,
            css: fullCss,
        };
        const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: "application/json" });
        saveAs(blob, `${displayName || "style"}.geekstyle`);
    };

    const handleImport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".geekstyle, .json";
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
                const text = await file.text();
                const imported: CustomTheme = JSON.parse(text);
                if (imported.css && imported.displayName) {
                    setDisplayName(`${imported.displayName} (导入)`);
                    const { detectedBase, newMap } = parseThemeCss(imported.css);
                    setBaseTheme(detectedBase);
                    setCssMap(newMap);
                }
            } catch (err) {
                console.error("[import-style] Failed:", err);
                alert("导入失败，文件格式可能不正确");
            }
        };
        input.click();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-full h-full flex flex-col overflow-hidden max-w-7xl">
                {/* Header */}
                <div className="h-14 border-b border-zinc-700 flex items-center justify-between px-6 shrink-0 bg-zinc-800/50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-zinc-100 font-bold">主题款式自定义</h2>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="样式名称"
                            className="bg-zinc-950 border border-zinc-600 rounded px-2 py-1 text-sm text-zinc-200 focus:border-indigo-500 outline-none w-48"
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">继承底座:</span>
                            <select
                                value={baseTheme}
                                onChange={(e) => {
                                    const newBase = e.target.value;
                                    setBaseTheme(newBase);
                                    // Parse base theme CSS and populate per-element fields
                                    let baseCss = "";
                                    if (newBase === "cool") baseCss = getCoolStyles();
                                    else if (newBase === "torrent") baseCss = getTorrentStyles();
                                    else baseCss = getPlainStyles();
                                    const { newMap } = parseThemeCss(baseCss, newBase);
                                    setCssMap(newMap);
                                }}
                                className="bg-zinc-950 border border-zinc-600 rounded px-1 py-1 text-xs text-zinc-300 outline-none focus:border-indigo-500"
                            >
                                <option value="plain">朴素 (Plain)</option>
                                <option value="cool">酷炫 (Cool)</option>
                                <option value="torrent">激流 (Torrent)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {editingThemeId && (
                            <button type="button" onClick={handleDelete} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors mr-2">删除样式</button>
                        )}
                        <button type="button" onClick={handleImport} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">导入主题</button>
                        <button type="button" onClick={handleExport} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">导出主题</button>
                        <div className="w-px h-4 bg-zinc-700 mx-1" />
                        <button type="button" onClick={onClose} className="px-4 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">取消</button>
                        <button type="button" onClick={handleSave} className="px-6 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium transition-all shadow-lg">保存并应用</button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left side: Syntax List */}
                    <div className="w-64 border-r border-zinc-700 flex flex-col bg-zinc-800/20">
                        <div className="p-3 border-b border-zinc-700 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                            配置项选择
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            {STYLE_ELEMENTS.map(el => (
                                <button
                                    key={el.id}
                                    type="button"
                                    onClick={() => setSelectedElementId(el.id)}
                                    className={`w-full text-left px-4 py-3 text-sm transition-all border-l-2 ${selectedElementId === el.id
                                        ? "bg-indigo-600/10 text-indigo-400 border-indigo-500 font-medium"
                                        : "text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-zinc-200"
                                        }`}
                                >
                                    {el.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Split Editor & Preview */}
                    <div className="flex-1 flex flex-col">
                        {/* Top: Editor */}
                        <div className="flex-1 flex flex-col border-b border-zinc-700 bg-zinc-950/50">
                            <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/40 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CSS 编辑</span>
                                    <code className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                        {selectedElement.selector ? selectedElement.selector.replace(/^\.plain-slide/, `.${baseTheme}-slide`) : "Extra Global CSS"}
                                    </code>
                                </div>
                                <span className="text-[10px] text-zinc-600 italic">自动保存片段</span>
                            </div>
                            <textarea
                                value={currentCss}
                                onChange={(e) => handleCssChange(e.target.value)}
                                spellCheck={false}
                                className="flex-1 bg-transparent text-indigo-300/90 font-mono text-sm p-4 outline-none resize-none leading-relaxed"
                                placeholder="输入 CSS 属性，例如：color: red; font-size: 20px;"
                            />
                        </div>

                        {/* Bottom: Item Preview */}
                        <div className="h-[420px] shrink-0 flex flex-col bg-zinc-900 border-t border-zinc-700 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)] z-10">
                            <div className="px-4 py-2 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider bg-zinc-800/20">
                                当前项预览
                            </div>
                            <div className="flex-1 flex items-center justify-center p-10 overflow-hidden">
                                <div
                                    className="shadow-2xl rounded-sm overflow-hidden max-w-full relative bg-zinc-800"
                                    style={{
                                        aspectRatio: `${slideSize.width}/${slideSize.height}`,
                                        height: "320px",
                                    }}
                                >
                                    <style>{previewCss}</style>
                                    <div
                                        className="w-full h-full overflow-y-auto"
                                        dangerouslySetInnerHTML={{ __html: previewHtml }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
