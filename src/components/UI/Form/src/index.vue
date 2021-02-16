<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :class="inline ? 'u-inline' : 'u-flex'">
      <el-col
        v-for="(item, index) in insideSchemas"
        :key="`${onCalcPropName(item) || 'wForm'}${index}`"
        :span="onCalcSpan(item)"
      >
        <!-- <component
          :is="'w-form-divider'"
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER) && !inline"
          :item="item"
          :toggle="() => onToggleDividerFold(index, item)"
        ></component> -->

        <w-form-item :item="item" :component="$options.components">
          <template v-for="i in Object.keys($slots)" #[i]="data">
            <slot :name="i" v-bind="data"></slot>
          </template>
        </w-form-item>

        <!-- <transition name="fade" mode="out-in" appear>
          <el-form-item v-bind="item.formProp" :class="compact ? 'u-mb10' : ''">
            <template v-if="$slots[onCalcPropName(item)]">
              <slot :name="onCalcPropName(item)" />
            </template>

            <template v-else>
              <keep-alive>
                <component
                  :is="onCalcCompName(item.wType)"
                  v-model="modelValue[onCalcPropName(item)]"
                  v-bind="item.componentProp || {}"
                  v-on="item.componentEvent || {}"
                ></component>
              </keep-alive>
            </template>
          </el-form-item>
        </transition> -->
      </el-col>
    </el-row>

    <component
      :is="'w-form-mock'"
      :schemas="schemas"
      @change="(val) => emit('update:modelValue', val)"
    ></component>

    <component
      :is="'w-form-query'"
      :is-folded="isFolded"
      :schemas="schemas"
      :toggle="onToggleFormFold"
      @reset="onReset"
      @query="onQuery"
    ></component>
  </el-form>
</template>

<script>
  import {
    ref,
    unref,
    computed,
    defineComponent,
    onMounted,
    onBeforeMount,
  } from 'vue'

  import wFormProps from './props'
  import { FORM_TYPE } from './types'

  import { useFormComponents } from './hooks/useFormComponents'
  import { useFormContext } from './hooks/useFormContext'
  import { useFormMethods } from './hooks/useFormMethods'
  import { useFormProps } from './hooks/useFormProps'
  import { useFormSchemas } from './hooks/useFormSchemas'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset', 'hook'],

    setup(props, { attrs, emit, slots }) {
      const formRef = ref(null)

      const { setContextProps } = useFormContext()

      const { setProps, getProps } = useFormProps(props)

      const {
        insideSchemas,
        isFolded,
        onFormDefaultFold,
        onToggleFormFold,
        onToggleDividerFold,
      } = useFormSchemas(getProps)

      const { onInitialComponents } = useFormComponents(getProps)

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

      const onCalcShowItem = (item, TYPE) => {
        return item.wType === TYPE && !item.slot
      }

      const onCalcShow = (item) => {
        const isShow = item.show === undefined ? true : item.show
        return isShow && !item.foldShow
      }

      const onCalcSpan = (item) => {
        if (item.wType === FORM_TYPE.DIVIDER) {
          return 24
        }
        return item.colProp ? item.colProp.span : unref(getProps).span
      }

      const onCalcCompName = (type) => {
        const name =
          type.substr(0, 1).toLowerCase() + type.substr(1, type.length)

        return `w-${name}`
      }

      const onCalcPropName = (item) => {
        return item.formProp ? item.formProp.prop : ''
      }

      onBeforeMount(() => {
        onInitialComponents()
      })

      onMounted(() => {
        onFormDefaultFold()
      })

      // w-form context props
      setContextProps(getProps)

      // useForm hook
      emit('hook', formMethods)

      return {
        emit,
        formRef,

        insideSchemas,
        isFolded,
        onToggleFormFold,
        onToggleDividerFold,

        FORM_TYPE,

        getBindValue,

        onQuery,
        onReset,

        onCalcShow,
        onCalcSpan,
        onCalcShowItem,
        onCalcCompName,
        onCalcPropName,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-form {
    position: relative;
  }
</style>
