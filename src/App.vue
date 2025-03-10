<script setup>
import { ref } from 'vue'
const userInput = ref('')
</script>
<template>
  <p>{{ userInput }}</p>
  <input v-model="userInput" type="text" />
  <button @click="userInput = 'hi'">button</button>
</template>
