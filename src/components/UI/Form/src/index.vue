<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :class="inline ? 'u-inline' : 'u-flex'">
      <el-col
        v-for="(item, index) in insideSchemas"
        :key="`${item.prop || 'wForm'}${index}`"
        :span="onCalcSpan(item)"
      >
        <component
          :is="'w-form-divider'"
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER) && !inline"
          :item="item"
          :toggle="() => onToggleDividerFold(index, item)"
        ></component>

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
    computed,
    defineComponent,
    onMounted,
    ref,
    onBeforeMount,
    unref,
  } from 'vue'

  import wFormProps from './props'
  import { FORM_TYPE } from './types'
  import { useFormSchema } from './hooks/useSchema'
  import { useFormContext } from './hooks/useFormContext'
  import { useDynamicComponent } from './hooks/useDynamicComponent'

  export default defineComponent({
    name: 'WForm',

    inheritAttrs: false,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset'],

    setup(props, { attrs, emit, slots }) {
      const formRef = ref(null)

      const { setContextProps } = useFormContext()

      const {
        insideSchemas,
        isFolded,
        onFormDefaultFold,
        onToggleFormFold,
        onToggleDividerFold,
      } = useFormSchema(props)

      const { onInitialComponents } = useDynamicComponent(props)

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

      onBeforeMount(() => {
        onInitialComponents()
      })

      onMounted(() => {
        onFormDefaultFold()
      })

      setContextProps(props)

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
