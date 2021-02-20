'use strict'

import { createAsyncComponent } from '/@/utils/factory/asyncComponent.js'
import { FORM_TYPE } from '/@/components/UI/Form/src/types'

/**
 * @description Generate all usable components through `FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `FORM_TYPE`
 */
const getAllComponentsByFormType = (types) => {
  const ret = {}
  Object.entries(types).map(([key, value]) => {
    const uri = `/@/components/UI/${value}/index.vue`
    ret[value] = createAsyncComponent(() => import(/* @vite-ignore */ uri))
  })
  return ret
}

/**
 * @description Form component map
 */
const componentMap = new Map()
const allComponents = getAllComponentsByFormType(FORM_TYPE)

/**
 * @description Common component
 */
Object.values(FORM_TYPE).map((value) => {
  componentMap.set(value, allComponents[value])
})

export { componentMap }
