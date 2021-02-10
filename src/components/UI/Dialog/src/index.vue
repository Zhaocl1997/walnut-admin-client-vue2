<template>
  <div :class="['w-dialog', { 'w-dialog-line': line }]">
    <el-dialog v-bind="getBindValue" @close="onDialogClose">
      <!-- <template v-if="header" #title>
        <w-title show-left>{{ title }}</w-title>
      </template> -->

      <div class="w-dialog__body">
        <slot></slot>
      </div>

      <template v-if="footer" #footer>
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onConfirm"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    ref,
    unref,
  } from 'vue'
  import { omit, deepMerge, log } from 'easy-fns-ts'

  import wDialogProps from './props'
  import wTitle from '/@/components/Help/Title/index.vue'

  export default defineComponent({
    name: 'WDialog',

    components: { wTitle },

    inheritAttrs: false,

    props: wDialogProps,

    emits: ['confirm', 'cancel', 'hook'],

    setup(props, { attrs, emit }) {
      const instance = getCurrentInstance()

      const visibleRef = ref(false)
      const insidePropsRef = ref(null)

      const getBindValue = computed(() => {
        return omit(
          {
            ...attrs,
            ...props,
            ...unref(insidePropsRef),
            modelValue: visibleRef.value,
          },
          ['header', 'footer', 'line', 'draggable']
        )
      })

      const toggleDialogVisible = (visible) => {
        visibleRef.value = visible
      }

      const onDialogClose = () => {
        toggleDialogVisible(false)
      }

      const onCancel = () => {
        emit('cancel')
      }

      const onConfirm = () => {
        emit('confirm')
      }

      const setDialogProps = (newProps) => {
        insidePropsRef.value = deepMerge(
          unref(insidePropsRef) || {},
          newProps || {}
        )
      }

      emit('hook', instance.uid, {
        setDialogProps,
        toggleDialogVisible,
      })

      return {
        onDialogClose,

        getBindValue,

        onCancel,
        onConfirm,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-dialog {
    &__body {
      max-height: 60vh;
      margin-bottom: 7%;
      overflow-y: auto;
    }
  }

  .w-dialog-line {
    /* stylelint-disable-next-line */
    &:deep(.el-dialog__header) {
      border-bottom: 1px solid #e8eaec;
    }

    /* stylelint-disable-next-line */
    &:deep(.el-dialog__footer) {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #e8eaec;
    }
  }
</style>
