<template>
  <div>
    <!-- multiple -->
    <el-checkbox-group
      v-if="multiple"
      v-model="checkedValue"
      @change="onMultipleChange"
      :min="min"
      :max="max"
      v-on="$listeners"
    >
      <template v-if="button">
        <el-checkbox-button
          v-for="item in options"
          :key="item[optionValue]"
          :label="item[optionValue]"
          :disabled="item.disabled"
        >{{ item[optionLabel] }}</el-checkbox-button>
      </template>

      <template v-else>
        <el-checkbox
          v-for="item in options"
          :key="item[optionValue]"
          :label="item[optionValue]"
          :disabled="item.disabled"
          :border="border"
        >{{ item[optionLabel] }}</el-checkbox>
      </template>
    </el-checkbox-group>

    <!-- single -->
    <el-checkbox
      v-on="$listeners"
      @change="onChange"
      v-else
      v-model="selfValue"
      :disabled="disabled"
    >{{ labelText }}</el-checkbox>
  </div>
</template>

<script>
import ValueMixins from "../utils/mixins/value";
import { isEmpty } from "easy-fns/lib/utils";

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
      checkedValue: []
    };
  },

  computed: {
    isForamattable() {
      return this.multiple && !isEmpty(this.valueFormat);
    }
  },

  watch: {
    value() {
      this.feedBack();
    }
  },

  props: {
    // origin
    value: [Boolean, String, Array],
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    border: Boolean,

    // custom
    options: Array,
    optionValue: { type: String, default: "value" },
    optionLabel: { type: String, default: "label" },
    button: Boolean,
    multiple: Boolean,
    labelText: String,

    valueFormat: String,
    valueType: { type: String, default: "number" }
  },

  methods: {
    feedBack() {
      if (!isEmpty(this.selfValue)) {        
        if (this.isForamattable) {
          this.checkedValue = this.onValueType(
            this.selfValue.split(this.valueFormat)
          );
        } else {
          this.checkedValue = this.selfValue;
        }
      }
    },

    onChange(v) {
      this.$emit("input", v);
    },

    onMultipleChange(v) {
      if (this.isForamattable) {
        this.selfValue = v.join(this.valueFormat);
      }
    },

    /* value 值判断 */
    onValueType(v) {
      if (this.multiple) {
        if (this.valueType === "number") {
          return v.map(Number);
        }

        if (this.valueType === "string") {
          return v.map(String);
        }
      } else {
        if (this.valueType === "number") {
          return Number(v);
        }

        if (this.valueType === "string") {
          return String(v);
        }
      }
    }
  },

  created() {},

  mounted() {
    this.feedBack();
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