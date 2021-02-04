'use strict'

import { omit, filterObj } from 'easy-fns-ts'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent.js'

import { FORM_TYPE } from './types'
import wFormQuery from './components/query.vue'
import wFormMock from './components/mock.vue'
import wFormDivider from './components/divider.vue'

/**
 * @description generate dynamic component
 * Problems
 * 1. Need to omit functional component like `Divider` from `FORM_TYPE`.
 * 2. Must make sure custom component is defined in `/@/components/UI/${custom-component-name}/index.vue` like the same structure.
 * 3. Vite actually warning dynamic import, I use `ignore` to hide the warning. If got any problem, remove the comment and see the link for more.
 * 4. When one page have two `w-form`, the first one has render problem (real big problem).
 * 5. There must be a better way!
 */

export const resolveDynamicComponent = (schemas) => {
  const usedCompNameMaps = [
    ...new Set(schemas.map((i) => i.wType.toUpperCase())),
  ]

  const usedComps = filterObj(FORM_TYPE, usedCompNameMaps)

  const functionalComps = ['DIVIDER']

  const dynamicComponents = omit(usedComps, functionalComps)

  const ret = {
    wFormQuery,
    wFormMock,
    wFormDivider,
  }

  Object.values(dynamicComponents).map((item) => {
    const name = `w${item}`
    const uri = `/@/components/UI/${item}/index.vue`
    ret[name] = createAsyncComponent(() => import(/* @vite-ignore */ uri))
  })
  return ret
}
