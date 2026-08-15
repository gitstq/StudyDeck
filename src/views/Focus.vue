<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { store, logFocusSession } from '../store'
import { notify } from '../composables/useToast'

const modes = [
  { key: 'pomodoro', label: '专注', minutes: store.settings.pomodoro || 25 },
  { key: 'short', label: '短休息', minutes: store.settings.shortBreak || 5 },
  { key: 'long', label: '长休息', minutes: 15 }
]

const mode = ref('pomodoro')
const remaining = ref(modes[0].minutes * 60)
const running = ref(false)
let timer = null

const totalSeconds = computed(() => (modes.find((m) => m.key === mode.value)?.minutes || 25) * 60)
const display = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
const progressPct = computed(() => ((totalSeconds.value - remaining.value) / totalSeconds.value) * 100)

function switchMode(key) {
  mode.value = key
  remaining.value = (modes.find((m) => m.key === key)?.minutes || 25) * 60
  running.value = false
  clearInterval(timer)
}

function toggle() {
  if (running.value) {
    clearInterval(timer)
    timer = null
    running.value = false
  } else {
    running.value = true
    timer = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value -= 1
      } else {
        finish()
      }
    }, 1000)
  }
}

function reset() {
  clearInterval(timer)
  running.value = false
  remaining.value = totalSeconds.value
}

function finish() {
  clearInterval(timer)
  running.value = false
  if (mode.value === 'pomodoro') {
    logFocusSession(modes.find((m) => m.key === 'pomodoro').minutes)
    notify('✓ 专注完成，已计入学习统计')
    mode.value = 'short'
    remaining.value = (modes.find((m) => m.key === 'short')?.minutes || 5) * 60
  } else {
    notify('休息结束，准备下一轮专注吧')
    mode.value = 'pomodoro'
    remaining.value = (modes.find((m) => m.key === 'pomodoro')?.minutes || 25) * 60
  }
}

onBeforeUnmount(() => clearInterval(timer))

const todaySessions = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return store.focusSessions.filter((s) => s.date === today)
})
</script>

<template>
  <div>
    <div class="page-head rise">
      <div class="page-title">专注计时</div>
      <div class="page-desc">番茄工作法：专注 25 分钟，休息 5 分钟。</div>
    </div>

    <div class="row rise" style="max-width:460px; margin:0 auto; text-align:center; padding:34px 24px">
      <div style="display:flex; justify-content:center; gap:8px; margin-bottom:22px">
        <button v-for="m in modes" :key="m.key" class="chip"
          :class="{ 'chip-accent': mode === m.key }" @click="switchMode(m.key)">
          {{ m.label }} {{ m.minutes }}′
        </button>
      </div>

      <svg class="timer-ring" viewBox="0 0 220 220">
        <circle class="timer-track" cx="110" cy="110" r="100" />
        <circle class="timer-progress" cx="110" cy="110" r="100"
          :stroke-dasharray="2 * Math.PI * 100"
          :stroke-dashoffset="2 * Math.PI * 100 * (1 - progressPct / 100)" />
      </svg>

      <div style="font-size:54px; font-weight:800; letter-spacing:2px; margin-top:-176px; font-variant-numeric:tabular-nums">
        {{ display }}
      </div>
      <div style="color:var(--ink-3); margin-top:8px; font-size:13px">{{ running ? '专注中…' : '准备就绪' }}</div>

      <div style="display:flex; justify-content:center; gap:12px; margin-top:26px">
        <button class="btn btn-primary" style="min-width:120px; justify-content:center" @click="toggle">
          {{ running ? '⏸ 暂停' : '▶ 开始' }}
        </button>
        <button class="btn btn-ghost" @click="reset">↺ 重置</button>
      </div>
    </div>

    <div class="row rise d2" style="max-width:460px; margin:18px auto 0">
      <div class="row-title" style="margin-bottom:10px">今日专注记录</div>
      <div v-if="todaySessions.length">
        <div v-for="s in todaySessions" :key="s.id" style="padding:7px 0; border-bottom:1px dashed var(--line); display:flex; justify-content:space-between; font-size:13.5px">
          <span>{{ s.at ? new Date(s.at).toLocaleTimeString() : '—' }}</span>
          <span class="chip chip-accent">{{ s.minutes }} 分钟</span>
        </div>
      </div>
      <div v-else class="empty" style="padding:20px">
        <p>今天还没有完成专注，开始第一轮吧</p>
      </div>
    </div>
  </div>
</template>
