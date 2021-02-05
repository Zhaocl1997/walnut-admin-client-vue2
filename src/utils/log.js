'use strict'

import pkg from '../../package.json'

const appName = pkg.name.toUpperCase()

export const appError = (msg) => {
  console.error(`[${appName}]`, msg)
}

export const appWarning = (msg) => {
  console.warn(`[${appName}]`, msg)
}
