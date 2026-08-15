<div align="center">

# 📚 StudyDeck · 教材學習工作台

**教材進度 · 筆記 · 錯題本 · 番茄專注 · 學習統計**

一款開箱即用的**純前端學習管理工具**，零後端、零部署，資料本地儲存，隱私安全。

[简体中文](./README.md) · [English](./README.en.md) · [日本語](./README.ja.md)

![version](https://img.shields.io/badge/version-1.0.0-0d9488?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![vue](https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square)
![vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)

</div>

---

## 🎉 專案介紹

在資訊爆炸的時代，學習離不開**體系化管理**。StudyDeck 將「教材閱讀 → 筆記沉澱 → 錯題複盤 → 專注訓練」整合為一條完整的學習閉環：

- 📖 管理多科目教材與章節進度，一目了然
- ✍️ 隨手記錄重點筆記，支援標籤檢索與置頂
- ❌ 建立錯題本，按「複習 3 次 → 已攻克」形成閉環
- ⏱️ 內建番茄專注計時，專注時長自動計入統計
- 📊 視覺化學習數據，掌握自己的學習節奏

**純前端實作**：所有資料保存在瀏覽器 `localStorage`，無需註冊、無需後端、無需資料庫，打開即用。

> 💡 專案靈感源自 GitHub 高熱度教材需求，但**不含任何受版權保護的教材內容**，定位為通用的學習管理工具。

---

## ✨ 核心特性

| 特性 | 說明 |
| --- | --- |
| 📚 教材書架 | 多科目分類、章節總數與已完成進度、進度百分比 |
| ❋ 筆記系統 | 標題 + 多行內容、科目關聯、標籤檢索、置頂 |
| ✕ 錯題本 | 題目 / 錯誤原因 / 正確解法、三態狀態機 |
| ◷ 番茄專注 | 專注 / 短休息 / 長休息三種模式，SVG 環形倒數 |
| 📊 學習統計 | 今日 / 本週專注時長、近 7 天專注柱狀圖、總體進度 |
| 🔒 隱私安全 | 資料僅存本地瀏覽器，可匯出 / 匯入 JSON 備份 |
| 🎨 精緻設計 | 溫暖紙感主題、綠松石強調色、動效過渡、響應式佈局 |

---

## 🚀 快速開始

```bash
# 1. 克隆倉庫
git clone https://github.com/gitstq/StudyDeck.git
cd StudyDeck

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器（http://localhost:5173）
npm run dev
```

### 生產建置

```bash
npm run build    # 產物輸出至 dist/
npm run preview  # 本地預覽建置產物
```

> 建置產物為純靜態，可直接部署至 GitHub Pages / Vercel / Netlify，或直接開啟 `dist/index.html`。

---

## 📖 詳細使用指南

- **新增教材**：「教材」頁 → 「＋ 新增教材」→ 選擇科目、填寫名稱與總章節數 → 儲存。
- **記錄筆記**：「筆記」頁 → 「＋ 新建筆記」→ 填寫標題、內容、科目與標籤 → 儲存。
- **管理錯題**：「錯題本」頁 → 「＋ 記錄錯題」→ 填寫題目、錯誤原因與正確解法 → 儲存。每次「✓ 複習一次」，複習滿 3 次自動標記「已攻克」。
- **番茄專注**：「專注」頁 → 選擇模式 → 「▶ 開始」，完成一輪 25 分鐘專注自動計入統計。
- **學習數據**：「總覽」頁聚合展示教材總體進度、筆記數、待攻克錯題、本週專注與近 7 天專注分佈。

---

## 💡 設計思路與迭代規劃

**設計理念**：以「學習閉環」為核心，把工具做輕、做得克制，介面遵循「紙張 + 綠松石」的溫暖視覺語言。

**迭代規劃**：

- [x] v1.0 教材進度 + 筆記 + 錯題本 + 番茄專注 + 統計
- [ ] v1.1 Markdown 渲染與富文本筆記
- [ ] v1.2 學習目標設定與提醒
- [ ] v1.3 雲端同步（可選後端）
- [ ] v1.4 PWA 離線應用與桌面打包

---

## 📦 打包與部署指南

### 部署到 GitHub Pages

```bash
npm run build
# 將 dist/ 目錄內容推送到 gh-pages 分支即可
```

### 環境要求

| 依賴 | 版本 |
| --- | --- |
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| 瀏覽器 | 任意現代瀏覽器 |

---

## 🤝 貢獻指南

歡迎任何形式的貢獻！請閱讀 [CONTRIBUTING.md](./CONTRIBUTING.md) 後提交 Issue 或 PR。

---

## 📄 開源協議

基於 [MIT License](./LICENSE) 開源，可自由使用、修改與散佈。

<div align="center">

**Made with ❤️ by [gitstq](https://github.com/gitstq)**

⭐ 如果這個專案對你有幫助，歡迎 Star 支持！

</div>
