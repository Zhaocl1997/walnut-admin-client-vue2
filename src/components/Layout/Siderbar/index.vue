<template>
  <div id="siderBar">
    <div>siderbar</div>
  </div>
</template>

<script>
import resizeMixins from "@/mixins/ResizeHandler";

export default {
  name: "wSiderBar",

  components: {},

  mixins: [resizeMixins],

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
#siderBar {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  width: 200px;
  background-color: grey;
}
</style>