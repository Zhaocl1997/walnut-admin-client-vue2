'use strict'

import pkg from '../../package.json'
import { mode } from './mode'

const appName = pkg.name.toUpperCase().replace('-', '__')
const appVersion = pkg.version

const appPrefix = `${appName}__${appVersion}__${mode}`
const localStoragePrefix = `LOCAL`
const sessionStoragePrefix = `SESSION`
const cookiePrefix = `COOKIEs`
const classPrefix = `${appName.slice(0, 1).toLowerCase()}`

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
  return `${classPrefix}-${compName}`
}
