'use strict'

import { wAxios } from './axios'
import { transform } from './transform'

const apiBase = import.meta.env.VITE_PROXY
const apiPrefix =
  import.meta.env.VITE_API_PREFIX + import.meta.env.VITE_API_VERSION

const walnutHttp = new wAxios({
  // baseURL,

  timeout: 10 * 1000,

  transform,

  customOptions: {
    // api 基础地址
    apiBase,

    // api 前缀
    apiPrefix,

    // 是否加入api前缀
    joinPrefix: true,

    // 加时间戳
    joinTime: true,

    // 带token
    token: true,
  },
})

export default walnutHttp
