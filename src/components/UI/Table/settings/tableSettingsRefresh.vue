<template>
  <el-tooltip
    effect="dark"
    content="刷新"
    placement="top"
  >
    <w-icon
      pointer
      icon="refresh"
      width="20"
      @click="listFunc"
    />
  </el-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WTableSettingsRefresh",

  props: {
    listFunc: Function
  },

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
</style>