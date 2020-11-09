<template>
  <el-date-picker
    v-model="selfValue"
    v-bind="$props"
    :readonly="readonly"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :size="size"
    :placeholder="placeholder"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :type="type"
    :format="format"
    :align="align"
    :picker-options="pickerOptions"
    range-separator="-"
    :default-value="defaultValue"
    :default-time="defaultTime"
    :value-format="valueFormat"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
    :style="style"
  ></el-date-picker>
</template>

<script>
import BlockMixins from "@/mixins/Block";
import ValueMixins from "@/mixins/Value";

export default {
  name: "wDate",

  components: {},

  // model: {
  //   event: "change",
  //   prop: "value"
  // },

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
    placeholder: { type: String, default: "请选择日期" },
    type: String,
    format: String,
    align: String,
    pickerOptions: Object,
    defaultValue: Date,
    defaultTime: [String, Array],
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