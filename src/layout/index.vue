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
import { mapState } from "vuex";

import TheHeader from "@/components/Layout/TheHeader";
import TheSidebar from "@/components/Layout/TheSidebar";
import TheTags from "@/components/Layout/TheTags";
import TheMain from "@/components/Layout/TheMain";
import TheFooter from "@/components/Layout/TheFooter";
import TheSettings from "@/components/UI/Others/Settings";

import throttle from "easy-fns/lib/Throttle";

import ResizeMixin from "../mixins/Resize";

export default {
  name: "Layout",

  components: {
    TheSidebar,
    TheMain,
    TheHeader,
    TheTags,
    TheFooter,
    TheSettings
  },

  mixins: [ResizeMixin],

  data() {
    return {
      sidebarMarinTop: true
    };
  },

  computed: {
    ...mapState({
      device: state => state.app.device,

      /* header */
      headerRender: state => state.settings.headerRender,
      headerFixed: state => state.settings.headerFixed,
      headerHeight: state => state.settings.headerHeight,

      /* sidebar */
      sidebarRender: state => state.settings.sidebarRender,
      sidebarCollapsed: state => state.settings.sidebarCollapsed,
      sidebarWidth: state => state.settings.sidebarWidth,

      /* tags */
      tagsRender: state => state.settings.tagsRender,
      // tagsFixed: state => state.settings.tagsFixed,
      tagsHeight: state => state.settings.tagsHeight,

      /* footer */
      footerRender: state => state.settings.footerRender,
      footerFixed: state => state.settings.footerFixed,
      footerHeight: state => state.settings.footerHeight
    }),

    /* header-style */
    headerStyle() {
      return {
        height: this.headerHeight,
        display: this.headerRender ? "inherit" : "none"
      };
    },

    /* sidebar-style */
    sidebarStyle() {
      return {
        width: this.sidebarCollapsed ? "63px" : this.sidebarWidth,
        display: this.sidebarRender ? "inherit" : "none",
        marginTop: this.sidebarMarinTop
          ? this.headerRender
            ? this.headerHeight
            : "0"
          : "0"
      };
    },

    /* tags-style */
    tagsStyle() {
      return {
        height: this.tagsHeight,
        display: this.tagsRender ? "inherit" : "none"
      };
    },

    /* main-style */
    mainStyle() {
      return {
        "min-height": this.onMainHeight(),
        marginBottom: this.footerFixed ? this.footerHeight : "0px"
      };
    },

    /* footer-style */
    footerStyle() {
      return {
        width:
          this.footerFixed && this.sidebarRender
            ? this.sidebarCollapsed
              ? `calc(100vw - 63px)`
              : `calc(100vw - ${this.sidebarWidth})`
            : "100vw",
        height: this.footerHeight,
        display: this.footerRender ? "inherit" : "none",
        marginLeft:
          this.footerFixed && this.sidebarRender
            ? this.sidebarCollapsed
              ? "63px"
              : this.sidebarWidth
            : "0px"
      };
    },

    /* content-style */
    contentStyle() {
      return {
        marginLeft: this.sidebarRender
          ? this.sidebarCollapsed
            ? "63px"
            : this.sidebarWidth
          : "0px",
        transition: "all 0.3s"
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

  methods: {
    init() {
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

      this.onScroll = throttle(this.onScroll, 50);

      window.addEventListener("scroll", this.onScroll, true);
    },

    onScroll(e) {
      const top = document.documentElement.scrollTop;

      if (this.headerFixed) {
        return;
      }

      if (top > parseInt(this.headerHeight)) {
        this.sidebarMarinTop = false;
      } else {
        this.sidebarMarinTop = true;
      }
    },

    onMainHeight() {
      if (this.headerRender && this.tagsRender && this.footerRender) {
        return `calc(100vh - ${this.headerHeight} - ${this.tagsHeight} - ${this.footerHeight})`;
      } else if (this.headerRender && this.tagsRender) {
        return `calc(100vh - ${this.headerHeight} - ${this.tagsHeight})`;
      } else if (this.headerRender && this.footerRender) {
        return `calc(100vh - ${this.headerHeight} - ${this.footerHeight})`;
      } else if (this.tagsRender && this.footerRender) {
        return `calc(100vh - ${this.tagsHeight} - ${this.footerHeight})`;
      } else if (this.headerRender) {
        return `calc(100vh - ${this.headerHeight})`;
      } else if (this.tagsRender) {
        return `calc(100vh - ${this.tagsHeight})`;
      } else if (this.footerRender) {
        return `calc(100vh - ${this.footerHeight})`;
      } else {
        return "100vh";
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

  beforeDestroy() {},

  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  },

  activated() {}
};
</script>

<style scoped>
</style>