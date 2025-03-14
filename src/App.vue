<script setup>
import { ref } from 'vue'
const ok = ref(true)
// 高頻度で変更されるデータにはv-showを使う。なぜならv-ifはDOMを追加・削除するため、高頻度で変更されるとパフォーマンスが悪くなるから。
// templeteタグではv-showを使うことができない。
</script>
<template>
  <button @click="ok = !ok">toggle</button>
  <p v-show="ok">OK</p>
</template>
