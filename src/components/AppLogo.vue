<script setup>

</script>
<template>
  <h1>{{ title }}</h1>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="h-10 w-10" aria-hidden="true">
    <defs>
      <linearGradient id="lms-logo-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8b80f5" />
        <stop offset="1" stop-color="#6559e8" />
      </linearGradient>
    </defs>

    <!-- badge -->
    <rect width="40" height="40" rx="10" fill="url(#lms-logo-bg)" />

    <!-- cap top (diamond) -->
    <path d="M20 9L35 16.5L20 24L5 16.5Z" fill="#ffffff" />

    <!-- cap base -->
    <path
      d="M11 20.5V26C11 28.5 15 31 20 31C25 31 29 28.5 29 26V20.5L20 25Z"
      fill="#ffffff"
      fill-opacity="0.75"
    />

    <!-- tassel -->
    <path d="M34.5 17.5V26" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" />
    <circle cx="34.5" cy="27.8" r="1.8" fill="#ffffff" />
  </svg>
</template>
