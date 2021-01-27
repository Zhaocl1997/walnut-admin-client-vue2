'use strict'

import { ref, unref, watch, computed } from 'vue'
import { line2Camel } from 'easy-fns-ts'

export const useTableState = (props, field) => {
  const stateRef = ref(unref(props)[field])

  watch(
    () => unref(props)[field],
    (value) => {
      stateRef.value = value
    }
  )

  const getKey = line2Camel(`get-${field}`)
  const setKey = line2Camel(`set-${field}`)

  return {
    [getKey]: computed(() => {
      return unref(stateRef)
    }),
    [setKey]: (value) => {
      stateRef.value = value
    },
  }
}
