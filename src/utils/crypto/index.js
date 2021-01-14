'use strict'

import CryptoJS from 'crypto-js'

// CryptoJS supports the following modes:
// · CBC (the default)
// · CFB
// · CTR
// · OFB
// · ECB

// CryptoJS supports the following padding schemes:
// · Pkcs7 (the default)
// · Iso97971
// · AnsiX923
// · Iso10126
// · ZeroPadding
// · NoPadding

export class Encryption {
  constructor(opt) {
    const { key, iv, method = 'AES', mode = 'CBC', padding = 'Pkcs7' } = opt

    this.key = CryptoJS.enc.Hex.parse(key)
    this.iv = CryptoJS.enc.Hex.parse(iv)

    this.validateMethod(method)
    this.method = CryptoJS[method]

    this.validateMode(mode)
    this.mode = mode

    this.validatePadding(padding)
    this.padding = padding

    this.encrypt = this.encrypt
    this.decrypt = this.decrypt
  }

  validateMethod(name) {
    const methodLists = ['AES', 'DES', 'TripleDES', 'Rabbit', 'RC4']
    if (name && !methodLists.includes(name)) {
      throw new Error('[Encryption Module] Invalid method!')
    }
  }

  validateMode(name) {
    const modeLists = ['CBC', 'CFB', 'CTR', 'OFB', 'ECB']
    if (name && !modeLists.includes(name)) {
      throw new Error('[Encryption Module] Invalid mode!')
    }
  }

  validatePadding(name) {
    const paddingLists = [
      'Pkcs7',
      'Iso97971',
      'AnsiX923',
      'Iso10126',
      'ZeroPadding',
      'NoPadding',
    ]
    if (name && !paddingLists.includes(name)) {
      throw new Error('[Encryption Module] Invalid padding!')
    }
  }

  encrypt(value) {
    if (!value) {
      return
    }
    const encrypted = this.method.encrypt(JSON.stringify(value), this.key, {
      iv: this.iv,
      mode: CryptoJS.mode[this.mode],
      padding: CryptoJS.pad[this.padding],
    })
    return encrypted.toString()
  }

  decrypt(encrypted) {
    if (!encrypted) {
      return
    }
    const decrypted = this.method.decrypt(encrypted, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode[this.mode],
      padding: CryptoJS.pad[this.padding],
    })
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  }
}

const KP = {
  key: '000102030405060708090a0b0c0d0e0f',
  iv: '101112131415161718191a1b1c1d1e1f',
}

export const myEncryption = new Encryption(KP)
