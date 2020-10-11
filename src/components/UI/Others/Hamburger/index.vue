<template>
  <w-icon icon="expand" class="hamburger" :class="{'is-active': isActive}" @click="toggleClick" />
</template>

<script>
export default {
  name: "wHamburger",

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
    isActive: Boolean
  },

  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
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
.hamburger.is-active {
  transition: transform 0.3s;
  transform: rotate(180deg);
}
</style>