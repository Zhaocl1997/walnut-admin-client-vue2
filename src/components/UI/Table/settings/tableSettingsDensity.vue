<template>
  <el-tooltip content="密度" placement="top" :offset="17">
    <div class="u-inline">
      <el-dropdown trigger="click" size="medium" @command="onDropdownCommand">
        <w-icon pointer icon="vamo" width="20"></w-icon>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="0" key="0">紧凑</el-dropdown-item>
            <el-dropdown-item command="1" key="1">中等</el-dropdown-item>
            <el-dropdown-item command="2" key="2">宽裕</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "wTableSettingsDensity",

  emits: ["density"],

  setup(props, { attrs, emit }) {
    const onDropdownCommand = command => {
      emit("density", command);
    };

    return {
      onDropdownCommand
    };
  }
});
</script>

<style lang='scss' scoped>
</style>