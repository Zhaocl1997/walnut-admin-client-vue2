<template>
  <div :class="['w-dialog', { 'w-dialog-line': line }]">
    <el-dialog v-bind="getBindValue">
      <!-- <template v-if="header" #title>
        <w-title>{{ title }}</w-title>
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
  import { computed, defineComponent } from 'vue'
  import { wDialogProps } from './props'

  import wTitle from '../../Help/Title/index.vue'
  import { omit } from 'easy-fns-ts'

  export default defineComponent({
    name: 'WDialog',

    components: { wTitle },

    inheritAttrs: false,

    props: wDialogProps,

    emits: ['confirm', 'cancel'],

    setup(props, { attrs, emit }) {
      const getBindValue = computed(() => {
        return omit({ ...attrs, ...props }, ['header', 'footer', 'line'])
      })

      const onCancel = () => {
        emit('cancel')
      }

      const onConfirm = () => {
        emit('confirm')
      }

      return {
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
