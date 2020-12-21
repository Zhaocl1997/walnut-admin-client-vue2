<template>
  <el-radio-group v-bind="getBindValue">
    <template v-if="button">
      <el-radio-button
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >{{ item[optionLabel] }}</el-radio-button>
    </template>

    <template v-else>
      <el-radio
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >{{ item[optionLabel] }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import { ElRadioGroup } from "element-plus";
import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  name: "wRadio",

  inheritAttrs: false,

  props: {
    ...ElRadioGroup.props,

    options: { type: Array, default: () => [] },
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" },

    button: Boolean
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