<template>
  <el-popover placement="bottom" trigger="click" popper-class="w-table-popover">
    <template #reference>
      <div class="u-inline">
        <el-tooltip
          effect="dark"
          :content="t('component.table.settings.tooltip')"
          placement="top"
        >
          <w-icon pointer icon="settings" width="20" />
        </el-tooltip>
      </div>
    </template>

    <!-- fixed left -->
    <!-- eslint-disable -->
    <w-table-settings-rows-group :type="TABLE_GROUP_TYPE.LEFT">
      <el-space size="mini">
        <w-help-message
          icon="el-icon-info"
          placement="left"
          :content="t('component.table.settings.fixedLeftHelp')"
        ></w-help-message>

        <span>{{ t('component.table.settings.fixedLeft') }}</span>
      </el-space>
    </w-table-settings-rows-group>

    <!-- common -->
    <!-- eslint-disable -->
    <w-table-settings-rows-group :type="TABLE_GROUP_TYPE.COMMON">
      <el-space wrap size="small">
        <w-help-message
          icon="el-icon-info"
          placement="left"
          :content="t('component.table.settings.fixedUnsetHelp')"
        ></w-help-message>

        <span>{{ t('component.table.settings.fixedUnset') }}</span>

        <el-checkbox
          class="w-table__settings-checkall"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="onCheckAllChange"
        >
          {{ t('component.table.settings.checkAll') }}
        </el-checkbox>

        <el-button size="mini" type="text" @click="onReset">
          {{ t('component.table.settings.reset') }}
        </el-button>
      </el-space>
    </w-table-settings-rows-group>

    <!-- fixed right -->
    <!-- eslint-disable -->
    <w-table-settings-rows-group :type="TABLE_GROUP_TYPE.RIGHT">
      <el-space size="mini">
        <w-help-message
          icon="el-icon-info"
          placement="left"
          :content="t('component.table.settings.fixedRightHelp')"
        ></w-help-message>

        <span>{{ t('component.table.settings.fixedRight') }}</span>
      </el-space>
    </w-table-settings-rows-group>
  </el-popover>
</template>

<script>
  import {
    reactive,
    defineComponent,
    watch,
    toRefs,
    onMounted,
    nextTick,
    unref,
  } from 'vue'
  import { deepClone } from 'easy-fns-ts'

  import hooks from '/@/hooks'
  import wHelpMessage from '/@/components/Help/HelpMessage/index.vue'

  import wTableSettingsRowsGroup from './tableSettingsRowsGroup.vue'
  import { TABLE_GROUP_TYPE } from '/@/components/UI/Table/constant'
  import { useTableContext } from '/@/components/UI/Table/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableSettingsRows',

    components: { wHelpMessage, wTableSettingsRowsGroup },

    setup(props, { attrs, emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useTableContext()
      const { headers } = getContextProps()

      const state = reactive({
        checkAll: true,
        isIndeterminate: false,
        cachedHeaders: [],
      })

      // change checkAll state
      watch(
        () => headers,
        (val) => {
          const visibleItems = val.filter((i) => i.visible)

          if (Array.isArray(visibleItems) && visibleItems.length !== 0) {
            if (visibleItems.length === headers.length) {
              state.isIndeterminate = false
              state.checkAll = true
            } else {
              state.isIndeterminate = true
              state.checkAll = false
            }
          }
        },
        {
          deep: true,
          immediate: true,
        }
      )

      // checkAll or not
      const onCheckAllChange = (val) => {
        headers.map((item, index) => {
          // eslint-disable-next-line
          headers.splice(index, 1, {
            ...headers[index],
            visible: val,
          })
        })
      }

      // reset to initial state
      const onReset = () => {
        state.cachedHeaders.map((item, index) => {
          // eslint-disable-next-line
          headers.splice(index, 1, item)
        })
      }

      onMounted(() => {
        nextTick(() => {
          state.cachedHeaders = Object.freeze(deepClone(unref(headers)))
        })
      })

      return {
        t,

        TABLE_GROUP_TYPE,

        onCheckAllChange,
        onReset,

        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-divider--horizontal {
    margin: 10px 0;
  }
  /* stylelint-disable */
  .w-table__settings-checkall:deep(.el-checkbox__label) {
    padding-left: 5px;
  }
</style>

<style lang="scss">
  .w-table-popover {
    min-width: 230px !important;

    &.el-popover--plain {
      padding: 0;
    }
  }
</style>
