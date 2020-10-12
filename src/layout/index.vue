<template>
  <div class="app-wrapper">
    <the-sidebar v-if="sidebarRender"></the-sidebar>
    <the-main></the-main>
  </div>
</template>

<script>
import TheSidebar from "@/components/Layout/TheSidebar";
import TheMain from "@/components/Layout/TheMain";

export default {
  name: "wIndex",

  components: { TheSidebar, TheMain },

  mixins: [],

  data() {
    return {};
  },

  computed: {
    sidebarRender() {
      return this.$store.state.settings.sidebarRender;
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