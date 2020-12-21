<template>
  <template v-if="originText">
    <el-checkbox v-bind="getBindValue">{{ originText }}</el-checkbox>
  </template>

  <template v-else>
    <el-checkbox-group v-bind="getBindValue">
      <el-checkbox
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >{{ item[optionLabel] }}</el-checkbox>
    </el-checkbox-group>
  </template>
</template>

<script>
import { ElCheckboxGroup } from "element-plus";
import { reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "wCheckbox",

  inheritAttrs: false,

  props: {
    ...ElCheckboxGroup.props,

    options: { type: Array, default: () => [] },
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" }
  },

  setup(props, { attrs, slots }) {
    const originText = slots.default && slots.default()[0].children;

    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue,
      originText
    };
  }
});
</script>

<style lang='scss' scoped>
</style>