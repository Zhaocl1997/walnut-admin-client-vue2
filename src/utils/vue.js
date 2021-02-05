'use strict'

import { getCurrentInstance } from 'vue'
import { appError } from './log'

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    appError('Hook can only be used in `setup` function!')
  }
}

export const getDefaultSlotText = (slots) => {
  return slots.default && slots.default()[0].children
}
