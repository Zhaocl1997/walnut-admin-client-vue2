<template>
  <el-select v-bind="getBindValue">
    <el-option
      v-for="item in options"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="valueKey ? item :item[optionValue]"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script>
import { ElSelect } from "element-plus";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "wSelect",

  inheritAttrs: false,

  props: {
    ...ElSelect.props,

    options: { type: Array, default: () => [] },
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" },

    valueKey: String
  },

  setup(props, { attrs }) {
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue
    };
  }
});
</script>

<style lang='scss' scoped>
</style>