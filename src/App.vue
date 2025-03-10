<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <p>{{ count }}</p>
  <input type="text" @keyup.space.delete="count++" />
</template>
