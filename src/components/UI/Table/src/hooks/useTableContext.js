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
    const state = reactive({
      tableContext: {},
    })

    const injectedProps = getContext(TABLE_CONTEXT_KEYS.PROPS)

    watch(
      () => injectedProps,
      (val) => {
        state.tableContext = val
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      ...toRefs(state.tableContext),
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
