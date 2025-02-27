<script setup>
import { ref, reactive } from 'vue'
const title = ref('Vue.js Course')
let price = ref(9.99)

function increment() {
  price.value += 1
  instructor.age += 1
  instructor.email = ref('info@example.com')
}
const info = ref({
  students: 1000,
  rating: 4,
})

const instructor = reactive({
  name: 'John Doe',
  age: 30,
})

console.log(instructor.age)

console.log(info.value.students)
</script>
<template>
  <h1>Title: {{ title }}</h1>
  <h2>Price: {{ price - 1 }}</h2>
  <button @click="increment">button</button>
  <h2>Students: {{ info.students }}</h2>
  <h2>instructor: {{ instructor.age }}</h2>
  <h2>instructor: {{ instructor.email }}</h2>
</template>
