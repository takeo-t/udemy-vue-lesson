import { createApp } from 'vue'
import App from '@/App.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const app = createApp(App)
//コンポーネントのグローバル登録
//保守性の観点から、コンポーネントをグローバル登録は避けるべき
app.component('BaseIcon', BaseIcon)
app.mount('#app')
