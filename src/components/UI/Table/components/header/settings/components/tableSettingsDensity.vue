<template>
  <el-tooltip :content="t('component.table.density.tooltip')" placement="top">
    <div>
      <w-dropdown
        v-model="density"
        :options="options"
        trigger="click"
        @command="onDropdownCommand"
      >
        <template #default>
          <w-icon pointer icon="vamo" width="20" />
        </template>
      </w-dropdown>
    </div>
  </el-tooltip>
</template>

<script>
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import wDropdown from '/@/components/UI/Dropdown/index.vue'
  import hooks from '/@/hooks'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableSettingsDensity',

    components: { wDropdown },

    setup() {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextMethods } = useTableContext()
      const { setProps } = getContextMethods()

      const state = reactive({
        density: '',
      })

      const options = computed(() => {
        return [
          {
            value: '',
            label: t('component.table.density.default'),
          },
          {
            value: 'small',
            label: t('component.table.density.small'),
          },
          {
            value: 'mini',
            label: t('component.table.density.mini'),
          },
        ]
      })

      const onDropdownCommand = (command) => {
        setProps({
          size: command,
        })
      }

      return {
        t,
        options,
        ...toRefs(state),
        onDropdownCommand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
