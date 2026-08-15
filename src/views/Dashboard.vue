<script setup>
import { computed } from 'vue'
import { store, focusMinutesToday, focusMinutesThisWeek } from '../store'
import { notify } from '../composables/useToast'

const totalTextbooks = computed(() => store.textbooks.length)
const totalNotes = computed(() => store.notes.length)
const pendingMistakes = computed(() => store.mistakes.filter((m) => m.status !== 'solved').length)
const focusToday = computed(() => focusMinutesToday())
const focusWeek = computed(() => focusMinutesThisWeek())

const overallProgress = computed(() => {
  const total = store.textbooks.reduce((a, t) => a + (t.totalChapters || 0), 0)
  const done = store.textbooks.reduce((a, t) => a + t.doneChapters, 0)
  return total ? Math.round((done / total) * 100) : 0
})

const recentNotes = computed(() =>
  [...store.notes].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4)
)

const recentMistakes = computed(() =>
  [...store.mistakes].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)
)

/* 最近 7 天专注分布 */
const weekBars = computed(() => {
  const days = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000)
    const key = d.toISOString().slice(0, 10)
    const minutes = store.focusSessions.filter((s) => s.date === key).reduce((a, s) => a + s.minutes, 0)
    days.push({ key, label: `${d.getMonth() + 1}/${d.getDate()}`, minutes })
  }
  const max = Math.max(1, ...days.map((d) => d.minutes))
  return days.map((d) => ({ ...d, pct: Math.round((d.minutes / max) * 100) }))
})

const hour = new Date().getHours()
const greeting = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

function go(path) {
  window.location.hash = '#' + path
}
</script>

<template>
  <div>
    <div class="page-head rise">
      <div class="page-title">{{ greeting }}，继续你的学习 ✦</div>
      <div class="page-desc">今天已专注 {{ focusToday }} 分钟，坚持就是最好的天赋。</div>
    </div>

    <div class="grid grid-4" style="margin-bottom: 20px">
      <div class="stat-card rise d1">
        <span class="stat-icon">◫</span>
        <div class="stat-label">教材进度</div>
        <div class="stat-value">{{ overallProgress }}<span style="font-size:16px">%</span></div>
        <div class="stat-sub">{{ totalTextbooks }} 本教材</div>
        <div class="progress"><div class="progress-fill" :style="{ width: overallProgress + '%' }"></div></div>
      </div>
      <div class="stat-card rise d2">
        <span class="stat-icon">❋</span>
        <div class="stat-label">笔记</div>
        <div class="stat-value">{{ totalNotes }}</div>
        <div class="stat-sub">累计记录</div>
      </div>
      <div class="stat-card rise d3">
        <span class="stat-icon">✕</span>
        <div class="stat-label">待攻克错题</div>
        <div class="stat-value">{{ pendingMistakes }}</div>
        <div class="stat-sub">含复习中</div>
      </div>
      <div class="stat-card rise d4">
        <span class="stat-icon">◷</span>
        <div class="stat-label">本周专注</div>
        <div class="stat-value">{{ focusWeek }}<span style="font-size:16px"> min</span></div>
        <div class="stat-sub">今日 {{ focusToday }} min</div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="row rise">
        <div class="row-head" style="margin-bottom: 14px">
          <div>
            <div class="row-title">最近 7 天专注</div>
            <div class="row-meta">每日专注分钟数</div>
          </div>
        </div>
        <div style="display:flex; align-items:flex-end; gap:10px; height:120px">
          <div v-for="b in weekBars" :key="b.key" style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px">
            <div style="font-size:11px; color:var(--ink-3)">{{ b.minutes || '' }}</div>
            <div :title="b.label + ' ' + b.minutes + 'min'" style="width:100%; max-width:34px; border-radius:6px 6px 2px 2px; background:linear-gradient(180deg,#14b8a6,#0d9488); transition:height .6s cubic-bezier(.22,1,.36,1)"
              :style="{ height: Math.max(b.minutes > 0 ? 8 : 3, (b.pct * 110) / 100) + 'px', opacity: b.minutes ? 1 : 0.15 }"></div>
            <div style="font-size:10.5px; color:var(--ink-3)">{{ b.label }}</div>
          </div>
        </div>
      </div>

      <div class="row rise d2">
        <div class="row-head" style="margin-bottom: 10px">
          <div>
            <div class="row-title">最近笔记</div>
            <div class="row-meta">随手记录，温故知新</div>
          </div>
          <button class="btn btn-ghost btn-sm" @click="go('/notes')">管理 →</button>
        </div>
        <div v-if="recentNotes.length">
          <div v-for="n in recentNotes" :key="n.id" style="padding:8px 0; border-bottom:1px dashed var(--line); display:flex; justify-content:space-between; gap:10px">
            <div style="font-weight:600; font-size:13.5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">{{ n.title }}</div>
            <span class="chip" style="flex-shrink:0">{{ new Date(n.updatedAt).toLocaleDateString() }}</span>
          </div>
        </div>
        <div v-else class="empty" style="padding:22px">
          <div class="empty-icon">❋</div>
          <p>还没有笔记，去写第一条吧</p>
        </div>
      </div>
    </div>
  </div>
</template>
