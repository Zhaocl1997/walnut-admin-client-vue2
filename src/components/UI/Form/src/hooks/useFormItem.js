'use strict'

import { getCurrentInstance, ref, watch } from 'vue'

import wFormDivider from '../components/divider.vue'

import { componentMap, getComponentName } from '../utils/componentMap'

export const useFormItem = (props) => {
  const { item, comp } = props
  const formItem = getCurrentInstance()

  let tag = {}

  // TODO
  const propName = item.formProp ? item.formProp.prop : ''
  const componentName = getComponentName(item.wType)

  const componentProps = item.componentProp || {}
  const componentEvents = item.componentEvent || {}

  const getComp = (componentName) => {
    const ret = {}

    if (item.wType === 'Divider') {
      ret['w-form-divider'] = wFormDivider
    } else {
      ret[componentName] = componentMap.get(componentName)
    }

    return ret
  }

  formItem.type.components = getComp(componentName)
  tag = componentMap.get(componentName)

  return {
    tag,
    propName,
    componentName,
    componentProps,
    componentEvents,
  }
}
