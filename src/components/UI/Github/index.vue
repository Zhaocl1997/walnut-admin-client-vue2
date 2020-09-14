<template>
  <div class="inline">
    <el-tooltip effect="dark" content="作者主页" placement="bottom">
      <a :href="url" target="_Blank">
        <w-icon icon="github" customClass="right-icon" style="color:black;"></w-icon>
      </a>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "wGithub",

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
    url: {
      type: String,
      default: "https://github.com/Zhaocl1997"
    }
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
:focus {
  outline: 0;
}
</style>