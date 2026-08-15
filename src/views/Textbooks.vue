<script setup>
import { computed, ref } from 'vue'
import { store, addTextbook, removeTextbook, setChapterProgress, subjectName, subjectColor } from '../store'
import { notify } from '../composables/useToast'

const showModal = ref(false)
const form = ref({ subjectId: store.subjects[0]?.id || '', name: '', totalChapters: 0 })

function openModal() {
  form.value = { subjectId: store.subjects[0]?.id || '', name: '', totalChapters: 0 }
  showModal.value = true
}

function save() {
  if (!form.value.name.trim()) return notify('请填写教材名称')
  addTextbook(form.value.subjectId, form.value.name.trim(), Number(form.value.totalChapters) || 0)
  showModal.value = false
  notify('教材已添加')
}

function del(id, name) {
  if (confirm(`确定删除「${name}」吗？`)) {
    removeTextbook(id)
    notify('教材已删除')
  }
}

const grouped = computed(() => {
  const map = {}
  store.subjects.forEach((s) => (map[s.id] = { subject: s, textbooks: [] }))
  store.textbooks.forEach((t) => {
    const key = t.subjectId || 'none'
    if (!map[key]) map[key] = { subject: null, textbooks: [] }
    map[key].textbooks.push(t)
  })
  return map
})
</script>

<template>
  <div>
    <div class="page-head rise" style="display:flex; align-items:flex-end; justify-content:space-between; gap:16px">
      <div>
        <div class="page-title">教材书架</div>
        <div class="page-desc">为每一本教材记录章节进度，稳步推进。</div>
      </div>
      <button class="btn btn-primary" @click="openModal">＋ 添加教材</button>
    </div>

    <div v-if="!store.textbooks.length" class="row rise">
      <div class="empty">
        <div class="empty-icon">◫</div>
        <p>书架还是空的，添加第一本教材开始学习吧</p>
      </div>
    </div>

    <div v-for="(g, key) in grouped" :key="key" style="margin-bottom: 22px" class="rise">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px">
        <span :style="{ width:'10px', height:'10px', borderRadius:'3px', background: g.subject ? g.subject.color : '#94a3b8' }"></span>
        <span style="font-weight:700; font-size:15px">{{ g.subject ? g.subject.name : '未分类' }}</span>
        <span class="chip">{{ g.textbooks.length }} 本</span>
      </div>
      <div class="grid grid-2">
        <div v-for="t in g.textbooks" :key="t.id" class="row">
          <div class="row-head">
            <div>
              <div class="row-title">{{ t.name }}</div>
              <div class="row-meta">已学 {{ t.doneChapters }} / {{ t.totalChapters || '—' }} 章</div>
            </div>
            <div class="row-actions">
              <button class="icon-btn" title="删除" @click="del(t.id, t.name)">✕</button>
            </div>
          </div>
          <div class="progress">
            <div class="progress-fill"
              :style="{ width: (t.totalChapters ? Math.round((t.doneChapters / t.totalChapters) * 100) : 0) + '%' }"></div>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-top:10px">
            <button class="btn btn-ghost btn-sm" :disabled="t.doneChapters <= 0" @click="setChapterProgress(t.id, t.doneChapters - 1)">−</button>
            <input type="number" :value="t.doneChapters" min="0" :max="t.totalChapters || 9999"
              @change="setChapterProgress(t.id, Number($event.target.value) || 0)"
              style="width:56px; text-align:center; border:1px solid var(--line); border-radius:8px; padding:5px" />
            <button class="btn btn-ghost btn-sm" @click="setChapterProgress(t.id, t.doneChapters + 1)">＋</button>
            <span class="chip chip-accent" style="margin-left:auto">
              {{ t.totalChapters ? Math.round((t.doneChapters / t.totalChapters) * 100) : 0 }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加弹窗 -->
    <div v-if="showModal" class="modal-mask" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-title">添加教材</div>
        <div class="field">
          <label>所属科目</label>
          <select v-model="form.subjectId" class="select">
            <option v-for="s in store.subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="field">
          <label>教材名称</label>
          <input v-model="form.name" class="input" placeholder="例如：高中数学 必修一" />
        </div>
        <div class="field">
          <label>总章节数</label>
          <input v-model.number="form.totalChapters" type="number" min="0" class="input" placeholder="例如：12" />
        </div>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
