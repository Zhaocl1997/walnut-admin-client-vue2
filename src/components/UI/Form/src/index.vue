<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :class="inline ? 'u-inline' : 'u-flex'">
      <template v-for="(item, index1) in insideSchemas" :key="index1">
        <template v-if="item.wType === 'Divider'">
          <el-col v-if="onItemVisible(item)" :span="24">
            <component :is="'form-divider'" :item="item"></component>
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
          <form-query
            v-if="query"
            :is-folded="isFolded"
            @query="onQuery"
            @reset="onReset"
            @toggle="onQueryFormToggleFold"
          ></form-query>
        </el-form-item>
      </el-col>
    </el-row>

    <form-mock v-if="mock" @change="onMock"></form-mock>
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

      const {
        insideSchemas,
        isFolded,
        onQueryFormDefaultFold,
        onQueryFormToggleFold,
        onItemVisible,
      } = useFormSchemas(getProps)

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

      onMounted(() => {
        onQueryFormDefaultFold()
      })

      // form context props
      setContextProps(getProps)

      // useForm hook
      emit('hook', formMethods)

      return {
        getBindValue,
        formRef,

        insideSchemas,
        isFolded,
        onQueryFormToggleFold,
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
