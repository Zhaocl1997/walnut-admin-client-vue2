<template>
  <div class="inline">
    <el-tooltip effect="dark" content="锁屏" placement="bottom">
      <w-icon icon="lock" customClass="right-icon" @click="onLock"></w-icon>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "wLock",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {},

  methods: {
    onLock() {}
  },

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