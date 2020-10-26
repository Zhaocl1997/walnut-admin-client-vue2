<template>
  <el-radio-group v-model="v" :size="size" :disabled="disabled">
    <div v-if="!button">
      <el-radio
        v-for="item in options"
        :border="border"
        :key="item[optionValue]"
        :label="item[optionValue]"
        v-on="$listeners"
      >{{ item[optionLabel] }}</el-radio>
    </div>

    <div v-else>
      <el-radio-button
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
      >{{ item[optionLabel] }}</el-radio-button>
    </div>
  </el-radio-group>
</template>

<script>
import { isEmpty } from "easy-fns/lib/utils";

export default {
  name: "wRadio",

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
    v: {
      get() {
        return this.value;
      },
      set(newV) {
        this.$emit("input", newV);
      }
    }
  },

  watch: {},

  props: {
    value: [String, Number, Boolean],

    size: String,
    button: Boolean,
    disabled: Boolean,
    border: Boolean,

    options: { type: Array, required: true, default: () => [] },
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" }
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