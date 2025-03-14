<script setup>
import { ref } from 'vue'
const user = ref({ name: 'John Doe', age: 25, gender: 'man' })
</script>
<template>
  <p v-for="(value, key, index) in user" :key="value">{{ key }}: {{ value }}({{ index }})</p>
</template>
