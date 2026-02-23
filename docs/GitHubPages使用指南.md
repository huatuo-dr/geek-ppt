# GitHub Pages 使用指南 🚀

本文档指导你如何通过 GitHub Actions 自动将 Geek PPT 部署到 GitHub Pages，实现线上预览。

---

## 1. 准备工作

确保你的代码库中已包含以下文件：
- `.github/workflows/deploy.yml`: 自动化部署脚本。
- `vite.config.ts`: 其中 `base: "/geek-ppt/"` 配置已正确设置。

---

## 2. 开启部署流程

### 第一步：开启 Pages 功能
1. 在 GitHub 上进入你的仓库页面。
2. 点击顶部的 **Settings** 选项卡。
3. 在左侧菜单栏中选择 **Pages**。
4. 在 **Build and deployment** > **Source** 下拉菜单中，选择 **GitHub Actions**（重要：不要选择 Deploy from a branch）。

### 第二步：提交代码
将上述配置文件 push 到远程 `master` 分支：
```bash
git add .
git commit -m "chore: add github pages deployment"
git push origin master
```

### 第三步：监控构建进度
1. 点击仓库顶部的 **Actions** 选项卡。
2. 你会看到一个名为 `Deploy to GitHub Pages` 的工作流正在运行。
3. 等待所有步骤变绿 ✅。

---

## 3. 访问站点

当部署任务完成后，访问地址格式通常为：
`https://<你的GitHub用户名>.github.io/geek-ppt/`

> [!TIP]
> 如果访问出现 404，请检查 `vite.config.ts` 中的 `base` 配置是否与你的仓库名称一致。

---

## 4. 常见问题

### 1. 页面样式错乱或图片加载失败
- 如果你使用的是默认域名（`<user>.github.io/repo/`），请检查 `vite.config.ts` 中的 `base` 是否为 `"/geek-ppt/"`。
- **如果你使用的是自定义域名（如 `ppt.huatuo.cloud`），请务必将 `vite.config.ts` 中的 `base` 修改为 `"/"`。**

---

## 5. 进阶：使用腾讯云加速 & 自定义域名 `ppt.huatuo.cloud`

由于 GitHub Pages 在国内访问可能受限，可以通过你的腾讯云域名进行加速。

### 方案 A：直接绑定自定义域名 (CNAME 方式)
1. **腾讯云 DNS 设置**：
   - 登录腾讯云控制台 > DNS 解析。
   - 为域名 `huatuo.cloud` 添加子域名 `ppt` 的解析记录。
   - 类型：**CNAME**。
   - 记录值：`huatuo-dr.github.io`。
2. **GitHub 端设置**：
   - 进入 **Settings** > **Pages** > **Custom domain**。
   - 输入 `ppt.huatuo.cloud` 并保存。
   - 勾选 **Enforce HTTPS**。
3. **重要：调整代码配置**：
   - 修改 `vite.config.ts`：将 `base: "/geek-ppt/"` 改为 `base: "/"`。

### 方案 B：腾讯云 CDN / EdgeOne 代理加速 (国内极速)
如果你希望在国内获得极速体验，可以利用腾讯云 CDN：
1. **添加加速域名**：在腾讯云 CDN 控制台添加 `ppt.huatuo.cloud`。
2. **配置源站**：
   - 源站类型：域名。
   - 源站地址：`huatuo-dr.github.io`。
   - **回源 HOST**：`huatuo-dr.github.io`（非常重要，不填会无法访问）。
3. **设置 HTTPS**：在腾讯云 CDN 部署 `huatuo.cloud` 的 SSL 证书。
