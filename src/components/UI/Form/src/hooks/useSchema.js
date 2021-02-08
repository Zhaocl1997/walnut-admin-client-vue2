'use strict'

import { reactive, toRefs, watch, toRaw } from 'vue'
import { findAllIndex } from 'easy-fns-ts'
import { FORM_TYPE } from '../types'

export const useFormSchema = (props) => {
  const state = reactive({
    insideSchemas: [],
    isFolded: false,
  })

  const onFormDefaultFold = () => {
    if (props.query && props.defaultFold) {
      state.isFolded = true
      state.insideSchemas = props.schemas.slice(0, props.countToFold)
    }
  }

  const onToggleFormFold = () => {
    state.isFolded = !state.isFolded

    if (!state.isFolded) {
      state.insideSchemas = props.schemas
    } else {
      state.insideSchemas = props.schemas.slice(0, props.countToFold)
    }
  }

  const onToggleDividerFold = (index, item) => {
    // change fold state
    props.schemas.splice(index, 1, {
      ...props.schemas[index],
      fold: !item.fold,
    })

    // find all divider index
    const allDividerIndex = findAllIndex(
      props.schemas,
      (item) => item.wType === FORM_TYPE.DIVIDER
    )

    // fold start index
    const startIndex = !!item.countToFold
      ? index + +item.countToFold + 1
      : index

    // fold end index
    const endIndex =
      allDividerIndex[allDividerIndex.indexOf(index) + 1] ||
      props.schemas.length

    for (let i = startIndex; i < endIndex; i++) {
      props.schemas.splice(i, 1, {
        ...props.schemas[i],
        foldShow: item.fold,
      })
    }

    onFormItemVisible(toRaw(props.schemas))
  }

  const onFormItemVisible = (val) => {
    // handle visible
    state.insideSchemas = val.filter((i) => {
      return (
        (i.show === undefined || i.show === true) &&
        (i.foldShow === undefined || i.foldShow === true)
      )
    })
  }

  // watch for computed schemas
  watch(
    () => props.schemas,
    (val) => {
      onFormItemVisible(val)

      // handle `Divider` default fold
      state.insideSchemas.map((item, index) => {
        if (item.wType === FORM_TYPE.DIVIDER && item.defaultFold) {
          onToggleDividerFold(index, item)
        }
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
