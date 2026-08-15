import { test } from 'node:test'
import assert from 'node:assert/strict'

/**
 * 纯函数工具测试（store 依赖 localStorage，仅在浏览器环境可用，
 * 这里测试可脱离 DOM 的通用逻辑片段）。
 */

// 从 store 中提取的纯函数（复制核心逻辑避免 DOM 依赖）
function computeProgress(done, total) {
  return total ? Math.round((done / total) * 100) : 0
}

function splitTags(raw) {
  return String(raw || '')
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function resolveStatus(reviewedCount) {
  return reviewedCount >= 3 ? 'solved' : reviewedCount >= 1 ? 'reviewing' : 'pending'
}

function sumMinutes(sessions) {
  return sessions.reduce((a, s) => a + s.minutes, 0)
}

test('computeProgress 计算章节进度百分比', () => {
  assert.equal(computeProgress(6, 12), 50)
  assert.equal(computeProgress(0, 12), 0)
  assert.equal(computeProgress(12, 12), 100)
  assert.equal(computeProgress(0, 0), 0)
})

test('splitTags 支持中英文逗号与空格清洗', () => {
  assert.deepEqual(splitTags('重点, 公式，复习'), ['重点', '公式', '复习'])
  assert.deepEqual(splitTags(''), [])
  assert.deepEqual(splitTags('   '), [])
})

test('resolveStatus 错题状态机：3 次复习后标记已攻克', () => {
  assert.equal(resolveStatus(0), 'pending')
  assert.equal(resolveStatus(1), 'reviewing')
  assert.equal(resolveStatus(2), 'reviewing')
  assert.equal(resolveStatus(3), 'solved')
})

test('sumMinutes 专注时长汇总', () => {
  assert.equal(sumMinutes([{ minutes: 25 }, { minutes: 25 }, { minutes: 5 }]), 55)
  assert.equal(sumMinutes([]), 0)
})
