'use strict'

import { reactive, toRefs, unref, watch, nextTick } from 'vue'
import { TABLE_AXIOS_CONFIG } from '../constant'

export const useTableData = (props, params) => {
  const state = reactive({
    tableData: [],
    tableTotal: 0,
  })

  const onInitTableData = async () => {
    const res = await props.apiFn(unref(params))

    state.tableData = res[TABLE_AXIOS_CONFIG.DATA_FIELD]
    state.tableTotal = res[TABLE_AXIOS_CONFIG.TOTAL_FILED]
  }

  watch(
    () => unref(params),
    () => {
      nextTick(() => {
        onInitTableData()
      })
    }
  )

  return {
    ...toRefs(state),
    onInitTableData,
  }
}
