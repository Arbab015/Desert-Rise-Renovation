<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({ member: { type: Object, required: true } })
</script>

<template>
  <article class="mb">
    <div class="mi">
      <div class="pt">
        <img v-if="member.photo" :src="member.photo" :alt="member.name" loading="lazy" />
        <AppIcon v-else name="user" :size="300" :stroke="0.5" class="avatar" />
        <span class="age">{{ $t('team.age', { n: member.age }) }}</span>
        <div class="socials">
          <a
            v-for="(url, key) in member.socials"
            :key="key"
            :href="url"
            target="_blank"
            rel="noopener"
            :aria-label="key"
            ><AppIcon :name="key" :size="18"
          /></a>
        </div>
      </div>
      <div class="meta">
        <h3>{{ member.name }}</h3>
        <span>{{ $t(`team.roles.${member.role}`) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.mb {
  position: relative;
  padding: 1px;
  border-radius: 22px;
  background: linear-gradient(160deg, var(--gold2), rgb(217 176 74 / 0.15) 40%, var(--goldd));
  transition:
    transform 0.5s,
    box-shadow 0.5s;
}
.mb:hover {
  transform: translateY(-10px);
  box-shadow: 0 40px 60px -30px rgb(217 176 74 / 0.55);
}
.mi {
  overflow: hidden;
  border-radius: 21px;
  background: linear-gradient(180deg, var(--blk2), var(--blk3));
}
.pt {
  position: relative;
  aspect-ratio: 4 / 4.6;
  overflow: hidden;
  background: radial-gradient(circle at 50% 30%, var(--tint), var(--blk3) 75%);
}
.pt img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.5) contrast(1.05);
  transition:
    transform 0.8s,
    filter 0.6s;
}
.mb:hover .pt img {
  transform: scale(1.07);
  filter: none;
}
.avatar {
  position: absolute;
  left: 50%;
  bottom: -4%;
  width: 80%;
  height: auto;
  transform: translateX(-50%);
  color: rgb(245 221 145 / 0.4);
}
.pt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, var(--blk3));
}
.pt::before {
  content: '';
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: -60%;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.2), transparent);
  transform: skewX(-18deg);
  transition: left 0.9s;
}
.mb:hover .pt::before {
  left: 130%;
}
.age {
  position: absolute;
  z-index: 3;
  top: 14px;
  inset-inline-end: 14px;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--blk);
  background: linear-gradient(135deg, var(--goldd), var(--gold2));
  box-shadow: 0 8px 16px -6px rgb(0 0 0 / 0.6);
}
.socials {
  position: absolute;
  z-index: 3;
  inset-inline: 0;
  bottom: 14px;
  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(26px);
  transition: 0.45s;
}
.mb:hover .socials,
.mb:focus-within .socials {
  opacity: 1;
  transform: none;
}
@media (hover: none) {
  .socials {
    opacity: 1;
    transform: none;
  }
}
.socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold2);
  background: rgb(7 11 22 / 0.72);
  backdrop-filter: blur(6px);
  transition: 0.25s;
}
.socials a:hover {
  background: var(--gold);
  color: var(--blk);
  transform: translateY(-4px);
}
.meta {
  position: relative;
  padding: 26px 20px 28px;
  text-align: center;
}
.meta::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  width: 11px;
  height: 11px;
  margin-left: -5px;
  background: var(--gold);
  box-shadow: 0 0 0 4px var(--blk3);
  transform: rotate(45deg);
}
h3 {
  margin-bottom: 6px;
  font-size: 22px;
  color: #fff;
}
.meta span {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold2);
}
[lang='ar'] .meta span {
  letter-spacing: 0.03em;
  font-size: 13px;
}
</style>
