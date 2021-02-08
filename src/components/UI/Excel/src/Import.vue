<template>
  <div class="u-inline-block">
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
      @change="onInputClick"
    />
    <div @click="onChooseFile">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { ref, unref, defineComponent } from 'vue'
  import XLSX from 'xlsx'

  export default defineComponent({
    name: 'WExcelImport',

    setup(props, { emit }) {
      const inputRef = ref(null)

      const { read, utils } = XLSX

      const getHeaders = (sheet) => {
        if (!sheet || !sheet['!ref']) return []
        const headers = []
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
          headers.push(hdr)
        }
        return headers
      }

      const getExcelData = (workbook) => {
        const excelData = []
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName]
          const header = getHeaders(worksheet)
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

      const readData = (rawFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = async (e) => {
            try {
              const data = e.target && e.target.result
              const workbook = read(data, { type: 'array' })
              // console.log(workbook);
              /* DO SOMETHING WITH workbook HERE */
              const excelData = getExcelData(workbook)
              console.log(excelData, 312312)

              emit('success', excelData)
              resolve()
            } catch (e) {
              reject(e)
              emit('error')
            }
          }
          reader.readAsArrayBuffer(rawFile)
        })
      }

      const upload = async (rawFile) => {
        const inputRefDom = unref(inputRef)
        if (inputRefDom) {
          // fix can't select the same excel
          inputRefDom.value = ''
        }
        await readData(rawFile)
      }

      const onChooseFile = () => {
        const inputRefDom = unref(inputRef)
        inputRefDom && inputRefDom.click()
      }

      const onInputClick = (e) => {
        const files = e && e.target.files
        const rawFile = files && files[0] // only setting files[0]
        if (!rawFile) return
        upload(rawFile)
      }

      return {
        inputRef,
        onChooseFile,
        onInputClick,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
