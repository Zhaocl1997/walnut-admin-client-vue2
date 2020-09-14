<template>
  <el-pagination
    :background="background"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  ></el-pagination>
</template>

<script>
import scrollTo from "@/utils/scroll-to";

export default {
  name: "wPagination",

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },

  watch: {},

  props: {
    total: { type: Number, required: true },
    page: { type: Number, default: 1 },
    limit: { type: Number, default: 20 },
    background: { type: Boolean, default: true },
    autoScroll: { type: Boolean, default: true },

    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100, 200]
    },

    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },

  methods: {
    onSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },

    onCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  },

  created() {},

  mounted() {},

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
</style>