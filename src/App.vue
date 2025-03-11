<script setup>
import { ref } from 'vue'
const ok = ref(true)
const maybeOK = ref(true)
</script>
<template>
  <button @click="ok = !ok">toggle</button>
  <p v-if="ok">ok!</p>
  <p v-else-if="maybeOK">maybe OK!</p>
  <p v-else>not ok</p>
</template>
