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
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableColumnSelect',

    props: {
      hasSelect: Boolean,
      selectable: Function,
      reserveSelection: Boolean,
    },

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
