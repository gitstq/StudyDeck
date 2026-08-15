import { reactive } from 'vue'

/**
 * 轻量 Toast 提示
 */
export const toast = reactive({
  show: false,
  message: '',
  timer: null
})

export function notify(msg) {
  toast.message = msg
  toast.show = true
  clearTimeout(toast.timer)
  toast.timer = setTimeout(() => {
    toast.show = false
  }, 2200)
}
