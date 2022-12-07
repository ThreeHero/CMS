/* eslint-disable @typescript-eslint/no-var-requires */
import { RouteRecordRaw } from 'vue-router'
// 获取所有路由对象
function getAllRoutes() {
  const routes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  routeFiles.keys().forEach((key) => {
    const res = require('../router/main' + key.split('.')[1])
    const route = res.default
    routes.push(route)
  })
  return routes
}

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = getAllRoutes()

  function _recurseGetRoute(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
