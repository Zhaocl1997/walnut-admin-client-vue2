'use strict'

import { myLS, mySS, myCookie } from './src'

/* LOCAL */
export const setLocal = (k, v) => {
  myLS.set(k, v)
}

export const getLocal = (k) => {
  return myLS.get(k)
}

export const clearLocal = () => {
  myLS.clear()
}

export const removeLocal = (k) => {
  myLS.remove(k)
}

/* SESSION */
export const setSession = (k, v) => {
  mySS.set(k, v)
}

export const getSession = (k) => {
  return mySS.get(k)
}

export const clearSession = () => {
  mySS.clear()
}

export const removeSession = (k) => {
  mySS.remove(k)
}

/* COOKIE */
export const setCookie = (k, v) => {
  myCookie.set(k, v)
}

export const getCookie = (k) => {
  return myCookie.get(k)
}

export const clearCookie = () => {
  myCookie.clear()
}

export const removeCookie = (k) => {
  myCookie.remove(k)
}
