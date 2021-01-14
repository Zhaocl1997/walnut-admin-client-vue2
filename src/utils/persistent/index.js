'use strict'

import { createStroage } from 'easy-fns-ts/dist/esm/storage'
import { myEncryption } from '../crypto'
import { getlsPrefix, getssPrefix } from '../prefix'

// TODO prefix add __
// TODO cookie
// TODO easy-fns-ts rebuild
// TODO encrypt include expire
const ls = createStroage({
  prefixKey: `${getlsPrefix()}`,
  storage: localStorage,
})
const ss = createStroage({
  prefixKey: `${getssPrefix()}`,
  storage: sessionStorage,
})

/* LOCAL */
export const setLocal = (k, v) => {
  const en = myEncryption.encrypt(v)
  ls.set(k, en)
}

export const getLocal = (k) => {
  const v = ls.get(k)
  const o = myEncryption.decrypt(v)
  return o
}

export const clearLocal = () => {
  ls.clear()
}

export const removeLocal = (k) => {
  ls.remove(k)
}

/* SESSION */
export const setSession = (k, v) => {
  ss.set(k, v)
}

export const getSession = (k) => {
  return ss.get(k)
}

export const clearSession = () => {
  ss.clear()
}

export const removeSession = (k) => {
  ss.remove(k)
}
