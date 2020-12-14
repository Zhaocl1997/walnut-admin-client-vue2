<template>
  <el-pagination class="wPagination" v-bind="getBindValue"></el-pagination>
</template>

<script lang='ts'>
import { ElPagination } from "element-plus";
import { ref, reactive, computed, defineComponent } from "vue";

export default defineComponent({
  name: "wPagination",

  inheritAttrs: false,

  props: {
    ...ElPagination.props,

    background: { type: Boolean, default: true },
    hideOnSinglePage: { type: Boolean, default: true },

    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },

  setup(props, { attrs }) {
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue
    };
  }
});
</script>

<style lang='scss' scoped>
.wPagination {
  position: relative;
  height: 25px;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 0 20px !important;
}
</style>