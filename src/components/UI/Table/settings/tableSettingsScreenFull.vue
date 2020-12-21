<template>
  <el-tooltip
    content="全屏"
    placement="top"
  >
    <w-screen-full
      width="20"
      target=".w-table"
    />
  </el-tooltip>
</template>

<script>
import wScreenFull from "../../../Others/Screenfull/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "WTableSettingsScreenFull",

  components: { wScreenFull },

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
</style>