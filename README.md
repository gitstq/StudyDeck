<div align="center">

# 📚 StudyDeck · 教材学习工作台

**教材进度 · 笔记 · 错题本 · 番茄专注 · 学习统计**

一款开箱即用的**纯前端学习管理工具**，零后端、零部署，数据本地存储，隐私安全。

[English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md)

![version](https://img.shields.io/badge/version-1.0.0-0d9488?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![vue](https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square)
![vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)

</div>

---

## 🎉 项目介绍

在信息爆炸的时代，学习离不开**体系化管理**。StudyDeck 将「教材阅读 → 笔记沉淀 → 错题复盘 → 专注训练」整合为一条完整的学习闭环，帮助你：

- 📖 管理多科目教材与章节进度，进度一目了然
- ✍️ 随手记录重点笔记，支持标签检索与置顶
- ❌ 建立错题本，按「复习 3 次 → 已攻克」形成闭环
- ⏱️ 内置番茄专注计时，专注时长自动计入统计
- 📊 可视化学习数据，掌握自己的学习节奏

**纯前端实现**：所有数据保存在浏览器 `localStorage`，无需注册、无需后端、无需数据库，打开即用。

> 💡 项目灵感源自 GitHub 高热度教材需求，但**不含任何受版权保护的教材内容**，定位为通用的学习管理工具，任何学科、任何教材均可使用。

---

## ✨ 核心特性

| 特性 | 说明 |
| --- | --- |
| 📚 教材书架 | 多科目分类、章节总数与已完成进度、进度百分比 |
| ❋ 笔记系统 | 标题 + 多行内容、科目关联、标签检索、置顶 |
| ✕ 错题本 | 题目 / 错误原因 / 正确解法、三态状态机（待复习→复习中→已攻克） |
| ◷ 番茄专注 | 专注 / 短休息 / 长休息三种模式，SVG 环形倒计时 |
| 📊 学习统计 | 今日 / 本周专注时长、近 7 天专注柱状图、总体进度 |
| 🔒 隐私安全 | 数据仅存本地浏览器，可导出 / 导入 JSON 备份 |
| 🎨 精致设计 | 温暖纸感主题、绿松石强调色、动效过渡、响应式布局 |

---

## 🚀 快速开始

### 在线体验

构建产物可直接部署到任意静态托管（GitHub Pages / Vercel / Netlify 等）。

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/gitstq/StudyDeck.git
cd StudyDeck

# 2. 安装依赖
npm install

# 3. 启动开发服务器（http://localhost:5173）
npm run dev
```

### 生产构建

```bash
npm run build    # 产物输出至 dist/
npm run preview  # 本地预览构建产物
```

> 也可直接打开 `dist/index.html` 使用（纯静态，无需服务器）。

---

## 📖 详细使用指南

### 添加教材
进入「教材」页 → 点击「＋ 添加教材」→ 选择科目、填写名称与总章节数 → 保存。之后可用 `＋ / －` 按钮或直接输入数字调整已完成章节，进度条与百分比实时更新。

### 记录笔记
进入「笔记」页 → 点击「＋ 新建笔记」→ 填写标题、内容、科目与标签 → 保存。支持在顶部搜索框按关键词检索，点击标签可快速过滤。点击 `⊹` 可置顶重要笔记。

### 管理错题
进入「错题本」页 → 点击「＋ 记录错题」→ 填写题目、错误原因与正确解法 → 保存。每次「✓ 复习一次」，复习满 3 次自动标记为「已攻克」，形成复习闭环。

### 使用番茄专注
进入「专注」页 → 选择专注 / 短休息 / 长休息模式 → 点击「▶ 开始」。每完成一轮 25 分钟专注，自动计入当日统计。

### 查看学习数据
「总览」页聚合展示教材总体进度、笔记数、待攻克错题、本周专注，以及最近 7 天的专注分布柱状图。

---

## 💡 设计思路与迭代规划

**设计理念**：以「学习闭环」为核心，把工具做轻、做得克制。所有功能围绕数据展开，界面遵循「纸张 + 绿松石」的温暖视觉语言，避免花哨组件堆砌，保证扫一眼就能上手。

**迭代规划**：

- [x] v1.0 教材进度 + 笔记 + 错题本 + 番茄专注 + 统计
- [ ] v1.1 支持 Markdown 渲染与富文本笔记
- [ ] v1.2 学习目标设定与提醒
- [ ] v1.3 数据云同步（可选的第三方后端）
- [ ] v1.4 PWA 离线应用与桌面打包

---

## 📦 打包与部署指南

### 部署到 GitHub Pages

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支即可
```

### 环境要求

| 依赖 | 版本 |
| --- | --- |
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| 浏览器 | 任意现代浏览器（Chrome / Edge / Firefox / Safari） |

> 本项目为纯 Web 应用，无跨平台原生二进制产物。

---

## 🤝 贡献指南

欢迎任何形式的贡献！请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 后提交 Issue 或 PR。

- 🐛 提交 Bug：使用 `bug` 标签
- ✨ 新功能建议：使用 `feature` / `enhancement` 标签
- 📖 文档改进：使用 `documentation` 标签

---

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源，可自由使用、修改与分发。

<div align="center">

**Made with ❤️ by [gitstq](https://github.com/gitstq)**

⭐ 如果这个项目对你有帮助，欢迎 Star 支持！

</div>
