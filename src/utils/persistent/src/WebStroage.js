'use strict'

import { myEncryption } from '../../crypto'

export class WebStorage {
  constructor({ storage, prefixKey, encrypt }) {
    this.storage = storage
    this.prefixKey = prefixKey
    this.encrypt = encrypt
  }

  getKey(key) {
    return `${this.prefixKey}__${key}`.toUpperCase()
  }

  set(key, value, expire = 60 * 60 * 24 * 7) {
    const stringifiedData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    })
    const finalValue = this.encrypt
      ? myEncryption.encrypt(stringifiedData)
      : stringifiedData
    this.storage.setItem(this.getKey(key), finalValue)
  }

  get(key, defaultValue = null) {
    const item = this.storage.getItem(this.getKey(key))
    if (item) {
      try {
        const realValue = this.encrypt ? myEncryption.decrypt(item) : item
        const parsedData = JSON.parse(realValue)
        const { value, expire } = parsedData
        if (expire === null || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return defaultValue
      }
    }
    return defaultValue
  }

  remove(key) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}
