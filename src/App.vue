<script setup>
import { ref, watchEffect } from 'vue'
const count = ref(0)
watchEffect(() => {
  console.log('watchEffect')
  console.log(count.value)
  setTimeout(() => {
    console.log('after 1 second')
  }, 1000)
  count.value = 'hello'
})
</script>
<template>
  <p>{{ count }}</p>
  <button @click="count++">+1</button>
</template>
