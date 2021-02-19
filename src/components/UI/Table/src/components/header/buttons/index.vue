<template>
  <el-space v-if="hasButtons" size="mini">
    <el-button size="medium" type="primary" @click="onCreate">{{
      t('component.table.buttons.create')
    }}</el-button>

    <w-excel-import @success="onImportSuccess">
      <el-button size="medium">{{
        t('component.table.buttons.import')
      }}</el-button>
    </w-excel-import>

    <w-excel-export>
      <el-button size="medium">{{
        t('component.table.buttons.export')
      }}</el-button>
    </w-excel-export>
  </el-space>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import hooks from '/@/hooks'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'
  import { wExcelImport, wExcelExport } from '/@/components/Extend/Excel'
  import { capsuleLog } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WTableButtons',

    components: { wExcelImport, wExcelExport },

    emits: ['create'],

    setup(props, { emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useTableContext()
      const { hasButtons } = getContextProps()

      const onCreate = () => {
        emit('create')
      }

      const onImportSuccess = (data) => {
        capsuleLog('[w-table-import]', 'Success', 'success')
        console.table(data)
      }

      return {
        t,
        hasButtons,
        onCreate,
        onImportSuccess,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
