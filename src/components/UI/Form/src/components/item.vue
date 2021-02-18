<template>
  <div>
    <template v-if="item.wType === 'Divider'">
      <component :is="'w-form-divider'" :item="item"></component>

      <template v-if="item.children && item.children.length > 0">
        <template v-for="(child, index) in item.children" :key="index">
          <w-form-item :item="child" :component="$options.components">
            <template v-for="i in Object.keys($slots)" #[i]="data">
              <slot :name="i" v-bind="data"></slot>
            </template>
          </w-form-item>
        </template>
      </template>
    </template>

    <template v-else>
      <transition name="fade" mode="out-in" appear>
        <el-form-item v-bind="item.formProp" :class="compact ? 'u-mb10' : ''">
          <template v-if="$slots[propName]">
            <slot :name="propName" />
          </template>

          <template v-else>
            <keep-alive>
              <component
                :is="componentName"
                v-model="modelValue[propName]"
                v-bind="componentProps"
                v-on="componentEvents"
              ></component>
            </keep-alive>
          </template>
        </el-form-item>
      </transition>
    </template>
  </div>
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
