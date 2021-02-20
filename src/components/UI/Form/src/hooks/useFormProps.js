'use strict'

import { ref, unref, computed } from 'vue'
import { deepMerge } from 'easy-fns-ts'

// TODO
export const useFormProps = (props) => {
  const formProps = ref(null)

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps) => {
    formProps.value = deepMerge(unref(formProps), newProps)
  }

  /**
   * @description get form props
   */
  const getProps = computed(() => {
    return { ...props, ...unref(formProps) }
  })

  return {
    setProps,
    getProps,
  }
}
