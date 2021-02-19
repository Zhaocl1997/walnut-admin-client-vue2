'use strict'

import { camel2Line } from 'easy-fns-ts'
import { FORM_TYPE } from '../types'
import { basePrefix } from '/@/utils/prefix'

import wInput from '/@/components/UI/Input/index.vue'
import wInputNumber from '/@/components/UI/InputNumber/index.vue'
import wSelect from '/@/components/UI/Select/index.vue'
import wSwitch from '/@/components/UI/Switch/index.vue'

const componentMap = new Map()

export const getComponentName = (type) => {
  return `${basePrefix}${camel2Line(type)}`
}

componentMap.set(getComponentName(FORM_TYPE.INPUT), wInput)
componentMap.set(getComponentName(FORM_TYPE.INPUTNUMBER), wInputNumber)
componentMap.set(getComponentName(FORM_TYPE.SELECT), wSelect)
componentMap.set(getComponentName(FORM_TYPE.SWITCH), wSwitch)

export { componentMap }
