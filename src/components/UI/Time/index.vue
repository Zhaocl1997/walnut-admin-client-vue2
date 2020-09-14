<template>
  <div>
    <el-time-select
      v-if="type === 'select'"
      v-model="selfValue"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :align="align"
      :picker-options="pickerOptions"
      range-separator="-"
      :default-value="defaultValue"
      :value-format="valueFormat"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      :style="style"
    ></el-time-select>

    <el-time-picker
      v-if="type === 'picker'"
      v-model="selfValue"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :align="align"
      :picker-options="pickerOptions"
      range-separator="-"
      :default-value="defaultValue"
      :value-format="valueFormat"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      :style="style"
    ></el-time-picker>
  </div>
</template>

<script>
import BlockMixins from "@/mixins/Block";
import ValueMixins from "@/mixins/Value";

export default {
  name: "wTime",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [BlockMixins(), ValueMixins],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {
    // origin
    value: [Date, String, Array],
    readonly: Boolean,
    disabled: Boolean,
    editable: Boolean,
    clearable: { type: Boolean, default: true },
    size: String,
    type: String,
    placeholder: { type: String, default: "请选择时间" },
    align: String,
    pickerOptions: Object,
    defaultValue: Date,
    valueFormat: String
  },

  methods: {
    onChange(v) {
      this.$emit("change", v);
    },
    onBlur(v) {
      this.$emit("blur", v);
    },
    onFocus(v) {
      this.$emit("focus", v);
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