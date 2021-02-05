<template>
  <w-table-columns-select></w-table-columns-select>

  <w-table-columns-index></w-table-columns-index>

  <w-table-columns-expand>
    <template #expand="{ expand }">
      <slot name="expand" :expand="expand"></slot>
    </template>
  </w-table-columns-expand>

  <w-table-columns-action>
    <template #action="{ action }">
      <slot name="action" :action="action"></slot>
    </template>
  </w-table-columns-action>
</template>

<script>
  import { defineComponent } from 'vue'
  import wTableColumnsSelect from './select.vue'
  import wTableColumnsIndex from './index.vue'
  import wTableColumnsExpand from './expand.vue'
  import wTableColumnsAction from './action.vue'

  export default defineComponent({
    name: 'WTableColumns',

    components: {
      wTableColumnsSelect,
      wTableColumnsIndex,
      wTableColumnsExpand,
      wTableColumnsAction,
    },

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
