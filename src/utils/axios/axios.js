'use strict'

import axios from 'axios'
import { isFunction, merge } from 'lodash-es'

export class wAxios {
  constructor(options) {
    this.options = options

    this.instance = axios.create(options)
    this.createInterceptors()
  }

  /**
   * @description 获取实例
   */
  getInstance() {
    if (!this.instance) {
      this.instance = axios.create(this.options)
    }
    return this.instance
  }

  /**
   * @description 获取options里的transform
   */
  getTransform() {
    const { transform } = this.options
    return transform || {}
  }

  /**
   * @description 拦截器配置
   */
  createInterceptors() {
    const transform = this.getTransform()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    this.createRequestInterceptor(requestInterceptors, requestInterceptorsCatch)
    this.createResponseInterceptor(
      responseInterceptors,
      responseInterceptorsCatch
    )
  }

  /**
   * @description 请求拦截器
   */
  createRequestInterceptor(i, c) {
    this.instance.interceptors.request.use(i, c)
  }

  /**
   * @description 响应拦截器
   */
  createResponseInterceptor(i, c) {
    this.instance.interceptors.response.use(i, c)
  }

  /**
   * @description 请求方法
   */
  request(config) {
    const { customOptions } = config
    const { beforeRequestHook } = this.getTransform()

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(
        config,
        merge(this.options.customOptions, customOptions)
      )
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
