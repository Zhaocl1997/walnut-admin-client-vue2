<template>
  <div class="github-container">
    <a :href="url" target="_Blank">
      <w-icon icon="github" style="color:black;"></w-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "wGithub",

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

  props: {
    url: {
      type: String,
      default: "https://github.com/Zhaocl1997"
    }
  },

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