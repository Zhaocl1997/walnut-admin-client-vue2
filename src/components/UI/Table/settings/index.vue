<template>
  <div class="u-mb8 u-float-right">
    <w-refresh :listFunc="listFunc"></w-refresh>

    <w-setting v-model:setting="g"></w-setting>

    <el-tooltip effect="dark" content="全屏" placement="top">
      <w-screen-full width="20px" target=".w-table"></w-screen-full>
    </el-tooltip>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent, watch, toRaw } from "vue";

import wRefresh from "./refresh.vue";
import wSetting from "./setting.vue";
import wScreenFull from "../../../Others/Screenfull/index.vue";

export default defineComponent({
  name: "wTableSettings",

  props: {
    ...wRefresh.props,

    modelValue: Array
  },

  components: {
    wRefresh,
    wSetting,
    wScreenFull
  },

  emits: ["update:modelValue"],

  setup(props, { attrs, emit }) {
    let g = reactive([]);

    watch(
      () => props.modelValue,
      val => (g = val),
      {
        immediate: true,
        deep: true
      }
    );

    watch(
      () => g,
      val => {
        emit("update:modelValue", val);
      },
      {
        immediate: true,
        deep: true
      }
    );

    return {
      g
    };
  }
});
</script>

<style lang='scss' scoped>
</style>