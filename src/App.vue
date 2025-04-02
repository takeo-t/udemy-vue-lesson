<script setup>
import BaseCard from './components/BaseCard.vue'
</script>
<template>
  <h1>Slots</h1>
  <BaseCard>
    <template #header>
      <h2>Vue.js Course</h2>
    </template>
    <template #main>
      <p>This is a Vue.js Course. You can leran Vue.js</p>
    </template>
    <template #footer>
      <p>Instructor takeo</p>
    </template>
  </BaseCard>
</template>
