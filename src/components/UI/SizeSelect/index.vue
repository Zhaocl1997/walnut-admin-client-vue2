<template>
  <div class="inline">
    <el-tooltip effect="dark" content="尺寸选择" placement="bottom">
      <el-dropdown trigger="click" @command="onSetSize">
        <div>
          <w-icon icon="size" customClass="right-icon" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="size === item.value"
            :command="item.value"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "wSizeSelect",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {
      sizeOptions: [
        { label: "Default", value: "default" },
        { label: "Medium", value: "medium" },
        { label: "Small", value: "small" },
        { label: "Mini", value: "mini" }
      ]
    };
  },

  computed: {
    size() {
      return localStorage.getItem("size");
    }
  },

  watch: {},

  props: {},

  methods: {
    onSetSize(size) {
      this.$store.dispatch("app/setSize", size);
      this.$message.success("尺寸更换成功");

      // this.refreshView();
    },

    refreshView() {
      // In order to make the cached page re-rendered
      // this.$store.dispatch("tagsView/delAllCachedViews", this.$route);
      const { fullPath } = this.$route;
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath
        });
      });
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
.el-dropdown-selfdefine:focus {
  outline: 0;
}
</style>