<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useServicesState } from '@/composables/useServicesState'

const props = defineProps({
  service: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
const router = useRouter()
const { selectedService } = useServicesState()
const photoStyle = computed(() =>
  props.service.photo ? { backgroundImage: `url(/images/services/${props.service.id}.jpg)` } : null,
)

/** Pre-select this service in the contact form, then scroll to it. */
function choose() {
  selectedService.value = props.service.id
  router.push({ path: '/', hash: '#contact' })
}
</script>

<template>
  <a href="#contact" class="svc group" @click.prevent="choose">
    <div class="svc-media" :class="`v${index % 4}`" :style="photoStyle">
      <span class="chip">{{ $t(`services.tabs.${service.category}`) }}</span>
      <AppIcon v-if="!service.photo" :name="service.icon" :size="190" :stroke="0.65" class="wm" />
    </div>
    <div class="svc-body">
      <span class="badge"><AppIcon :name="service.icon" :size="30" :stroke="1.9" /></span>
      <h3>{{ $t(`services.items.${service.id}.name`) }}</h3>
      <p>{{ $t(`services.items.${service.id}.desc`) }}</p>
      <span class="go"
        >{{ $t('services.quote') }} <AppIcon name="arrow" :size="18" class="flip-rtl arrow"
      /></span>
    </div>
  </a>
</template>

<style scoped>
.svc {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.svc-media {
  position: relative;
  height: 270px;
  overflow: hidden;
  border-radius: var(--cr);
  background-size: cover;
  background-position: center;
}
.svc-media:not([style]) {
  background:
    repeating-linear-gradient(0deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 22px),
    repeating-linear-gradient(90deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 22px), var(--g);
}
.v0 {
  --g: linear-gradient(135deg, var(--blk), var(--tint) 60%, var(--gold));
}
.v1 {
  --g: linear-gradient(135deg, var(--gold2), var(--gold) 55%, var(--goldd));
}
.v2 {
  --g: linear-gradient(135deg, var(--blk2), var(--blk));
}
.v3 {
  --g: linear-gradient(135deg, #fff6d6, #e3c468);
}
.svc-media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgb(0 0 0 / 0.3));
}
.wm {
  position: absolute;
  inset-inline-end: -22px;
  bottom: -30px;
  color: rgb(255 255 255 / 0.26);
  transition: transform 0.7s;
}
.v1 .wm,
.v3 .wm {
  color: rgb(7 11 22 / 0.24);
}
.svc:hover .wm {
  transform: scale(1.1) rotate(-5deg);
}
.chip {
  position: absolute;
  z-index: 2;
  top: 16px;
  inset-inline-start: 16px;
  padding: 5px 13px;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: 999px;
  background: rgb(0 0 0 / 0.4);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}
.svc-body {
  position: relative;
  z-index: 3;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: -72px 22px 0;
  padding: 58px 28px 26px;
  border: 1px solid var(--line);
  border-radius: calc(var(--cr) * 1.1);
  background: var(--sf);
  text-align: center;
  box-shadow:
    0 2px 6px rgb(0 0 0 / 0.05),
    0 28px 48px -26px var(--sh);
  transition:
    transform 0.35s,
    box-shadow 0.35s;
}
.svc-body::before {
  content: '';
  position: absolute;
  top: 0;
  inset-inline: 32px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.svc:hover .svc-body {
  transform: translateY(-10px);
  box-shadow:
    0 2px 6px rgb(0 0 0 / 0.05),
    0 38px 56px -24px var(--sh);
}
.badge {
  position: absolute;
  top: -37px;
  left: 50%;
  display: grid;
  place-items: center;
  width: 74px;
  height: 74px;
  margin-left: -37px;
  border: 4px solid var(--blk);
  border-radius: 50%;
  color: var(--blk);
  background: linear-gradient(135deg, var(--goldd), var(--gold2));
  box-shadow:
    0 0 0 2px var(--gold),
    0 12px 20px -6px rgb(0 0 0 / 0.4);
  transition: transform 0.4s;
}
.svc:hover .badge {
  transform: rotate(-8deg) scale(1.07);
}
h3 {
  margin-bottom: 10px;
  font-size: 1.65rem;
  font-weight: 700;
}
p {
  flex: 1;
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--mut);
}
.go {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 14px;
  font-weight: 600;
  color: var(--goldd);
}
[data-theme='dark'] .go {
  color: var(--gold2);
}
.arrow {
  transition: transform 0.3s;
}
.svc:hover .arrow {
  transform: translateX(5px);
}
[dir='rtl'] .svc:hover .arrow {
  transform: scaleX(-1) translateX(5px);
}
</style>
