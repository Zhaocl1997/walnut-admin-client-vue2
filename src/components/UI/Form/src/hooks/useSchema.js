'use strict'

import { reactive, toRefs, watch, nextTick } from 'vue'
import { findAllIndex } from 'easy-fns-ts'
import { FORM_TYPE } from '../types'

export const useFormSchema = (props) => {
  const state = reactive({
    schemas: [],
    isFolded: false,
  })

  const onFormDefaultFold = () => {
    if (props.defaultFold) {
      state.isFolded = true
      state.schemas = props.schema.slice(0, props.countToFold)
    }
  }

  const onToggleFormFold = () => {
    state.isFolded = !state.isFolded

    if (!state.isFolded) {
      state.schemas = props.schema
    } else {
      state.schemas = props.schema.slice(0, props.countToFold)
    }
  }

  const onToggleDividerFold = (index, item) => {
    state.schemas.splice(index, 1, {
      ...state.schemas[index],
      fold: !item.fold,
    })

    const allDividerIndex = findAllIndex(
      state.schemas,
      (item) => item.wType === FORM_TYPE.DIVIDER
    )

    const startIndex = !!item.countToFold
      ? index + +item.countToFold + 1
      : index

    const endIndex =
      allDividerIndex[allDividerIndex.indexOf(index) + 1] ||
      state.schemas.length

    for (let i = startIndex; i < endIndex; i++) {
      state.schemas.splice(i, 1, {
        ...state.schemas[i],
        foldShow: item.fold,
      })
    }
  }

  watch(
    () => props.schema,
    (val) => {
      // handle visible
      state.schemas = val.filter((i) => i.show === true || i.show === undefined)

      // handle `Divider` default fold
      nextTick(() => {
        state.schemas.map((item, index) => {
          if (item.wType === FORM_TYPE.DIVIDER && item.defaultFold) {
            onToggleDividerFold(index, item)
          }
        })
      })
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    ...toRefs(state),
    onFormDefaultFold,
    onToggleFormFold,
    onToggleDividerFold,
  }
}
