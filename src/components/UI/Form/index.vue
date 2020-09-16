<template>
  <el-form
    ref="form"
    :model="value"
    :rules="rules"
    :inline="inline"
    :labelPosition="labelPosition"
    :labelWidth="labelWidth"
    :hideRequiredAsterisk="hideRequiredAsterisk"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :validateOnRuleChange="validateOnRuleChange"
    :statusIcon="statusIcon"
    :size="size"
    :disabled="disabled"
    @submit.native.prevent
  >
    <!-- layout -->
    <el-row :gutter="gutter" id="form-items">
      <el-col
        v-for="item in model"
        :key="item.prop"
        :span="item.span ? item.span : span"
        :style="item.float ? `float:${item.float};text-align:${item.float}`: ''"
      >
        <!-- form-item -->
        <el-form-item
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :labelWidth="item.labelWidth"
          :required="item.required"
          :rules="item.rules"
          :showMessage="item.showMessage"
          :inlineMessage="item.inlineMessage"
          :size="item.size"
        >
          <!-- label slot -->
          <span v-if="item.labelSlot" slot="label">
            <slot :name="item.prop" />
          </span>

          <!-- Input -->
          <w-input
            v-if="showItem(item, FORM_TYPE.INPUT)"
            v-model="value[item.prop]"
            v-bind="item"
            @keyup="onEnterKeyup"
          ></w-input>

          <!-- date -->
          <w-date v-if="showItem(item, FORM_TYPE.DATE)" v-model="value[item.prop]" v-bind="item"></w-date>

          <!-- time -->
          <w-time v-if="showItem(item, FORM_TYPE.TIME)" v-model="value[item.prop]" v-bind="item"></w-time>

          <!-- select -->
          <w-select
            v-if="showItem(item, FORM_TYPE.SELECT)"
            v-model="value[item.prop]"
            v-bind="item"
          ></w-select>

          <!-- switch -->
          <w-switch
            v-if="showItem(item, FORM_TYPE.SWITCH)"
            v-model="value[item.prop]"
            v-bind="item"
          ></w-switch>

          <!-- tag -->
          <w-tag v-if="showItem(item, FORM_TYPE.TAG)" v-model="value[item.prop]" v-bind="item"></w-tag>

          <!-- checkbox -->
          <w-checkbox
            v-if="showItem(item, FORM_TYPE.CHECKBOX)"
            v-model="value[item.prop]"
            v-bind="item"
          >{{ item.text }}</w-checkbox>

          <!-- named slot -->
          <slot v-if="showSlot(item)" :name="item.prop"></slot>
        </el-form-item>
      </el-col>
    </el-row>

    <div style="text-align:center;">
      <w-button v-if="mock" type="primary" icon="el-icon-edit" class="mr10" @click="onMock">模 拟</w-button>

      <w-button v-if="mock" type="warning" class="mr10" icon="el-icon-delete" @click="onReset">清 空</w-button>

      <w-button v-if="query" type="primary" icon="el-icon-search" class="mr10" @click="onQuery">搜 索</w-button>

      <w-button v-if="query" type="warning" class="mr10" icon="el-icon-refresh" @click="onReset">重 置</w-button>

      <w-button v-if="print" type="info" icon="el-icon-printer" class="mr10" v-print="printObj">打 印</w-button>

      <slot name="formButton" />
    </div>
  </el-form>
</template>

<script>
import wButton from "../Button";
import wInput from "../Input";
import wDate from "../Date";
import wTime from "../Time";
import wSelect from "../Select";
import wSwitch from "../Switch";
import wTag from "../Tag";
import wCheckbox from "../Checkbox";

import mockData from "@/mock";
import { FORM_TYPE } from "@/utils/constant";

export default {
  name: "wForm",

  components: {
    wButton,
    wInput,
    wDate,
    wTime,
    wSelect,
    wSwitch,
    wTag,
    wCheckbox
  },

  mixins: [],

  data() {
    return {
      FORM_TYPE: FORM_TYPE,
      printObj: {
        id: "form-items",
        popTitle: this.popTitle,
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      }
    };
  },

  computed: {},

  watch: {},

  props: {
    // origin
    value: Object,
    rules: Object,
    inline: Boolean,
    labelPosition: String,
    labelWidth: String,
    hideRequiredAsterisk: Boolean,
    showMessage: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    validateOnRuleChange: Boolean,
    size: String,
    disabled: Boolean,

    // custom
    model: { type: Array, required: true },
    query: Boolean,
    mock: Boolean,
    print: Boolean,
    span: Number,
    gutter: Number,
    popTitle: String
  },

  methods: {
    onEnterKeyup() {
      this.$emit("keyup");
    },
    onQuery() {
      this.$emit("query");
    },
    onReset() {
      this.$refs.form.resetFields();
      this.$emit("reset");
    },
    onMock() {
      const result = mockData(this.model);
      this.$emit("input", result);
    },
    showItem(item, TYPE) {
      return item.wType === TYPE && !item.slot;
    },
    showSlot(item) {
      return item.slot && this.$slots[item.prop];
    }
  },

  created() {},

  mounted() {
    console.log(this.$slots);
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