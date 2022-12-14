import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { THRequestConfig, THRequestInterceptors } from './type'

import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import { ElLoading } from 'element-plus'

// 默认的loading状态
const DEFAULT_LOADING = true

class THRequest {
  private instance: AxiosInstance // 实例
  private interceptors?: THRequestInterceptors // 拦截器
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: THRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, // 成功
      this.interceptors?.requestInterceptorCatch // 失败
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor, // 成功
      this.interceptors?.responseInterceptorCatch // 失败
    )

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true, // 蒙版
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data

        return data
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        return err
      }
    )
  }

  request<T>(config: THRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
}

export default THRequest
