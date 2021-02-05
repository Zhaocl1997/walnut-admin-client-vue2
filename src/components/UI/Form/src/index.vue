<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :class="inline ? 'u-inline' : 'u-flex'">
      <el-col
        v-for="(item, index) in schemas"
        :key="index"
        :span="onCalcSpan(item)"
      >
        <w-form-divider
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER) && !inline"
          :item="item"
          :toggle="() => onToggleDividerFold(index, item)"
        ></w-form-divider>

        <transition name="el-zoom-in-center">
          <el-form-item v-bind="item" :class="compact ? 'u-mb10' : ''">
            <template v-if="$slots[item.prop]">
              <slot :name="item.prop" />
            </template>

            <template v-else>
              <keep-alive>
                <component
                  :is="onCalcCompName(item.wType)"
                  v-bind="item"
                  v-model="modelValue[item.prop]"
                  v-on="item"
                ></component>
              </keep-alive>
            </template>
          </el-form-item>
        </transition>
      </el-col>
    </el-row>

    <w-form-mock
      :schemas="schemas"
      @change="(val) => emit('update:modelValue', val)"
    ></w-form-mock>

    <w-form-query
      :is-folded="isFolded"
      :schemas="schemas"
      :toggle="onToggleFormFold"
      @reset="onReset"
      @query="onQuery"
    ></w-form-query>
  </el-form>
</template>

<script>
  import {
    computed,
    defineComponent,
    onMounted,
    ref,
    getCurrentInstance,
    onBeforeMount,
    unref,
  } from 'vue'

  import wFormProps from './props'
  import { resolveDynamicComponent } from './components'
  import { FORM_TYPE } from './types'
  import { useFormSchema } from './hooks/useSchema'
  import { useFormContext } from './hooks/useFormContext'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset'],

    setup(props, { attrs, emit, slots }) {
      const instance = getCurrentInstance()
      const formRef = ref(null)

      const { setContextProps } = useFormContext()

      const {
        schemas,
        isFolded,
        onFormDefaultFold,
        onToggleFormFold,
        onToggleDividerFold,
      } = useFormSchema(props)

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          model: props.modelValue,
        }
      })

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        formRef.value.resetFields()
        emit('reset')
        emit('update:modelValue', { ...unref(props.modelValue) })
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
        return item.span ? item.span : props.span
      }

      const onCalcCompName = (type) => {
        const name =
          type.substr(0, 1).toLowerCase() + type.substr(1, type.length)

        return `w-${name}`
      }

      const onGenUsedComp = () => {
        instance.type.components = resolveDynamicComponent(unref(props.schemas))
      }

      onBeforeMount(() => {
        onGenUsedComp()
      })

      onMounted(() => {
        onFormDefaultFold()
      })

      setContextProps(props)

      return {
        emit,
        formRef,

        schemas,
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
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-form {
    position: relative;

    &-query {
      position: absolute;
      bottom: -40px;
      right: 0;
    }
  }
</style>
