<!-- eslint-disable -->
<template>
  <keep-alive>
    <transition name="fade" mode="out-in" appear>
      <el-form-item v-bind="item.formProp" :class="compact ? 'u-mb10' : ''">
        <template v-if="$slots[propName]">
          <slot :name="propName" />
        </template>

        <template v-else>
          <component
            :is="component"
            v-model="modelValue[propName]"
            v-bind="componentProps"
            v-on="componentEvents"
          ></component>
        </template>
      </el-form-item>
    </transition>
  </keep-alive>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useFormContext } from '../../../hooks/useFormContext'
  import { useFormItem } from './hooks/useFormItem'

  export default defineComponent({
    name: 'FormItem',

    inheritAttrs: false,

    props: {
      item: Object,
      modelValue: Object,
    },

    setup(props) {
      const { getContextProps } = useFormContext()
      const { compact } = getContextProps()

      const {
        component,

        propName,
        componentProps,
        componentEvents,
      } = useFormItem(props)

      return {
        compact,

        component,

        propName,
        componentProps,
        componentEvents,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
