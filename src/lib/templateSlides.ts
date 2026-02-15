import type { Slide } from "@/types";
import { uid } from "./id";

/**
 * Generate template slides covering all Markdown syntax,
 * organized by category for quick plugin preview.
 */
export function createTemplateSlides(): Slide[] {
  return [
    {
      slideId: uid(),
      order: 0,
      title: "标题层级",
      markdownContent: `# 一级标题 Heading 1

## 二级标题 Heading 2

### 三级标题 Heading 3

#### 四级标题 Heading 4

##### 五级标题 Heading 5

###### 六级标题 Heading 6
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 1,
      title: "文本样式",
      markdownContent: `# 文本样式

这是一段普通文本，展示基本的排版效果。

**粗体文本** 用于强调重点内容。

*斜体文本* 用于术语或引述。

***粗斜体*** 同时具备两种效果。

~~删除线文本~~ 表示已废弃的内容。

这是 \`行内代码\` 的展示效果。

访问 [Geek PPT 项目](https://github.com) 了解更多。
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 2,
      title: "列表",
      markdownContent: `# 列表

## 无序列表

- 第一项内容
- 第二项内容
  - 嵌套子项 A
  - 嵌套子项 B
- 第三项内容

## 有序列表

1. 步骤一：初始化项目
2. 步骤二：安装依赖
3. 步骤三：启动服务

## 任务列表

- [x] 已完成的任务
- [x] 另一个已完成的任务
- [ ] 待完成的任务
- [ ] 未来计划
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 3,
      title: "引用与分割线",
      markdownContent: `# 引用与分割线

## 引用

> 简单是终极的复杂。
> — 达芬奇

> **提示**：引用可以包含 **粗体**、*斜体* 和 \`代码\`。
>
> 也支持多段落内容。

---

## 分割线

上方和下方的内容被分割线分隔。

---

结束。
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 4,
      title: "代码块",
      markdownContent: `# 代码块

## JavaScript

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
\`\`\`

## Python

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

## CSS

\`\`\`css
.card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
\`\`\`
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 5,
      title: "表格",
      markdownContent: `# 表格

## 基础表格

| 功能 | 状态 | 说明 |
|------|------|------|
| Markdown 编辑 | 已完成 | 基于 CodeMirror 6 |
| 实时预览 | 已完成 | unified/remark 管线 |
| 代码高亮 | 已完成 | Shiki 引擎 |
| 演示模式 | 已完成 | 全屏 + 键盘导航 |

## 对齐方式

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 文本 | 文本 | 文本 |
| 较长的内容 | 较长的内容 | 较长的内容 |
| 短 | 短 | 短 |
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 6,
      title: "综合展示",
      markdownContent: `# 综合展示

## 混合排版

以下展示 **多种语法** 的 *混合使用* 效果。

> 一段引用中包含 \`行内代码\` 和 [链接](https://example.com)。

### 功能清单

1. **渲染插件** — 支持朴素和酷炫两种风格
2. **文件管理** — \`.geekppt\` 单文件保存
3. **导出分享** — 导出为独立 HTML

---

| 指标 | 数值 |
|------|------|
| 启动时间 | < 500ms |
| 渲染延迟 | < 200ms |

\`\`\`typescript
const message: string = "Hello, Geek PPT!";
console.log(message);
\`\`\`

*—— Geek PPT，让演示回归内容。*
`,
      notes: "",
      template: "content",
    },
  ];
}
