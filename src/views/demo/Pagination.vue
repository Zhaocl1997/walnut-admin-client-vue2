<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ }}】</span>
    </template>

    <w-pagination :total="500"></w-pagination>
  </el-card>

  <br />
</template>

<script lang='ts'>
import wPagination from "/@/components/UI/Pagination/index.vue";
import { ref, reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "PaginationDemo",

  components: { wPagination },

  setup(props, { attrs }) {}
});
</script>

<style lang='scss' scoped>
</style>