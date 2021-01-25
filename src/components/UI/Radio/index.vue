<template>
  <el-radio-group v-bind="getBindValue">
    <template v-if="button">
      <el-radio-button
        v-for="item in options"
        :key="item[optionValue]"
        :label="valueKey ? item[valueKey] : item[optionValue]"
        :disabled="item.disabled"
      >
        {{ item[optionLabel] }}
      </el-radio-button>
    </template>

    <template v-else>
      <el-radio
        v-for="item in options"
        :key="item[optionValue]"
        :label="valueKey ? item[valueKey] : item[optionValue]"
        :disabled="item.disabled"
        :border="border"
      >
        {{ item[optionLabel] }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
  import { ref, computed, defineComponent } from 'vue'
  import { wRadioProps } from './props'

  export default defineComponent({
    name: 'WRadio',

    inheritAttrs: false,

    props: wRadioProps,

    setup(props, { attrs }) {
      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
