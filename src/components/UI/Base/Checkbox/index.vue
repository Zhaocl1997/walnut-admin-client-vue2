<template>
  <div>
    <!-- multiple -->
    <el-checkbox-group
      v-if="multiple"
      v-model="customValue"
      @change="onChange"
      v-bind="$props"
      v-on="$listeners"
    >
      <template v-if="button">
        <el-checkbox-button
          v-for="item in options"
          :key="item[optionValue]"
          :label="item[optionValue]"
          :disabled="item.disabled"
          v-bind="$props"
          v-on="$listeners"
        >{{ item[optionLabel] }}</el-checkbox-button>
      </template>

      <template v-else>
        <el-checkbox
          v-for="item in options"
          :key="item[optionValue]"
          :label="item[optionValue]"
          :disabled="item.disabled"
          v-bind="$props"
          v-on="$listeners"
        >{{ item[optionLabel] }}</el-checkbox>
      </template>
    </el-checkbox-group>

    <!-- single -->
    <el-checkbox
      v-else
      @change="onChange"
      v-model="customValue"
      v-bind="$props"
      v-on="$listeners"
    >{{ labelText }}</el-checkbox>
  </div>
</template>

<script>
import { Checkbox, CheckboxButton, CheckboxGroup } from "element-ui";
import { isEmpty } from "easy-fns/lib/utils";

import ValueFormatMixins from "../utils/mixins/value-format";

export default {
  name: "wCheckbox",

  inheritattrs: false,

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [ValueFormatMixins([], false)],

  data() {
    return {};
  },

  computed: {
    isForamattable() {
      return this.multiple && !isEmpty(this.valueFormat);
    }
  },

  watch: {
    value() {
      this.onInitCustomValue();
    }
  },

  props: {
    ...Checkbox.props,
    ...CheckboxButton.props,
    ...CheckboxGroup.props,

    // custom
    button: Boolean,
    labelText: String
  },

  methods: {
    init() {
      this.onInitCustomValue();
    },

    onChange(v) {
      this.onValueChange(v);
    }
  },

  created() {},

  mounted() {
    this.init();
  },

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