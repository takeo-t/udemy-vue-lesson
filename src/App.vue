<script setup>
import { ref } from 'vue'
const fruits = ref([
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'cherry' },
  { id: 4, name: 'date' },
])
// indexをkeyに指定することは推奨されない。なぜなら、リストの順番が変わると、Vueは全ての要素を再描画するから。
</script>
<template>
  <button @click="fruits.shift()">Remove first</button>
  <li v-for="(fruit, index) in fruits" :key="fruit.id">
    <input type="text" />{{ fruit.name }}({{ index }})
  </li>
</template>
