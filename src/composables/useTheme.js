import { ref } from 'vue'
import { storage } from '@/utils/storage'

const theme = ref(document.documentElement.dataset.theme || 'light')

export function useTheme() {
  function setTheme(value) {
    theme.value = value
    document.documentElement.dataset.theme = value
    storage.set('drr-theme', value)
  }
  const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')
  return { theme, setTheme, toggleTheme }
}
