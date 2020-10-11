<template>
  <div id="sidebar-logo-container" :class="{'collapse': collapse}">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" />
        <h1 v-if="!collapse" class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import { title } from "@/utils/setting";

export default {
  name: "wSidebarLogo",

  components: {},

  mixins: [],

  data() {
    return {
      title: title,
      logo: logo
    };
  },

  computed: {},

  watch: {},

  props: {
    collapse: Boolean
  },

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