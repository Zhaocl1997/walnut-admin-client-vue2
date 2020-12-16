<template>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <div class="u-inline">
        <el-tooltip effect="dark" content="列设置" placement="top">
          <w-icon pointer icon="settings" width="20"></w-icon>
        </el-tooltip>
      </div>
    </template>

    <w-table-setting-group type="common" v-model:group="setting"></w-table-setting-group>
  </el-popover>
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent, watch, toRaw } from "vue";
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

  setup(props, { attrs, emit }) {}
});
</script>

<style lang='scss' scoped>
</style>