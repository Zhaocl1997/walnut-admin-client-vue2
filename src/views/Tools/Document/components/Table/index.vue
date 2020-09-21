<template>
  <div>
    <w-table
      :tableData="tableData"
      :tableHeader.sync="tableHeader"
      :pageSize.sync="queryFormData.pageSize"
      :pageNum.sync="queryFormData.pageNum"
      :total="total"
      :listFunc="init"
      v-loading="loading"
    ></w-table>
  </div>
</template>

<script>
import wTable from "@/components/UI/Table";
import getDataList from "@/mock/table";

export default {
  name: "",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wTable },

  mixins: [],

  data() {
    return {
      tableHeader: [],
      tableData: [],
      total: 0,
      loading: false,

      queryFormData: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    init() {
      this.loading = true;
      const result = getDataList(this.queryFormData);
      console.log(result);
      

      this.tableData = result.data;
      this.total = result.total;
      this.loading = true;
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