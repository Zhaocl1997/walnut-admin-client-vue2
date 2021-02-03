<template>
  <el-form ref="formRef" class="w-form" v-bind="getBindValue">
    <el-row :gutter="gutter" :style="{ display: inline ? 'inline' : 'flex' }">
      <el-col
        v-for="(item, index) in schemas"
        :key="index"
        :span="onCalcSpan(item)"
      >
        <!-- divider -->
        <el-divider
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER) && !inline"
          content-position="left"
        >
          <el-space>
            <w-title>{{ item.title }}</w-title>
            <w-arrow
              v-if="item.fold === true || item.fold === false"
              style="margin-top: 2px"
              :active="item.fold"
              @click="onToggleDividerFold(index, item)"
            ></w-arrow>
          </el-space>
        </el-divider>

        <transition name="el-zoom-in-center">
          <el-form-item
            v-if="onCalcShow(item)"
            :key="index"
            v-bind="item"
            :class="compact ? 'u-mb10' : ''"
          >
            <w-input
              v-if="onCalcShowItem(item, FORM_TYPE.INPUT)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
              @keyup.enter="onQuery"
            ></w-input>

            <w-input-number
              v-if="onCalcShowItem(item, FORM_TYPE.INPUT_NUMBER)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-input-number>

            <w-radio
              v-if="onCalcShowItem(item, FORM_TYPE.RADIO)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-radio>

            <w-checkbox
              v-if="onCalcShowItem(item, FORM_TYPE.CHECKBOX)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-checkbox>

            <w-select
              v-if="onCalcShowItem(item, FORM_TYPE.SELECT)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-select>

            <w-slider
              v-if="onCalcShowItem(item, FORM_TYPE.SLIDER)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-slider>

            <w-switch
              v-if="onCalcShowItem(item, FORM_TYPE.SWITCH)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-switch>

            <!-- custom slot -->
            <slot v-if="item.slot" :name="item.prop" />
          </el-form-item>
        </transition>
      </el-col>
    </el-row>

    <w-form-mock :schemas="schemas" @change="onMockChange"></w-form-mock>

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
  import { computed, defineComponent, onMounted, ref } from 'vue'

  import wFormProps from './props'
  import wFormComponents from './componentMap'
  import { FORM_TYPE } from './types'
  import { useFormSchema } from './hooks/useSchema'
  import { useFormContext } from './hooks/useFormContext'

  export default defineComponent({
    name: 'WForm',

    components: wFormComponents,

    inheritAttrs: false,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset'],

    setup(props, { attrs, emit }) {
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

      const onMockChange = (val) => {
        emit('update:modelValue', val)
      }

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        formRef.value.resetFields()
        emit('reset')
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

      onMounted(() => {
        onFormDefaultFold()
      })

      setContextProps(props)

      return {
        formRef,

        schemas,
        isFolded,
        onToggleFormFold,
        onToggleDividerFold,

        FORM_TYPE,

        getBindValue,

        onMockChange,
        onQuery,
        onReset,

        onCalcShow,
        onCalcSpan,
        onCalcShowItem,
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
