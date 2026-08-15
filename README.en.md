<div align="center">

# 📚 StudyDeck · Textbook Learning Workspace

**Textbook Progress · Notes · Mistake Book · Pomodoro · Statistics**

An out-of-the-box, **pure front-end learning management tool**. Zero backend, zero deployment, all data stored locally — private and secure.

[简体中文](./README.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md)

![version](https://img.shields.io/badge/version-1.0.0-0d9488?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![vue](https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square)
![vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)
![platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)

</div>

---

## 🎉 Introduction

In an age of information overload, effective learning needs **systematic management**. StudyDeck closes the loop from *reading textbooks → taking notes → reviewing mistakes → focused training*:

- 📖 Manage textbooks and chapter progress across subjects at a glance
- ✍️ Capture key notes with tag search and pinning
- ❌ Build a mistake book with a "review 3 times → solved" closed loop
- ⏱️ Built-in Pomodoro timer with auto-tracked focus stats
- 📊 Visualize learning data to master your own rhythm

**Pure front-end**: all data lives in your browser's `localStorage`. No sign-up, no backend, no database — just open and use.

> 💡 Inspired by trending textbook demand on GitHub, but **contains no copyrighted textbook content** — a general-purpose study manager for any subject or material.

---

## ✨ Key Features

| Feature | Description |
| --- | --- |
| 📚 Textbook Shelf | Multi-subject categories, total vs. completed chapters, progress percentage |
| ❋ Notes | Title + multiline content, subject link, tag search, pin |
| ✕ Mistake Book | Question / reason / solution, 3-state machine (pending → reviewing → solved) |
| ◷ Pomodoro | Focus / short break / long break, SVG ring countdown |
| 📊 Statistics | Today / weekly focus, 7-day bar chart, overall progress |
| 🔒 Privacy | Data stays local; export / import JSON backup |
| 🎨 Design | Warm paper theme, teal accent, motion transitions, responsive |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/gitstq/StudyDeck.git
cd StudyDeck

# 2. Install
npm install

# 3. Dev server (http://localhost:5173)
npm run dev
```

### Production Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the build
```

> The built `dist/` is fully static — deploy to GitHub Pages / Vercel / Netlify, or open `dist/index.html` directly.

---

## 📖 Usage Guide

- **Add textbook**: Textbooks → "＋ Add" → pick subject, name and total chapters → save. Use `＋ / −` to adjust done chapters.
- **Take notes**: Notes → "＋ New note" → fill title, content, subject, tags → save. Search by keyword, filter by tag, pin with `⊹`.
- **Manage mistakes**: Mistake Book → "＋ Record" → fill question, reason, solution → save. Tap "✓ Review" — after 3 reviews it auto-marks as "solved".
- **Pomodoro**: Focus → pick mode → "▶ Start". Each completed 25-min focus is logged automatically.
- **Statistics**: Dashboard aggregates overall progress, note count, pending mistakes, weekly focus and the 7-day bar chart.

---

## 💡 Design & Roadmap

**Philosophy**: a lightweight learning loop. Data-driven, warm "paper + teal" visual language, restrained UI.

**Roadmap**:

- [x] v1.0 progress + notes + mistakes + pomodoro + stats
- [ ] v1.1 Markdown rendering & rich notes
- [ ] v1.2 Study goals & reminders
- [ ] v1.3 Optional cloud sync
- [ ] v1.4 PWA offline & desktop packaging

---

## 📦 Packaging & Deployment

### GitHub Pages

```bash
npm run build
# push dist/ contents to the gh-pages branch
```

### Requirements

| Dependency | Version |
| --- | --- |
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Browser | Any modern browser |

> Pure Web app — no native binaries.

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening Issues / PRs.

- 🐛 Bugs: use the `bug` label
- ✨ Features: use the `feature` / `enhancement` label
- 📖 Docs: use the `documentation` label

---

## 📄 License

[MIT License](./LICENSE). Free to use, modify and distribute.

<div align="center">

**Made with ❤️ by [gitstq](https://github.com/gitstq)**

⭐ Star us if this helps you!

</div>
