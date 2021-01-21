<template>
  <el-select v-model="origin" v-bind="getBindValue">
    <el-option
      v-for="item in options"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="valueKey ? item : item[optionValue]"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script>
  import { omit } from 'easy-fns-ts'
  import { ElSelect } from 'element-plus'
  import { computed, defineComponent, reactive } from 'vue'
  import hooks from '/@/hooks'

  export default defineComponent({
    name: 'WSelect',

    inheritAttrs: false,

    props: {
      ...ElSelect.props,

      options: { type: Array, default: () => [] },
      optionValue: { type: String, default: 'value' },
      optionLabel: { type: String, default: 'label' },

      valueKey: String,

      valueFormat: String,
    },

    emits: ['update:modelValue'],

    setup(props, { attrs, emit }) {
      const { origin, getBindValue } = hooks.useValueFormat()

      return {
        origin,
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
