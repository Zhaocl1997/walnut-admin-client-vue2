<template>
  <el-popover placement="bottom" trigger="click" popper-class="w-table-popover">
    <template #reference>
      <div class="u-inline">
        <el-tooltip effect="dark" content="列设置" placement="top">
          <w-icon pointer icon="settings" width="20"></w-icon>
        </el-tooltip>
      </div>
    </template>

    <!-- fixed left -->
    <w-table-setting-group type="left" v-model:group="setting">
      <i class="el-icon-info"></i>固定在左侧
    </w-table-setting-group>

    <!-- common -->
    <w-table-setting-group type="common" v-model:group="setting">
      <i class="el-icon-info"></i>不固定
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onCheckAllChange">全选</el-checkbox>

      <el-button size="mini" type="text" @click="onReset">重置</el-button>
    </w-table-setting-group>

    <!-- right left -->
    <w-table-setting-group type="right" v-model:group="setting">
      <i class="el-icon-info"></i>固定在右侧
    </w-table-setting-group>
  </el-popover>
</template>

<script lang='ts'>
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

import wTableSettingGroup from "./group.vue";

export default defineComponent({
  name: "wTableSetting",

  props: {
    setting: Array
  },

  components: {
    wTableSettingGroup
  },

  emits: ["update:setting"],

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
        emit("update:setting", val);
      },
      {
        deep: true,
        immediate: true
      }
    );

    // change checkAll state
    watch(
      () => props.setting,
      val => {
        state.selfHeaders = val;

        const visibleItems = val.filter(i => i.visible);

        if (Array.isArray(visibleItems) && visibleItems.length !== 0) {
          if (visibleItems.length === props.setting.length) {
            state.isIndeterminate = false;
            state.checkAll = true;
          } else {
            state.isIndeterminate = true;
            state.checkAll = false;
          }
        }
      },
      {
        deep: true
      }
    );

    // checkAll or not
    const onCheckAllChange = val => {
      props.setting.map((item, index) => {
        props.setting.splice(index, 1, {
          ...props.setting[index],
          visible: val
        });
      });
    };

    // reset to init state
    const onReset = () => {
      state.cachedHeaders.map((item, index) => {
        props.setting.splice(index, 1, item);
      });
    };

    onMounted(() => {
      nextTick(() => {
        state.cachedHeaders = Object.freeze(deepClone(unref(props.setting)));
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