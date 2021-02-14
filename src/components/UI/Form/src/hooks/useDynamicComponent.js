'use strict'

import { getCurrentInstance, watch } from 'vue'
import { omit, filterObj, objectArrayUnique } from 'easy-fns-ts'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent.js'

import { FORM_TYPE } from '../types'
import wFormQuery from '../components/query.vue'
import wFormMock from '../components/mock.vue'
import wFormDivider from '../components/divider.vue'

/**
 * @description generate dynamic component
 * Problems
 * 1. Need to omit functional component like `Divider` from `FORM_TYPE`.
 * 2. Must make sure custom component is defined in `/@/components/UI/${custom-component-name}/index.vue` like the same structure.
 * 3. Vite actually warning dynamic import, I use `ignore` to hide the warning. If got any problem, remove the comment and see the link for more.
 * 4. When one page have two `w-form`, the first one has render problem (real big problem).
 * 5. There must be a better way!
 */

export const useDynamicComponent = (props) => {
  const instance = getCurrentInstance()

  const wFormComponents = {}

  const onInitialComponents = () => {
    onPropComponent()
    onSchemaComponent()
    onSetComponent()
  }

  const onSetComponent = () => {
    instance.type.components = wFormComponents
  }

  const onSchemaComponent = () => {
    const usedCompNameMaps = [
      ...new Set(props.value.schemas.map((i) => i.wType.toUpperCase())),
    ]
    const usedComps = filterObj(FORM_TYPE, usedCompNameMaps)
    const fnCompLists = onSchemaFuntionalComponent()
    const dynamicComponents = omit(usedComps, fnCompLists)

    Object.values(dynamicComponents).map((item) => {
      const name = `w${item}`
      const uri = `/@/components/UI/${item}/index.vue`
      wFormComponents[name] = createAsyncComponent(() =>
        import(/* @vite-ignore */ uri)
      )
    })
  }

  const onSchemaFuntionalComponent = () => {
    const fnCompMaps = ['Divider']
    const fnComps = props.value.schemas.filter((i) =>
      fnCompMaps.includes(i.wType)
    )
    const usedFnComps = objectArrayUnique(fnComps, 'wType')

    const fnCompLists = usedFnComps.map((i) => i.wType.toUpperCase())

    if (fnCompLists.includes('DIVIDER')) {
      wFormComponents.wFormDivider = wFormDivider
    }

    return fnCompLists
  }

  const onPropComponent = () => {
    if (props.value.query) {
      wFormComponents.wFormQuery = wFormQuery
    } else {
      wFormComponents.wFormQuery = () => {}
    }

    if (props.value.mock) {
      wFormComponents.wFormMock = wFormMock
    } else {
      wFormComponents.wFormMock = () => {}
    }
  }

  watch(
    [() => props.value.mock, () => props.value.query],
    () => {
      onPropComponent()
      onSetComponent()
    },
    {
      deep: true,
    }
  )

  return {
    onInitialComponents,
  }
}
