<template>
  <el-tooltip :content="t('component.table.screenfull')" placement="top">
    <w-screen-full width="20" target=".w-table" />
  </el-tooltip>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useI18n } from '/@/hooks/useI18n.js'
  import wScreenFull from '/@/components/Help/Screenfull/index.vue'

  export default defineComponent({
    name: 'WTableSettingsScreenFull',

    components: { wScreenFull },

    setup(props, { attrs }) {
      const { t } = useI18n()
      return {
        t,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
