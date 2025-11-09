<template>
  <div ref="tabsWrap" :class="{ sorting: isSorting }">
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
        <a-tab-pane v-for="pane in panes" :key="pane.key">
          <template #tab>
            <span class="drag-handle" aria-label="drag to reorder">⋮⋮</span>
            <span class="tab-title">{{ pane.title }}</span>
          </template>
          {{ pane.content }}
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { TabsProps } from 'ant-design-vue'
import Sortable from 'sortablejs'

// タブ位置（水平/垂直）
const mode = ref<TabsProps['tabPosition']>('top')
const isSorting = ref(false)

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

function tickAutoScroll(wrap: HTMLElement, speed = 18) {
  if (scrollDirX === 0) {
    rafId = null
    return
  }
  const max = wrap.scrollWidth - wrap.clientWidth
  const next = wrap.scrollLeft + scrollDirX * speed
  wrap.scrollLeft = Math.max(0, Math.min(max, next))
  rafId = requestAnimationFrame(() => tickAutoScroll(wrap, speed))
}

// 追加：operationsボタン連打用
let opsTimer: number | null = null
function stopOpsAutoScroll() {
  if (opsTimer != null) {
    window.clearInterval(opsTimer)
    opsTimer = null
  }
}
function startOpsAutoScroll(wrap: HTMLElement, dir: 'left' | 'right') {
  stopOpsAutoScroll()
  const ops = wrap.parentElement?.querySelector('.ant-tabs-nav-operations') as HTMLElement | null
  if (!ops) return

  // Prev/Next ボタンをゆるく特定（クラス名はバージョンで差があるため部分一致で）
  const prevBtn = ops.querySelector(
    '[class*="tab-prev"],[class*="nav-operations-prev"],[aria-label*="Prev"]',
  ) as HTMLButtonElement | null
  const nextBtn = ops.querySelector(
    '[class*="tab-next"],[class*="nav-operations-next"],[aria-label*="Next"]',
  ) as HTMLButtonElement | null

  const target = dir === 'left' ? prevBtn : nextBtn
  if (!target) return

  // 押しっぱなし連打（120ms間隔は体感ちょうど良い）
  opsTimer = window.setInterval(() => {
    if (target.hasAttribute('disabled')) return
    target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  }, 120)
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

  // Sortable.create 内：scroll 系は削除・無効化してOK（transform は AntD に任せる）
  sortable = Sortable.create(tabBar, {
    animation: 150,
    draggable: '.ant-tabs-tab',
    handle: '.drag-handle' /* ← ハンドル分離しておくと誤爆が減る。なければ .ant-tabs-tab でも可 */,
    ghostClass: 'sortable-ghost',
    direction: 'horizontal',
    forceFallback: true,

    onStart: () => {
      stopOpsAutoScroll()
    },

    onMove: (evt, originalEvent) => {
      const wrap = tabsWrap.value?.querySelector('.ant-tabs-nav-wrap') as HTMLElement | null
      if (!wrap) return
      const THRESH = 100
      const rect = wrap.getBoundingClientRect()
      const draggedLeft = evt.draggedRect?.left
      const draggedRight = evt.draggedRect?.right

      // マウス/タッチ座標（保険）
      const { x } = getClientXY(originalEvent as Event)
      const nearLeft =
        (draggedLeft != null && draggedLeft <= rect.left + THRESH) || x <= rect.left + THRESH
      const nearRight =
        (draggedRight != null && draggedRight >= rect.right - THRESH) || x >= rect.right - THRESH

      if (nearLeft) {
        startOpsAutoScroll(wrap, 'left')
      } else if (nearRight) {
        startOpsAutoScroll(wrap, 'right')
      } else {
        stopOpsAutoScroll()
      }
    },

    onEnd: ({ oldIndex, newIndex }) => {
      stopOpsAutoScroll()
      if (oldIndex == null || newIndex == null || oldIndex === newIndex) return
      const moved = panes.value.splice(oldIndex, 1)[0]
      panes.value.splice(newIndex, 0, moved)
    },
  })
}
</script>

<style scoped>
:deep(.ant-tabs-nav-wrap) {
  overflow-x: auto !important;
  overflow-y: hidden !important;
  max-width: 100% !important;
  overscroll-behavior-x: contain;
}

/* タブ本体はスクロールしやすく（ドラッグはハンドルだけ） */
:deep(.ant-tabs-tab) {
  touch-action: pan-x; /* ← トラックパッド/タッチでの横スクロールを優先 */
  cursor: default; /* 本体はドラッグ対象ではない */
  width: 200px !important;
  flex: 0 0 200px !important;
}

/* ハンドルだけ掴めるように */
:deep(.drag-handle) {
  display: inline-block;
  margin-right: 8px;
  cursor: grab;
  user-select: none;
  -webkit-user-drag: none;
  touch-action: none; /* ハンドル上はスクロールよりドラッグを優先 */
}
:deep(.drag-handle:active) {
  cursor: grabbing;
}

/* 操作ボタンが端の当たりを邪魔する場合は非表示でOK */
:deep(.ant-tabs-nav-operations) {
  display: none !important;
}
</style>
