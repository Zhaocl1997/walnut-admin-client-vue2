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
      hasIndex
      hasSelect
    ></w-table>
  </div>
</template>

<script>
import wTable from "@/components/UI/Base/Table/index";
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
      tableHeader: [
        {
          label: "姓名",
          prop: "name",
          width: "100px"
        },
        {
          label: "性别",
          prop: "sex",
          width: "50px"
        },
        {
          label: "年龄",
          prop: "age",
          width: "100px"
        },
        {
          label: "出生年月啊实打实大苏打啊实打实打算",
          prop: "birth",
          width: "100px"
        },
        {
          label: "省份",
          prop: "province",
          width: "100px"
        },
        {
          label: "城市",
          prop: "city",
          width: "100px"
        },
        {
          label: "区县",
          prop: "country",
          width: "100px"
        },
        {
          label: "个人网址",
          prop: "site",
          width: "100px"
        },
        {
          label: "状态",
          prop: "status",
          width: "100px"
        }
      ],
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

  watch: {
    tableHeader(newV) {}
  },

  props: {},

  methods: {
    init() {
      this.loading = true;
      const result = getDataList(this.queryFormData);
      this.tableData = result.data;
      this.total = result.total;
      this.loading = false;
    }
  },

  created() {},

  mounted() {
    this.init();
  },

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