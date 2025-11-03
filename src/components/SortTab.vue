<template>
  <div ref="tabsWrap">
    <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>

    <a-tabs
      v-model:activeKey="activeKey"
      :tab-position="mode"
      :style="{ height: '200px' }"
      @tabScroll="callback"
    >
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title">
        {{ pane.content }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { TabsProps } from 'ant-design-vue'
import Sortable from 'sortablejs'

// タブ位置（水平/垂直）
const mode = ref<TabsProps['tabPosition']>('top')

// アクティブキーは文字列が無難（AntD側の期待に合わせる）
const activeKey = ref('1')

// 並べ替え対象の配列データ（ここを入れ替える）
type Pane = { key: string; title: string; content: string }
const panes = ref<Pane[]>(
  Array.from({ length: 30 }, (_, i) => {
    const n = i + 1
    return { key: String(n), title: `Tab-${n}`, content: `Content of tab ${n}` }
  }),
)

const callback: TabsProps['onTabScroll'] = (val) => {
  console.log(val)
}

const tabsWrap = ref<HTMLElement | null>(null)
let sortable: Sortable | null = null

onMounted(() => {
  nextTick(initSortable)
})

// タブ位置（top/left）を変えるとナビDOMが作り直されるので再初期化
watch(mode, async () => {
  await nextTick()
  initSortable()
})

onBeforeUnmount(() => {
  if (sortable) sortable.destroy()
  sortable = null
})

// 追加：手動オートスクロール用の状態
let rafId: number | null = null
let scrollDirX = 0 // -1 = 左 / 0 = 停止 / +1 = 右

function stopAutoScroll() {
  if (rafId != null) cancelAnimationFrame(rafId)
  rafId = null
  scrollDirX = 0
}

function tickAutoScroll(wrap: HTMLElement, speed = 18) {
  if (scrollDirX === 0) {
    rafId = null
    return
  }
  wrap.scrollLeft += scrollDirX * speed
  rafId = requestAnimationFrame(() => tickAutoScroll(wrap, speed))
}

// 追加：座標取り出しユーティリティ
function getClientXY(e: Event): { x: number; y: number } {
  if ('clientX' in e && 'clientY' in e) {
    const m = e as MouseEvent | PointerEvent
    return { x: m.clientX, y: m.clientY }
  }
  const t = e as TouchEvent
  const touch = t.touches?.[0] ?? t.changedTouches?.[0]
  return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 }
}

function initSortable() {
  if (sortable) {
    sortable.destroy()
    sortable = null
  }

  const tabBar = tabsWrap.value?.querySelector('.ant-tabs-nav-list') as HTMLElement | null
  const wrap = tabsWrap.value?.querySelector('.ant-tabs-nav-wrap') as HTMLElement | null
  if (!tabBar || !wrap) return

  // ★ AntDのtransform移動を使わず、wrapをスクロールさせる前提にする
  //   （CSS側でも !important で上書きします）
  wrap.style.overflowX = 'auto'
  wrap.style.overflowY = 'hidden'
  ;(wrap.parentElement as HTMLElement)?.style.setProperty('max-width', '100%')

  sortable = Sortable.create(tabBar, {
    animation: 150,
    draggable: '.ant-tabs-tab',
    handle: '.ant-tabs-tab',
    ghostClass: 'sortable-ghost',
    forceFallback: true,
    bubbleScroll: true,
    scroll: true,
    scrollSensitivity: 60,
    scrollSpeed: 16,
    scrollFn: (offsetX, offsetY) => {
      if (!wrap) return
      if (offsetX) wrap.scrollLeft += offsetX
      if (offsetY) wrap.scrollTop += offsetY
    },

    onStart: () => {
      stopAutoScroll() // 念のためリセット
    },

    onMove: (evt, originalEvent) => {
      if (!wrap) return

      const THRESH = 80
      const rect = wrap.getBoundingClientRect()
      const { x } = getClientXY(originalEvent)

      // 左端 / 右端の判定
      if (x < rect.left + THRESH) {
        scrollDirX = -1
      } else if (x > rect.right - THRESH) {
        scrollDirX = +1
      } else {
        scrollDirX = 0
      }

      if (rafId == null && scrollDirX !== 0) {
        rafId = requestAnimationFrame(() => tickAutoScroll(wrap))
      }
      if (scrollDirX === 0 && rafId != null) {
        stopAutoScroll()
      }

      // 何も返さなければそのまま続行（return false でキャンセルできる）
    },

    onEnd: ({ oldIndex, newIndex }) => {
      stopAutoScroll()
      if (oldIndex == null || newIndex == null || oldIndex === newIndex) return
      const moved = panes.value.splice(oldIndex, 1)[0]
      panes.value.splice(newIndex, 0, moved)
    },
  })
}
</script>

<style scoped>
.sortable-ghost {
  opacity: 0.4;
}

/* ★ 幅固定しているならそのまま */
:deep(.ant-tabs-tab) {
  cursor: move;
  width: 200px !important;
  flex: 0 0 200px !important;
}

:deep(.ant-tabs-nav-wrap) {
  overflow-x: auto !important;
  overflow-y: hidden !important;
  max-width: 100% !important;
}

/* 不要なら操作ボタンを隠す（被ると端判定が鈍る） */
:deep(.ant-tabs-nav-operations) {
  display: none !important;
}
</style>
