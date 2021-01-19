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
    <w-table-settings-rows-group
      v-model:group="rows"
      :type="TABLE_GROUP_TYPE.LEFT"
    >
      <el-space size="mini">
        <i class="el-icon-info" />
        <span>{{ t('component.table.settings.fixedLeft') }}</span>
      </el-space>
    </w-table-settings-rows-group>

    <!-- common -->
    <!-- eslint-disable -->
    <w-table-settings-rows-group
      v-model:group="rows"
      :type="TABLE_GROUP_TYPE.COMMON"
    >
      <el-space wrap size="mini">
        <i class="el-icon-info" />

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

    <!-- right left -->
    <!-- eslint-disable -->
    <w-table-settings-rows-group
      v-model:group="rows"
      :type="TABLE_GROUP_TYPE.RIGHT"
    >
      <el-space size="mini">
        <i class="el-icon-info" />
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
    computed,
  } from 'vue'
  import { deepClone } from 'easy-fns-ts'

  import { useI18n } from '/@/hooks/useI18n.js'

  import wTableSettingsRowsGroup from './tableSettingsRowsGroup.vue'
  import { TABLE_GROUP_TYPE } from '../constant'

  export default defineComponent({
    name: 'WTableSettingsRows',

    components: { wTableSettingsRowsGroup },

    props: { rows: Array },

    emits: ['update:rows'],

    setup(props, { attrs, emit }) {
      const { t } = useI18n()

      const state = reactive({
        checkAll: true,
        isIndeterminate: false,
        cachedHeaders: [],
        selfHeaders: [],
      })

      watch(
        () => state.selfHeaders,
        (val) => {
          emit('update:rows', val)
        },
        {
          deep: true,
          immediate: true,
        }
      )

      // change checkAll state
      watch(
        () => props.rows,
        (val) => {
          state.selfHeaders = val

          const visibleItems = val.filter((i) => i.visible)

          if (Array.isArray(visibleItems) && visibleItems.length !== 0) {
            if (visibleItems.length === props.rows.length) {
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
        props.rows.map((item, index) => {
          // eslint-disable-next-line
          props.rows.splice(index, 1, {
            ...props.rows[index],
            visible: val,
          })
        })
      }

      // reset to init state
      const onReset = () => {
        state.cachedHeaders.map((item, index) => {
          // eslint-disable-next-line
          props.rows.splice(index, 1, item)
        })
      }

      onMounted(() => {
        nextTick(() => {
          state.cachedHeaders = Object.freeze(deepClone(unref(props.rows)))
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
  .w-table__settings-checkall:deep(.el-checkbox__label) {
    padding-left: 5px;
  }
</style>

<style lang="scss">
  .w-table-popover {
    min-width: 200px !important;

    &.el-popover--plain {
      padding: 0;
    }
  }
</style>
