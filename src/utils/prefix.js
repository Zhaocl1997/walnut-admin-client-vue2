'use strict'

import pkg from '../../package.json'
import { mode } from './mode'

export const appName = pkg.name.toUpperCase().replace('-', '__')
export const appVersion = pkg.version

export const appPrefix = `${appName}__${appVersion}__${mode}`
export const localStoragePrefix = `LOCAL`
export const sessionStoragePrefix = `SESSION`
export const cookiePrefix = `COOKIES`
export const basePrefix = `${appName.slice(0, 1).toLowerCase()}`

export const getlsPrefix = () => {
  return `${appPrefix}__${localStoragePrefix}`
}

export const getssPrefix = () => {
  return `${appPrefix}__${sessionStoragePrefix}`
}

export const getckPrefix = () => {
  return `${appPrefix}__${cookiePrefix}`
}

export const getClsPrefix = (compName) => {
  return `${basePrefix}-${compName}`
}
