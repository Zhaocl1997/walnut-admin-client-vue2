'use strict'

import { ref, unref, nextTick, watchEffect } from 'vue'
import { appError } from '/@/utils/log'
import { isInSetup, getDynamicProps } from '/@/utils/vue'

export const useForm = (props) => {
  isInSetup()

  const formRef = ref(null)

  const getInstance = async () => {
    const instance = unref(formRef)
    if (!instance) {
      appError('useDialog instance is undefined!')
    }
    await nextTick()
    return instance
  }

  const register = (instance) => {
    formRef.value = instance

    watchEffect(() => {
      // props && instance.setProps(props)
      props && instance.setProps(props)
    })
  }

  const methods = {
    validate: async () => {
      return (await getInstance()).validate()
    },

    clearValidate: async () => {
      return (await getInstance()).clearValidate()
    },

    resetFields: async () => {
      return (await getInstance()).resetFields()
    },
  }

  return [register, methods]
}
