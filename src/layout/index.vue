<template>
  <div>
    <w-header></w-header>
    <w-sidebar></w-sidebar>

    <w-main></w-main>
  </div>
</template>

<script>
import wHeader from "@/components/Layout/Header";
import wSidebar from "@/components/Layout/Sidebar";
import wMain from "@/components/Layout/Main";

export default {
  name: "wIndex",

  components: { wHeader, wSidebar, wMain },

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