<template>
  <el-tooltip effect="dark" content="刷新" placement="top">
    <w-icon class="u-pointer" icon="refresh" width="20" @click="listFunc"></w-icon>
  </el-tooltip>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "wRefresh",

  props: {
    listFunc: Function
  },

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
</style>