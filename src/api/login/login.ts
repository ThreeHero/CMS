import type { IAccount, IDataType } from './type'
import request from '@/utils/service'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfoLogin = '/users/',
  UserMenus = '/role/' //  role/1/menu
}

/**
 * 登录
 * @param account
 * @returns
 */
export function accountLogin(account: IAccount) {
  return request.request<IDataType>({
    url: LoginAPI.AccountLogin,
    method: 'POST',
    data: account
  })
}

/**
 * 根据id获取用户
 * @param id
 * @returns
 */
export function userInfoLoginById(id: number) {
  return request.request<IDataType>({
    url: LoginAPI.UserInfoLogin + id,
    method: 'GET',
    showLoading: false
  })
}

export function userMenusByRoleId(id: number) {
  return request.request<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    method: 'GET',
    showLoading: false
  })
}
