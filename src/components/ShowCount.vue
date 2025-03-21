<script setup>
// propsを指定するときはデータの型まで指定する方が良い
defineProps({ foo: { type: Number, required: false, default: 100 } })
</script>
<template>
  <p>count: {{ foo }}</p>
</template>
