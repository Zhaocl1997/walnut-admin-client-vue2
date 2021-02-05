'use strict'

import { reactive, watch, toRefs } from 'vue'
import hooks from '/@/hooks'
import { TABLE_CONTEXT_KEYS } from '../types'

export const useTableContext = () => {
  const { useContext } = hooks
  const { setContext, getContext } = useContext()

  const setContextProps = (value) => {
    setContext(TABLE_CONTEXT_KEYS.PROPS, value)
  }

  const getContextProps = () => {
    let state = reactive({})

    const injectedProps = getContext(TABLE_CONTEXT_KEYS.PROPS)

    watch(
      () => injectedProps,
      (val) => {
        state = val
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      ...toRefs(state),
    }
  }

  const setContextMethods = (value) => {
    setContext(TABLE_CONTEXT_KEYS.METHODS, value)
  }

  const getContextMethods = () => {
    return getContext(TABLE_CONTEXT_KEYS.METHODS)
  }

  return {
    setContextProps,
    getContextProps,

    setContextMethods,
    getContextMethods,
  }
}
