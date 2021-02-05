<template>
  <template v-if="originText || !multiple">
    <el-checkbox v-model="origin" v-bind="getBindValue">
      {{ originText || text }}
    </el-checkbox>
  </template>

  <template v-else>
    <el-checkbox-group v-model="origin" v-bind="getBindValue">
      <el-checkbox
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >
        {{ item[optionLabel] }}
      </el-checkbox>
    </el-checkbox-group>
  </template>
</template>

<script>
  import { reactive, computed, defineComponent, watch } from 'vue'
  import { wCheckboxProps } from './props'
  import hooks from '/@/hooks'
  import { getDefaultSlotText } from '/@/utils/vue'

  export default defineComponent({
    name: 'WCheckbox',

    inheritAttrs: false,

    props: wCheckboxProps,

    setup(props, { attrs, slots }) {
      const { useValueFormat } = hooks
      const { origin, getBindValue } = useValueFormat()
      const originText = getDefaultSlotText(slots)

      return {
        origin,
        getBindValue,
        originText,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
