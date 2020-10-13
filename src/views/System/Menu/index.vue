<template>
  <div>
    <h1>Menu0</h1>
    <div v-for="i in 30" :key="i">
      <h1>Menu{{i}}</h1>
    </div>
    <h1>Menu999</h1>
  </div>
</template>

<script>
export default {
  name: "Menu",

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