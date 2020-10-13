<template>
  <div id="main-wrapper">
    <div :class="{'fixed-header': headerFixed}">
      <the-header v-if="headerRender"></the-header>
      <the-tags v-if="tagsRender"></the-tags>
    </div>

    <div id="main-container">
      <router-view></router-view>
    </div>

    <w-settings></w-settings>

    <the-footer :class="{'fixed-footer': footerFixed}" v-if="footerRender"></the-footer>
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