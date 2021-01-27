<template>
  <el-table-column
    v-if="hasIndex"
    key="index"
    :label="t('component.table.index')"
    type="index"
    width="60"
    align="center"
    fixed="left"
    :index="index"
  >
    <template #default="scope">
      <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
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
      const { hasIndex, index, pageNum, pageSize } = getContextProps()

      return {
        t,
        hasIndex,
        index,
        pageNum,
        pageSize,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
