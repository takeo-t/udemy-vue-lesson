<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
  <h2>CountUp</h2>
  <p>Count: {{ count }}</p>
  <button @click="count++">Increment</button>
</template>
