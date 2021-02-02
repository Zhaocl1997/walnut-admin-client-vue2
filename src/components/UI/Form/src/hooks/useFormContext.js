'use strict'

import { reactive, watch, toRefs } from 'vue'
import hooks from '/@/hooks'
import { FORM_CONTEXT_KEYS } from '../types'

export const useFormContext = () => {
  const { useContext } = hooks
  const { setContext, getContext } = useContext()

  const setContextProps = (value) => {
    setContext(FORM_CONTEXT_KEYS, value)
  }

  const getContextProps = () => {
    let state = reactive({})

    const injectedProps = getContext(FORM_CONTEXT_KEYS)

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

  return {
    setContextProps,
    getContextProps,
  }
}
