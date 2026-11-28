export const PHONE_MOBILE = '+971543522444'
export const PHONE_MOBILE_LABEL = '+971 54 352 2444'
export const PHONE_OFFICE = '+97143436544'
export const PHONE_OFFICE_LABEL = '+971 4 343 6544'
export const WHATSAPP_NUMBER = '971543522444'

/**
 * Hero background slides. Put the files in /public/videos (hero-1.mp4, hero-1.jpg ...).
 * Add or remove entries freely; a missing file is skipped and the animated skyline shows instead.
 */
export const HERO_SLIDES = [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `/videos/hero-${n}.mp4`,
    poster: `/videos/hero-${n}.jpg`,
}))
/** Longest time (seconds) one slide may play before the next one starts. */
export const HERO_SLIDE_MAX = 15
/** Optional hero music (file in /public/audio). Set to '' to remove the sound button. */
export const HERO_AUDIO = '/audio/hero.mp3'
/** Browsers block sound until the visitor clicks or taps once: unmute on that first interaction. */
export const HERO_AUDIO_ON_FIRST_TOUCH = true

export const whatsappLink = (text = '') =>
    `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
