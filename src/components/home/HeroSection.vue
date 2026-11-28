<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import HeroBackground from './HeroBackground.vue'
import VanFan from './VanFan.vue'
import { HERO_SLIDES, HERO_AUDIO_ON_FIRST_TOUCH } from '@/constants/site'
import van1 from '@/assets/images/vans/van-1.jpeg'
import van2 from '@/assets/images/vans/van-2.jpeg'
import van3 from '@/assets/images/vans/van-3.jpeg'
import van4 from '@/assets/images/vans/van-4.jpeg'

const { t } = useI18n()
const images = [
  [van1, '66% 50%'],
  [van2, '66% 50%'],
  [van3, '50% 50%'],
  [van4, '50% 40%'],
]
const vans = computed(() =>
  images.map(([src, pos], i) => ({
    src,
    pos,
    title: t(`hero.slides.s${i + 1}.title`),
    tag: t(`hero.slides.s${i + 1}.tag`),
  })),
)

// Respect reduced-motion and data-saver: keep the lightweight animated skyline instead of video.
const canVideo =
  !matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData

const total = HERO_SLIDES.length
const index = ref(0) // background video
const progress = ref(0) // 0..1 of the current video
const playing = ref(true)
const muted = ref(true) // browsers only allow sound after the first click or tap
const hasVideo = ref(false)
const hasAudio = ref(false)
const van = ref(0) // van photo shown in front
const VAN_INTERVAL = 5000
let vanTimer
let touchedAudio = false

const go = (n) => {
  index.value = (n + total) % total
  progress.value = 0
}
const segWidth = (i) =>
  i < index.value ? '100%' : i === index.value ? `${progress.value * 100}%` : '0%'
const toggleSound = () => {
  touchedAudio = true
  muted.value = !muted.value
}

function scheduleVan() {
  clearTimeout(vanTimer)
  if (playing.value)
    vanTimer = setTimeout(() => (van.value = (van.value + 1) % images.length), VAN_INTERVAL)
}
watch([van, playing], scheduleVan)

function firstTouch(e) {
  window.removeEventListener('pointerdown', firstTouch)
  window.removeEventListener('keydown', firstTouch)
  if (!touchedAudio && !e.target.closest?.('[data-hero-sound]')) muted.value = false
}
onMounted(() => {
  scheduleVan()
  if (HERO_AUDIO_ON_FIRST_TOUCH) {
    window.addEventListener('pointerdown', firstTouch)
    window.addEventListener('keydown', firstTouch)
  }
})
onBeforeUnmount(() => {
  clearTimeout(vanTimer)
  window.removeEventListener('pointerdown', firstTouch)
  window.removeEventListener('keydown', firstTouch)
})
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-[min(92vh,800px)] items-center overflow-hidden pt-16 pb-36 text-white"
  >
    <HeroBackground
      :enabled="canVideo"
      :index="index"
      :playing="playing"
      :muted="muted"
      @ready="hasVideo = true"
      @audio-ready="hasAudio = true"
      @blocked="muted = true"
      @progress="progress = $event"
      @next="go(index + 1)"
    />
    <div class="container-x relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div class="hero-copy">
        <div class="mb-3.5 text-lg text-gold-light" dir="rtl" lang="ar">
          {{ $t('brand.arabic') }}
        </div>
        <h1 class="mb-5 text-[clamp(38px,5.2vw,72px)] font-bold tracking-tight">
          {{ $t('hero.h1') }}
        </h1>
        <ul class="mb-4 flex flex-wrap font-semibold">
          <li v-for="n in 3" :key="n" class="border-gold px-4 first:ps-0 not-first:border-s-2">
            {{ $t(`hero.pill${n}`) }}
          </li>
        </ul>
        <p class="mb-7 max-w-[50ch] text-white/85">{{ $t('hero.lead') }}</p>
        <div class="mb-7 flex flex-wrap gap-3.5">
          <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-gold"
          >{{ $t('hero.ctaPrimary') }} <AppIcon name="arrow" :size="18" class="flip-rtl"
          /></RouterLink>
          <RouterLink
            :to="{ path: '/', hash: '#services' }"
            class="btn border border-white/70 text-white hover:bg-white hover:text-night"
          >{{ $t('hero.ctaSecondary') }}</RouterLink
          >
        </div>
        <div v-if="hasVideo" class="flex items-center gap-3">
          <button class="ctl" :aria-label="$t('hero.prev')" @click="go(index - 1)">
            <AppIcon name="prev" :size="20" class="flip-rtl" />
          </button>
          <div class="flex max-w-[320px] flex-1 gap-2">
            <button
              v-for="(_, i) in total"
              :key="i"
              class="segbtn"
              :aria-label="$t('hero.goTo', { n: i + 1 })"
              @click="go(i)"
            >
              <i :style="{ width: segWidth(i) }" />
            </button>
          </div>
          <button class="ctl" :aria-label="$t('hero.next')" @click="go(index + 1)">
            <AppIcon name="next" :size="20" class="flip-rtl" />
          </button>
          <button
            class="ctl"
            :aria-label="playing ? $t('hero.pause') : $t('hero.play')"
            @click="playing = !playing"
          >
            <AppIcon :name="playing ? 'pause' : 'play'" :size="18" />
          </button>
          <button
            v-if="hasAudio"
            class="ctl"
            data-hero-sound
            :aria-label="muted ? $t('hero.unmute') : $t('hero.mute')"
            @click="toggleSound"
          >
            <AppIcon :name="muted ? 'mute' : 'volume'" :size="18" />
          </button>
        </div>
      </div>
      <VanFan v-model="van" :slides="vans" :brand="$t('brand.short')" />
    </div>
  </section>
</template>

<style scoped>
.hero-copy > * {
  animation: rise 0.9s both;
}
.hero-copy > :nth-child(2) {
  animation-delay: 0.1s;
}
.hero-copy > :nth-child(3) {
  animation-delay: 0.2s;
}
.hero-copy > :nth-child(4) {
  animation-delay: 0.3s;
}
.hero-copy > :nth-child(5) {
  animation-delay: 0.4s;
}
.hero-copy > :nth-child(6) {
  animation-delay: 0.5s;
}
.ctl {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgb(255 255 255 / 0.35);
  border-radius: 50%;
  background: rgb(255 255 255 / 0.1);
  color: #fff;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: 0.2s;
}
.ctl:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--blk);
}
.segbtn {
  position: relative;
  flex: 1;
  height: 22px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.segbtn::before,
.segbtn i {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 50%;
  height: 3px;
  margin-top: -1.5px;
  border-radius: 3px;
}
.segbtn::before {
  width: 100%;
  background: rgb(255 255 255 / 0.35);
}
.segbtn i {
  background: var(--gold2);
  transition: width 0.3s linear;
}
.hero-copy h1,
.hero-copy p {
  text-shadow: 0 2px 22px rgb(0 0 0 / 0.45);
}
</style>
