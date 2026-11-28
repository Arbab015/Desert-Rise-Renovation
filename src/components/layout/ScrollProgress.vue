<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)
const update = () => {
  const max = document.documentElement.scrollHeight - innerHeight
  progress.value = max > 0 ? (scrollY / max) * 100 : 0
}
onMounted(() => addEventListener('scroll', update, { passive: true }))
onBeforeUnmount(() => removeEventListener('scroll', update))
</script>

<template>
  <div
    class="fixed start-0 top-0 z-[90] h-[3px] bg-gradient-to-r from-gold-dark to-gold-light"
    :style="{ width: progress + '%' }"
  />
</template>
