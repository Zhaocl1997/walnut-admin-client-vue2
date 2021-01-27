<template>
  <el-table-column
    v-if="hasAction"
    key="action"
    :label="t('component.table.operation')"
    min-width="100"
    align="center"
    fixed="right"
  >
    <template #default="props">
      <slot name="action" :action="props" />
    </template>
  </el-table-column>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'
  import hooks from '/@/hooks'

  export default defineComponent({
    name: 'WTableColumnIndex',

    setup() {
      const { useI18n } = hooks
      const { t } = useI18n()
      const { getContextProps } = useTableContext()
      const { hasAction } = getContextProps()

      return {
        t,
        hasAction,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
