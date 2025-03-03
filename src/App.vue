<script setup>
import { ref } from 'vue'
//ディレクティブで変数のデータを表示するときは、トップレベルで変数を宣言する必要がある
// const vueURL = ref('https://jp.vuejs.org/')
// const vueId = ref('vue-link')
const count = ref(0)
function countUP() {
  count.value++
}
</script>
<template>
  <!-- <a :id="vueId" :href="vueURL">Vue.js</a>
  <p>このリンクのIDは 「{{ vueId }}」です。</p> -->
  <p>count is: {{ count }}</p>
  <button @click="count++">button</button>
  <button @click="countUP">button</button>
</template>
