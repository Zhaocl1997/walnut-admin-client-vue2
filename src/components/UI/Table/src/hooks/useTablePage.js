'use strict'

import { ref, unref, computed } from 'vue'
import { TABLE_AXIOS_CONFIG } from '../types'

export const useTablePage = (props) => {
  const pageNum = ref(props.pageNum)
  const pageSize = ref(props.pageSize)

  const apiFnPageParams = computed(() => {
    return {
      [TABLE_AXIOS_CONFIG.PAGENUM_FIELD]: unref(pageNum),
      [TABLE_AXIOS_CONFIG.PAGESIZE_FIELD]: unref(pageSize),
    }
  })

  return {
    pageNum,
    pageSize,
    apiFnPageParams,
  }
}
