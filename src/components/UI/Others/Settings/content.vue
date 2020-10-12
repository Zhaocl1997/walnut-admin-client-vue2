<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Layout Settings</h3>

      <div class="drawer-item">
        <h4>Content</h4>
      </div>

      <div class="drawer-item">
        <span>HeaderRender</span>
        <el-switch v-model="headerRender" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Headerfixed</span>
        <el-switch v-model="headerFixed" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>LogoRender</span>
        <el-switch v-model="logoRender" :disabled="!sidebarRender" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>SidebarRender</span>
        <el-switch v-model="sidebarRender" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>TagsRender</span>
        <el-switch v-model="tagsRender" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>FooterRender</span>
        <el-switch v-model="footerRender" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wSettingsContent",

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

  computed: {
    headerRender: {
      get() {
        return this.$store.state.settings.headerRender;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "headerRender",
          value: val
        });
      }
    },
    headerFixed: {
      get() {
        return this.$store.state.settings.headerFixed;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "headerFixed",
          value: val
        });
      }
    },
    logoRender: {
      get() {
        return this.$store.state.settings.logoRender;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "logoRender",
          value: val
        });
      }
    },
    sidebarRender: {
      get() {
        return this.$store.state.settings.sidebarRender;
      },
      set(val) {
        window.document.documentElement.setAttribute(
          "toggleSidebar",
          val.toString()
        );

        this.$store.dispatch("settings/changeSettings", {
          key: "sidebarRender",
          value: val
        });
      }
    },
    tagsRender: {
      get() {
        return this.$store.state.settings.tagsRender;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "tagsRender",
          value: val
        });
      }
    },
    footerRender: {
      get() {
        return this.$store.state.settings.footerRender;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "footerRender",
          value: val
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

<style lang="scss" scoped>
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