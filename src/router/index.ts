import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 前置路由守卫
router.beforeEach((to) => {
  // 判断token
  if (localCache.getCache('token')) {
    if (to.path === '/login') {
      return '/'
    } else {
      return
    }
  } else {
    // 没有token
    if (to.path !== '/login' && to.path !== '/404') {
      // 返回至登录页
      return '/login'
    } else {
      return
    }
  }
})

export default router
