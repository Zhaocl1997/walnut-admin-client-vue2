<template>
  <div :style="style">
    <el-switch v-bind="$props" v-on="$listeners"></el-switch>
  </div>
</template>

<script>
import BlockMixins from "../utils/mixins/block";
import { Switch } from "element-ui";

export default {
  name: "wSwitch",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [BlockMixins()],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {
    ...Switch.props
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
</style>