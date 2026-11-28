<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({ align: { type: String, default: 'start' } })
const open = ref(false)
const root = ref(null)
const close = () => {
  open.value = false
}
const onDocClick = (e) => {
  if (root.value && !root.value.contains(e.target)) close()
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="dd group relative" :class="{ 'is-open': open }" @keydown.esc="close">
    <slot name="trigger" :open="open" :toggle="() => (open = !open)" />
    <div class="dd-menu" :class="align === 'end' ? 'dd-end' : 'dd-start'">
      <slot :close="close" />
    </div>
  </div>
</template>

<style scoped>
.dd-menu {
  position: absolute;
  top: 100%;
  min-width: 290px;
  padding: 8px;
  z-index: 60;
  background: var(--sf);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 24px 50px -20px var(--sh);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: 0.28s;
}
.dd-start {
  inset-inline-start: 0;
}
.dd-end {
  inset-inline-end: 0;
  min-width: 160px;
}
@media (hover: hover) and (min-width: 1024px) {
  .dd:hover .dd-menu {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
.dd.is-open .dd-menu,
.dd:focus-within .dd-menu {
  opacity: 1;
  visibility: visible;
  transform: none;
}
@media (max-width: 1023px) {
  .dd-menu {
    position: static;
    display: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border: 0;
    padding: 0 0 0 8px;
    background: transparent;
  }
  .dd.is-open .dd-menu {
    display: block;
  }
  .dd:focus-within .dd-menu {
    display: block;
  }
}
</style>
