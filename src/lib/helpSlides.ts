import type { Slide } from "@/types";
import { uid } from "./id";

export function createHelpSlides(): Slide[] {
  return [
    {
      slideId: uid(),
      order: 0,
      title: "介绍",
      markdownContent: `# 什么是 Geek PPT？

Geek PPT 是一个**Markdown 驱动的幻灯片工具**。

## 它与传统 PPT 不同

| 传统 PPT | Geek PPT |
|----------|-----------|
| 手动拖拽调整位置 | 专注内容，自动排版 |
| 需要调整字体、颜色、对齐 | 选好主题，一键渲染 |
| 适合精美设计 | 适合高效输出 |

## 核心理念

> **用写文档的方式做演示**

只需用 Markdown 写好内容，选择一个喜欢的主题，演示效果自动生成。

## 适用场景

- 技术分享 / 代码演示
- 教学培训 / 课堂讲义
- 快速原型 / 临时汇报
- 文档驱动的内容创作
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 1,
      title: "使用指南",
      markdownContent: `# 使用指南

## 使用流程

1. **新建页面** — 点击"新建"创建空白项目
2. **编写 Markdown** — 在中间编辑器中输入内容
3. **选择渲染方式** — 切换不同的主题样式
4. **查看预览效果** — 右侧实时查看演示效果
5. **导出或保存** — 导出 HTML 或保存为 .geekppt 文件

---

## 基本操作

| 操作 | 说明 |
|------|------|
| 新建 | 创建一个空白项目 |
| 导入 | 打开 .geekppt 文件 |
| 保存 | 保存为 .geekppt 文件 |
| 导出 | 生成独立 HTML 文件 |

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| F5 | 进入演示模式 |
| Ctrl + S | 保存项目 |
| Ctrl + N | 新增页面 |
| Ctrl + Delete | 删除当前页 |
| Esc | 退出演示模式 |

## 界面布局

- **左侧**：页面缩略图列表
- **中间**：Markdown 编辑器
- **右侧**：实时预览效果

---
*下一页开始是 Markdown 语法示例 →
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 2,
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
      order: 3,
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
      order: 4,
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
      order: 5,
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
      order: 6,
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
      order: 7,
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
      order: 8,
      title: "图片",
      markdownContent: `# 图片

## 基础图片

![Geek PPT Logo](https://github.com/huatuo-dr/geek-ppt/blob/master/public/logo.png?raw=true)

## 带链接的图片

[![Geek PPT Logo](https://github.com/huatuo-dr/geek-ppt/blob/master/public/logo.png?raw=true)](https://github.com/huatuo-dr/geek-ppt)
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 9,
      title: "流程图与时序图",
      markdownContent: `# 流程图与时序图

## 流程图

\`\`\`mermaid
flowchart TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[合并结果]
    D --> E
    E --> F[结束]
\`\`\`

## 时序图

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant E as 编辑器
    participant R as 渲染服务
    U->>E: 输入 Markdown
    E->>R: 请求渲染
    R-->>E: 返回 HTML + CSS
    E-->>U: 显示预览
\`\`\`
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 10,
      title: "数据图表",
      markdownContent: `# 数据图表

## 饼图

\`\`\`mermaid
pie title Tech Stack
    "React" : 35
    "TypeScript" : 25
    "Tailwind CSS" : 20
    "Other" : 20
\`\`\`

## 柱状图

\`\`\`mermaid
xychart-beta
    title "Quarterly Trends"
    x-axis [Q1, Q2, Q3, Q4]
    y-axis "Value" 0 --> 100
    bar [45, 62, 38, 75]
    bar [30, 48, 56, 42]
\`\`\`
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 11,
      title: "HTML 与 CSS",
      markdownContent: `# HTML 与 CSS

Markdown 支持直接嵌入 HTML 和 CSS，实现更灵活的排版。

## 内联样式

<span style="color: #ef4444; font-size: 1.4em; font-weight: bold;">红色加粗文字</span>、
<span style="background: linear-gradient(90deg, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.4em; font-weight: bold;">渐变文字效果</span>

## 多栏布局

<div style="display: flex; gap: 12px; margin: 12px 0;">
  <div style="flex: 1; background: #dbeafe; padding: 14px; border-radius: 10px; color: #1e3a5f; text-align: center;">
    <strong>功能 A</strong><br/>快速编辑
  </div>
  <div style="flex: 1; background: #fce7f3; padding: 14px; border-radius: 10px; color: #5f1e3a; text-align: center;">
    <strong>功能 B</strong><br/>实时预览
  </div>
  <div style="flex: 1; background: #d1fae5; padding: 14px; border-radius: 10px; color: #1e5f3a; text-align: center;">
    <strong>功能 C</strong><br/>一键导出
  </div>
</div>

## 自定义样式

<style>
.demo-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.85em;
  font-weight: 600;
  margin: 4px;
}
.badge-blue   { background: #3b82f6; color: #fff; }
.badge-green  { background: #22c55e; color: #fff; }
.badge-purple { background: #a855f7; color: #fff; }
.badge-amber  { background: #f59e0b; color: #fff; }
</style>

<span class="demo-badge badge-blue">React</span>
<span class="demo-badge badge-green">TypeScript</span>
<span class="demo-badge badge-purple">Vite</span>
<span class="demo-badge badge-amber">Tailwind</span>
`,
      notes: "",
      template: "content",
    },
  ];
}
