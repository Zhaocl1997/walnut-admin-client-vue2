<template>
  <div>
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