<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Settings</h3>

      <el-divider>
        <div class="drawer-item">
          <h4>Layout</h4>
        </div>
      </el-divider>

      <el-collapse accordion>
        <TheHeaderSettings />

        <TheSidebarSettings />

        <TheTagsSettings />

        <TheFooterSettings />
      </el-collapse>
    </div>
  </div>
</template>

<script>
import TheHeaderSettings from "./components/HeaderSettings";
import TheSidebarSettings from "./components/SidebarSettings";
import TheTagsSettings from "./components/TagsSettings";
import TheFooterSettings from "./components/FooterSettings";

export default {
  name: "wSettingsContent",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {
    TheHeaderSettings,
    TheSidebarSettings,
    TheTagsSettings,
    TheFooterSettings
  },

  mixins: [],

  data() {
    return {
      activeNames: ["1"]
    };
  },

  computed: {},

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

<style lang="scss">
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>