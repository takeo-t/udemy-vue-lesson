<script setup>
import { ref } from 'vue'
const fruits = ref([
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'cherry' },
  { id: 4, name: 'date' },
])
// 分割代入でidとnameを取り出すことができる。v-forの中で使うときは{}で囲む
// indexがなくてもv-forの中で使うことができる
</script>
<template>
  <button @click="fruits.shift()">Remove first</button>
  <li v-for="{ id, name } in fruits" :key="id"><input type="text" />{{ name }}({{ index }})</li>
</template>
