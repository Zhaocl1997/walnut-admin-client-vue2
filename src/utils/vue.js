'use strict'

import { getCurrentInstance, unref } from 'vue'
import { appError } from './log'

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    appError('Hook can only be used in `setup` function!')
  }
}

export const getDefaultSlotText = (slots) => {
  return slots.default && slots.default()[0].children
}

export const getDynamicProps = (props) => {
  const ret = {}

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key])
  })

  return ret
}
