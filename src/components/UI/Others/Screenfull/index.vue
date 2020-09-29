<template>
  <div>
    <el-tooltip effect="dark" content="FullScreen" placement="bottom">
      <w-icon :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "wScreenFull",

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
      isFullscreen: false
    };
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onClick() {
      if (!screenfull.isEnabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
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

  beforeDestroy() {
    this.destroy();
  },

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
</style>