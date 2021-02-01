'use strict'

import pkg from '../../package.json'

export const appError = (msg) => {
  throw new Error(`[${pkg.name.toUpperCase()}] error: ${msg}`)
}
