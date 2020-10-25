<template>
  <div id="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        unique-opened
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TheLogo from "../TheLogo";
import sidebarItem from "./SidebarItem";
import variables from "@/assets/styles/abstracts/_variables.scss";

import routes from "@/utils/routes";

export default {
  name: "wSidebar",

  components: { TheLogo, sidebarItem },

  mixins: [],

  data() {
    return {
      // routes: routes
    };
  },

  computed: {
    ...mapGetters(["routes"]),

    isCollapse() {
      return this.$store.state.settings.sidebarCollapsed;
    },

    variables() {
      return variables;
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
</style>