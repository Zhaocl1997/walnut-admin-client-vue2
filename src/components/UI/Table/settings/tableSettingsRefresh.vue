<template>
  <el-tooltip
    effect="dark"
    :content="t('component.table.refresh.tooltip')"
    placement="top"
  >
    <w-icon pointer icon="refresh" width="20" @click="listFunc" />
  </el-tooltip>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useI18n } from '/@/hooks/useI18n.js'

  export default defineComponent({
    name: 'WTableSettingsRefresh',

    props: {
      listFunc: Function,
    },

    setup(props, { attrs }) {
      const { t } = useI18n()
      return {
        t,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
