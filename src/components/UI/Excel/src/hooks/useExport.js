'use strict'

import XLSX from 'xlsx'
import { unref, toRaw } from 'vue'
import { omit, except } from 'easy-fns-ts'

export const useExport = (prop) => {
  const {
    fileName = 'file',
    fileType = 'xlsx',
    sheetName = 'Sheet1',
    data,
    headers,
  } = prop
  const { utils, writeFile } = XLSX

  const useHeaders = (h) => {
    const headerProps = h.map((i) => i.prop)
    const headerCols = h.map((i) => {
      return { wpx: parseInt(i.width) }
    })
    const headerLabels = {}
    h.map((i) => (headerLabels[i.prop] = i.label))

    return {
      headerCols,
      headerProps,
      headerLabels,
    }
  }

  const useData = (d, headerProps) => {
    const exportData = []
    const oldData = [...toRaw(unref(d))]
    oldData.map((i) => {
      exportData.push(omit(i, except(Object.keys(i), headerProps)))
    })
    return { exportData }
  }

  const useXLSXExport = (headerLabels, exportData, headerCols) => {
    const workBook = utils.book_new()
    const jsonData = [headerLabels, ...exportData]
    const workSheet = utils.json_to_sheet(jsonData, {
      header: headerProps,
      skipHeader: true,
    })

    workSheet['!cols'] = headerCols

    utils.book_append_sheet(workBook, workSheet, sheetName)

    const fileNameWithExtension = `${fileName}.${fileType}`
    writeFile(workBook, fileNameWithExtension, { bookType: fileType })
  }

  const { headerCols, headerProps, headerLabels } = useHeaders(headers)
  const { exportData } = useData(data, headerProps)
  useXLSXExport(headerLabels, exportData, headerCols)
}
