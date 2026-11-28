<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SkylineCanvas from './SkylineCanvas.vue'
import { HERO_SLIDES, HERO_SLIDE_MAX, HERO_AUDIO } from '@/constants/site'

const props = defineProps({
  enabled: { type: Boolean, default: true },
  index: { type: Number, default: 0 },
  playing: { type: Boolean, default: true },
  muted: { type: Boolean, default: true },
})
const emit = defineEmits(['ready', 'audio-ready', 'blocked', 'progress', 'next'])

const slides = HERO_SLIDES
const root = ref(null)
const audio = ref(null)
const videos = ref([])
const loaded = ref(slides.map(() => false))
const inView = ref(true)
const pageVisible = ref(true)
let observer

const limit = (v) => Math.min(v.duration || HERO_SLIDE_MAX, HERO_SLIDE_MAX)

function syncVideos() {
  videos.value.forEach((v, i) => {
    if (!v) return
    if (i === props.index) {
      if (props.playing && inView.value && pageVisible.value) v.play().catch(() => {})
      else v.pause()
    } else {
      // Let the cross-fade finish before the old clip freezes.
      setTimeout(() => i !== props.index && v.pause(), 1200)
    }
  })
}

/** Music plays only while the hero is on screen and the visitor has sound switched on. */
function syncAudio() {
  const a = audio.value
  if (!a) return
  if (!props.muted && inView.value && pageVisible.value) a.play().catch(() => emit('blocked'))
  else a.pause()
}

watch(
  () => props.index,
  (i) => {
    const v = videos.value[i]
    if (v) v.currentTime = 0
    emit('progress', 0)
    syncVideos()
  },
)
watch(() => props.playing, syncVideos)
watch(() => props.muted, syncAudio)
watch([inView, pageVisible], () => {
  syncVideos()
  syncAudio()
})

function onCanplay(i) {
  loaded.value[i] = true
  emit('ready')
  if (i === props.index) syncVideos()
}
function onTime(i) {
  const v = videos.value[i]
  if (i !== props.index || !v) return
  emit('progress', Math.min(v.currentTime / limit(v), 1))
  if (v.currentTime >= limit(v) - 0.05) finish()
}
function finish() {
  if (slides.length === 1) {
    videos.value[0].currentTime = 0
    videos.value[0].play().catch(() => {})
  } else emit('next')
}
const onError = (i) => i === props.index && emit('next')
const onVisibility = () => (pageVisible.value = !document.hidden)

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => (inView.value = e.isIntersecting && e.intersectionRatio >= 0.3),
    { threshold: [0, 0.3, 0.6, 1] },
  )
  observer.observe(root.value)
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div ref="root" class="absolute inset-0 overflow-hidden bg-night-3" aria-hidden="true">
    <SkylineCanvas />
    <template v-if="enabled">
      <video
        v-for="(s, i) in slides"
        :key="s.src"
        :ref="(el) => (videos[i] = el)"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
        :class="i === index && loaded[i] ? 'opacity-100' : 'opacity-0'"
        :src="s.src"
        :poster="s.poster"
        :preload="i === index || i === (index + 1) % slides.length ? 'auto' : 'none'"
        autoplay
        muted
        playsinline
        @canplay="onCanplay(i)"
        @timeupdate="onTime(i)"
        @ended="finish"
        @error="onError(i)"
      />
      <audio
        v-if="HERO_AUDIO"
        ref="audio"
        :src="HERO_AUDIO"
        loop
        preload="metadata"
        @loadedmetadata="emit('audio-ready')"
      />
    </template>
    <div class="overlay absolute inset-0" />
  </div>
</template>

<style scoped>
.overlay {
  background:
    linear-gradient(90deg, rgb(6 20 38 / 0.78) 0%, rgb(6 20 38 / 0.5) 45%, rgb(6 20 38 / 0.08) 90%),
    linear-gradient(0deg, rgb(6 20 38 / 0.55), transparent 38%);
}
[dir='rtl'] .overlay {
  background:
    linear-gradient(
      270deg,
      rgb(6 20 38 / 0.78) 0%,
      rgb(6 20 38 / 0.5) 45%,
      rgb(6 20 38 / 0.08) 90%
    ),
    linear-gradient(0deg, rgb(6 20 38 / 0.55), transparent 38%);
}
@media (max-width: 1023px) {
  .overlay,
  [dir='rtl'] .overlay {
    background: linear-gradient(0deg, rgb(6 20 38 / 0.7), rgb(6 20 38 / 0.5));
  }
}
</style>
