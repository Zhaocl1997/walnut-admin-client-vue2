<template>
  <el-tooltip
    effect="dark"
    :open-delay="100"
    placement="top-start"
    :disabled="showTooltip"
    :content="computedTooltipContent"
  >
    <el-popover placement="right" width="180" trigger="manual" v-model="popoverVisible">
      <div class="u-mb8">
        <i class="el-icon-warning" /> 提示
      </div>
      <div style="color:orangered;">{{ popoverContent }}</div>

      <el-input-number
        slot="reference"
        ref="wInputNumber"
        v-if="type == 'number'"
        :style="style"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        v-model="selfValue"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :size="size"
        :disabled="disabled"
        :controls="controls"
        :placeholder="placeholder"
        controls-position="right"
      ></el-input-number>

      <el-autocomplete
        slot="reference"
        ref="wAutocomplete"
        v-else-if="computedAuto"
        :style="style"
        @focus="onFocus"
        @blur="onBlur"
        @clear="onClear"
        v-model="selfValue"
        :debounce="500"
        :clearable="clearable"
        :size="size"
        :disabled="disabled"
        :placeholder="placeholder"
        :fetch-suggestions="computedFunc()"
        :trigger-on-focus="false"
      ></el-autocomplete>

      <el-input
        slot="reference"
        ref="wInput"
        v-else
        :style="style"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @clear="onClear"
        @keyup.enter.native="onKeyEnter"
        auto-complete="new-password"
        autocomplete="off"
        :type="calcType()"
        v-model="selfValue"
        :maxlength="maxlength"
        :minlength="minlength"
        :show-word-limit="showLimit"
        :placeholder="placeholder"
        :clearable="clearable"
        :show-password="showPassIcon"
        :disabled="disabled"
        :size="size"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :rows="rows"
        :autosize="autosize"
        :readonly="readonly"
      >
        <!-- prepend -->
        <template slot="prepend">
          <slot name="prepend"></slot>
        </template>

        <!-- append -->
        <template slot="append">
          <slot name="append"></slot>
        </template>
      </el-input>
    </el-popover>
  </el-tooltip>
</template>

<script>
import BlockMixins from "../utils/mixins/block";
import ValueMixins from "../utils/mixins/value";

import { isEmpty } from "easy-fns/lib/utils";
import { clearIllegalChars, clearUnexpectedChars } from "easy-fns/lib/string";
import { EMAIL_SUFFIX } from "easy-fns/lib/constant";

import { INPUT_CUSTOM_TYPE } from "../utils/constant";

export default {
  name: "wInput",

  components: {},

  mixins: [BlockMixins(), ValueMixins],

  data() {
    return {
      popoverContent: "",
      popoverVisible: false
    };
  },

  computed: {
    showTooltip() {
      return isEmpty(this.selfValue) || this.disabled || !this.tooltip;
    },

    computedAuto() {
      if (this.type === "email") {
        return true;
      } else {
        if (this.onFetchSuggestions) {
          return true;
        } else {
          return false;
        }
      }
    },

    computedTooltipContent() {
      return this.tooltipContent !== "这是tooltip内容"
        ? this.tooltipContent
        : String(this.selfValue);
    }
  },

  props: {
    // origin
    type: String,
    value: [String, Number],
    maxlength: Number,
    minlength: Number,
    showLimit: Boolean,
    placeholder: String,
    clearable: Boolean,
    showPassIcon: Boolean,
    disabled: Boolean,
    size: String,
    prefixIcon: String,
    suffixIcon: String,
    rows: Number,
    autosize: [Boolean, Object],
    readonly: Boolean,

    max: Number,
    min: Number,
    step: Number,
    precision: Number,
    controls: { type: Boolean, default: true },

    onFetchSuggestions: Function,

    // custom
    blackList: { type: Array, default: () => ["<", ">", "|", "="] },
    tooltip: { type: Boolean, default: false },
    tooltipContent: { type: String, default: "这是tooltip内容" }
  },

  methods: {
    /* 计算类型 */
    calcType() {
      if (this.type === "textarea") {
        return "textarea";
      } else {
        return "text";
      }
    },

    /* 自动补全函数 */
    computedFunc() {
      if (isEmpty(this.selfValue)) {
        return () => {};
      }

      if (this.type === "email" && !this.onFetchSuggestions) {
        return (queryString, callback) => {
          const arr = EMAIL_SUFFIX;

          arr.forEach(item => {
            if (queryString.indexOf(item.value) !== -1) {
              queryString = queryString.replace(item.value, "");
            }
          });

          let emailOptions = arr;
          // 把数组的浅复制换成深复制
          let results = JSON.parse(JSON.stringify(emailOptions));
          for (let item in results) {
            results[item].value = queryString + emailOptions[item].value;
          }

          callback(results);
        };
      } else {
        return this.onFetchSuggestions;
      }
    },

    /* 回车事件 */
    onKeyEnter(e) {
      this.$emit("keyup", e);
    },

    /* input事件 */
    onInput(val) {
      // 强制性去除特殊字符串,例如<>
      // 匹配单一类型输入,例如数字/字母/汉字
      this.selfValue = clearUnexpectedChars(
        clearIllegalChars(val, this.blackList),
        this.type
      );
    },

    /* 清空事件 */
    onClear() {
      this.$emit("clear");
    },

    /* 变化事件 */
    onChange(v) {
      this.$emit("change", v);
    },

    /* 聚焦事件 */
    onFocus() {
      this.popoverVisible = false;

      this.$emit("focus");
    },

    /* 模糊事件 */
    onBlur() {
      setTimeout(() => {
        if (isEmpty(this.selfValue)) {
          return;
        }

        for (let i = 0; i < INPUT_CUSTOM_TYPE.length; i++) {
          const element = INPUT_CUSTOM_TYPE[i];
          if (element[this.type] && !element[this.type].test(this.selfValue)) {
            this.invalidInfo(element.info);
          }
        }
      }, 200);

      this.$emit("blur");
    },

    /* 错误信息提示 */
    invalidInfo(msg) {
      this.popoverVisible = true;
      this.popoverContent = `${msg}格式错误`;
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