<script setup>
import { RouterView } from 'vue-router'
import AppLoader from '@/components/layout/AppLoader.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FloatingContact from '@/components/layout/FloatingContact.vue'
</script>

<template>
  <AppLoader />
  <ScrollProgress />
  <AppHeader />
  <main id="top"><RouterView /></main>
  <AppFooter />
  <FloatingContact />
</template>
