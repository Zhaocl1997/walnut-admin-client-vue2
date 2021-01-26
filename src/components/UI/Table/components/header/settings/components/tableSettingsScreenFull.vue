<template>
  <el-tooltip :content="t('component.table.screenfull')" placement="top">
    <w-screen-full width="20" target=".w-table" />
  </el-tooltip>
</template>

<script>
  import { defineComponent } from 'vue'
  import hooks from '/@/hooks'
  import wScreenFull from '/@/components/Help/Screenfull/index.vue'

  export default defineComponent({
    name: 'WTableSettingsScreenFull',

    components: { wScreenFull },

    setup() {
      const { useI18n } = hooks
      const { t } = useI18n()
      return {
        t,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
