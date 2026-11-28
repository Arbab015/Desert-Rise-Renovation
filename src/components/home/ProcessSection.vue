<template>
  <section id="process" class="section bg-alt">
    <div class="container-x">
      <h2 v-reveal class="h2">{{ $t('process.heading') }}</h2>
      <p v-reveal class="lead mb-9">{{ $t('process.lead') }}</p>
      <ol class="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="n in 4" :key="n" v-reveal="n * 80" class="border-t-[3px] border-gold pt-3.5">
          <span
            class="mb-1 block font-display text-[26px] font-semibold text-gold-dark dark:text-gold-light"
            >{{ String(n).padStart(2, '0') }}</span
          >
          <h3 class="text-xl font-bold">{{ $t(`process.steps.s${n}.title`) }}</h3>
          <p class="text-[15px] text-muted">{{ $t(`process.steps.s${n}.desc`) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
