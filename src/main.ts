import { createApp } from 'vue'
import router from './router'
import stores from './stores'
import ElementPlus from 'element-plus'
import App from './App.vue'

import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/assets/css/index.less'

// 登录页例子特效
import VueParticles from 'vue-particles'

const app = createApp(App)
app.use(VueParticles)
app.use(router)
app.use(stores)
app.use(ElementPlus)
app.mount('#app')
