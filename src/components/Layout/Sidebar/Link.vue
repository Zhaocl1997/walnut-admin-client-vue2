<template>
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "wLink",

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {
    to: { type: String, required: true }
  },

  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      }
      return {
        is: "router-link",
        to: url
      };
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
</style>