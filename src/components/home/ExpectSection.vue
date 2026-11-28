<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

const items = [
  ['available', 'clock'],
  ['ontime', 'userCheck'],
  ['skilled', 'shield'],
  ['clean', 'sparkle'],
  ['quotes', 'receipt'],
  ['replies', 'chat'],
]
</script>

<template>
  <section id="about" class="section">
    <div class="container-x grid gap-14 lg:grid-cols-[.8fr_1.6fr]">
      <div v-reveal>
        <span class="mb-6 block h-1 w-[84px] rounded bg-gradient-to-r from-ink to-gold" />
        <h2 class="h2">{{ $t('expect.heading') }}</h2>
        <p class="lead">{{ $t('expect.lead') }}</p>
      </div>
      <div class="grid gap-x-11 sm:grid-cols-2">
        <article
          v-for="([key, icon], i) in items"
          :key="key"
          v-reveal="(i % 2) * 90"
          class="item group flex gap-[18px] border-t border-line py-6 transition-colors duration-300 hover:border-gold"
        >
          <span class="tile" :class="i % 2 ? 'tile-gold' : 'tile-night'"
            ><AppIcon :name="icon" :size="26"
          /></span>
          <div>
            <h3
              class="mb-1 text-[19px] font-bold transition-colors duration-300 group-hover:text-gold-dark dark:group-hover:text-gold-light"
            >
              {{ $t(`expect.items.${key}.title`) }}
            </h3>
            <p class="text-[15px] text-muted">{{ $t(`expect.items.${key}.desc`) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tile {
  display: grid;
  place-items: center;
  flex: none;
  width: 54px;
  height: 54px;
  border-radius: 14px;
  box-shadow: 0 12px 22px -10px var(--sh);
  transition: transform 0.4s;
}
.item:hover .tile {
  transform: translateY(-5px) rotate(-6deg) scale(1.06);
}
.tile-night {
  background: linear-gradient(135deg, var(--blk2), var(--blk));
  color: var(--gold2);
}
.tile-gold {
  background: linear-gradient(135deg, var(--goldd), var(--gold2));
  color: var(--blk);
}
</style>
