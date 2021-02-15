'use strict'

import { reactive, toRefs, watch, toRaw } from 'vue'
import { findAllIndex } from 'easy-fns-ts'
import { FORM_TYPE } from '../types'

/**
 * Form `Schemas` structure
 * Since not using ts, type suppport won't be nice.
 * [
 *   {
 *      wType: '',
 *      formProp: {
 *        prop: '',
 *        label: '',
 *        // ...
 *        // See more on el-form-item `Attributes` (https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes)
 *      },
 *      componentProp: {
 *        placeholder: '',
 *        max: '',
 *        clearable: true,
 *        multiple: true,
 *        // ...
 *        // See more on different component `props`, since I enhanced some base components like `Input`/`Select` and more, look for more in each component simple docs.
 *      },
 *      componentEvent: {
 *        click: onClick,
 *        change: onChange,
 *        // ...
 *        // See more on different component `events`.
 *      },
 *      colProp: {
 *        span: 12,
 *        // ...
 *        // See more on el-col `Attributes` (https://element-plus.gitee.io/#/zh-CN/component/layout#col-attributes)
 *      },
 *
 *      // This is custom props, I will show you all below.
 *      customProp: {
 *        // control form item visible or not
 *        show: false,
 *      }
 *   },
 *   // ...
 *   // some similar structured objects
 * ]
 */

// TODO
export const useFormSchemas = (props) => {
  const state = reactive({
    insideSchemas: [],
    isFolded: false,
  })

  const onFormDefaultFold = () => {
    if (props.value.query && props.value.defaultFold) {
      state.isFolded = true
      state.insideSchemas = props.value.schemas.slice(
        0,
        props.value.countToFold
      )
    }
  }

  const onToggleFormFold = () => {
    state.isFolded = !state.isFolded

    if (!state.isFolded) {
      state.insideSchemas = props.value.schemas
    } else {
      state.insideSchemas = props.value.schemas.slice(
        0,
        props.value.countToFold
      )
    }
  }

  const onToggleDividerFold = (index, item) => {
    // change fold state
    props.value.schemas.splice(index, 1, {
      ...props.value.schemas[index],
      fold: !item.fold,
    })

    // find all divider index
    const allDividerIndex = findAllIndex(
      props.value.schemas,
      (item) => item.wType === FORM_TYPE.DIVIDER
    )

    // fold start index
    const startIndex = !!item.countToFold
      ? index + +item.countToFold + 1
      : index

    // fold end index
    const endIndex =
      allDividerIndex[allDividerIndex.indexOf(index) + 1] ||
      props.value.schemas.length

    for (let i = startIndex; i < endIndex; i++) {
      props.value.schemas.splice(i, 1, {
        ...props.value.schemas[i],
        foldShow: item.fold,
      })
    }

    onFormItemVisible(toRaw(props.value.schemas))
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
    () => props.value.schemas,
    (val) => {
      if (val) {
        onFormItemVisible(val)

        // handle `Divider` default fold
        state.insideSchemas.map((item, index) => {
          if (item.wType === FORM_TYPE.DIVIDER && item.defaultFold) {
            onToggleDividerFold(index, item)
          }
        })
      }
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
