<script setup>
import { ref } from 'vue'
const ok = ref(true)
//  templateタグでv-ifディレクティブを使用すると、レンダリング時にtemplateタグ自体が削除される
</script>
<template>
  <button @click="ok = !ok">toggle</button>
  <template v-if="ok">
    <p>OK!</p>
    <p>Hello</p>
  </template>
</template>
