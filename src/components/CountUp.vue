<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onUpdated,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  nextTick,
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
async function countUp() {
  count.value++
  await nextTick()
  console.log('nextTick')
}
</script>
<template>
  <p>count: {{ count }}</p>
  <button @click="countUp">+1</button>
</template>
