# 🤝 贡献指南 / Contributing Guide

感谢你对 StudyDeck 的关注与支持！任何形式的贡献都非常欢迎。

## 开发环境

- Node.js ≥ 18
- npm ≥ 9

## 本地开发

```bash
git clone https://github.com/gitstq/StudyDeck.git
cd StudyDeck
npm install
npm run dev
```

## 提交规范（Angular Commit Convention）

```
<type>(<scope>): <subject>

# 示例
feat(textbooks): 支持批量导入教材
fix(notes): 修复标签检索偶发失效
docs(readme): 补充日文文档
```

常用 type：

- `feat` 新功能
- `fix` 修复
- `docs` 文档
- `style` 样式
- `refactor` 重构
- `test` 测试
- `chore` 构建/工具

## 分支规范

- `main`：稳定分支，仅接受经过测试的 PR
- 功能开发请新建分支：`feat/xxx`、`fix/xxx`

## 提交流程

1. Fork 本仓库并克隆到本地
2. 创建功能分支
3. 提交改动（遵循上述规范）
4. 运行测试：`npm test`
5. 运行构建：`npm run build`（确认无报错）
6. 发起 Pull Request，描述清楚改动内容与动机

## Issue 规范

- 🐛 Bug：请附上复现步骤、预期行为、实际行为、浏览器版本
- ✨ 功能建议：请说明使用场景与期望效果

再次感谢你的贡献！❤️
