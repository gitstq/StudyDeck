import { reactive, watch } from 'vue'

/**
 * StudyDeck 全局状态仓库
 * 所有学习数据通过 localStorage 持久化，开箱即用、零后端依赖。
 */

const STORAGE_KEY = 'studydeck.v1'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function seed() {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  return {
    subjects: [
      { id: uid(), name: '数学', color: '#0d9488' },
      { id: uid(), name: '语文', color: '#ea580c' },
      { id: uid(), name: '英语', color: '#2563eb' }
    ],
    textbooks: [],
    notes: [],
    mistakes: [],
    focusSessions: [
      { id: uid(), date: today, minutes: 25 },
      { id: uid(), date: today, minutes: 25 }
    ],
    settings: { pomodoro: 25, shortBreak: 5 }
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return Object.assign(seed(), JSON.parse(raw))
  } catch (e) {
    console.warn('StudyDeck: 读取本地数据失败，已重置', e)
  }
  return seed()
}

export const store = reactive(load())

watch(
  store,
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch (e) {
      console.warn('StudyDeck: 本地存储写入失败', e)
    }
  },
  { deep: true }
)

/* ---------- 教材 ---------- */
export function addTextbook(subjectId, name, totalChapters = 0) {
  store.textbooks.push({
    id: uid(),
    subjectId,
    name,
    totalChapters,
    doneChapters: 0,
    createdAt: Date.now()
  })
}

export function removeTextbook(id) {
  const i = store.textbooks.findIndex((t) => t.id === id)
  if (i > -1) store.textbooks.splice(i, 1)
}

export function setChapterProgress(id, done) {
  const t = store.textbooks.find((x) => x.id === id)
  if (t) {
    t.doneChapters = Math.max(0, Math.min(done, t.totalChapters || 0))
  }
}

/* ---------- 笔记 ---------- */
export function addNote({ title, content, subjectId, tags }) {
  store.notes.unshift({
    id: uid(),
    title,
    content,
    subjectId: subjectId || null,
    tags: tags || [],
    pinned: false,
    updatedAt: Date.now()
  })
}

export function updateNote(id, patch) {
  const n = store.notes.find((x) => x.id === id)
  if (n) Object.assign(n, patch, { updatedAt: Date.now() })
}

export function removeNote(id) {
  const i = store.notes.findIndex((x) => x.id === id)
  if (i > -1) store.notes.splice(i, 1)
}

export function togglePinNote(id) {
  const n = store.notes.find((x) => x.id === id)
  if (n) n.pinned = !n.pinned
}

/* ---------- 错题本 ---------- */
export function addMistake({ subjectId, question, reason, solution }) {
  store.mistakes.unshift({
    id: uid(),
    subjectId: subjectId || null,
    question,
    reason,
    solution,
    status: 'pending', // pending | reviewing | solved
    reviewedCount: 0,
    createdAt: Date.now()
  })
}

export function updateMistake(id, patch) {
  const m = store.mistakes.find((x) => x.id === id)
  if (m) Object.assign(m, patch)
}

export function removeMistake(id) {
  const i = store.mistakes.findIndex((x) => x.id === id)
  if (i > -1) store.mistakes.splice(i, 1)
}

export function markMistakeReviewed(id) {
  const m = store.mistakes.find((x) => x.id === id)
  if (m) {
    m.reviewedCount += 1
    m.status = m.reviewedCount >= 3 ? 'solved' : 'reviewing'
  }
}

/* ---------- 专注 ---------- */
export function logFocusSession(minutes) {
  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  store.focusSessions.push({ id: uid(), date, minutes, at: now.toISOString() })
}

export function focusMinutesToday() {
  const today = new Date().toISOString().slice(0, 10)
  return store.focusSessions.filter((s) => s.date === today).reduce((a, s) => a + s.minutes, 0)
}

export function focusMinutesThisWeek() {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 6 * 86400000).toISOString().slice(0, 10)
  return store.focusSessions
    .filter((s) => s.date >= weekAgo)
    .reduce((a, s) => a + s.minutes, 0)
}

/* ---------- 工具 ---------- */
export function subjectName(id) {
  const s = store.subjects.find((x) => x.id === id)
  return s ? s.name : '未分类'
}

export function subjectColor(id) {
  const s = store.subjects.find((x) => x.id === id)
  return s ? s.color : '#94a3b8'
}

export function exportData() {
  return JSON.stringify(store, null, 2)
}

export function importData(json) {
  try {
    const data = JSON.parse(json)
    Object.assign(store, data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    return true
  } catch (e) {
    return false
  }
}

export function resetData() {
  const fresh = seed()
  Object.keys(store).forEach((k) => delete store[k])
  Object.assign(store, fresh)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export { uid }
