<template>
  <el-drawer v-bind="$props" v-on="$listeners">
    <div class="w-drawer__header" slot="title">
      <slot name="header" />
    </div>

    <slot />

    <div class="w-drawer__footer">
      <slot name="footer" />
    </div>
  </el-drawer>
</template>

<script>
import { Drawer } from "element-ui";

export default {
  name: "wDrawer",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {
    ...Drawer.props
  },

  methods: {},

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
::v-deep :focus {
  outline: 0;
}

::v-deep .el-drawer__body {
  overflow-y: auto;
  margin-bottom: 60px;
}

.w-drawer__header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 20px;
  text-align: left;
  background-color: white;
  height: 50px;
}

.w-drawer__footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background-color: white;
  height: 50px;
}
</style>
