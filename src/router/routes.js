export default [
  { path: '/', name: 'dashboard', component: () => import('../views/Dashboard.vue'), meta: { title: '总览', icon: '⌂' } },
  { path: '/textbooks', name: 'textbooks', component: () => import('../views/Textbooks.vue'), meta: { title: '教材', icon: '◫' } },
  { path: '/notes', name: 'notes', component: () => import('../views/Notes.vue'), meta: { title: '笔记', icon: '❋' } },
  { path: '/mistakes', name: 'mistakes', component: () => import('../views/Mistakes.vue'), meta: { title: '错题本', icon: '✕' } },
  { path: '/focus', name: 'focus', component: () => import('../views/Focus.vue'), meta: { title: '专注', icon: '◷' } }
]
