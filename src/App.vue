<script setup>
import { ref, watch } from 'vue'
const count1 = ref(0)
const count2 = ref(0)
const count3 = ref(0)
watch(count1, (newValue, oldValue) => {
  console.log('watch')
  console.log('newValue:', newValue)
  console.log('oldValue:', oldValue)
  // console.log(count1.value, count2.value, count3.value)
})
// watchEffect(() => {
//   console.log('watchEffect')
//   console.log(count1.value, count2.value, count3.value)
// })
//監視対象を明示的に指定するときは、watchEffectよりもwatchを使う。
</script>
<template>
  <p>{{ count1 }}(count1)</p>
  <p>{{ count2 }}(count2)</p>
  <p>{{ count3 }}(count3)</p>
  <button @click="count1++">count1++</button>
  <button @click="count2++">count2++</button>
  <button @click="count3++">count3++</button>
</template>
