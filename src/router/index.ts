import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenusToRoutes } from '@/utils/mapMenus'

import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/404',
    name: '404',
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

export function addRoutesWithMenu(menus: any) {
  const dynamicRoutes = mapMenusToRoutes(menus)
  for (const route of dynamicRoutes) {
    // 向main 子项添加路由
    router.addRoute('main', route)
  }
}

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
