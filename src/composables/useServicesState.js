import { ref } from 'vue'

export const STEP = 9
// Module-level state so the header dropdown, footer links, cards and contact form stay in sync.
const activeCategory = ref('all')
const visibleCount = ref(STEP)
const selectedService = ref('')

export function useServicesState() {
  function setCategory(category) {
    activeCategory.value = category
    visibleCount.value = STEP
  }
  const loadMore = () => {
    visibleCount.value += STEP
  }
  const showLess = () => {
    visibleCount.value = STEP
  }
  return { activeCategory, visibleCount, selectedService, setCategory, loadMore, showLess, STEP }
}
