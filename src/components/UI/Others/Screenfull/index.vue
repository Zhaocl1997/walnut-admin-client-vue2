<template>
  <div class="screenfull-container">
    <w-icon
      :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
      @click="onClick"
      class="u-pointer"
    />
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

  props: {
    target: {
      type: String,
      default: "#app"
    }
  },

  methods: {
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },

    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },

    onClick() {
      if (!screenfull.isEnabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }

      const ele = document.querySelector(this.target);
      screenfull.toggle(ele);
    },

    change() {
      this.isFullscreen = screenfull.isFullscreen;
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