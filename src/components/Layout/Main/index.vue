<template>
  <div id="main">
    <w-tag></w-tag>

    <div id="container">main</div>

    <w-footer></w-footer>
  </div>
</template>

<script>
import wTag from "./Tags";
import wFooter from "./Footer";

export default {
  name: "wMain",

  components: { wTag, wFooter },

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
#main {
  position: absolute;
  top: 50px;
  left: 200px;
  bottom: 0;
  right: 0;

  height: calc(100% - 50px);
  height: -webkit-calc(100% - 50px);
  height: -moz-calc(100% - 50px);
  padding: 10px;

  width: 100%;
  background-color: lightgrey;
}

#container {
  position: absolute;
  top: 20px;
  left: 0;
}
</style>