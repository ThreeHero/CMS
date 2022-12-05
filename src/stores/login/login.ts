import type { IAccount } from '@/api/login/type'
import { defineStore } from 'pinia'
import router from '@/router'
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
      token: localCache.getCache('token') ?? '',
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
      localCache.setCache('useInfo', userInfo)

      // 获取用户菜单并缓存
      const userMenusResult = await userMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      // 跳转至首页
      router.push('/')
    },

    // 手机登录
    phoneLoginAction(phone: any) {
      console.log(phone)
    }
  }
})

export default useLoginStore
