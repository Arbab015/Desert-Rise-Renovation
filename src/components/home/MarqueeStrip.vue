<script setup>
import { services } from '@/data/services'
</script>

<template>
  <div class="overflow-hidden bg-night py-4 whitespace-nowrap text-gold-light" aria-hidden="true">
    <div
      class="inline-block animate-ticker font-display text-xl hover:[animation-play-state:paused] rtl:[animation-direction:reverse]"
    >
      <template v-for="n in 2" :key="n">
        <span
          v-for="s in services"
          :key="`${n}${s.id}`"
          class="mx-6 before:me-2 before:text-[10px] before:text-gold before:content-['◆']"
          >{{ $t(`services.items.${s.id}.name`) }}</span
        >
      </template>
    </div>
  </div>
</template>
