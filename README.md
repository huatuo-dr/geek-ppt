# Geek PPT

基于 Markdown 的幻灯片演示工具。在编辑器中用 Markdown 写内容，实时预览渲染效果，支持多种渲染风格切换，可导出为独立 HTML 演示文稿。

---

## 功能特性

- **Markdown 驱动** — 用熟悉的 Markdown 语法编写幻灯片，支持 GFM 扩展（表格、任务列表、删除线等）
- **实时预览** — 编辑内容即时渲染到右侧预览区，延迟约 200ms
- **多种样式支持** — 内置“朴素”、“酷炫”及“激流”渲染风格，支持一键切换
- **Mermaid 图表** — 支持流程图、时序图、甘特图等多种 Mermaid 语法
- **自定义渲染系统** — 提供可视化编辑器，支持在现有底座基础上逐项修改 CSS，支持主题导入/导出
- **代码高亮** — 基于 Shiki，提供 VSCode 级别的语法着色
- **演示模式** — 按 `F5` 进入全屏演示，支持键盘翻页和缩略图导航
- **项目文件** — 保存为 `.geekppt` 单文件（ZIP 容器），方便分享和备份
- **HTML 导出** — 导出为独立 HTML 文件，无需安装任何软件即可播放
- **多种尺寸** — 支持 16:9、4:3、21:9、9:16、A4 等画布比例
- **面板可调** — 三栏布局支持拖拽边缘调整宽度

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `F5` | 进入演示模式 |
| `Ctrl/Cmd + S` | 保存项目 |
| `Ctrl/Cmd + N` | 新增页面 |
| `Ctrl/Cmd + Delete` | 删除当前页 |
| `Esc` | 退出演示模式 |
| 双击页面项 | 重命名页面 |

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite |
| 状态管理 | Zustand |
| 编辑器 | CodeMirror 6 |
| Markdown 解析 | unified / remark / rehype |
| 代码高亮 | Shiki |
| 样式 | Tailwind CSS |
| 样式隔离 | Shadow DOM |
| 文件格式 | JSZip（.geekppt） |
| 测试 | Vitest |

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与启动

```bash
# 克隆项目
git clone https://github.com/huatuo-dr/geek-ppt.git
cd geek-ppt

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可使用。

### 其他命令

```bash
# 生产构建
npm run build

# 预览生产构建
npm run preview

# 运行测试
npm test

# 测试监听模式
npm run test:watch
```

---

## 项目结构

```
src/
├── app/              # 应用壳：Toolbar、三栏面板、演示模式、全局快捷键
├── components/       # 通用组件：MarkdownEditor、ResizeHandle
├── lib/              # 工具函数：ID 生成、默认配置
├── modules/          # Zustand 状态仓库
│   ├── projectStore    # 项目数据（页面增删改、插件配置、尺寸）
│   ├── editorStore     # 编辑状态（当前页索引、编辑缓冲）
│   ├── previewStore    # 预览状态（渲染结果、耗时、错误）
│   ├── exportStore     # 导出状态
│   └── presentationStore # 演示模式状态
├── plugins/          # 渲染插件
│   ├── plain/          # 朴素渲染 (白底、简洁排版)
│   ├── cool/           # 酷炫渲染 (渐变背景、玻璃效果、动画)
│   └── torrent/        # 激流渲染 (暗黑风格、光球动画、行合并)
├── services/         # 核心服务
│   ├── renderService   # Markdown → HTML 渲染管线
│   ├── pluginRegistry  # 插件注册表
│   ├── projectIO       # 项目文件读写（.geekppt）
│   ├── exportService   # HTML 演示导出
│   └── performanceDetector # 设备性能检测与降级
├── types/            # TypeScript 类型定义
└── __tests__/        # 单元测试
```

---

## 渲染插件

Geek PPT 的渲染是插件化的。每个插件提供一套 CSS 样式，控制 Markdown 转换后的 HTML 在幻灯片中的视觉呈现。

### 内置插件

| 插件 | 说明 |
|------|------|
| **朴素** | 白色背景，清晰的排版层次，适合正式场合 |
| **酷炫** | 深色渐变背景，霓虹光效，玻璃拟态容器，入场动画，内容居中 |
| **激流** | 暗黑风格背景，动态光球轨迹动画，独特的“行合并”排版，极具张力 |

### 开发自定义插件

详细开发指导请参阅 **[渲染插件开发指导](docs/渲染插件开发指导.md)**。

---

## 项目文件格式

`.geekppt` 文件是一个 ZIP 容器，内部结构：

```
project.json          # 项目元数据（名称、尺寸、页面顺序）
slides/
  001.md              # 第 1 页 Markdown
  002.md              # 第 2 页 Markdown
  ...
assets/               # 资源文件（图片等）
plugins/
  lock.json           # 当前使用的渲染插件
```

---

## 设计与部署

- **产品设计** — 完整的产品设计方案请参阅 [docs/设计方案.md](docs/设计方案.md)
- **线上预览** — 如何使用 GitHub Pages 部署本项目请参阅 **[GitHub Pages 使用指南](docs/GitHubPages使用指南.md)**

---

## License

ISC
