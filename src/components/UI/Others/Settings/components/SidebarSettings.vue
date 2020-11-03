<template>
  <el-collapse-item title="Sidebar" name="sidebar">
    <template slot="title">
      <div class="drawer-item">
        <h5>Sidebar</h5>
      </div>
    </template>

    <div class="drawer-item">
      <span>Render</span>
      <el-switch v-model="sidebarRender" class="u-float-right" />
    </div>

    <div class="drawer-item">
      <span>Collapse</span>
      <el-switch v-model="sidebarCollapsed" class="u-float-right" />
    </div>

    <div class="drawer-item">
      <span>Width</span>

      <el-slider
        style="width:80%;margin:auto;"
        v-model="sidebarWidth"
        :show-tooltip="false"
        :min="120"
        :max="240"
        :step="10"
        :marks="sidebarMarks"
      ></el-slider>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: "",

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
      sidebarMarks: {
        120: "120px",
        160: "160px",
        200: "200px",
        240: "240px"
      }
    };
  },

  computed: {
    sidebarRender: {
      get() {
        return this.$store.state.settings.sidebarRender;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "sidebarRender",
          value: val
        });
      }
    },

    sidebarCollapsed: {
      get() {
        return this.$store.state.settings.sidebarCollapsed;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "sidebarCollapsed",
          value: val
        });
      }
    },

    sidebarWidth: {
      get() {
        return parseInt(this.$store.state.settings.sidebarWidth);
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "sidebarWidth",
          value: val + "px"
        });
      }
    }
  },

  watch: {},

  props: {},

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