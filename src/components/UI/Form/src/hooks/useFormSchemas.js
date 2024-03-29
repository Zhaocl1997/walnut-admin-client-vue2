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
 *
 *      // @description See more on el-form-item `Attributes` (https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes)
 *      formProp: {
 *        prop: '',
 *        label: '',
 *        // ...
 *      },
 *
 *      // @description See more on different component `props`, since I enhanced some base components like `Input`/`Select` and more, look for more in each component simple docs.
 *      componentProp: {
 *        placeholder: '',
 *        max: '',
 *        clearable: true,
 *        multiple: true,
 *        // ...
 *      },
 *
 *      // @description See more on different component `events`.
 *      componentEvent: {
 *        click: onClick,
 *        change: onChange,
 *        // ...
 *      },
 *
 *      // @description See more on el-col `Attributes` (https://element-plus.gitee.io/#/zh-CN/component/layout#col-attributes)
 *      colProp: {
 *        span: 12,
 *        // ...
 *      },
 *
 *      // @description Below is custom props.
 *      // @description control form item visible or not
 *      visible: Boolean,
 *
 *      // @description control visible in Functional Component `Divider`, not that useful outside in the schemas
 *      foldVisible: Boolean
 *
 *      // @description Below is `Divider` unique props
 *      // @description `Divider` title
 *      title: String,
 *
 *      // @description arrow state
 *      fold: Boolean,
 *
 *      // @description default fold or not
 *      defaultFold: Boolean,
 *
 *      // @description how many items skipped to start fold
 *      countToFold: Number
 *
 *   },
 *   // ...
 *   // some similar structured objects
 * ]
 */

// TODO
export const useFormSchemas = (props) => {
  const state = reactive({
    formSchemas: [],
  })

  const onItemVisible = (item) => {
    return (
      (item.visible === undefined || item.visible === true) &&
      (item.foldVisible === undefined || item.foldVisible === true)
    )
  }

  watch(
    () => props.schemas,
    (val) => {
      state.formSchemas = val
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    ...toRefs(state),

    onItemVisible,
  }
}
