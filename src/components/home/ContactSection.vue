<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { services, categories } from '@/data/services'
import { useServicesState } from '@/composables/useServicesState'
import {
  PHONE_MOBILE,
  PHONE_MOBILE_LABEL,
  PHONE_OFFICE,
  PHONE_OFFICE_LABEL,
  whatsappLink,
} from '@/constants/site'

const { t } = useI18n()
const { selectedService } = useServicesState()
const form = reactive({ name: '', phone: '', message: '' })
const byCategory = (c) => services.filter((s) => s.category === c)

/** Builds a WhatsApp message from the form and opens it, so there is no backend to maintain. */
function submit() {
  const service =
    selectedService.value && selectedService.value !== 'other'
      ? t(`services.items.${selectedService.value}.name`)
      : t('contact.other')
  const text = t('contact.whatsapp', {
    name: form.name,
    phone: form.phone,
    service,
    message: form.message,
  })
  window.open(whatsappLink(text), '_blank', 'noopener')
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container-x grid gap-12 lg:grid-cols-2">
      <div v-reveal>
        <h2 class="h2">{{ $t('contact.heading') }}</h2>
        <p class="lead">{{ $t('contact.lead') }}</p>
        <dl class="space-y-4">
          <div>
            <dt class="font-display text-lg font-semibold">{{ $t('contact.mobile') }}</dt>
            <dd>
              <a
                dir="ltr"
                class="inline-block hover:text-gold-dark"
                :href="`tel:${PHONE_MOBILE}`"
                >{{ PHONE_MOBILE_LABEL }}</a
              >
            </dd>
          </div>
          <div>
            <dt class="font-display text-lg font-semibold">{{ $t('contact.office') }}</dt>
            <dd>
              <a
                dir="ltr"
                class="inline-block hover:text-gold-dark"
                :href="`tel:${PHONE_OFFICE}`"
                >{{ PHONE_OFFICE_LABEL }}</a
              >
            </dd>
          </div>
          <div>
            <dt class="font-display text-lg font-semibold">{{ $t('contact.location') }}</dt>
            <dd>{{ $t('contact.locationValue') }}</dd>
          </div>
        </dl>
      </div>
      <form v-reveal="90" class="grid gap-3" @submit.prevent="submit">
        <input
          v-model.trim="form.name"
          class="field"
          required
          autocomplete="name"
          :placeholder="$t('contact.name')"
          :aria-label="$t('contact.name')"
        />
        <input
          v-model.trim="form.phone"
          class="field"
          required
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          :placeholder="$t('contact.phone')"
          :aria-label="$t('contact.phone')"
        />
        <select v-model="selectedService" class="field" :aria-label="$t('contact.service')">
          <option value="">{{ $t('contact.service') }}</option>
          <optgroup v-for="c in categories" :key="c" :label="$t(`services.tabs.${c}`)">
            <option v-for="s in byCategory(c)" :key="s.id" :value="s.id">
              {{ $t(`services.items.${s.id}.name`) }}
            </option>
          </optgroup>
          <option value="other">{{ $t('contact.other') }}</option>
        </select>
        <textarea
          v-model.trim="form.message"
          class="field"
          rows="4"
          :placeholder="$t('contact.message')"
          :aria-label="$t('contact.message')"
        />
        <button class="btn btn-gold" type="submit">{{ $t('contact.send') }}</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.field {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--sf);
  color: var(--ink);
  font: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.field:focus {
  outline: 0;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgb(217 176 74 / 0.25);
}
</style>
