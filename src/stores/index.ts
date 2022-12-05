import type { App } from 'vue'
import { createPinia } from 'pinia'
// import useLoginStore from './login/login'

const pinia = createPinia()

// 注册 pinia
function registerStore(app: App<Element>) {
  app.use(pinia)

  // 加载本地数据
  // const loginStore = useLoginStore()
  // loginStore.loadLocalDataAction()
}

export default registerStore
