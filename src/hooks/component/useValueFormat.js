'use strict'

import { isEqual, omit } from 'lodash-es'
import { computed, getCurrentInstance, reactive, toRefs, watch } from 'vue'

export const useValueFormat = () => {
  const instance = getCurrentInstance()
  const { props, attrs, emit } = instance
  const { valueFormat, valueKey } = props

  const state = reactive({
    origin: [],
  })

  const getCanFormat = computed(() => {
    return props.multiple && valueFormat && !valueKey
  })

  // remove modelValue
  const getBindValue = computed(() => {
    return omit({ ...attrs, ...props }, 'modelValue')
  })

  const format = (val) => {
    if (val) {
      return val.join(valueFormat)
    } else {
      return undefined
    }
  }

  const deformat = (val) => {
    if (val) {
      return val.split(valueFormat)
    } else {
      return undefined
    }
  }

  watch(
    () => state.origin,
    (val, oldVal) => {
      if (!isEqual(val, oldVal) && oldVal) {
        emit('update:modelValue', getCanFormat.value ? format(val) : val)
      }
    },
    {
      deep: true,
    }
  )

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (!isEqual(val, oldVal)) {
        state.origin = getCanFormat.value ? deformat(val) : val
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    ...toRefs(state),
    getBindValue,
  }
}
