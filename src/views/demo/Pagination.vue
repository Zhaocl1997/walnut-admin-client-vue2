<template>
  <el-card>
    <template #header>
      <span>基本，页码绑定值：【{{ pageNum }}】，数量绑定值：【{{ pageSize }}】</span>
    </template>

    <w-pagination :total="100" v-model:currentPage="pageNum" v-model:pageSize="pageSize"></w-pagination>
  </el-card>

  <br />
</template>

<script>
import wPagination from "/@/components/UI/Pagination/index.vue";
import { ref, reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "PaginationDemo",

  components: { wPagination },

  setup(props, { attrs }) {
    const pageNum = ref(1);
    const pageSize = ref(10);

    return {
      pageNum,
      pageSize
    };
  }
});
</script>

<style lang='scss' scoped>
</style>