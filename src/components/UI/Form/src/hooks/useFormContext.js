'use strict'

import { watch, ref, unref, reactive, toRefs } from 'vue'
import { useContext } from '/@/hooks/core/useContext'
import { FORM_CONTEXT_KEYS } from '../types/context'

// TODO
export const useFormContext = () => {
  const { setContext, getContext } = useContext()

  const setContextProps = (value) => {
    setContext(FORM_CONTEXT_KEYS, value)
  }

  const getContextProps = () => {
    const state = reactive({
      formContext: {},
    })

    const injectedProps = getContext(FORM_CONTEXT_KEYS)

    watch(
      () => injectedProps,
      (val) => {
        state.formContext = val
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return {
      ...toRefs(state.formContext),
    }
  }

  return {
    setContextProps,
    getContextProps,
  }
}
