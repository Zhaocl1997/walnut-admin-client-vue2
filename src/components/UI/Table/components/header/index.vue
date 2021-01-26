<template>
  <div class="u-flex-aside">
    <w-table-title></w-table-title>

    <w-table-settings></w-table-settings>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import wTableTitle from './title/index.vue'
  import wTableSettings from './settings/index.vue'

  export default defineComponent({
    name: 'WTableHeader',

    components: { wTableTitle, wTableSettings },

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
