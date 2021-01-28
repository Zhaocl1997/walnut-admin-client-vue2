'use strict'

import { ref, unref, computed } from 'vue'
import { TABLE_AXIOS_CONFIG } from '../constant'

export const useTablePage = (props) => {
  const pageNum = ref(1)
  const pageSize = ref(10)

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
