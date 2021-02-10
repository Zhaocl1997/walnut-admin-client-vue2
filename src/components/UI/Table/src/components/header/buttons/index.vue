<template>
  <el-space v-if="hasButtons" size="mini">
    <el-button size="medium" type="primary" @click="onCreate">{{
      t('component.table.buttons.create')
    }}</el-button>
    <el-button size="medium" @click="onImport">{{
      t('component.table.buttons.import')
    }}</el-button>
    <el-button size="medium" @click="onExport">{{
      t('component.table.buttons.export')
    }}</el-button>
  </el-space>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'
  import hooks from '/@/hooks'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableButtons',

    components: {},

    emits: ['create', 'import', 'export'],

    setup(props, { emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useTableContext()
      const { hasButtons } = getContextProps()

      const onCreate = () => {
        emit('create')
      }

      const onImport = () => {
        emit('import')
      }

      const onExport = () => {
        emit('export')
      }

      return {
        t,
        hasButtons,
        onCreate,
        onImport,
        onExport,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
