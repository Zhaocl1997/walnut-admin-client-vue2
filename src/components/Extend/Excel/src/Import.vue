<template>
  <div class="u-inline-block">
    <div @click="openDialog">
      <slot></slot>
    </div>

    <w-dialog @hook="registerDialog" @confirm="onConfirm" @cancel="onCancel">
      <el-upload
        ref="upload"
        :action="action"
        :limit="1"
        accept=".xlsx, .xls"
        :auto-upload="false"
        drag
        @change="onFileChange"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>

        <template #tip>
          <div class="u-flex-aside">
            <div class="el-upload__tip" style="color: red">
              提示：仅允许导入“xlsx”格式文件！
            </div>

            <div class="el-upload__tip">
              <el-link type="info" @click="onDownloadTemplate">
                下载模板
              </el-link>
            </div>
          </div>
        </template>
      </el-upload>
    </w-dialog>
  </div>
</template>

<script>
  import { ref, unref, defineComponent, reactive } from 'vue'
  import wDialog, { useDialog } from '/@/components/UI/Dialog'
  import { useImport } from './hooks/useImport'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WExcelImport',

    components: { wDialog },

    props: {
      action: String,
    },

    emits: ['success'],

    setup(props, { emit }) {
      const { getContextProps } = useTableContext()
      const { headers } = getContextProps()

      const [registerDialog, { openDialog, closeDialog }] = useDialog({
        title: '导入数据',
        width: '40%',
      })

      let rawData = reactive({})

      const onConfirm = async () => {
        const d = await useImport({
          raw: rawData,
          headers: headers,
        })
        emit('success', d)
      }

      const onCancel = () => {
        closeDialog()
      }

      const onFileChange = async (file, fileList) => {
        rawData = file.raw
      }

      const onDownloadTemplate = () => {}

      return {
        registerDialog,

        openDialog,

        onConfirm,
        onCancel,
        onFileChange,
        onDownloadTemplate,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
