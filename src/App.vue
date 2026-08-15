<script setup>
import routes from './router/routes'
import { toast } from './composables/useToast'

const version = '1.0.0'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">◱</div>
        <div>
          <div class="brand-name">StudyDeck</div>
          <div class="brand-sub">教材学习工作台</div>
        </div>
      </div>

      <router-link
        v-for="r in routes"
        :key="r.path"
        :to="r.path"
        class="nav-item"
      >
        <span class="nav-icon">{{ r.meta.icon }}</span>
        <span>{{ r.meta.title }}</span>
      </router-link>

      <div class="sidebar-foot">
        <div>v{{ version }} · 纯前端 · 本地存储</div>
        <a href="https://github.com/gitstq/StudyDeck" target="_blank" rel="noopener">GitHub 主页 ↗</a>
      </div>
    </aside>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="view" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <transition name="view">
      <div v-if="toast.show" class="toast">{{ toast.message }}</div>
    </transition>
  </div>
</template>

<style scoped>
.view-enter-active,
.view-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.view-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.view-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
