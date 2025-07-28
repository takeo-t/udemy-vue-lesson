<template>
  <div style="position: relative">
    <div id="pano" style="width: 100%; height: 50vh"></div>
    <!-- ズームイン -->
    <button style="position: absolute; top: 20px; left: 20px; z-index: 1000" @click="zoomIn">
      ズームイン
    </button>

    <!-- ズームアウト -->
    <button style="position: absolute; top: 20px; left: 120px; z-index: 1000" @click="zoomOut">
      ズームアウト
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = '/krpano/krpano.js'
  script.onload = () => {
    window.embedpano({
      xml: '/krpano/krpano.xml',
      target: 'pano',
      id: 'krpanoSWFObject', // ← これで getElementById で取得可能に
      html5: 'only',
    })
  }
  document.body.appendChild(script)
})

function zoomIn() {
  const krpano = document.getElementById('krpanoSWFObject')
  if (krpano) {
    krpano.call('zoomto(60);') // アクションを実行
  } else {
    console.warn('krpano がまだ読み込まれていません')
  }
}

function zoomOut() {
  const krpano = document.getElementById('krpanoSWFObject')
  if (krpano) {
    krpano.call('zoomto(120);') // ズームアウト
  } else {
    console.warn('krpano がまだ読み込まれていません')
  }
}
</script>
