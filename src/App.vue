<script setup>
// 親コンポーネント側でPropsとして属性でデータを渡す
import { ref } from 'vue'
import ShowCount from './components/ShowCount.vue'
const count = ref(0)
</script>
<template>
  <ShowCount :foo="count" bar="hello" />
  <button @click="count++">+1</button>
</template>
