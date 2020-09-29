<template>
  <div
    v-if="selfIsExternal"
    :style="styleExternalIcon"
    class="w-icon w-icon-external"
    v-on="$listeners"
  ></div>
  <svg v-else :id="iconName" :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "wIcon",

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

  computed: {
    selfIsExternal() {
      return isExternal(this.icon);
    },
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgClass() {
      if (this.customClass) {
        return "w-icon " + this.customClass;
      } else {
        return "w-icon";
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.icon}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.icon}) no-repeat 50% 50%`
      };
    }
  },

  watch: {},

  props: {
    icon: { type: String, required: true },
    size: String,
    customClass: { type: String, default: "" }
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
:focus {
  outline: 0;
}
.w-icon {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  /*   overflow: hidden; */
}

.w-icon-external {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>