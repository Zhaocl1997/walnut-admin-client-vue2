<template>
  <div>
    <el-checkbox-group v-if="multiple" v-model="selfValue" :min="min" :max="max">
      <template v-if="button">
        <el-checkbox-button
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :disabled="item.disabled"
        >{{ item.label }}</el-checkbox-button>
      </template>

      <template v-else>
        <el-checkbox
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :disabled="item.disabled"
          :border="border"
        >{{ item.label }}</el-checkbox>
      </template>
    </el-checkbox-group>

    <el-checkbox v-on="$listeners" @change="onChange" v-else v-model="normalValue" :disabled="disabled">{{ labelText }}</el-checkbox>
  </div>
</template>

<script>
import ValueMixins from "@/mixins/Value";

export default {
  name: "wCheckbox",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [ValueMixins],

  data() {
    return {
      normalValue: false
    };
  },

  computed: {},

  watch: {},

  props: {
    // origin
    value: {
      type: [Boolean, Array],
      default: () => []
    },
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    border: Boolean,

    // custom
    options: Array,
    button: Boolean,
    multiple: Boolean,
    labelText: String
  },

  methods: {
    onChange(v) {
      this.$emit("input", v);
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