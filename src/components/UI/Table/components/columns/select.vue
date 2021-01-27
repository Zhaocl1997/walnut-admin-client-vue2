<template>
  <el-table-column
    v-if="hasSelect"
    key="select"
    type="selection"
    width="50"
    align="center"
    fixed="left"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
  ></el-table-column>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableColumnSelect',

    setup() {
      const { getContextProps } = useTableContext()
      const { hasSelect, selectable, reserveSelection } = getContextProps()

      return {
        hasSelect,
        selectable,
        reserveSelection,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
