import type { IAccount } from '@/api/login/type'
import { defineStore } from 'pinia'
import router, { addRoutesWithMenu } from '@/router'
import {
  accountLogin,
  userInfoLoginById,
  userMenusByRoleId
} from '@/api/login/login'
import localCache from '@/utils/cache'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      // 缓存中读取
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  actions: {
    // 账号登录
    async accountLoginAction(account: IAccount) {
      const loginResult = await accountLogin(account)
      const { id, token } = loginResult.data
      // 保存token并缓存
      this.token = token
      localCache.setCache('token', token)

      // 获取用户信息并缓存
      const userInfoResult = await userInfoLoginById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      // 获取用户菜单并缓存
      const userMenusResult = await userMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      // 动态添加路由
      addRoutesWithMenu(this.userMenus)

      // 跳转至首页
      router.push('/')
    },

    // 手机登录
    phoneLoginAction(phone: any) {
      console.log(phone)
    },

    loadLocalDataAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')

      if (this.token && this.userMenus) {
        addRoutesWithMenu(this.userMenus)
      }
    }
  }
})

export default useLoginStore
