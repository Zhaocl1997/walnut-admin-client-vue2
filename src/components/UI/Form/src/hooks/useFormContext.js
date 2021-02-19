'use strict'

import { reactive, watch, toRefs, unref } from 'vue'
import hooks from '/@/hooks'
import { FORM_CONTEXT_KEYS } from '../types/context'

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
      () => unref(injectedProps),
      (val) => {
        state = val
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      // TODO
      ...toRefs(reactive(state)),
    }
  }

  return {
    setContextProps,
    getContextProps,
  }
}
