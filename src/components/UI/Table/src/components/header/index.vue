<template>
  <w-excel-import @success="onImportSuccess">
    <el-button>导入</el-button>
  </w-excel-import>

  <!-- <el-button @click="onExport">导出</el-button> -->
  <w-excel-export :data="data" :headers="headers">
    <el-button>导出</el-button>
  </w-excel-export>

  <w-table-buttons
    class="u-mb10"
    @create="emit('create')"
    @import="emit('import')"
    @export="emit('export')"
  ></w-table-buttons>

  <div class="u-flex-aside">
    <w-table-title></w-table-title>

    <w-table-settings></w-table-settings>
  </div>
</template>

<script>
  import { defineComponent, unref, toRaw } from 'vue'
  import XLSX from 'xlsx'

  import wTableButtons from './buttons/index.vue'
  import wTableTitle from './title/index.vue'
  import wTableSettings from './settings/index.vue'

  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { wExcelImport, wExcelExport } from '/@/components/UI/Excel'
  import { omit, deepReplaceKey, except } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableHeader',

    components: {
      wTableButtons,
      wTableTitle,
      wTableSettings,
      wExcelImport,
      wExcelExport,
    },

    emits: ['create', 'import', 'export'],

    setup(props, { emit }) {
      const { getContextProps, getContextMethods } = useTableContext()
      const { data, headers } = getContextProps()
      const { setProps } = getContextMethods()

      const onInitialHeaders = () => {
        const h = toRaw(unref(headers))
        const headerKey = h.map((i) => i.prop)
        const headerWith = h.map((i) => {
          return { wpx: parseInt(i.width) }
        })
        const headerLabel = {}

        h.map((i) => (headerLabel[i.prop] = i.label))

        return {
          headerKey,
          headerWith,
          headerLabel,
        }
      }

      const onExport = () => {
        const { utils, writeFile } = XLSX

        var filename = 'file.csv' //文件名称
        // var data = [
        //   [1, 2, 3],
        //   [true, false, null, 'sheetjs'],
        //   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
        //   ['baz', null, 'qux'],
        // ] //数据，一定注意需要时二维数组

        const { headerKey, headerWith, headerLabel } = onInitialHeaders()

        const getData = (headerKey) => {
          const newData = []
          const oldData = [...toRaw(unref(data))]
          oldData.map((i) => {
            newData.push(omit(i, except(Object.keys(i), headerKey)))
          })

          return newData
        }

        var ws_name = 'Sheet1' //Excel第一个sheet的名称
        var wb = utils.book_new()

        const nData = [...getData(headerKey)]

        var workBook = utils.json_to_sheet([headerLabel, ...nData], {
          header: headerKey,
          skipHeader: true,
        })

        workBook['!cols'] = headerWith

        utils.book_append_sheet(wb, workBook, ws_name) //将数据添加到工作薄
        writeFile(wb, filename, { bookType: 'csv' }) //导出Excel
      }

      const onImportSuccess = (excel) => {
        const keysMap = {}
        toRaw(unref(headers)).map((i) => (keysMap[i.label] = i.prop))

        const newDF = []

        excel[0].results.map((item) => {
          newDF.push(deepReplaceKey(item, keysMap))
        })

        console.log(newDF)

        const newData = [...toRaw(unref(data))]

        newDF.map((i) => {
          newData.unshift({ ...i })
        })

        setProps({
          data: newData,
        })
      }

      return {
        data,
        headers,
        emit,
        onExport,
        onImportSuccess,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
