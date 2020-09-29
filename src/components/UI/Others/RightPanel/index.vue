<template>
  <div>
    <el-tooltip effect="dark" content="Settings" placement="bottom">
      <w-icon icon="filter" @click="onOpenPanel"></w-icon>
    </el-tooltip>
    <el-drawer
      append-to-body
      :title="title"
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
    >
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "wRightPanel",

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
      drawer: false
    };
  },

  computed: {},

  watch: {},

  props: {
    title: String,
    direction: String,
    withHeader: Boolean
  },

  methods: {
    onOpenPanel() {
      this.drawer = true;
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