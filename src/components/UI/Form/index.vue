<template>
  <el-form ref="formRef" v-bind="getBindValue">
    <!-- form layout -->
    <el-row :gutter="gutter">
      <el-col
        v-for="(item, index) in formModel"
        :key="index"
        :span="onCalcSpan(item)"
      >
        <!-- divider -->
        <el-divider
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER)"
          content-position="left"
        >
          <el-space>
            <w-title>{{ item.title }}</w-title>
            <w-arrow
              style="margin-top: 2px"
              :active="item.fold"
              @click="onToggleDividerFold(index, item)"
            ></w-arrow>
          </el-space>
        </el-divider>

        <!-- form item -->
        <transition name="folded-item">
          <el-form-item v-if="onCalcShow(item)" :key="index" v-bind="item">
            <!-- Input -->
            <w-input
              v-if="onCalcShowItem(item, FORM_TYPE.INPUT)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
              @keyup.enter="onQuery"
            ></w-input>

            <!-- InputNumber -->
            <w-input-number
              v-if="onCalcShowItem(item, FORM_TYPE.INPUT_NUMBER)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-input-number>

            <!-- Radio -->
            <w-radio
              v-if="onCalcShowItem(item, FORM_TYPE.RADIO)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-radio>

            <!-- Checkbox -->
            <w-checkbox
              v-if="onCalcShowItem(item, FORM_TYPE.CHECKBOX)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-checkbox>

            <!-- Select -->
            <w-select
              v-if="onCalcShowItem(item, FORM_TYPE.SELECT)"
              v-model="modelValue[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-select>

            <!-- custom slot -->
            <slot v-if="item.slot" :name="item.prop" />
          </el-form-item>
        </transition>
      </el-col>
    </el-row>

    <!-- form button -->
    <el-form-item>
      <el-space size="mini">
        <el-button v-if="mock && isDevMode" type="text" @click="onMock"
          >模拟</el-button
        >

        <el-button
          v-if="scopedMock && isDevMode"
          type="text"
          @click="onScopedMock"
          >局部模拟</el-button
        >

        <el-button v-if="print" type="text">打印</el-button>

        <w-button
          v-if="fold"
          class="w-form__fold-button"
          size="small"
          @click="onToggleFormFold"
        >
          <span>{{ isFolded ? '展开' : '收起' }}</span>

          <template #suffix>
            <w-arrow :active="!isFolded"></w-arrow>
          </template>
        </w-button>

        <el-button v-if="reset" size="small" @click="onReset">重 置</el-button>

        <el-button v-if="query" size="small" type="primary" @click="onQuery"
          >查 询</el-button
        >
      </el-space>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    reactive,
    computed,
    defineComponent,
    onMounted,
    watch,
    toRaw,
    toRefs,
    nextTick,
  } from 'vue'
  import { findAllIndex } from 'easy-fns-ts/dist/esm'

  import { isDevMode } from '/@/utils/mode'

  import { wFormProps } from './props'
  import { wFormComponents } from './components'
  import { FORM_TYPE } from './types'
  import { mockData } from './mock'

  export default defineComponent({
    name: 'WForm',

    components: wFormComponents,

    inheritAttrs: false,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset'],

    setup(props, { attrs, emit }) {
      const state = reactive({
        isFolded: false,

        formModel: [],
        formRef: null,
      })

      watch(
        () => props.model,
        (val) => {
          state.formModel = toRaw(val)

          nextTick(() => {
            state.formModel.map((item, index) => {
              if (item.defaultFold) {
                onToggleDividerFold(index, item)
              }
            })
          })
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      const init = () => {
        if (props.defaultFold) {
          state.isFolded = true
          state.formModel = props.model.slice(0, props.countToFold)
        }
      }

      const onMock = () => {
        const formData = mockData(state.formModel)
        emit('update:modelValue', { ...props.modelValue, ...formData })
      }

      const onScopedMock = () => {
        const formData = mockData(state.formModel.filter((i) => i.mock))
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

      const onToggleFormFold = () => {
        state.isFolded = !state.isFolded

        if (!state.isFolded) {
          state.formModel = props.model
        } else {
          state.formModel = props.model.slice(0, props.countToFold)
        }
      }

      const onToggleDividerFold = (index, item) => {
        state.formModel.splice(index, 1, {
          ...state.formModel[index],
          fold: !item.fold,
        })

        const dividerAllIndex = findAllIndex(
          state.formModel,
          (item) => item.wType === FORM_TYPE.DIVIDER
        )

        const startIndex = !!item.countToFold
          ? index + +item.countToFold + 1
          : index

        const endIndex =
          dividerAllIndex[dividerAllIndex.indexOf(index) + 1] ||
          state.formModel.length

        for (let i = startIndex; i < endIndex; i++) {
          state.formModel.splice(i, 1, {
            ...state.formModel[i],
            foldShow: item.fold,
          })
        }
      }

      onMounted(() => {
        init()
      })

      return {
        FORM_TYPE,
        isDevMode,

        ...toRefs(state),

        getBindValue,

        onMock,
        onScopedMock,
        onQuery,
        onReset,

        onCalcShow,
        onCalcSpan,
        onCalcShowItem,
        onToggleFormFold,
        onToggleDividerFold,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-form__fold-button {
    padding: 2.5px 8px;
  }
</style>
