<template>
  <div id="sidebar-container">
    <div :class="{'has-logo':showLogo}">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import sidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";
import routes from "@/utils/routes";

export default {
  name: "wSidebar",

  components: { sidebarItem, Logo },

  mixins: [],

  data() {
    return {
      routes: routes
    };
  },

  computed: {
    // ...mapGetters(["permission_routes", "sidebar"]),
    ...mapGetters(["sidebar"]),

    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return true; // this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.isOpened;
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