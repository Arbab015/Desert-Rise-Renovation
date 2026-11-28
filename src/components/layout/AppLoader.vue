<script setup>
import { ref, onMounted } from 'vue'
import logo from '@/assets/images/logo.png'

const visible = ref(true)
const leaving = ref(false)

onMounted(async () => {
  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => addEventListener('load', r, { once: true }))
  await Promise.all([loaded, new Promise((r) => setTimeout(r, 1600))])
  leaving.value = true
  setTimeout(() => (visible.value = false), 950)
})
</script>

<template>
  <div
    v-if="visible"
    class="loader"
    :class="{ 'is-leaving': leaving }"
    role="status"
    aria-live="polite"
  >
    <img :src="logo" alt="DRR" class="logo" />
    <i class="bar" />
    <p>{{ $t('loader.welcome') }}</p>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 22px;
  background: var(--blk3);
  color: var(--gold2);
  transition: transform 0.9s cubic-bezier(0.7, 0, 0.2, 1);
}
.loader.is-leaving {
  transform: translateY(-100%);
}
.logo {
  width: 190px;
  padding: 10px;
  border-radius: 16px;
  background: #fff;
  animation: breathe 1.6s ease-in-out infinite;
}
.bar {
  display: block;
  width: 200px;
  height: 3px;
  overflow: hidden;
  border-radius: 3px;
  background: rgb(255 255 255 / 0.12);
}
.bar::after {
  content: '';
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--goldd), var(--gold2));
  animation: fill 1.5s ease-out forwards;
}
p {
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
@keyframes breathe {
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgb(217 176 74 / 0.55);
  }
}
@keyframes fill {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
