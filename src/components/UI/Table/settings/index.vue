<template>
  <div class="u-mb8 u-float-right">
    <w-table-settings-refresh :listFunc="listFunc"></w-table-settings-refresh>

    <w-table-settings-rows v-model:rows="g"></w-table-settings-rows>

    <w-table-settings-screen-full></w-table-settings-screen-full>

    <w-table-settings-density @density="onDensity"></w-table-settings-density>
  </div>
</template>

<script>
import { reactive, defineComponent, watch } from "vue";

import wTableSettingsRefresh from "./tableSettingsRefresh.vue";
import wTableSettingsRows from "./tableSettingsRows.vue";
import wTableSettingsScreenFull from "./tableSettingsScreenFull.vue";
import wTableSettingsDensity from "./tableSettingsDensity.vue";

export default defineComponent({
  name: "wTableSettings",

  props: {
    listFunc: Function,

    modelValue: Array
  },

  components: {
    wTableSettingsRefresh,
    wTableSettingsRows,
    wTableSettingsScreenFull,
    wTableSettingsDensity
  },

  emits: ["update:modelValue", "density"],

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

    const onDensity = v => {
      emit("density", v);
    };

    return {
      g,

      onDensity
    };
  }
});
</script>

<style lang='scss' scoped>
</style>