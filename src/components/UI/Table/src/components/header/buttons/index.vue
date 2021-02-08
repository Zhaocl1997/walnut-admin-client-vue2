<template>
  <el-space>
    <el-button @click="onCreate">新增</el-button>
    <el-button @click="onExport">导入</el-button>
    <el-button @click="onExport">导出</el-button>
  </el-space>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WTableButtons',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
