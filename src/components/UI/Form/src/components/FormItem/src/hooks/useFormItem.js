'use strict'

import { componentMap } from '../utils/componentMap'

export const useFormItem = (props) => {
  const { item } = props

  const component = componentMap.get(item.wType)

  // TODO
  const propName = item.formProp ? item.formProp.prop : ''
  const componentProps = item.componentProp || {}
  const componentEvents = item.componentEvent || {}

  return {
    component,

    propName,
    componentProps,
    componentEvents,
  }
}
