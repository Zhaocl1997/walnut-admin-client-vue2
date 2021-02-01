'use strict'

import { getCurrentInstance } from 'vue'
import { appError } from './log'

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    appError('Hook can only be used in `setup` function!')
  }
}
