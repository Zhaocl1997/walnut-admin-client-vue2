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
  import hooks from '/@/hooks'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableSettingsRefresh',

    setup() {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useTableContext()
      const { listFunc } = getContextProps()

      return {
        t,
        listFunc,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
