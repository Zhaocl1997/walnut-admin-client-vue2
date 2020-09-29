<template>
  <div>
    <el-checkbox-group v-if="multiple" v-model="selfValue">
      <template v-if="button">
        <el-checkbox-button
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :disabled="item.disabled"
          :min="min"
          :max="max"
        ></el-checkbox-button>
      </template>

      <template v-else>
        <el-checkbox
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :disabled="item.disabled"
          :min="min"
          :max="max"
          :border="border"
        ></el-checkbox>
      </template>
    </el-checkbox-group>

    <el-checkbox v-else v-model="selfValue" :disabled="disabled">
      <span v-if="$slots.default[0]">{{ $slots.default[0].text }}</span>
    </el-checkbox>
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
    return {};
  },

  computed: {},

  watch: {},

  props: {
    // origin
    value: [Boolean, Array],
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    border: Boolean,

    // custom
    options: Array,
    button: Boolean,
    multiple: Boolean
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