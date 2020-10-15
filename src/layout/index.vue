<template>
  <div id="app-wrapper">
    <TheHeader :style="headerStyle" :class="{'fixed-header': headerFixed}"></TheHeader>

    <div id="content-wrapper" :style="contentWrapperStyle">
      <TheSidebar :style="sidebarStyle"></TheSidebar>

      <div :style="contentStyle">
        <TheTags :style="tagsStyle"></TheTags>

        <div id="main-wrapper" :style="mainStyle">
          <TheMain></TheMain>
        </div>

        <TheFooter :style="footerStyle" :class="{'fixed-footer': footerFixed}"></TheFooter>
      </div>
    </div>

    <TheSettings></TheSettings>
  </div>
</template>

<script>
import TheSidebar from "@/components/Layout/TheSidebar";
import TheMain from "@/components/Layout/TheMain";

import TheHeader from "@/components/Layout/TheHeader";
import TheTags from "@/components/Layout/TheTags";
import TheFooter from "@/components/Layout/TheFooter";
import TheSettings from "@/components/UI/Others/Settings";

export default {
  name: "wIndex",

  components: {
    TheSidebar,
    TheMain,
    TheHeader,
    TheTags,
    TheFooter,
    TheSettings
  },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    settings() {
      return this.$store.state.settings;
    },

    headerRender() {
      return this.settings.headerRender;
    },

    headerFixed() {
      return this.settings.headerFixed;
    },

    headerHeight() {
      return this.settings.headerHeight;
    },

    contentStyle() {
      return {
        marginLeft: this.sidebarRender ? this.sidebarWidth : "0px",
        transition: "all 0.3s"
      };
    },

    footerFixed() {
      return this.settings.footerFixed;
    },

    tagsRender() {
      return this.settings.tagsRender;
    },

    footerRender() {
      return this.settings.footerRender;
    },

    sidebarRender() {
      return this.settings.sidebarRender;
    },

    footerHeight() {
      return this.settings.footerHeight;
    },

    tagsHeight() {
      return this.settings.tagsHeight;
    },

    sidebarWidth() {
      return this.settings.sidebarWidth;
    },

    footerStyle() {
      return {
        width:
          this.footerFixed && this.sidebarRender
            ? `calc(100vw - ${this.sidebarWidth})`
            : "100vw",
        height: this.footerHeight,
        display: this.footerRender ? "inherit" : "none",
        marginLeft:
          this.footerFixed && this.sidebarRender ? this.sidebarWidth : "0px"
      };
    },

    headerStyle() {
      return {
        height: this.headerHeight,
        display: this.headerRender ? "inherit" : "none"
      };
    },

    sidebarStyle() {
      return {
        width: this.sidebarWidth,
        display: this.sidebarRender ? "inherit" : "none"
      };
    },

    tagsStyle() {
      return {
        height: this.tagsHeight,
        display: this.tagsRender ? "inherit" : "none"
      };
    },

    mainStyle() {
      return {
        "min-height": `calc(100vh - ${this.headerHeight} - ${this.tagsHeight} - ${this.footerHeight})`,
        // marginTop: this.headerFixed ? this.headerHeight : "0px",
        marginBottom: this.footerFixed ? this.footerHeight : "0px"
      };
    },

    contentWrapperStyle() {
      return {
        marginTop: this.headerFixed ? this.headerHeight : "0px"
      };
    }
  },

  mixins: [],

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {
    this.$log.primary("primary");
    this.$log.success("success");
    this.$log.warning("warning");
    this.$log.danger("danger");
    this.$log.info("info");

    this.$log.capsule("title1", "capsule1", "primary");
    this.$log.capsule("title2", "capsule2", "success");
    this.$log.capsule("title3", "capsule3", "warning");
    this.$log.capsule("title4", "capsule4", "danger");
    this.$log.capsule("title5", "capsule5", "info");
  },

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