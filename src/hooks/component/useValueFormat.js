'use strict'

import { isEmpty, isEqual, omit } from 'lodash-es'
import { computed, getCurrentInstance, reactive, toRefs, watch } from 'vue'

export const useValueFormat = () => {
  const instance = getCurrentInstance()
  const { props, attrs, emit } = instance
  const { valueFormat, valueType, valueKey, optionValue } = props

  const state = reactive({
    origin: undefined,
  })

  const getCanFormat = computed(() => {
    return props.multiple && valueFormat && !valueKey
  })

  // remove modelValue
  const getBindValue = computed(() => {
    return omit({ ...attrs, ...props }, 'modelValue')
  })

  // array to string
  const onFormatArrToStr = (val) => {
    if (val) {
      return val.join(valueFormat)
    } else {
      return undefined
    }
  }

  // string to array
  const onFormatStrToArr = (val) => {
    if (val) {
      return val.split(valueFormat)
    } else {
      return undefined
    }
  }

  const onSingleFormatType = (value) => {
    if (valueType === 'string') {
      return String(value)
    }

    if (valueType === 'number') {
      return Number(value)
    }
  }

  const onMultipleFormatType = (value) => {
    if (valueType === 'string') {
      return value.map(String)
    }

    if (valueType === 'number') {
      return value.map(Number)
    }
  }

  const onFormatValueType = (value) => {
    if (valueKey !== undefined) {
      // v-model value is object
      if (props.multiple) {
        return value.map((i) => {
          return {
            ...i,
            [optionValue]: onSingleFormatType(i[optionValue]),
          }
        })
      } else {
        return {
          ...value,
          [optionValue]: onSingleFormatType(value[optionValue]),
        }
      }
    } else {
      if (props.multiple) {
        return onMultipleFormatType(value)
      } else {
        return onSingleFormatType(value)
      }
    }
  }

  watch(
    () => state.origin,
    (val, oldVal) => {
      if (!isEqual(val, oldVal)) {
        emit(
          'update:modelValue',
          getCanFormat.value ? onFormatArrToStr(val) : val
        )
      }
    },
    {
      deep: true,
    }
  )

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      // initalize for multiple array
      if (isEmpty(val)) {
        if (props.multiple) {
          state.origin = []
          return
        }
      }

      // boolean
      if (typeof props.modelValue === 'boolean') {
        state.origin = props.modelValue
        return
      }

      // format
      if (!isEqual(val, oldVal)) {
        state.origin = onFormatValueType(
          getCanFormat.value ? onFormatStrToArr(val) : val
        )
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
