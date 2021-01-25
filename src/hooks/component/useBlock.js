'use strict'

import { getCurrentInstance, computed } from 'vue'

export const useBlock = () => {
  const instance = getCurrentInstance()
  const { props } = instance

  const style = computed(() => {
    return { width: props.block ? '100%' : 'auto' }
  })

  return {
    style,
  }
}
