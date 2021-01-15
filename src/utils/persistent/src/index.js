'use strict'

import { WebStorage } from './WebStroage'
import { WebCookie } from './WebCookie'
import { getlsPrefix, getssPrefix, getckPrefix } from '../../prefix'
import { isProdMode } from '../../mode'

// 默认生产模式开启加密
const createWebStroage = (opt) => {
  return new WebStorage(opt)
}

const LSOptions = {
  storage: localStorage,
  prefixKey: getlsPrefix(),
  encrypt: isProdMode,
}
export const myLS = createWebStroage(LSOptions)

const SSOptions = {
  storage: sessionStorage,
  prefixKey: getssPrefix(),
  encrypt: isProdMode,
}
export const mySS = createWebStroage(SSOptions)

const CookieOptions = {
  prefixKey: getckPrefix(),
  encrypt: isProdMode,
}
export const myCookie = new WebCookie(CookieOptions)
