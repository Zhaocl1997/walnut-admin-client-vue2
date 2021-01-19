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

  export default defineComponent({
    name: 'WDialog',

    components: { wTitle },

    inheritAttrs: false,

    props: wDialogProps,

    emits: ['confirm', 'cancel'],

    setup(props, { attrs, emit }) {
      const getBindValue = computed(() => {
        return { ...attrs, ...props }
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
  // @import '../../../assets/style/index.scss';

  .w-dialog {
    &__body {
      // @include scrollBar;

      max-height: 60vh;
      overflow-y: auto;

      margin-bottom: 7%;
    }
  }

  .w-dialog-line {
    &:deep(.el-dialog__header) {
      border-bottom: 1px solid #e8eaec;
    }

    &:deep(.el-dialog__footer) {
      border-top: 1px solid #e8eaec;
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
</style>
