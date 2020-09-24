<template>
  <div id="main-wrapper">
    <w-header-tag></w-header-tag>

    <div id="content-container">
      <router-view></router-view>
    </div>

    <w-footer></w-footer>
  </div>
</template>

<script>
import wHeaderTag from "./Tags";
import wFooter from "./Footer";

export default {
  name: "wMain",

  components: { wHeaderTag, wFooter },

  mixins: [],

  data() {
    return {};
  },

  computed: {},

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
  top: 50px;
  left: 200px;
  bottom: 0;
  right: 0;

  height: calc(100% - 50px);
  height: -webkit-calc(100% - 50px);
  height: -moz-calc(100% - 50px);
  padding: 10px;

  background-color: lightgrey;
}
</style>