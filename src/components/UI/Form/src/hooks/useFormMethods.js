'use strict'

export const useFormMethods = (formRef, customMethods) => {
  const formMethods = {
    ...customMethods,

    validate: async () => {
      return await formRef.value.validate()
    },

    clearValidate: async () => {
      return await formRef.value.clearValidate()
    },

    resetFields: async () => {
      return await formRef.value.resetFields()
    },
  }

  return {
    formMethods,
  }
}
