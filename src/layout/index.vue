<template>
  <div>
    <w-header></w-header>
    <w-siderbar></w-siderbar>

    <w-main></w-main>
  </div>
</template>

<script>
import wHeader from "@/components/Layout/Header";
import wSiderbar from "@/components/Layout/Siderbar";
import wMain from "@/components/Layout/Main";

export default {
  name: "wIndex",

  components: { wHeader, wSiderbar, wMain },

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