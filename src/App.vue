<script setup>
import { ref } from 'vue'
const fruits = ref([
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
  { id: 3, name: 'cherry' },
  { id: 4, name: 'date' },
])
// v-forはtempleteタグを使用することができる
// v-ifと組み合わせることで、条件に合致した要素のみを描画することができる
</script>
<template>
  <button @click="fruits.shift()">Remove first</button>
  <template v-for="{ id, name } in fruits" :key="id">
    <template v-if="id === 2">
      <p>id: {{ id }}</p>
      <input type="text" />{{ name }}({{ index }})
    </template>
  </template>
</template>
