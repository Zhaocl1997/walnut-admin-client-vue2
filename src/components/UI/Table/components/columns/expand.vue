<template>
  <el-table-column
    v-if="hasExpand"
    key="expand"
    type="expand"
    width="50"
    align="center"
    fixed="left"
  >
    <template #default="props">
      <slot name="expand" :expand="props" />
    </template>
  </el-table-column>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnIndex',

    setup() {
      const { getContextProps } = useTableContext()
      const { hasExpand } = getContextProps()

      return {
        hasExpand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
