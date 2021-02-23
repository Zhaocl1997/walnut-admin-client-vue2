<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :class="inline ? 'u-inline' : 'u-flex'">
      <template v-for="(item, index1) in formSchemas" :key="index1">
        <template v-if="item.wType === 'Divider'">
          <el-col v-if="onItemVisible(item)" :span="24">
            <component :is="'form-divider'" :index="index1"></component>
          </el-col>

          <template
            v-for="(child, index2) in item.children"
            :key="child.formProp.prop"
          >
            <el-col
              v-if="onItemVisible(child)"
              v-bind="child.colProp || { ...child.colProp, span: span }"
            >
              <form-item :model-value="modelValue" :item="child">
                <template v-for="i in Object.keys($slots)" #[i]="data">
                  <slot :name="i" v-bind="data"></slot>
                </template>
              </form-item>
            </el-col>
          </template>
        </template>

        <template v-else>
          <el-col
            v-if="onItemVisible(item)"
            v-bind="item.colProp || { ...item.colProp, span: span }"
          >
            <form-item :model-value="modelValue" :item="item">
              <template v-for="i in Object.keys($slots)" #[i]="data">
                <slot :name="i" v-bind="data"></slot>
              </template>
            </form-item>
          </el-col>
        </template>
      </template>

      <el-col :span="span">
        <el-form-item>
          <form-query v-if="query"></form-query>

          <form-mock v-if="mock" @change="onMock"></form-mock>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { ref, unref, computed, defineComponent, onMounted } from 'vue'

  import props from './props'

  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormContext } from './hooks/useFormContext'
  import { useFormMethods } from './hooks/useFormMethods'
  import { useFormProps } from './hooks/useFormProps'
  import { useFormSchemas } from './hooks/useFormSchemas'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: props,

    emits: ['update:modelValue', 'query', 'reset', 'hook'],

    setup(props, { attrs, emit, slots }) {
      const formRef = ref(null)

      const { setContextProps } = useFormContext()

      const { setProps, getProps } = useFormProps(props)

      const { formSchemas, onItemVisible } = useFormSchemas(unref(getProps))

      useFormComponents(getProps)

      const { formMethods } = useFormMethods(formRef, { setProps })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          // unref the computed props and bind to el-form
          ...unref(getProps),
          // used for method like `valdiate` to work
          model: unref(getProps).modelValue,
        }
      })

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        formRef.value.resetFields()
        emit('reset')
        emit('update:modelValue', unref(getProps).modelValue)
      }

      const onMock = (val) => {
        emit('update:modelValue', val)
      }

      onMounted(() => {})

      // Form context props
      setContextProps({ ...unref(getProps), schemas: unref(formSchemas) })

      // `useForm` hook
      emit('hook', formMethods)

      return {
        getBindValue,
        formRef,

        formSchemas,

        onItemVisible,

        onQuery,
        onReset,
        onMock,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-form {
    position: relative;
  }
</style>
