<template>
  <el-tag
    v-for="(item, index) in wOptions"
    :key="valueKey ? item[valueKey] : item[optionValue]"
    v-bind="{...getBindValue, ...item.props}"
    @close="onCloseTag(index)"
  >{{ valueKey ? item[valueKey] : item[optionLabel] }}</el-tag>

  <template v-if="addable">
    <el-input
      ref="inputElement"
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      size="small"
      @keyup.enter.native="onInputConfirm"
      @blur="onInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="onInputShow">+</el-button>
  </template>
</template>

<script>
import { ElTag } from "element-plus";
import {
  reactive,
  computed,
  defineComponent,
  toRefs,
  nextTick,
  watch
} from "vue";
import { deepClone } from "easy-fns-ts/dist/esm";

export default defineComponent({
  name: "wTag",

  inheritAttrs: false,

  props: {
    ...ElTag.props,

    modelValue: [String, Number, Array],

    options: { type: Array, default: () => [] },
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" },

    valueKey: String,

    addable: Boolean
  },

  setup(props, { attrs, emit }) {
    const state = reactive({
      wOptions: deepClone(props.options),
      inputVisible: false,
      inputValue: "",
      inputElement: null
    });

    const onCloseTag = index => {
      state.wOptions.splice(index, 1);
    };

    const onInputConfirm = () => {
      if (state.inputValue) {
        state.wOptions.push(
          props.valueKey
            ? {
                [props.valueKey]: state.inputValue
              }
            : {
                [props.optionValue]: state.inputValue,
                [props.optionLabel]: state.inputValue
              }
        );
      }

      state.inputVisible = false;
      state.inputValue = "";
    };

    const onInputShow = () => {
      state.inputVisible = true;
      nextTick(() => {
        state.inputElement.focus();
      });
    };

    watch(
      () => state.wOptions,
      newV => {
        const values = newV.map(i =>
          props.valueKey ? i[props.valueKey] : i[props.optionValue]
        );
        emit("update:modelValue", values);
      },
      {
        immediate: true,
        deep: true
      }
    );

    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue,

      onCloseTag,
      onInputConfirm,
      onInputShow,

      ...toRefs(state)
    };
  }
});
</script>

<style lang='scss' scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>