<template>
  <transition name="fade" mode="out-in">
    <el-form-item v-bind="item.formProp" :class="compact ? 'u-mb10' : ''">
      <template v-if="$slots[propName]">
        <slot :name="propName" />
      </template>

      <template v-else>
        <keep-alive>
          <component
            :is="componentName"
            v-bind="componentProps"
            v-model="modelValue[propName]"
            v-on="componentEvents"
          ></component>
        </keep-alive>
      </template>
    </el-form-item>
  </transition>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useFormContext } from '../hooks/useFormContext'
  import { useFormItem } from '../hooks/useFormItem'

  export default defineComponent({
    name: 'WFormItem',

    inheritAttrs: false,

    props: {
      item: Object,
      component: Object,
    },

    setup(props) {
      const { getContextProps } = useFormContext()
      const { compact, modelValue } = getContextProps()

      const {
        propName,
        componentName,
        componentProps,
        componentEvents,
      } = useFormItem(props)

      return {
        compact,
        modelValue,

        propName,
        componentName,
        componentProps,
        componentEvents,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
