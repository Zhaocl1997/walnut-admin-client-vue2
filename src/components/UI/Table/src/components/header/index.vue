<template>
  <!-- <w-excel-import @success="onImportSuccess">
    <el-button>导入</el-button>
  </w-excel-import>

  <el-button @click="onExport">导出</el-button> -->
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
  import { transform, isObject } from 'lodash-es'

  import wTableButtons from './buttons/index.vue'
  import wTableTitle from './title/index.vue'
  import wTableSettings from './settings/index.vue'

  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { wExcelImport } from '/@/components/UI/Excel'
  import { omit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableHeader',

    components: { wTableButtons, wTableTitle, wTableSettings, wExcelImport },

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

        var filename = 'file.xlsx' //文件名称
        // var data = [
        //   [1, 2, 3],
        //   [true, false, null, 'sheetjs'],
        //   ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
        //   ['baz', null, 'qux'],
        // ] //数据，一定注意需要时二维数组

        const { headerKey, headerWith, headerLabel } = onInitialHeaders()

        const except = (a, b) => a.filter((i) => b.indexOf(i) === -1)

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
        writeFile(wb, filename) //导出Excel
      }

      const onImportSuccess = (excel) => {
        function replaceKeysDeep(obj, keysMap) {
          // keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
          return transform(obj, function (result, value, key) {
            // transform to a new object

            var currentKey = keysMap[key] || key // if the key is in keysMap use the replacement, if not use the original key

            result[currentKey] = isObject(value)
              ? replaceKeysDeep(value, keysMap)
              : value // if the key is an object run it through the inner function - replaceKeys
          })
        }

        const keysMap = {}
        toRaw(unref(headers)).map((i) => (keysMap[i.label] = i.prop))

        const newDF = []

        excel[0].results.map((item) => {
          newDF.push(replaceKeysDeep(item, keysMap))
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
        emit,
        onExport,
        onImportSuccess,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
