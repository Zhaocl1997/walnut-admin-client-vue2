'use strict'

import { i18n } from '../../locales'

export function useI18n(namespace) {
  function getKey(key) {
    if (!namespace) {
      return key
    }
    if (key.startsWith(namespace)) {
      return key
    }
    return `${namespace}.${key}`
  }

  const normalFn = {
    t: (key) => {
      return getKey(key)
    },
  }

  if (!i18n) {
    return normalFn
  }

  const { t, ...methods } = i18n.global

  const tFn = (key, ...arg) => {
    if (!key) return ''
    return t(getKey(key), ...arg)
  }

  return {
    ...methods,
    t: tFn,
  }
}
