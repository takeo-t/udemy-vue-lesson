<script setup>
import { ref } from 'vue'
const fruits = ref([
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'cherry' },
  { id: 4, name: 'date' },
])
// keyには配列名を指定できるが、ユニークな値を指定する必要がある
</script>
<template>
  <button @click="fruits.shift()">Remove first</button>
  <li v-for="fruit in fruits" :key="fruit.id"><input type="text" />{{ fruit.name }}</li>
</template>
