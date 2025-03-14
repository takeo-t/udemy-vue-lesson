<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
  <!-- <p>{{ $attrs }}</p> -->
  <h2 v-bind="$attrs">CountUp</h2>
  <p class="red">Count: {{ count }}</p>
  <button @click="count++">+1</button>
</template>
<style scoped>
.red {
  color: red;
}
</style>
