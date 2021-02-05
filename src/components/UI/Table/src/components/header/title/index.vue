<template>
  <div class="w-table__title">
    <w-title v-if="tableTitle" show-left :content="tableHelp">
      {{ tableTitle }}
    </w-title>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import wTitle from '/@/components/Help/Title/index.vue'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableTitle',

    components: { wTitle },

    setup() {
      const { getContextProps } = useTableContext()
      const { tableTitle, tableHelp } = getContextProps()

      return {
        tableTitle,
        tableHelp,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
