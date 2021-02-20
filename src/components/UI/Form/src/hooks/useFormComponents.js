'use strict'

import { getCurrentInstance } from 'vue'

import FormItem from '../components/FormItem'
import FormDivider from '../components/Functional/Divider.vue'
import FormQuery from '../components/Functional/Query.vue'
import FormMock from '../components/Functional/Mock.vue'

// TODO
/**
 * @description generate global form component
 */
export const useFormComponents = (props) => {
  const instance = getCurrentInstance()

  const components = {
    FormItem,
    FormDivider,
    FormQuery,
    FormMock,
  }

  instance.type.components = components

  return {}
}
