'use strict'

import { getToken } from '../auth'
import { capsuleLog } from 'easy-fns-ts'
import { checkStatus } from './status'
import { isString } from 'lodash-es'

export const transform = {
  requestInterceptors: (config) => {
    if (config.customOptions.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },

  responseInterceptors: (res) => {
    capsuleLog('[Walnut Request]', 'Success', 'success')

    return Promise.resolve(res.data)
  },

  responseInterceptorsCatch: (err) => {
    const statusCode = err.response.data.statusCode
    const msg = err.response.data.detail.message

    checkStatus(statusCode, msg)

    capsuleLog('[Walnut Request]', 'Error', 'danger')
    return Promise.reject(err)
  },

  beforeRequestHook: (config, customOptions) => {
    const { apiBase, apiPrefix, joinTime, joinPrefix } = customOptions

    if (joinPrefix) {
      config.url = `${apiPrefix}${config.url}`
    }

    if (apiBase && isString(apiBase)) {
      config.url = `${apiBase}${config.url}`
    }

    const params = config.params
    if (joinTime && config.method.toUpperCase() === 'GET') {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, { t: new Date().valueOf() })
      } else {
        config.url = config.url + params + `?t=${new Date().valueOf()}`
        config.params = undefined
      }
    }

    return config
  },
}
