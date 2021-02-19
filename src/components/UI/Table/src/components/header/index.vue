<template>
  <w-table-buttons class="u-mb10" @create="emit('create')"></w-table-buttons>

  <div class="u-flex-aside">
    <w-table-title></w-table-title>

    <w-table-settings></w-table-settings>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  import wTableButtons from './buttons/index.vue'
  import wTableTitle from './title/index.vue'
  import wTableSettings from './settings/index.vue'

  export default defineComponent({
    name: 'WTableHeader',

    components: {
      wTableButtons,
      wTableTitle,
      wTableSettings,
    },

    emits: ['create'],

    setup(props, { emit }) {
      return {
        emit,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
