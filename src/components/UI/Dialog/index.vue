<template>
  <el-dialog v-bind="getBindValue">
    <template v-if="showFooter" #footer>
      <el-button @click="onCancel" size="small">取 消</el-button>
      <el-button @click="onConfirm" size="small" type="primary">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { ElDialog } from "element-plus";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "wDialog",

  inheritAttrs: false,

  props: {
    ...ElDialog.props,

    showFooter: Boolean
  },

  setup(props, { attrs, emit }) {
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    const onCancel = () => {
      emit("cancel");
    };

    const onConfirm = () => {
      emit("confirm");
    };

    return {
      getBindValue,

      onCancel,
      onConfirm
    };
  }
});
</script>

<style lang='scss' scoped>
</style>