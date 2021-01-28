'use strict'

import { reactive, watch, computed, nextTick } from 'vue'

export const useTableHeader = (props, emit) => {
  const tableHeader = reactive([])

  const onFormatTableHeader = () => {
    props.headers.map((item, index) => {
      tableHeader.splice(index, 1, {
        ...item,
        visible: item.visible === false ? false : true, // checkbox
      })
    })
  }

  // v-model:headers
  watch(
    () => tableHeader,
    (val) => {
      nextTick(() => {
        emit('update:headers', val)
      })
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    onFormatTableHeader,
    tableHeader,
  }
}
