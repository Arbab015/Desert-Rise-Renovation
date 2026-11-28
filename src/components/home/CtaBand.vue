<script setup>
import { PHONE_MOBILE, PHONE_MOBILE_LABEL } from '@/constants/site'
</script>

<template>
  <div class="bg-gradient-to-br from-gold-dark via-gold to-gold-light py-12 text-center text-night">
    <div class="container-x">
      <h2 class="mx-auto mb-4 max-w-none text-[clamp(26px,3.6vw,38px)] font-bold">
        {{ $t('cta.heading') }}
      </h2>
      <a :href="`tel:${PHONE_MOBILE}`" class="btn bg-night text-gold-light hover:-translate-y-0.5"
        >{{ $t('cta.call') }} <span dir="ltr">{{ PHONE_MOBILE_LABEL }}</span></a
      >
    </div>
  </div>
</template>
