<template>
  <el-input v-bind="getBindValue">
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>

    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
  </el-input>
</template>

<script>
import { ElInput } from "element-plus";
import { computed, defineComponent } from "vue";
import { clearIllegalChars } from "easy-fns-ts/dist/esm";

export default defineComponent({
  name: "wInput",

  inheritAttrs: false,

  props: {
    ...ElInput.props,

    modelModifiers: {
      default: () => ({})
    },

    blackList: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { attrs, emit }) {
    const onInput = value => {
      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }

      const legalValue = clearIllegalChars(value, props.blackList);

      emit("update:modelValue", legalValue);
      emit("input", legalValue);
    };

    const getBindValue = computed(() => {
      return { ...attrs, ...props, onInput };
    });

    return {
      getBindValue
    };
  }
});
</script>

<style lang='scss' scoped>
</style>