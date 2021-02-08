'use strict'

import { reactive, ref, unref } from 'vue'
import { appError } from '/@/utils/log'
import { isInSetup } from '/@/utils/vue'

const dialogVisible = reactive({})

export const useDialog = (props) => {
  isInSetup()

  const uidRef = ref('')
  const dialogRef = ref(null)

  const register = (uid, methods) => {
    dialogVisible[uid] = false
    uidRef.value = uid
    dialogRef.value = methods
    methods.setDialogProps(props)
  }

  const getInstance = () => {
    const instance = unref(dialogRef)
    if (!instance) {
      appError('useDialog instance is undefined!')
    }
    return instance
  }

  const openDialog = () => {
    getInstance().toggleDialogVisible(true)
  }

  const closeDialog = () => {
    getInstance().toggleDialogVisible(false)
  }

  const methods = {
    openDialog,
    closeDialog,
  }

  return [register, methods]
}
