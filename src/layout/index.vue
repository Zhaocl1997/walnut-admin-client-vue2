<template>
  <div>
    <the-header></the-header>
    <the-sidebar></the-sidebar>

    <the-main></the-main>
  </div>
</template>

<script>
import TheHeader from "@/components/Layout/TheHeader";
import TheSidebar from "@/components/Layout/TheSidebar";
import TheMain from "@/components/Layout/TheMain";

export default {
  name: "wIndex",

  components: { TheHeader, TheSidebar, TheMain },

  mixins: [],

  data() {
    return {};
  },

  computed: {},

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