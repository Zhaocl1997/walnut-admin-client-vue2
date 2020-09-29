<template>
  <div id="main-wrapper">
    <the-tags></the-tags>

    <div id="main-container">
      <router-view></router-view>
    </div>

    <the-footer></the-footer>
  </div>
</template>

<script>
import TheTags from "../TheTags";
import TheFooter from "../TheFooter";

export default {
  name: "wMain",

  components: { TheTags, TheFooter },

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

#main-container {
  background: rgba(236, 223, 223, 0.8);
}
</style>