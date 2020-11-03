<template>
  <div class="drawer-container">
    <div>
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

      <el-divider>
        <div class="drawer-item">
          <h4>Visiual</h4>
        </div>
      </el-divider>

      <div class="drawer-item">
        <span>Weak color</span>
        <el-switch v-model="weakColor" class="u-float-right" />
      </div>

      <div class="drawer-item">
        <span>Grey color</span>
        <el-switch v-model="greyColor" class="u-float-right" />
      </div>

      <div class="drawer-item">
        <span>Dark theme</span>
        <el-switch v-model="darkTheme" class="u-float-right" />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderSettings from "./components/HeaderSettings";
import TheSidebarSettings from "./components/SidebarSettings";
import TheTagsSettings from "./components/TagsSettings";
import TheFooterSettings from "./components/FooterSettings";

import { toggleClass } from "easy-fns/lib/dom";

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

  computed: {
    weakColor: {
      get() {
        return this.$store.state.settings.weakColor;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "weakColor",
          value: val
        });

        toggleClass(document.body, "color-weak", val);
      }
    },

    greyColor: {
      get() {
        return this.$store.state.settings.greyColor;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "greyColor",
          value: val
        });

        toggleClass(document.body, "color-grey", val);
      }
    },

    darkTheme: {
      get() {
        return this.$store.state.settings.darkTheme;
      },
      set(val) {
        this.$store.dispatch("settings/changeSettings", {
          key: "darkTheme",
          value: val
        });
        toggleClass(document.body, "theme-dark", val);
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

<style lang="scss">
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
}
</style>