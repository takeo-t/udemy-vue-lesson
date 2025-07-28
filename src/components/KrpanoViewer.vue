<template>
  <div id="pano" ref="panoContainer" style="width: 100%; height: 100vh"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // krpanoを読み込み、初期化
  window.embedpano({
    swf: null, // Flash不要
    xml: 'krpano/krpano.xml', // krpano ツアーXMLのパス
    target: 'pano', // 表示先divのID
    html5: 'only',
    mobilescale: 1.0,
    passQueryParameters: true,
  })
})
</script>
