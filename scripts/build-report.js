/**
 * 构建信息报告生成器
 * 运行：npm run report
 * 输出：dist/build-report.json
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'))

const report = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  license: pkg.license,
  buildTime: new Date().toISOString(),
  entry: 'dist/index.html',
  stack: {
    framework: 'Vue 3',
    bundler: 'Vite 6',
    persistence: 'localStorage'
  }
}

mkdirSync(join(root, 'dist'), { recursive: true })
writeFileSync(join(root, 'dist/build-report.json'), JSON.stringify(report, null, 2))
console.log('✔ build-report.json 已生成：')
console.log(JSON.stringify(report, null, 2))
