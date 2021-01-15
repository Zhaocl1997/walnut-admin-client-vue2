'use strict'

import { Encryption } from './crypto'

const createEncryption = (opt) => {
  return new Encryption(opt)
}

const cryptOptions = {
  key: '000102030405060708090a0b0c0d0e0f',
  iv: '101112131415161718191a1b1c1d1e1f',
  method: 'AES',
  mode: 'CBC',
  padding: 'Pkcs7',
}
export const myEncryption = createEncryption(cryptOptions)
