<script setup>
defineProps({
  slides: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  brand: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="fan" role="group" aria-roledescription="carousel">
    <figure
      v-for="(s, i) in slides"
      :key="i"
      class="fc"
      :class="`p${(i - modelValue + slides.length) % slides.length}`"
      @click="$emit('update:modelValue', i)"
    >
      <img :src="s.src" :alt="s.title" :style="{ objectPosition: s.pos }" loading="eager" />
      <figcaption>
        <small>{{ brand }}</small
        ><b>{{ s.title }}</b
        ><span class="pill">{{ s.tag }}</span>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped>
.fan {
  --o: 150px;
  --r: 8deg;
  position: relative;
  height: 470px;
}
.fc {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 250px;
  height: 360px;
  margin: -180px 0 0 -125px;
  overflow: hidden;
  border: 3px solid rgb(255 255 255 / 0.4);
  border-radius: 22px;
  background: #111;
  box-shadow: 0 30px 50px -20px rgb(0 0 0 / 0.55);
  cursor: pointer;
  transition:
    transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.9s,
    filter 0.3s;
}
.fc img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fc figcaption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 70px 16px 16px;
  color: #fff;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.88));
}
.fc small {
  display: block;
  font-size: 12px;
  opacity: 0.8;
}
.fc b {
  display: block;
  font: 700 18px/1.25 var(--font-display);
}
.pill {
  display: inline-block;
  margin-top: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--blk);
  background: linear-gradient(135deg, var(--goldd), var(--gold2));
}
.p0 {
  transform: scale(1.12);
  z-index: 3;
}
.p1 {
  transform: translateX(var(--o)) rotate(var(--r)) scale(0.95);
  z-index: 2;
}
.p3 {
  transform: translateX(calc(var(--o) * -1)) rotate(calc(var(--r) * -1)) scale(0.95);
  z-index: 2;
}
.p2 {
  transform: scale(0.8);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}
.fc:not(.p0):hover {
  filter: brightness(1.1);
}
@media (max-width: 1023px) {
  .fan {
    height: 380px;
    --o: 92px;
  }
  .fc {
    width: 200px;
    height: 290px;
    margin: -145px 0 0 -100px;
  }
}
</style>
