<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { PHONE_MOBILE, whatsappLink } from '@/constants/site'

const open = ref(false)
</script>

<template>
  <div class="fixed bottom-5 end-4 z-[60] flex flex-col items-center gap-2.5">
    <a
      :href="`tel:${PHONE_MOBILE}`"
      class="fab bg-night-3 text-white"
      :class="{ show: open }"
      :aria-label="$t('a11y.call')"
      ><AppIcon name="phone" :size="22"
    /></a>
    <a
      :href="whatsappLink()"
      target="_blank"
      rel="noopener"
      class="fab bg-[#25D366] text-white"
      :class="{ show: open }"
      :aria-label="$t('a11y.whatsapp')"
      ><AppIcon name="chat" :size="22"
    /></a>
    <button
      class="fab animate-pulse-ring bg-gradient-to-br from-gold-dark to-gold-light text-night transition-transform duration-300"
      :class="{ 'rotate-45': open }"
      :aria-label="$t('a11y.quickContact')"
      :aria-expanded="open"
      @click="open = !open"
    >
      <AppIcon name="plus" :size="26" />
    </button>
  </div>
</template>

<style scoped>
.fab {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 26px rgb(0 0 0 / 0.35);
}
a.fab {
  opacity: 0;
  transform: scale(0.4) translateY(20px);
  pointer-events: none;
  transition: 0.3s;
}
a.fab.show {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
</style>
