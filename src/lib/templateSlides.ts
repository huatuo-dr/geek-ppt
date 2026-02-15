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

## C

\`\`\`c
#include <stdio.h>

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    int n = sizeof(arr) / sizeof(arr[0]);
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    return 0;
}
\`\`\`

## Go

\`\`\`go
package main

import "fmt"

func twoSum(nums []int, target int) (int, int) {
    m := make(map[int]int)
    for i, v := range nums {
        if j, ok := m[target-v]; ok {
            return j, i
        }
        m[v] = i
    }
    return -1, -1
}

func main() {
    a, b := twoSum([]int{2, 7, 11, 15}, 9)
    fmt.Println(a, b) // 0 1
}
\`\`\`

## Java

\`\`\`java
import java.util.stream.Collectors;
import java.util.List;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie", "David");
        String result = names.stream()
            .filter(n -> n.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.joining(", "));
        System.out.println(result); // ALICE, CHARLIE, DAVID
    }
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
      order: 7,
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
      order: 8,
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

## 曲线图

\`\`\`mermaid
xychart-beta
    title "Quarterly Trends"
    x-axis [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10]
    y-axis "Value" 0 --> 90
    line [12, 25, 18, 34, 42, 36, 55, 48, 63, 72]
    line [8, 15, 28, 22, 35, 48, 40, 56, 52, 68]
    line [20, 14, 30, 40, 28, 52, 46, 62, 58, 80]
\`\`\`

<div style="display:flex;gap:20px;justify-content:center;font-size:0.75em;opacity:0.85;margin-top:2px;">
<span><span style="color:#fbbf24">━━</span> Revenue</span>
<span><span style="color:#8b5cf6">━━</span> Cost</span>
<span><span style="color:#ec4899">━━</span> Profit</span>
</div>

## 柱形图

\`\`\`mermaid
xychart-beta
    title "Product Comparison"
    x-axis [Alpha, Beta, Gamma, Delta, Epsilon]
    y-axis "Score" 0 --> 100
    bar [45, 62, 38, 75, 55]
    bar [30, 48, 56, 42, 68]
    bar [52, 35, 65, 58, 40]
\`\`\`

<div style="display:flex;gap:20px;justify-content:center;font-size:0.75em;opacity:0.85;margin-top:2px;">
<span><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#fbbf24;vertical-align:middle;margin-right:4px;"></span> Design</span>
<span><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#8b5cf6;vertical-align:middle;margin-right:4px;"></span> Engineering</span>
<span><span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:#ec4899;vertical-align:middle;margin-right:4px;"></span> Marketing</span>
</div>
`,
      notes: "",
      template: "content",
    },
    {
      slideId: uid(),
      order: 9,
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
    {
      slideId: uid(),
      order: 10,
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
