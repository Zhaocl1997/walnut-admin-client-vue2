<template>
  <el-dialog v-bind="getBindValue">
    <!-- <template #footer>
      <el-button size="small" @click="onCancel"> 取 消 </el-button>
      <el-button size="small" type="primary" @click="onConfirm">
        确 定
      </el-button>
    </template> -->
  </el-dialog>
</template>

<script>
  import { ElDialog } from 'element-plus'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WDialog',

    inheritAttrs: false,

    props: {
      ...ElDialog.props,
    },

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

<style lang="scss" scoped></style>
