<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import { setLocale } from '@/i18n'
import { useServicesState } from '@/composables/useServicesState'
import { categories, services, popularIds } from '@/data/services'
import {
  PHONE_MOBILE,
  PHONE_MOBILE_LABEL,
  PHONE_OFFICE,
  PHONE_OFFICE_LABEL,
  whatsappLink,
} from '@/constants/site'
import logo from '@/assets/images/logo.png'

const { locale } = useI18n()
const { setCategory } = useServicesState()
const navLinks = [
  ['home', '#home'],
  ['about', '#about'],
  ['services', '#services'],
  ['team', '#team'],
  ['process', '#process'],
  ['contact', '#contact'],
]
const popular = services.filter((s) => popularIds.includes(s.id))
</script>

<template>
  <footer class="bg-gradient-to-br from-night via-night to-night-2 text-[15px] text-[#cfc6ad]">
    <div class="h-1 bg-gradient-to-r from-night-2 via-gold to-gold-light" />
    <div
      class="container-x grid gap-10 pt-16 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]"
    >
      <div class="sm:col-span-2 lg:col-span-1">
        <img :src="logo" alt="DRR logo" class="h-16 w-auto rounded-md bg-white px-1 py-0.5" />
        <p class="mt-5 max-w-[34ch] leading-7">{{ $t('footer.description') }}</p>
        <div class="mt-6 flex flex-wrap gap-2.5">
          <button
            v-for="l in [
              ['en', 'English'],
              ['ar', 'العربية'],
            ]"
            :key="l[0]"
            class="lang-pill"
            :class="{ on: locale === l[0] }"
            @click="setLocale(l[0])"
          >
            {{ l[1] }}
          </button>
        </div>
      </div>

      <div>
        <h4 class="foot-h">{{ $t('footer.navigation') }}</h4>
        <ul class="foot-list">
          <li v-for="[k, h] in navLinks" :key="k">
            <RouterLink :to="{ path: '/', hash: h }">{{ $t(`nav.${k}`) }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="foot-h">{{ $t('footer.services') }}</h4>
        <ul class="foot-list">
          <li v-for="c in categories" :key="c">
            <RouterLink :to="{ path: '/', hash: '#services' }" @click="setCategory(c)">{{
              $t(`navServices.${c}.title`)
            }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="foot-h">{{ $t('footer.popular') }}</h4>
        <ul class="foot-list">
          <li v-for="s in popular" :key="s.id">
            <RouterLink :to="{ path: '/', hash: '#services' }" @click="setCategory('all')">{{
              $t(`services.items.${s.id}.name`)
            }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="foot-h">{{ $t('footer.contact') }}</h4>
        <ul class="foot-list">
          <li dir="ltr" class="text-start">
            <a :href="`tel:${PHONE_MOBILE}`">{{ PHONE_MOBILE_LABEL }}</a>
          </li>
          <li dir="ltr" class="text-start">
            <a :href="`tel:${PHONE_OFFICE}`">{{ PHONE_OFFICE_LABEL }}</a>
          </li>
          <li>
            <a :href="whatsappLink()" target="_blank" rel="noopener">{{ $t('footer.whatsapp') }}</a>
          </li>
          <li class="text-[#9b927a]">{{ $t('contact.locationValue') }}</li>
          <li class="leading-6 text-[#9b927a]">{{ $t('footer.hours') }}</li>
        </ul>
        <div class="mt-6 flex gap-3">
          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
            class="social bg-gradient-to-br from-[#1fa855] to-[#25D366] text-white"
            :aria-label="$t('a11y.whatsapp')"
            ><AppIcon name="chat"
          /></a>
          <a
            :href="`tel:${PHONE_MOBILE}`"
            class="social bg-gradient-to-br from-gold-dark to-gold-light text-night"
            :aria-label="$t('a11y.call')"
            ><AppIcon name="phone"
          /></a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div
        class="container-x flex flex-wrap justify-between gap-4 py-6 pe-0 text-sm text-[#b8af96] sm:pe-24"
      >
        <span>{{ $t('footer.copyright') }}</span
        ><span>{{ $t('footer.tagline') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot-h {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.foot-list {
  display: grid;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.foot-list a {
  display: inline-block;
  color: #e8e0c8;
  transition:
    color 0.25s,
    transform 0.25s;
}
.foot-list a:hover {
  color: var(--gold2);
  transform: translateX(5px);
}
[dir='rtl'] .foot-list a:hover {
  transform: translateX(-5px);
}
.lang-pill {
  padding: 9px 18px;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: 999px;
  background: transparent;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: 0.25s;
}
.lang-pill:hover {
  border-color: var(--gold);
}
.lang-pill.on {
  background: #fff;
  color: var(--blk);
  border-color: #fff;
}
.social {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}
.social:hover {
  transform: translateY(-4px) rotate(-4deg);
  box-shadow: 0 14px 24px -10px rgb(0 0 0 / 0.6);
}
</style>
