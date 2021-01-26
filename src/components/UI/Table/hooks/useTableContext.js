'use strict'

import hooks from '/@/hooks'
import { TABLE_CONTEXT_KEYS } from '../constant'

export const useTableContext = () => {
  const { useContext } = hooks
  const { setContext, getContext } = useContext()

  const setContextProps = (value) => {
    setContext(TABLE_CONTEXT_KEYS.PROPS, value)
  }

  const getContextProps = () => {
    return getContext(TABLE_CONTEXT_KEYS.PROPS)
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
