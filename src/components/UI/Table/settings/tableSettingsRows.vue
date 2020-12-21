<template>
  <el-popover
    placement="bottom"
    trigger="click"
    popper-class="w-table-popover"
  >
    <template #reference>
      <div class="u-inline">
        <el-tooltip
          effect="dark"
          content="列设置"
          placement="top"
        >
          <w-icon
            pointer
            icon="settings"
            width="20"
          />
        </el-tooltip>
      </div>
    </template>

    <!-- fixed left -->
    <!-- eslint-disable-next-line -->
    <w-table-settings-rows-group v-model:group="rows" type="left">
      <i class="el-icon-info" />固定在左侧
    </w-table-settings-rows-group>

    <!-- common -->
    <!-- eslint-disable-next-line -->
    <w-table-settings-rows-group v-model:group="rows" type="common">
      <i class="el-icon-info" />不固定
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="onCheckAllChange"
      >
        全选
      </el-checkbox>

      <el-button
        size="mini"
        type="text"
        @click="onReset"
      >
        重置
      </el-button>
    </w-table-settings-rows-group>

    <!-- right left -->
    <!-- eslint-disable-next-line -->
    <w-table-settings-rows-group v-model:group="rows" type="right">
      <i class="el-icon-info" />固定在右侧
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
  computed
} from "vue";
import { deepClone } from "easy-fns-ts/dist/esm";

import wTableSettingsRowsGroup from "./tableSettingsRowsGroup.vue";

export default defineComponent({
  name: "WTableSettingsRows",

  components: {
    wTableSettingsRowsGroup
  },

  props: {
    rows: Array
  },

  emits: ["update:rows"],

  setup(props, { attrs, emit }) {
    const state = reactive({
      checkAll: true,
      isIndeterminate: false,
      cachedHeaders: [],
      selfHeaders: []
    });

    watch(
      () => state.selfHeaders,
      val => {
        emit("update:rows", val);
      },
      {
        deep: true,
        immediate: true
      }
    );

    // change checkAll state
    watch(
      () => props.rows,
      val => {
        state.selfHeaders = val;

        const visibleItems = val.filter(i => i.visible);

        if (Array.isArray(visibleItems) && visibleItems.length !== 0) {
          if (visibleItems.length === props.rows.length) {
            state.isIndeterminate = false;
            state.checkAll = true;
          } else {
            state.isIndeterminate = true;
            state.checkAll = false;
          }
        }
      },
      {
        deep: true,
        immediate: true
      }
    );

    // checkAll or not
    const onCheckAllChange = val => {
      props.rows.map((item, index) => {
        // eslint-disable-next-line
        props.rows.splice(index, 1, {
          ...props.rows[index],
          visible: val
        });
      });
    };

    // reset to init state
    const onReset = () => {
      state.cachedHeaders.map((item, index) => {
        // eslint-disable-next-line
        props.rows.splice(index, 1, item);
      });
    };

    onMounted(() => {
      nextTick(() => {
        state.cachedHeaders = Object.freeze(deepClone(unref(props.rows)));
      });
    });

    return {
      onCheckAllChange,
      onReset,
      ...toRefs(state)
    };
  }
});
</script>

<style lang='scss' scoped>
.w-table-popover {
  min-width: 200px;

  &.el-popover--plain {
    padding: 0;
  }
}

.el-divider--horizontal {
  margin: 5px 0;
}
</style>