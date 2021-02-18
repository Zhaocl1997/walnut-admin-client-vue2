<template>
  <el-select v-model="origin" style="width: 100%" v-bind="getBindValue">
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
  import { computed, defineComponent, reactive } from 'vue'
  import { wSelectProps } from './props'
  import hooks from '/@/hooks'

  export default defineComponent({
    name: 'WSelect',

    inheritAttrs: false,

    props: wSelectProps,

    emits: ['update:modelValue'],

    setup(props, { attrs, emit }) {
      const { useValueFormat } = hooks
      const { origin, getBindValue } = useValueFormat()

      return {
        origin,
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
