import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'
import { storage } from '@/utils/storage'

const saved = storage.get('drr-lang') === 'ar' ? 'ar' : 'en'
export const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: 'en',
  messages: { en, ar },
})

/** Switch language and keep <html lang/dir> in sync (RTL for Arabic). */
export function setLocale(lang) {
  i18n.global.locale.value = lang
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  storage.set('drr-lang', lang)
}
