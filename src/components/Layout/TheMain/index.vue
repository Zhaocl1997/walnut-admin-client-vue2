<template>
  <div id="main-wrapper">
    <the-header v-if="headerRender"></the-header>
    <the-tags v-if="tagsRender"></the-tags>

    <div :style="style" id="main-container">
      <router-view></router-view>
    </div>

    <w-settings></w-settings>

    <the-footer v-if="footerRender"></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/Layout/TheHeader";
import TheTags from "@/components/Layout/TheTags";
import TheFooter from "@/components/Layout/TheFooter";
import wSettings from "@/components/UI/Others/Settings";

import layoutSettings from "@/assets/styles/abstracts/_variables.scss";

export default {
  name: "wMain",

  components: { TheHeader, TheTags, TheFooter, wSettings },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    headerRender() {
      return this.$store.state.settings.headerRender;
    },
    tagsRender() {
      return this.$store.state.settings.tagsRender;
    },
    footerRender() {
      return this.$store.state.settings.footerRender;
    },
    layoutSettings() {
      return layoutSettings;
    },
    style() {
      return {
        height:
          "calc(100vh - " +
          this.layoutSettings.layout_footerHeight +
          " - " +
          this.layoutSettings.layout_headerHeight +
          " - " +
          this.layoutSettings.layout_tagsHeight +
          ")"
      };
    }
  },

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {
    console.log(this.style);
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

<style lang="scss" scoped>
</style>