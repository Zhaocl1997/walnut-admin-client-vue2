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
  import { useI18n } from '/@/hooks/useI18n.js'

  export default defineComponent({
    name: 'WTableSettingsDensity',

    components: { wDropdown },

    emits: ['density'],

    setup(props, { attrs, emit }) {
      const { t } = useI18n()

      const state = reactive({
        density: '0',
      })

      const options = computed(() => {
        return [
          {
            value: '0',
            label: t('component.table.density.default'),
          },
          {
            value: '1',
            label: t('component.table.density.medium'),
          },
          {
            value: '2',
            label: t('component.table.density.loose'),
          },
        ]
      })

      const onDropdownCommand = (command) => {
        emit('density', command)
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
