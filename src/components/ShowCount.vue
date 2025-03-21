<script setup>
import { watch, watchEffect } from 'vue'

// definePropsでデータの受け口を作る
// 子コンポーネントに渡されたデータは読み取り専用で値の変更はできない
// defineProps(['foo', 'bar'])
const { foo } = defineProps(['foo'])
watchEffect(() => {
  console.log(foo)
})
watch(
  () => foo,
  () => {
    console.log('watch')
  },
)
</script>
<template>
  <p>count: {{ foo }}</p>
  <p>{{ bar }}</p>
</template>
