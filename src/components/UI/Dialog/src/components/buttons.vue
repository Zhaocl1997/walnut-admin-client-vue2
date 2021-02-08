<template>
  <el-button size="small" @click="onCancel">取 消</el-button>
  <el-button size="small" type="primary" @click="onConfirm">确 定</el-button>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WDialogButtons',

    emits: [],

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
