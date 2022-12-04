import THRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const request = new THRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = 'xiaoliu'
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      console.log('请求成功拦截器')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败拦截器')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应成功拦截器')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败拦截器')
      return err
    }
  }
})

export default request
