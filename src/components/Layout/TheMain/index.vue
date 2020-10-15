<template>
  <div id="main-wrapper">
    <div :class="{'fixed-header': headerFixed}">
      <TheHeader v-if="headerRender"></TheHeader>
      <TheTags v-if="tagsRender"></TheTags>
    </div>

    <div id="main-container">
      <router-view></router-view>
    </div>

    <w-settings></w-settings>

    <TheFooter :class="{'fixed-footer': footerFixed}" :style="footerStyle" v-if="footerRender"></TheFooter>
  </div>
</template>

<script>
import TheHeader from "@/components/Layout/TheHeader";
import TheTags from "@/components/Layout/TheTags";
import TheFooter from "@/components/Layout/TheFooter";
import wSettings from "@/components/UI/Others/Settings";

export default {
  name: "wMain",

  components: { TheHeader, TheTags, TheFooter, wSettings },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    headerFixed() {
      return this.$store.state.settings.headerFixed;
    },

    footerFixed() {
      return this.$store.state.settings.footerFixed;
    },

    headerRender() {
      return this.$store.state.settings.headerRender;
    },

    tagsRender() {
      return this.$store.state.settings.tagsRender;
    },

    footerRender() {
      return this.$store.state.settings.footerRender;
    },

    footerHeight() {
      return this.$store.state.settings.footerHeight;
    },

    footerStyle() {
      return {
        height: this.footerHeight
      };
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
</style>