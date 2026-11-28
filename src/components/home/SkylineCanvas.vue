<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createSkyline } from '@/utils/skyline'

const canvas = ref(null)
let sky,
  raf = 0,
  running = true,
  io,
  ro
const reduce =
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

function loop() {
  if (running && !document.hidden) sky.frame()
  raf = requestAnimationFrame(loop)
}
onMounted(() => {
  sky = createSkyline(canvas.value)
  sky.resize()
  ro = new ResizeObserver(() => sky.resize())
  ro.observe(canvas.value.parentElement)
  io = new IntersectionObserver(([e]) => (running = e.isIntersecting))
  io.observe(canvas.value)
  if (!reduce) raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
