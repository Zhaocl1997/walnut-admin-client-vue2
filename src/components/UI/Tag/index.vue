<template>
  <el-tag
    v-for="(item, index) in wOptions"
    :key="valueKey ? index : item[optionValue]"
    v-bind="{ ...getBindValue, ...item.props }"
    @close="onCloseTag(index)"
  >
    {{ valueKey ? item[valueKey] : item[optionLabel] }}
  </el-tag>

  <template v-if="addable">
    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter="onInputConfirm"
      @blur="onInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="onInputShow">
      +
    </el-button>
  </template>
</template>

<script>
  import {
    reactive,
    computed,
    defineComponent,
    toRefs,
    nextTick,
    watch,
    unref,
  } from 'vue'
  import { deepClone } from 'easy-fns-ts'
  import { wTagProps } from './props'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    name: 'WTag',

    inheritAttrs: false,

    props: wTagProps,

    emits: ['update:modelValue'],

    setup(props, { attrs, emit }) {
      const state = reactive({
        wOptions: deepClone(props.options),
        inputVisible: false,
        inputValue: '',
        inputRef: null,
      })

      const onCloseTag = (index) => {
        state.wOptions.splice(index, 1)
      }

      const onInputConfirm = () => {
        if (state.inputValue) {
          if (props.unique) {
            if (unref(props.modelValue).includes(unref(state.inputValue))) {
              ElMessage.info('请勿添加重复信息')
              return
            }
          }

          state.wOptions.push(
            props.valueKey
              ? {
                  [props.valueKey]: state.inputValue,
                }
              : {
                  [props.optionValue]: state.inputValue,
                  [props.optionLabel]: state.inputValue,
                }
          )
        }

        state.inputVisible = false
        state.inputValue = ''
      }

      const onInputShow = () => {
        state.inputVisible = true
        nextTick(() => {
          state.inputRef.focus()
        })
      }

      watch(
        () => state.wOptions,
        (newV) => {
          const values = newV.map((i) =>
            props.valueKey ? i[props.valueKey] : i[props.optionValue]
          )
          emit('update:modelValue', values)
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      return {
        getBindValue,

        onCloseTag,
        onInputConfirm,
        onInputShow,

        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 10px;
    line-height: 30px;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
