<script setup>
// 子コンポーネントから親コンポーネントにデータを渡すときはエミットを使用する。
import { ref } from 'vue'
import ResetButton from './components/ResetButton.vue'

const count = ref(0)
function onReset(value) {
  count.value = value
}
</script>
<template>
  <p>count: {{ count }}</p>
  <button @click="count++">+1</button>
  <ResetButton @reset="onReset" />
</template>
