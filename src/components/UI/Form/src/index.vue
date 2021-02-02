<template>
  <w-form-query-button-groups></w-form-query-button-groups>

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
            :style="compact ? 'margin-bottom: 10px' : ''"
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

    <el-form-item>
      <el-space size="mini">
        <el-button v-if="mock && isDevMode" type="text" @click="onMock"
          >模 拟</el-button
        >

        <el-button
          v-if="scopedMock && isDevMode"
          type="text"
          @click="onScopedMock"
          >局部模拟</el-button
        >

        <el-button v-if="print" type="text">打印</el-button>
      </el-space>
    </el-form-item>

    <div v-if="query" class="w-form-query">
      <el-button size="small" type="primary" @click="onQuery">查 询</el-button>

      <el-button size="small" @click="onReset">重 置</el-button>

      <w-button
        v-if="schemas.length >= countToFold && schemas.length >= 24 / span"
        size="small"
        type="text"
        @click="onToggleFormFold"
      >
        <span>{{ isFolded ? '展开' : '收起' }}</span>

        <template #suffix>
          <w-arrow :active="!isFolded"></w-arrow>
        </template>
      </w-button>
    </div>
  </el-form>
</template>

<script>
  import { computed, defineComponent, onMounted, ref, unref } from 'vue'

  import { isDevMode } from '/@/utils/mode'
  import hooks from '/@/hooks'

  import wFormProps from './props'
  import wFormComponents from './componentMap'
  import { FORM_TYPE } from './types'
  import mockData from './utils/mock'
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

      const { useI18n } = hooks
      const { t } = useI18n()

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

      const onMock = () => {
        const formData = mockData(unref(schemas))
        emit('update:modelValue', { ...props.modelValue, ...formData })
      }

      const onScopedMock = () => {
        const formData = mockData(unref(schemas).filter((i) => i.mock))
        emit('update:modelValue', { ...props.modelValue, ...formData })
      }

      const onQuery = () => {
        emit('query')
      }

      const onReset = () => {
        state.formRef.resetFields()
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
        t,
        formRef,

        schemas,
        isFolded,
        onToggleFormFold,
        onToggleDividerFold,

        FORM_TYPE,
        isDevMode,

        getBindValue,

        onMock,
        onScopedMock,
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
