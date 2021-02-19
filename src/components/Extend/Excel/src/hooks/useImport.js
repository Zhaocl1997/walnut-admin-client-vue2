'use strict'

import XLSX from 'xlsx'
import { unref, toRaw } from 'vue'
import { deepReplaceKey } from 'easy-fns-ts'

export const useImport = (prop) => {
  const { raw, headers } = prop

  const { read, utils } = XLSX

  const getHeaderLabels = (sheet) => {
    if (!sheet || !sheet['!ref']) return []

    const headerLabels = []
    // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
    const range = utils.decode_range(sheet['!ref'])

    const R = range.s.r

    /* start in the first row */
    for (let C = range.s.c; C <= range.e.c; ++C) {
      /* walk every column in the range */
      const cell = sheet[utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
      if (cell && cell.t) hdr = utils.format_cell(cell)
      headerLabels.push(hdr)
    }

    return headerLabels
  }

  const getHeaderKeysMap = (headers) => {
    const keysMap = {}
    toRaw(unref(headers)).map((i) => (keysMap[i.label] = i.prop))
    return keysMap
  }

  const getExcelData = (workbook) => {
    const excelData = []
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName]
      const header = getHeaderLabels(worksheet)
      const results = utils.sheet_to_json(worksheet)
      excelData.push({
        header,
        results,
        meta: {
          sheetName,
        },
      })
    }
    return excelData
  }

  const getImportedData = (excelData, keysMap) => {
    const data = excelData[0].results
    const ret = []

    data.map((item) => {
      ret.push(deepReplaceKey(item, keysMap))
    })

    return ret
  }

  const readRawData = (rawFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target && e.target.result
          const workbook = read(data, { type: 'array' })
          const excelData = getExcelData(workbook)
          const keysMap = getHeaderKeysMap(headers)
          const resultData = getImportedData(excelData, keysMap)
          resolve(resultData)
        } catch (e) {
          reject(e)
        }
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  return readRawData(raw)
}
