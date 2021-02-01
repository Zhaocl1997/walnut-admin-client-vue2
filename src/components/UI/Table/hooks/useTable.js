'use strict'

import { ref, unref, watch } from 'vue'
import { isInSetup } from '/@/utils/vue'

function getDynamicProps(props) {
  const ret = {}

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key])
  })

  return ret
}

export const useTable = (props) => {
  isInSetup()

  const tableRef = ref(null)

  const register = (instance) => {
    tableRef.value = instance
    props && instance.setProps(getDynamicProps(props))

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        deep: true,
        immediate: true,
      }
    )
  }

  return { register }
}
