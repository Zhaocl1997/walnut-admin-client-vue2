'use strict'

import { reactive, toRefs, unref, watch } from 'vue'
import { TABLE_AXIOS_CONFIG } from '../types'

export const useTableData = (props, params) => {
  const state = reactive({
    tableData: [],
    tableTotal: 0,
  })

  watch(
    [() => unref(props).data, () => unref(props).total],
    ([data, total]) => {
      state.tableData = data
      state.tableTotal = total
    },
    {
      deep: true,
      immediate: true,
    }
  )

  const onInitTableData = async () => {
    if (!props.apiFn) {
      return
    }

    const res = await props.apiFn(unref(params))
    state.tableData = res[TABLE_AXIOS_CONFIG.DATA_FIELD]
    state.tableTotal = res[TABLE_AXIOS_CONFIG.TOTAL_FILED]
  }

  watch(
    () => unref(params),
    () => {
      onInitTableData()
    }
  )

  return {
    ...toRefs(state),
    onInitTableData,
  }
}
