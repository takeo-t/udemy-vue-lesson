<script setup>
import { ref } from 'vue'
import CountUp from './components/CountUp.vue'
const isShow = ref(true)
</script>
<template>
  <div>
    <button @click="isShow = !isShow">switch</button>
    <CountUp v-if="isShow" />
  </div>
</template>
