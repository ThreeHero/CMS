import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'

import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/assets/css/index.less'

// 登录页例子特效
import VueParticles from 'vue-particles'

const pinia = createPinia()

const app = createApp(App)
app.use(VueParticles)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
