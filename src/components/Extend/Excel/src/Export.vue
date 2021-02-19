<template>
  <div class="u-inline-block">
    <div @click="openDialog">
      <slot></slot>
    </div>

    <w-dialog @hook="registerDialog" @confirm="onConfirm" @cancel="onCancel">
      <w-form
        v-model="formValue"
        style="width: 80%; margin: auto"
        @hook="registerForm"
      ></w-form>
    </w-dialog>
  </div>
</template>

<script>
  import { reactive, computed, defineComponent, nextTick } from 'vue'
  import wDialog, { useDialog } from '/@/components/UI/Dialog'
  import wForm, { useForm } from '/@/components/UI/Form'
  import { useExport } from './hooks/useExport'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WExcelExport',

    components: { wDialog, wForm },

    setup(props, { attrs }) {
      const { getContextProps } = useTableContext()
      const { data, headers } = getContextProps()

      let formValue = reactive({
        fileType: 'xlsx',
      })

      const [registerDialog, { openDialog, closeDialog }] = useDialog({
        title: '导出数据',
      })

      const [registerForm] = useForm({
        labelWidth: 'auto',

        schemas: [
          {
            wType: 'Input',
            formProp: {
              prop: 'fileName',
              label: '文件名称',
            },
            componentProp: {
              placeholder: '文件名称',
            },
          },
          {
            wType: 'Input',
            formProp: {
              prop: 'sheetName',
              label: 'sheet页名称',
            },
            componentProp: {
              placeholder: 'sheet页名称',
            },
          },
          {
            wType: 'Select',
            formProp: {
              prop: 'fileType',
              label: '文件类型',
            },
            componentProp: {
              placeholder: '文件类型',

              options: [
                {
                  value: 'xlsx',
                  label: '*.xlsx',
                },
                {
                  value: 'csv',
                  label: '*.csv',
                },
                {
                  value: 'txt',
                  label: '*.txt',
                },
                {
                  value: 'html',
                  label: '*.html',
                },
                {
                  value: 'xml',
                  label: '*.xml',
                },
              ],
            },
          },
        ],
      })

      const onConfirm = () => {
        useExport({
          fileName: formValue.fileName,
          fileType: formValue.fileType,
          sheetName: formValue.sheetName,
          data: data,
          headers: headers,
        })

        nextTick(() => {
          closeDialog()
        })
      }

      const onCancel = () => {
        closeDialog()
      }

      return {
        formValue,

        openDialog,
        onConfirm,
        onCancel,

        registerDialog,
        registerForm,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
