import { createApp } from 'vue'
import './style.css'
import './index.css' //引入tailwind基础样式

import App from './App.vue'
import router from './router'
import { createPinia } from "pinia" // 引入pinia
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
