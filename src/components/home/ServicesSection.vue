<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ServiceCard from './ServiceCard.vue'
import { services, categories } from '@/data/services'
import { useServicesState } from '@/composables/useServicesState'

const { activeCategory, visibleCount, setCategory, loadMore, showLess, STEP } = useServicesState()
const filtered = computed(() =>
  activeCategory.value === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory.value),
)
const visible = computed(() => filtered.value.slice(0, visibleCount.value))
const remaining = computed(() => Math.max(filtered.value.length - visibleCount.value, 0))
const canCollapse = computed(() => remaining.value === 0 && filtered.value.length > STEP)
const tabs = ['all', ...categories]

function collapse() {
  showLess()
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="services" class="section bg-alt">
    <div class="container-x">
      <h2 v-reveal class="h2">{{ $t('services.heading') }}</h2>
      <p v-reveal class="lead mb-9">{{ $t('services.lead') }}</p>

      <div v-reveal class="mb-12 flex flex-wrap gap-2" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab"
          role="tab"
          :aria-selected="activeCategory === tab"
          class="tab"
          :class="{ on: activeCategory === tab }"
          @click="setCategory(tab)"
        >
          {{ $t(`services.tabs.${tab}`) }}
        </button>
      </div>

      <TransitionGroup
        name="card"
        tag="div"
        class="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ServiceCard
          v-for="(s, i) in visible"
          :key="s.id"
          :service="s"
          :index="i"
          :style="{ '--i': i % STEP }"
        />
      </TransitionGroup>

      <div class="mt-14 flex flex-col items-center gap-4">
        <p class="text-sm text-muted" aria-live="polite">
          {{ $t('services.showing', { a: visible.length, b: filtered.length }) }}
        </p>
        <button v-if="remaining > 0" class="btn btn-gold px-8 py-3.5 text-base" @click="loadMore">
          <AppIcon name="plus" :size="18" /> {{ $t('services.loadMore') }}
          <span class="rounded-full bg-night/15 px-2.5 py-0.5 text-xs">{{
            $t('services.more', { n: remaining })
          }}</span>
        </button>
        <button
          v-else-if="canCollapse"
          class="btn btn-ghost px-8 py-3.5 text-base"
          @click="collapse"
        >
          {{ $t('services.showLess') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab {
  padding: 10px 22px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--sf);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}
.tab:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}
.tab.on {
  background: var(--blk);
  border-color: var(--blk);
  color: var(--gold2);
}
[data-theme='dark'] .tab.on {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--blk);
}
.card-enter-active {
  transition:
    opacity 0.6s,
    transform 0.6s;
  transition-delay: calc(var(--i) * 70ms);
}
.card-leave-active {
  display: none;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(28px);
}
</style>
