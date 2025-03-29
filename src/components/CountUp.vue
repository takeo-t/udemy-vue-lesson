<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <p>count: {{ count }}</p>
  <button @click="count++">+1</button>
</template>
