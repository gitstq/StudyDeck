<script setup>
import { computed, ref } from 'vue'
import { store, addNote, updateNote, removeNote, togglePinNote, subjectName } from '../store'
import { notify } from '../composables/useToast'

const showModal = ref(false)
const editingId = ref(null)
const query = ref('')
const filterTag = ref('')
const form = ref({ title: '', content: '', subjectId: null, tags: '' })

const allTags = computed(() => {
  const set = new Set()
  store.notes.forEach((n) => (n.tags || []).forEach((t) => set.add(t)))
  return [...set]
})

const notes = computed(() => {
  let list = [...store.notes]
  if (query.value) {
    const q = query.value.toLowerCase()
    list = list.filter((n) => (n.title + ' ' + n.content).toLowerCase().includes(q))
  }
  if (filterTag.value) list = list.filter((n) => (n.tags || []).includes(filterTag.value))
  return [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
})

function openAdd() {
  editingId.value = null
  form.value = { title: '', content: '', subjectId: null, tags: '' }
  showModal.value = true
}

function openEdit(n) {
  editingId.value = n.id
  form.value = { title: n.title, content: n.content, subjectId: n.subjectId, tags: (n.tags || []).join(', ') }
  showModal.value = true
}

function save() {
  if (!form.value.title.trim()) return notify('请填写标题')
  const payload = {
    title: form.value.title.trim(),
    content: form.value.content,
    subjectId: form.value.subjectId || null,
    tags: form.value.tags.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
  }
  if (editingId.value) {
    updateNote(editingId.value, payload)
    notify('笔记已更新')
  } else {
    addNote(payload)
    notify('笔记已保存')
  }
  showModal.value = false
}

function del(n) {
  if (confirm(`删除笔记「${n.title}」？`)) {
    removeNote(n.id)
    notify('笔记已删除')
  }
}

function pin(n) {
  togglePinNote(n.id)
}
</script>

<template>
  <div>
    <div class="page-head rise" style="display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap">
      <div>
        <div class="page-title">笔记</div>
        <div class="page-desc">记录灵感与重点，支持标签检索与置顶。</div>
      </div>
      <div style="display:flex; gap:10px">
        <input v-model="query" class="input" placeholder="搜索笔记…" style="width:200px" />
        <button class="btn btn-primary" @click="openAdd">＋ 新建笔记</button>
      </div>
    </div>

    <div style="margin-bottom:14px; display:flex; gap:8px; flex-wrap:wrap">
      <button class="chip" :class="{ 'chip-accent': !filterTag }" @click="filterTag = ''">全部</button>
      <button v-for="t in allTags" :key="t" class="chip" :class="{ 'chip-accent': filterTag === t }" @click="filterTag = filterTag === t ? '' : t">{{ t }}</button>
    </div>

    <div v-if="!notes.length" class="row rise">
      <div class="empty">
        <div class="empty-icon">❋</div>
        <p>没有匹配的笔记</p>
      </div>
    </div>

    <div class="grid grid-2">
      <div v-for="n in notes" :key="n.id" class="row rise" :style="{ borderLeft: '3px solid var(--accent)' }">
        <div class="row-head">
          <div class="row-title">{{ n.pinned ? '📌 ' : '' }}{{ n.title }}</div>
          <div class="row-actions">
            <button class="icon-btn" title="置顶" @click="pin(n)">{{ n.pinned ? '✓' : '⊹' }}</button>
            <button class="icon-btn" title="编辑" @click="openEdit(n)">✎</button>
            <button class="icon-btn danger" title="删除" @click="del(n)">✕</button>
          </div>
        </div>
        <div class="row-meta" style="white-space:pre-wrap; max-height:72px; overflow:hidden; margin-top:8px">{{ n.content }}</div>
        <div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap; align-items:center">
          <span v-for="t in n.tags" :key="t" class="chip chip-blue">{{ t }}</span>
          <span class="chip" style="margin-left:auto">{{ subjectName(n.subjectId) }} · {{ new Date(n.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-title">{{ editingId ? '编辑笔记' : '新建笔记' }}</div>
        <div class="field">
          <label>标题</label>
          <input v-model="form.title" class="input" placeholder="笔记标题" />
        </div>
        <div class="field">
          <label>内容（支持多行）</label>
          <textarea v-model="form.content" class="textarea" rows="6" placeholder="记录你的重点、公式、心得…"></textarea>
        </div>
        <div class="grid grid-2">
          <div class="field">
            <label>科目</label>
            <select v-model="form.subjectId" class="select">
              <option :value="null">未分类</option>
              <option v-for="s in store.subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div class="field">
            <label>标签（逗号分隔）</label>
            <input v-model="form.tags" class="input" placeholder="重点, 公式" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
