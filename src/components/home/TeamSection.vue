<script setup>
import TeamCard from './TeamCard.vue'
import { team } from '@/data/team'
</script>

<template>
  <section id="team" class="section relative overflow-hidden bg-night text-[#f3eedd]">
    <div class="glow glow-a" />
    <div class="glow glow-b" />
    <div class="container-x relative">
      <div v-reveal class="mb-14 text-center">
        <span class="eyebrow mb-3.5">{{ $t('team.eyebrow') }}</span>
        <h2 class="h2 mx-auto max-w-none text-white">{{ $t('team.heading') }}</h2>
        <p class="lead mx-auto text-[#b8af96]">{{ $t('team.lead') }}</p>
      </div>
      <div
        class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-7 sm:overflow-visible lg:grid-cols-4"
      >
        <div
          v-for="(m, i) in team"
          :key="m.id"
          v-reveal="i * 90"
          class="w-[78%] shrink-0 snap-center sm:w-auto"
        >
          <TeamCard :member="m" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.glow-a {
  top: -280px;
  inset-inline-end: -160px;
  width: 640px;
  height: 640px;
  background: radial-gradient(circle, rgb(217 176 74 / 0.22), transparent 65%);
}
.glow-b {
  bottom: -260px;
  inset-inline-start: -140px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgb(217 176 74 / 0.12), transparent 65%);
}
</style>
