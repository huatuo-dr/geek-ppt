# Geek Slides Test Content

This file is a **test brief** for the geek-slides skill. Feed its content (or reference it) when invoking `/geek-slides` to generate a presentation that covers all common slide scenarios.

**Test parameters:**
- Language: Mixed (Chinese + English)
- Length: 19 slides
- Purpose: Teaching & Tutorial
- Topic: "AI 编程工具全景：从代码补全到自主编程"

---

## Slide 1 — Title Slide (layout-center)

# AI 编程工具全景
## 从代码补全到自主编程

演讲人：张三 | 2026 年 3 月

---

## Slide 2 — Pure Text (layout-center)

### 为什么关注 AI 编程？

软件工程正在经历前所未有的范式转变。AI 不再只是辅助工具，而是正在成为**开发流程的核心参与者**。

理解这些工具的能力边界和适用场景，是每个工程师的必修课。

---

## Slide 3 — Bullet List + Bold + Strikethrough (layout-center)

### 本次分享你将了解

- **代码补全**工具的演进路径
- Copilot、Cursor、Claude Code 的核心差异
- ~~传统 IDE 插件~~ → 自主编程 Agent 的转变
- 如何选择适合团队的 AI 工具
- **实战经验**：踩过的坑和最佳实践

---

## Slide 4 — Big Number / Stat (layout-center)

### 开发者采用率

**92%**

的专业开发者在 2025 年已使用 AI 编程工具

— Stack Overflow Developer Survey 2025

---

## Slide 5 — Blockquote / Quote (layout-center)

> "The best way to predict the future is to invent it."
>
> — Alan Kay

AI 编程工具正在重新定义"发明"的含义。

---

## Slide 6 — Image Only (layout-center)

### 工具生态全景图

（测试图片：使用一张本地图片或占位符）

*建议测试时提供一张本地 PNG/JPG 图片路径，验证 base64 嵌入效果*

---

## Slide 7 — Text + Image Split (layout-split)

**左侧文字：**

### GitHub Copilot

- 基于 OpenAI Codex 模型
- VS Code / JetBrains 深度集成
- 支持 inline completion 和 chat
- 月费 $10 / 企业版 $19

**右侧：** Copilot 界面截图或 logo

---

## Slide 8 — Table (layout-center)

### 主流工具对比

| 工具 | 厂商 | 模型 | 价格 | 特点 |
|------|------|------|------|------|
| Copilot | GitHub/OpenAI | GPT-4o | $10/月 | IDE 集成最成熟 |
| Cursor | Cursor Inc. | 多模型 | $20/月 | 编辑器原生 AI |
| Claude Code | Anthropic | Claude | $20/月 | 终端 Agent 模式 |
| Windsurf | Codeium | 多模型 | $15/月 | 流式编辑体验 |
| Gemini CLI | Google | Gemini | 免费 | 开源终端工具 |

---

## Slide 9 — 2-Element Comparison (layout-comparison)

### 代码补全 vs 自主编程

**代码补全（Copilot 模式）**
- 逐行/逐块建议
- 开发者主导控制
- 低风险、即时反馈
- 适合日常编码

**VS**

**自主编程（Agent 模式）**
- 端到端任务完成
- AI 主导、人审核
- 高效但需要信任
- 适合重复性任务

---

## Slide 10 — 3-Element Comparison (layout-grid cols-3)

### 三种协作模式

**Card 1: Autocomplete**
🔤 逐行补全
- 最小干预
- 最高可控性
- Tab 键接受建议
- 代表：Copilot inline

**Card 2: Chat + Edit**
💬 对话式编程
- 中等干预
- 描述意图后修改
- 需要上下文理解
- 代表：Cursor, Copilot Chat

**Card 3: Full Agent**
🤖 自主编程
- 最大干预
- 端到端完成任务
- 需要人类审核
- 代表：Claude Code, Devin

---

## Slide 11 — Ordered List / Process Steps (layout-center)

### AI 编程工具选型流程

1. **明确需求** — 补全、重构、还是端到端开发？
2. **评估团队** — 团队规模、技术栈、安全合规要求
3. **试用对比** — 至少试用 2-3 个工具各一周
4. **度量效果** — 代码产出量、Bug 率、开发者满意度

---

## Slide 12 — Checklist (layout-center)

### 工具选型评估清单

- [x] 支持团队主要编程语言（Python / TypeScript / Go）
- [x] 提供 VS Code 或 JetBrains 插件
- [ ] 支持私有化部署 / 本地模型
- [x] 符合公司数据安全合规要求
- [ ] 支持 MCP 协议扩展
- [x] 提供团队管理和用量统计后台
- [ ] 支持自定义 System Prompt / 项目规范
- [ ] 提供 API 访问用于 CI/CD 集成

✅ 已满足 4/8 项，建议优先评估**合规性**和**扩展性**缺失项。

---

## Slide 13 — Timeline (layout-timeline)

### AI 编程工具演进时间线

**2021** — GitHub Copilot Technical Preview 发布，震动业界

**2022** — Copilot 正式商用，ChatGPT 发布引爆 AI 热潮

**2023** — Cursor 编辑器发布，Agent 概念开始萌芽

**2024** — Claude Code、Devin 等 Agent 工具涌现

**2025** — AI 编程从辅助走向协作，MCP 协议统一工具生态

---

## Slide 14 — Code Snippet (layout-center)

### 用 Claude Code 自动生成 API

```python
# Claude Code generated this endpoint
@app.post("/api/users")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user with validation and error handling."""
    if await db.get(User, user.email):
        raise HTTPException(409, "User already exists")

    new_user = User(**user.model_dump())
    db.add(new_user)
    await db.commit()
    return {"id": new_user.id, "email": new_user.email}
```

注意：Claude Code 自动处理了**验证**、**错误处理**和**类型安全**。

---

## Slide 15 — Code Snippet + Explanation Split (layout-split)

**左侧代码：**

```javascript
// MCP Server definition
const server = new McpServer({
  name: "my-tool",
  version: "1.0.0",
});

server.tool("search", { query: z.string() },
  async ({ query }) => {
    const results = await search(query);
    return { content: [{ type: "text", text: results }] };
  }
);
```

**右侧说明：**

### MCP 协议

Model Context Protocol 是 Anthropic 提出的**开放标准**，让 AI 工具能够：

- 连接外部数据源
- 调用第三方 API
- 操作本地文件系统
- 实现 Tool Use 标准化

---

## Slide 16 — Chart: Bar Chart Description (layout-center)

### 开发效率提升对比

*（测试场景：描述一个柱状图，由 skill 生成 CSS/SVG 可视化）*

| 任务类型 | 无 AI | 有 AI | 提升幅度 |
|----------|-------|-------|----------|
| 新功能开发 | 8h | 3h | **62%** |
| Bug 修复 | 4h | 1.5h | **63%** |
| 代码审查 | 2h | 0.8h | **60%** |
| 写测试 | 3h | 1h | **67%** |
| 文档编写 | 2h | 0.5h | **75%** |

---

## Slide 17 — Chart: Pie / Donut Description (layout-split)

### 开发者最常用的 AI 功能

*（左侧：饼图描述）*

- 代码补全 **42%**
- Bug 修复 **23%**
- 代码解释 **15%**
- 测试生成 **12%**
- 文档编写 **8%**

*（右侧：文字说明）*

代码补全仍是最高频场景，但**Bug 修复**和**测试生成**的使用率增长最快（同比 +180%）。

---

## Slide 18 — Mixed Highlights + Nested List (layout-center)

### 最佳实践总结

- **DO ✅**
  - 用 AI 处理**重复性**和**样板代码**
  - 始终 review AI 生成的代码
  - 建立团队级 `CLAUDE.md` 规范文件
  - 用 ~~人工写文档~~ AI 自动生成，人工校对
- **DON'T ❌**
  - 不要盲目信任 AI 的安全相关代码
  - 不要让 AI ~~替代~~ code review 流程
  - 不要忽略 AI 生成代码的**许可证合规**问题

---

## Slide 19 — Closing / CTA (layout-center)

### 开始你的 AI 编程之旅

**三步行动：**

1. 今天就安装一个 AI 编程工具试试
2. 用它完成一个真实的小任务
3. 在团队中分享你的体验

---

感谢聆听 🙏

**张三** — [GitHub](https://github.com) — zhangsan@example.com

