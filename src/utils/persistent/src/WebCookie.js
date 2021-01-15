'use strict'

import { myEncryption } from '../../crypto'

export class WebCookie {
  constructor({ prefixKey, encrypt }) {
    this.prefixKey = prefixKey
    this.encrypt = encrypt
  }

  getKey(key) {
    return `${this.prefixKey}__${key}`.toUpperCase()
  }

  set(key, value, expire = 60 * 60 * 24 * 7, path = '/') {
    value = JSON.stringify(value)
    const finalValue = this.encrypt ? myEncryption.encrypt(value) : value
    const exp = new Date()
    exp.setTime(exp.getTime() + expire * 1000)
    document.cookie = `${this.getKey(key)}=${escape(
      finalValue
    )};path=${path};expires=${exp.toUTCString()}`
  }

  get(key, defaultValue = null) {
    const arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].split('=')

      if (arr2[0] === this.getKey(key)) {
        let result = null
        const val = arr2[1]

        if (this.encrypt && val) {
          result = myEncryption.decrypt(unescape(val))
          try {
            return JSON.parse(result)
          } catch (e) {
            return val
          }
        }
        return JSON.parse(unescape(val))
      }
    }
    return defaultValue
  }

  remove(key) {
    this.set(key, 1, -1)
  }

  clear() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g)
    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`
      }
    }
  }
}
