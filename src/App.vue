<script setup>
// 親コンポーネント側でPropsとして属性でデータを渡す
import { ref } from 'vue'
import ResetButton from './components/ResetButton.vue'

const count = ref(0)
</script>
<template>
  <p>count: {{ count }}</p>
  <button @click="count++">+1</button>
  <ResetButton @reset="count = 0" />
</template>
