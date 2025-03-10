<script setup>
import { ref, computed } from 'vue'
const score = ref(0)
const evaluation = computed(() => {
  return score.value > 3 ? 'Good' : 'Bad'
  // computed関数の中には状態を変更する処理を書いてはいけない
  // 非同期の処理も状態変更になるので書いてはいけない
})
console.log(evaluation.value)
</script>
<template>
  <p>{{ evaluation }}</p>
  <p>{{ score }}</p>
  <button @click="score++">+1</button>
</template>
