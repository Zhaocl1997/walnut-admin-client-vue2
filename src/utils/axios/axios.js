'use strict'

import axios from 'axios'
import { log } from 'easy-fns-ts/dist/esm/log'
import { checkStatus } from './status'

export class WalnutAxios {
  constructor(options) {
    this.options = options
    this.instance = axios.create(options)
    this.createInterceptors()
  }

  /**
   * @description: 获取options里的transform
   */
  getTransform() {
    const { transform } = this.options
    return transform || {}
  }

  /**
   * @description: 拦截器配置
   */
  createInterceptors() {
    const transform = this.getTransform()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    this.createRequestInterceptor()
    this.createResponseInterceptor()
  }

  /**
   * @description: 请求拦截器
   */
  createRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        // config.headers['Authorization'] = 'Bearer ' + getToken()
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description: 响应拦截器
   */
  createResponseInterceptor() {
    this.instance.interceptors.response.use(
      (res) => {
        log.capsule('[Walnut Request]', 'Success', 'success')
        return res.data
      },
      (err) => {
        const statusCode = err.response.data.statusCode
        const msg = err.response.data.detail.message

        checkStatus(statusCode, msg)

        log.capsule('[Walnut Request]', 'Error', 'danger')
        return Promise.reject(err)
      }
    )
  }

  /**
   * @description: 请求方法
   */
  request(config) {
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
