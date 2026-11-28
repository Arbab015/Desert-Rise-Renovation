<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/ui/AppIcon.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import { useTheme } from '@/composables/useTheme'
import { useServicesState } from '@/composables/useServicesState'
import { setLocale } from '@/i18n'
import { categories, categoryMeta } from '@/data/services'
import logo from '@/assets/images/logo.png'

const { locale } = useI18n()
const { theme, toggleTheme } = useTheme()
const { setCategory } = useServicesState()
const menuOpen = ref(false)
const scrolled = ref(false)
const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]
const before = [
  ['home', '#home'],
  ['about', '#about'],
]
const after = [
  ['team', '#team'],
  ['process', '#process'],
  ['contact', '#contact'],
]

const onScroll = () => {
  scrolled.value = scrollY > 10
}
onMounted(() => addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
const pickCategory = (c, close) => {
  setCategory(c)
  close()
  menuOpen.value = false
}
const pickLanguage = (code, close) => {
  setLocale(code)
  close()
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md transition-shadow duration-300"
    :class="{ 'shadow-soft': scrolled }"
  >
    <div class="container-x flex h-[72px] items-center gap-4">
      <RouterLink
        :to="{ path: '/', hash: '#home' }"
        class="flex items-center gap-2.5 font-display text-[17px] font-bold"
      >
        <img :src="logo" alt="DRR logo" class="h-11 w-auto rounded-md bg-white px-1 py-0.5" />
        <span class="hidden sm:inline">{{ $t('brand.short') }}</span>
      </RouterLink>

      <nav
        class="flex items-center gap-1 lg:mx-auto max-lg:fixed max-lg:inset-x-0 max-lg:top-[72px] max-lg:max-h-[calc(100vh-72px)] max-lg:flex-col max-lg:items-stretch max-lg:overflow-auto max-lg:border-b max-lg:border-line max-lg:bg-bg max-lg:p-5"
        :class="{ 'max-lg:hidden': !menuOpen }"
        aria-label="Primary"
      >
        <RouterLink
          v-for="[key, hash] in before"
          :key="key"
          :to="{ path: '/', hash }"
          class="nav-link"
          @click="menuOpen = false"
          >{{ $t(`nav.${key}`) }}</RouterLink
        >

        <DropdownMenu>
          <template #trigger="{ open, toggle }">
            <button
              class="nav-link flex w-full items-center justify-between gap-1.5"
              :aria-expanded="open"
              aria-haspopup="true"
              @click.stop="toggle"
            >
              {{ $t('nav.services') }}
              <AppIcon
                name="chevron"
                :size="14"
                class="transition-transform duration-300"
                :class="{ 'rotate-180': open }"
              />
            </button>
          </template>
          <template #default="{ close }">
            <RouterLink
              v-for="(c, i) in categories"
              :key="c"
              :to="{ path: '/', hash: '#services' }"
              class="dd-item"
              @click="pickCategory(c, close)"
            >
              <span class="tile" :class="i % 2 ? 'tile-gold' : 'tile-night'"
                ><AppIcon :name="categoryMeta[c].icon" :size="19"
              /></span>
              <span
                ><b class="block text-[15px]">{{ $t(`navServices.${c}.title`) }}</b
                ><small class="block text-[12.5px] text-muted">{{
                  $t(`navServices.${c}.sub`)
                }}</small></span
              >
            </RouterLink>
          </template>
        </DropdownMenu>

        <RouterLink
          v-for="[key, hash] in after"
          :key="key"
          :to="{ path: '/', hash }"
          class="nav-link"
          @click="menuOpen = false"
          >{{ $t(`nav.${key}`) }}</RouterLink
        >
      </nav>

      <div class="ms-auto flex items-center gap-2 lg:ms-0">
        <DropdownMenu align="end">
          <template #trigger="{ toggle }">
            <button
              class="icon-btn gap-1.5 px-3 text-sm font-semibold"
              :aria-label="$t('nav.language')"
              @click.stop="toggle"
            >
              <AppIcon name="globe" :size="17" /> {{ locale.toUpperCase() }}
            </button>
          </template>
          <template #default="{ close }">
            <button
              v-for="l in languages"
              :key="l.code"
              class="dd-item w-full text-start"
              :class="{ 'font-semibold text-gold-dark': locale === l.code }"
              @click="pickLanguage(l.code, close)"
            >
              {{ l.label }}
            </button>
          </template>
        </DropdownMenu>

        <button class="icon-btn" :aria-label="$t('nav.theme')" @click="toggleTheme">
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="19" />
        </button>
        <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-gold max-sm:hidden">{{
          $t('nav.book')
        }}</RouterLink>
        <button
          class="icon-btn lg:hidden"
          :aria-label="$t('nav.menu')"
          :aria-expanded="menuOpen"
          @click.stop="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 500;
  background: none;
  border: 0;
  cursor: pointer;
}
.nav-link::after {
  content: '';
  position: absolute;
  inset-inline: 12px;
  bottom: 4px;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
[dir='rtl'] .nav-link::after {
  transform-origin: right;
}
.nav-link:hover::after,
.router-link-active.nav-link::after {
  transform: scaleX(1);
}
.icon-btn {
  display: inline-flex;
  height: 40px;
  min-width: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--sf);
  cursor: pointer;
  transition: 0.25s;
}
.icon-btn:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}
.dd-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 10px;
  background: none;
  border: 0;
  cursor: pointer;
  transition:
    background 0.25s,
    padding 0.25s;
}
.dd-item:hover {
  background: var(--alt);
  padding-inline-start: 18px;
}
.tile {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  flex: none;
  box-shadow: 0 10px 20px -10px var(--sh);
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
