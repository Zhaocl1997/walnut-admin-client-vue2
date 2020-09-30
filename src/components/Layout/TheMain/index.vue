<template>
  <div id="main-wrapper">
    <the-header v-if="headerRender"></the-header>
    <the-tags v-if="tagsRender"></the-tags>

    <div id="main-container">
      <w-settings></w-settings>
      <router-view></router-view>
    </div>

    <the-footer v-if="footerRender"></the-footer>
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

<style scoped>
#main-wrapper {
  position: absolute;
  top: 0;
  left: 200px;
  bottom: 0;
  right: 0;

  background-color: lightgrey;
}

#main-container {
  background: rgba(236, 223, 223, 0.8);
}
</style>