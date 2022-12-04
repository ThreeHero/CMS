import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface THRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface THRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: THRequestInterceptors<T>
  showLoading?: boolean
}
