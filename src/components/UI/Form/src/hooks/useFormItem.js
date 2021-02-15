'use strict'

import { getCurrentInstance } from 'vue'

export const useFormItem = (props) => {
  const { item, component } = props
  const formItem = getCurrentInstance()

  // TODO
  const propName = item.formProp ? item.formProp.prop : ''
  const componentName =
    'w-' +
    item.wType.substr(0, 1).toLowerCase() +
    item.wType.substr(1, item.wType.length)
  const componentProps = item.componentProp || {}
  const componentEvents = item.componentEvent || {}

  formItem.type.components = component

  return {
    propName,
    componentName,
    componentProps,
    componentEvents,
  }
}
