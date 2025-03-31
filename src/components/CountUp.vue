<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onUpdated,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
} from 'vue'
const count = ref(0)
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  console.log('onMounted')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
onUpdated(() => {
  console.log('onUpdated')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
</script>
<template>
  <p>count: {{ count }}</p>
  <button @click="count++">+1</button>
</template>
