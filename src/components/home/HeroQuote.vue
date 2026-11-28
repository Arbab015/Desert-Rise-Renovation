<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { services, categories } from '@/data/services'
import { useServicesState } from '@/composables/useServicesState'
import { whatsappLink } from '@/constants/site'

const { t } = useI18n()
const { selectedService } = useServicesState()
const form = reactive({ area: '', date: '', phone: '', urgent: false })
const byCategory = (c) => services.filter((s) => s.category === c)

/** Opens WhatsApp with the details filled in, like the contact form (no backend to maintain). */
function submit() {
  const service =
    selectedService.value && selectedService.value !== 'other'
      ? t(`services.items.${selectedService.value}.name`)
      : t('contact.other')
  const when = form.urgent ? t('quote.urgentNote') : form.date || t('quote.anyDate')
  const text = t('quote.whatsapp', { service, area: form.area, when, phone: form.phone })
  window.open(whatsappLink(text), '_blank', 'noopener')
}
</script>

<template>
  <div class="container-x relative z-20 -mt-28">
    <form
      class="rounded-3xl border-t-4 border-gold bg-surface p-6 shadow-soft sm:p-8"
      @submit.prevent="submit"
    >
      <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 class="font-display text-2xl font-semibold">{{ $t('quote.title') }}</h2>
        <p class="text-muted">{{ $t('quote.note') }}</p>
      </div>
      <div
        class="mt-5 grid items-end gap-3.5 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]"
      >
        <label class="lbl">
          {{ $t('quote.service') }}
          <select v-model="selectedService" class="field">
            <option value="">{{ $t('contact.service') }}</option>
            <optgroup v-for="c in categories" :key="c" :label="$t(`services.tabs.${c}`)">
              <option v-for="s in byCategory(c)" :key="s.id" :value="s.id">
                {{ $t(`services.items.${s.id}.name`) }}
              </option>
            </optgroup>
            <option value="other">{{ $t('contact.other') }}</option>
          </select>
        </label>
        <label class="lbl">
          {{ $t('quote.area') }}
          <input v-model.trim="form.area" class="field" :placeholder="$t('quote.areaPh')" />
        </label>
        <label class="lbl">
          {{ $t('quote.date') }}
          <input v-model="form.date" class="field" type="date" :disabled="form.urgent" />
        </label>
        <label class="lbl">
          {{ $t('quote.phone') }}
          <input
            v-model.trim="form.phone"
            class="field"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            required
            dir="ltr"
            placeholder="+971 ..."
          />
        </label>
        <button
          class="btn btn-gold h-[52px] justify-center sm:col-span-2 lg:col-span-1"
          type="submit"
        >
          {{ $t('quote.submit') }}
        </button>
      </div>
      <label class="mt-4 flex w-fit cursor-pointer items-center gap-2 text-sm">
        <input v-model="form.urgent" type="checkbox" class="size-4 accent-[var(--gold)]" />
        {{ $t('quote.urgent') }}
      </label>
    </form>
  </div>
</template>

<style scoped>
.lbl {
  display: block;
  font-size: 13px;
  font-weight: 600;
}
.field {
  display: block;
  width: 100%;
  height: 52px;
  margin-top: 6px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--sf);
  color: var(--ink);
  font: inherit;
  font-weight: 400;
  transition: border-color 0.2s;
}
.field:focus {
  border-color: var(--gold);
  outline: none;
}
.field:disabled {
  opacity: 0.5;
}
</style>
