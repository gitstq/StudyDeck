<script setup>
import { computed, ref } from 'vue'
import { store, addMistake, updateMistake, removeMistake, markMistakeReviewed, subjectName, subjectColor } from '../store'
import { notify } from '../composables/useToast'

const showModal = ref(false)
const editingId = ref(null)
const statusFilter = ref('all')
const form = ref({ subjectId: null, question: '', reason: '', solution: '' })

const statusMap = {
  pending: { label: '待复习', cls: 'chip-warm' },
  reviewing: { label: '复习中', cls: 'chip-blue' },
  solved: { label: '已攻克', cls: 'chip-accent' }
}

const mistakes = computed(() => {
  let list = [...store.mistakes]
  if (statusFilter.value !== 'all') list = list.filter((m) => m.status === statusFilter.value)
  return list.sort((a, b) => b.createdAt - a.createdAt)
})

const counts = computed(() => ({
  all: store.mistakes.length,
  pending: store.mistakes.filter((m) => m.status === 'pending').length,
  reviewing: store.mistakes.filter((m) => m.status === 'reviewing').length,
  solved: store.mistakes.filter((m) => m.status === 'solved').length
}))

function openAdd() {
  editingId.value = null
  form.value = { subjectId: null, question: '', reason: '', solution: '' }
  showModal.value = true
}

function openEdit(m) {
  editingId.value = m.id
  form.value = { subjectId: m.subjectId, question: m.question, reason: m.reason, solution: m.solution }
  showModal.value = true
}

function save() {
  if (!form.value.question.trim()) return notify('请填写题目内容')
  const payload = { ...form.value, question: form.value.question.trim() }
  if (editingId.value) {
    updateMistake(editingId.value, payload)
    notify('错题已更新')
  } else {
    addMistake(payload)
    notify('错题已记录')
  }
  showModal.value = false
}

function del(m) {
  if (confirm('删除这条错题？')) {
    removeMistake(m.id)
    notify('已删除')
  }
}

function review(m) {
  markMistakeReviewed(m.id)
  notify('复习 +1，连续 3 次自动标记为已攻克')
}
</script>

<template>
  <div>
    <div class="page-head rise" style="display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap">
      <div>
        <div class="page-title">错题本</div>
        <div class="page-desc">记录错题，复习 3 次即可攻克，形成闭环。</div>
      </div>
      <button class="btn btn-primary" @click="openAdd">＋ 记录错题</button>
    </div>

    <div style="margin-bottom:14px; display:flex; gap:8px; flex-wrap:wrap">
      <button class="chip" :class="{ 'chip-accent': statusFilter === 'all' }" @click="statusFilter = 'all'">全部 ({{ counts.all }})</button>
      <button class="chip" :class="{ 'chip-warm': statusFilter === 'pending' }" @click="statusFilter = 'pending'">待复习 ({{ counts.pending }})</button>
      <button class="chip" :class="{ 'chip-blue': statusFilter === 'reviewing' }" @click="statusFilter = 'reviewing'">复习中 ({{ counts.reviewing }})</button>
      <button class="chip" :class="{ 'chip-accent': statusFilter === 'solved' }" @click="statusFilter = 'solved'">已攻克 ({{ counts.solved }})</button>
    </div>

    <div v-if="!mistakes.length" class="row rise">
      <div class="empty">
        <div class="empty-icon">✕</div>
        <p>暂无错题</p>
      </div>
    </div>

    <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))">
      <div v-for="m in mistakes" :key="m.id" class="row rise">
        <div class="row-head">
          <div class="row-title" style="display:flex; align-items:center; gap:8px">
            <span :style="{ width:'9px', height:'9px', borderRadius:'2px', background: subjectColor(m.subjectId) }"></span>
            {{ m.question.length > 40 ? m.question.slice(0, 40) + '…' : m.question }}
          </div>
          <div class="row-actions">
            <span class="chip" :class="statusMap[m.status].cls">{{ statusMap[m.status].label }}</span>
          </div>
        </div>
        <div style="margin-top:8px; font-size:13px; color:var(--ink-2)">
          <div v-if="m.reason" style="margin-bottom:4px"><b>原因：</b>{{ m.reason }}</div>
          <div v-if="m.solution" style="color:var(--accent-ink)"><b>解法：</b>{{ m.solution }}</div>
        </div>
        <div class="row-meta" style="margin-top:8px">{{ subjectName(m.subjectId) }} · 已复习 {{ m.reviewedCount }} 次</div>
        <div class="row-actions" style="margin-top:12px">
          <button class="btn btn-ghost btn-sm" @click="review(m)">✓ 复习一次</button>
          <button class="btn btn-ghost btn-sm" @click="openEdit(m)">✎ 编辑</button>
          <button class="icon-btn danger" title="删除" @click="del(m)">✕</button>
        </div>
      </div>
    </div>

    <!-- 记录弹窗 -->
    <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-title">{{ editingId ? '编辑错题' : '记录错题' }}</div>
        <div class="field">
          <label>科目</label>
          <select v-model="form.subjectId" class="select">
            <option :value="null">未分类</option>
            <option v-for="s in store.subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="field">
          <label>题目</label>
          <textarea v-model="form.question" class="textarea" rows="2" placeholder="记录题目内容"></textarea>
        </div>
        <div class="field">
          <label>错误原因</label>
          <input v-model="form.reason" class="input" placeholder="例如：概念混淆 / 计算失误" />
        </div>
        <div class="field">
          <label>正确解法</label>
          <textarea v-model="form.solution" class="textarea" rows="3" placeholder="写下正确思路"></textarea>
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
