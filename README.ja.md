<div align="center">

# 📚 StudyDeck · 教科書学習ワークスペース

**教科書進捗 · ノート · 誤答ノート · ポモドーロ · 学習統計**

すぐに使える**純フロントエンドの学習管理ツール**。バックエンド不要・デプロイ不要・データはローカル保存でプライバシー安全。

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md)

![version](https://img.shields.io/badge/version-1.0.0-0d9488?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![vue](https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square)
![vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)

</div>

---

## 🎉 プロジェクト紹介

StudyDeck は「教科書を読む → ノートに残す → 誤答を振り返る → 集中して学習する」という一連の**学習ループ**を一元管理するツールです：

- 📖 科目別の教科書と章の進捗を一目で管理
- ✍️ 重要なノートをタグ検索・ピン留め付きで記録
- ❌ 「3回復習 → 解決」のクローズドループを備えた誤答ノート
- ⏱️ 集中時間を自動集計するポモドーロタイマー内蔵
- 📊 学習データを可視化して自分のペースを把握

**純フロントエンド**：全データはブラウザの `localStorage` に保存。登録不要・バックエンド不要・データベース不要で、開くだけで利用できます。

> 💡 GitHub で話題の教科書ニーズに着想を得た**汎用学習管理ツール**です。著作権のある教材コンテンツは一切含みません。

---

## ✨ 主な機能

| 機能 | 説明 |
| --- | --- |
| 📚 教科書シェルフ | 複数科目・章の総数と達成数・進捗率 |
| ❋ ノート | タイトル＋複数行内容・科目連携・タグ検索・ピン留め |
| ✕ 誤答ノート | 問題／原因／解法・3状態マシン |
| ◷ ポモドーロ | 集中／短休憩／長休憩・SVGリングカウントダウン |
| 📊 統計 | 今日／今週の集中時間・7日間バーチャート・全体進捗 |
| 🔒 プライバシー | データはローカル保存・JSONエクスポート／インポート |
| 🎨 デザイン | 温かみのある紙テーマ・ターコイズアクセント・レスポンシブ |

---

## 🚀 クイックスタート

```bash
# 1. クローン
git clone https://github.com/gitstq/StudyDeck.git
cd StudyDeck

# 2. 依存関係をインストール
npm install

# 3. 開発サーバー起動（http://localhost:5173）
npm run dev
```

### 本番ビルド

```bash
npm run build    # dist/ に出力
npm run preview  # ビルド結果をプレビュー
```

> ビルド成果物は完全に静的です。GitHub Pages / Vercel / Netlify にデプロイするか、`dist/index.html` を直接開いてください。

---

## 📖 使い方

- **教科書を追加**：「教材」→「＋ 追加」→ 科目・名前・総章数を入力 → 保存。
- **ノートを記録**：「ノート」→「＋ 新規」→ タイトル・内容・科目・タグを入力 → 保存。
- **誤答を管理**：「誤答ノート」→「＋ 記録」→ 問題・原因・解法を入力 → 保存。「✓ 復習」3回で自動的に「解決」。
- **ポモドーロ**：「集中」→ モード選択 →「▶ 開始」。25分完了で自動集計。
- **学習データ**：「総覧」で全体進捗・ノート数・未解決誤答・今週の集中時間を確認。

---

## 💡 設計思想とロードマップ

**設計思想**：軽量で抑制の効いた学習ループを目指し、「紙＋ターコイズ」の温かいビジュアル言語を採用。

**ロードマップ**：

- [x] v1.0 進捗 + ノート + 誤答 + ポモドーロ + 統計
- [ ] v1.1 Markdownレンダリングとリッチノート
- [ ] v1.2 学習目標とリマインダー
- [ ] v1.3 クラウド同期（オプション）
- [ ] v1.4 PWAオフラインとデスクトップパッケージ

---

## 📦 パッケージングとデプロイ

### GitHub Pages

```bash
npm run build
# dist/ の内容を gh-pages ブランチへプッシュ
```

### 環境要件

| 依存 | バージョン |
| --- | --- |
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| ブラウザ | 最新のモダンブラウザ |

---

## 🤝 コントリビューション

[CONTRIBUTING.md](./CONTRIBUTING.md) をご一読の上、Issue / PR をご提出ください。

---

## 📄 ライセンス

[MIT License](./LICENSE) で公開されています。

<div align="center">

**Made with ❤️ by [gitstq](https://github.com/gitstq)**

⭐ お役に立てたら Star をお願いします！

</div>
