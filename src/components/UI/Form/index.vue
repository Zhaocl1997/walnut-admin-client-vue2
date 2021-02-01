<template>
  <el-form
    ref="formRef"
    :class="['w-form', { 'w-form-prettier': prettier }]"
    v-bind="getBindValue"
  >
    <el-row :gutter="gutter">
      <el-col
        v-for="(item, index) in formModel"
        :key="index"
        :span="onCalcSpan(item)"
      >
        <!-- divider -->
        <el-divider
          v-if="onCalcShowItem(item, FORM_TYPE.DIVIDER) && !prettier"
          content-position="left"
          class="el-col"
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
            <template v-if="!prettier">
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

              <!-- custom slot -->
              <slot v-if="item.slot" :name="item.prop" />
            </template>

            <!-- prettier layout -->
            <template v-else>
              <span v-if="item.wType !== FORM_TYPE.DIVIDER">{{
                onCalcPrettierSpan(modelValue[item.prop], item)
              }}</span>
            </template>
          </el-form-item>
        </transition>
      </el-col>
    </el-row>

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
      </el-space>
    </el-form-item>

    <div class="w-form-query">
      <el-button v-if="query" size="small" type="primary" @click="onQuery"
        >查 询</el-button
      >

      <el-button v-if="reset" size="small" @click="onReset">重 置</el-button>

      <w-button
        v-if="
          fold &&
          formModel.length >= countToFold &&
          formModel.length >= 24 / span
        "
        class="w-form__fold-button"
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
  import { findAllIndex, isEmpty } from 'easy-fns-ts'

  import { isDevMode } from '/@/utils/mode'

  import { wFormProps } from './props'
  import { wFormComponents } from './components'
  import { FORM_TYPE } from './types'
  import { mockData } from './mock'

  export default defineComponent({
    name: 'WForm',

    components: wFormComponents,

    inheritAttrs: true,

    props: wFormProps,

    emits: ['update:modelValue', 'query', 'reset'],

    setup(props, { attrs, emit }) {
      const state = reactive({
        isFolded: false,

        formModel: [],
        formRef: null,
      })

      watch(
        () => props.schema,
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

      const getLabelPosition = computed(() => {
        return props.prettier ? 'left' : props.labelPosition
      })

      const getFormRules = computed(() => {
        return props.prettier ? {} : props.rules
      })

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          model: props.modelValue,
          rules: getFormRules.value,
          labelPosition: getLabelPosition.value,
        }
      })

      const init = () => {
        if (props.defaultFold) {
          state.isFolded = true
          state.formModel = props.schema.slice(0, props.countToFold)
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

      const onCalcPrettierSpan = (val, item) => {
        if (isEmpty(val)) {
          return '暂无内容'
        } else {
          if (item.formatter) {
            const labels = item.formatter(val)

            if (Array.isArray(labels)) {
              if (labels.length > 1) {
                return labels.join(' / ')
              }
            }
            return labels
          } else {
            return val
          }
        }
      }

      const onToggleFormFold = () => {
        state.isFolded = !state.isFolded

        if (!state.isFolded) {
          state.formModel = props.schema
        } else {
          state.formModel = props.schema.slice(0, props.countToFold)
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
        onCalcPrettierSpan,
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

  .w-form {
    position: relative;
  }

  .w-form-query {
    position: absolute;
    bottom: -30px;
    right: 0;
  }

  .w-form-prettier {
    /* stylelint-disable-next-line */
    &:deep(.el-form-item__label) {
      padding: 2px 8px;
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      background-color: #fafafa;
    }

    /* stylelint-disable-next-line */
    &:deep(.el-form-item__content) {
      padding-left: 8px;
      border: 1px solid #f0f0f0;
      font-size: 14px;
      overflow-wrap: break-word;
      color: rgba(0, 0, 0, 0.65);
    }
  }
</style>
