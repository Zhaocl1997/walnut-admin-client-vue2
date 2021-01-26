'use strict'

import { inject, provide } from 'vue'

export const useContext = () => {
  const setContext = (key, ctx) => {
    provide(key, ctx)
  }

  const getContext = (key) => {
    return inject(key)
  }

  return {
    setContext,
    getContext,
  }
}
