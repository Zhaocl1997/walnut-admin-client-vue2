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
    <el-row :gutter="gutter" id="w-form">
      <el-col
        v-for="item in formModel"
        :key="item.prop"
        :span="item.span ? item.span : span"
        :style="item.float ? `float:${item.float};text-align:${item.float}`: ''"
      >
        <template v-if="calcShow(item)">
          <!-- divider -->
          <el-divider v-if="showItem(item, FORM_TYPE.DIVIDER)" v-bind="item">{{ item.title }}</el-divider>

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
              v-on="item"
              @keyup="onEnterKeyup"
            ></w-input>

            <!-- date -->
            <w-date
              v-if="showItem(item, FORM_TYPE.DATE)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-date>

            <!-- time -->
            <w-time
              v-if="showItem(item, FORM_TYPE.TIME)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-time>

            <!-- select -->
            <w-select
              v-if="showItem(item, FORM_TYPE.SELECT)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-select>

            <!-- switch -->
            <w-switch
              v-if="showItem(item, FORM_TYPE.SWITCH)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-switch>

            <!-- tag -->
            <w-tag
              v-if="showItem(item, FORM_TYPE.TAG)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-tag>

            <!-- checkbox -->
            <w-checkbox
              v-if="showItem(item, FORM_TYPE.CHECKBOX)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-checkbox>

            <!-- tree -->
            <w-tree
              v-if="showItem(item, FORM_TYPE.TREE)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-tree>

            <!-- radio -->
            <w-radio
              v-if="showItem(item, FORM_TYPE.RADIO)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-radio>

            <!-- icon-select -->
            <w-select-icon
              v-if="showItem(item, FORM_TYPE.SELECT_ICON)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-select-icon>

            <!-- tree-select -->
            <w-select-tree
              v-if="showItem(item, FORM_TYPE.SELECT_TREE)"
              v-model="value[item.prop]"
              v-bind="item"
              v-on="item"
            ></w-select-tree>

            <!-- named slot -->
            <slot v-if="showSlot(item)" :name="item.prop"></slot>
          </el-form-item>
        </template>
      </el-col>
    </el-row>

    <!-- button slot -->
    <el-form-item class="u-block" v-if="showAction">
      <w-button v-if="mock" type="success" @click="onMock" tooltip tooltipContent="模拟">
        <i class="el-icon-edit"></i>
      </w-button>

      <w-button
        v-if="scopedMock"
        type="success"
        @click="onScopedMock"
        tooltip
        tooltipContent="局部模拟"
      >
        <i class="el-icon-edit"></i>
      </w-button>

      <w-button v-if="query" type="primary" @click="onQuery" tooltip tooltipContent="查询">
        <i class="el-icon-search"></i>
      </w-button>

      <w-button v-if="reset" type="warning" @click="onReset" tooltip tooltipContent="重置">
        <i class="el-icon-refresh"></i>
      </w-button>

      <w-button v-if="print" type="info" v-print="printObj" tooltip tooltipContent="打印">
        <i class="el-icon-printer"></i>
      </w-button>

      <w-button
        v-if="fold"
        type="info"
        @click="onToggleFold"
        tooltip
        :tooltipContent="hidden ? '展开' : '收起'"
      >
        <i :class="hidden ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
      </w-button>

      <slot name="formButton" />
    </el-form-item>
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
import wTree from "../Tree";
import wRadio from "../Radio";
import wSelectTree from "../SelectTree";
import wSelectIcon from "../../Others/SelectIcon";

import mockData from "../utils/mock";
import { FORM_TYPE } from "../utils/constant";

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
    wCheckbox,
    wTree,
    wRadio,
    wSelectIcon,
    wSelectTree
  },

  mixins: [],

  data() {
    return {
      FORM_TYPE: FORM_TYPE,
      hidden: false,
      formModel: []
    };
  },

  computed: {
    showAction() {
      return (
        this.mock ||
        this.scopedMock ||
        this.query ||
        this.reset ||
        this.print ||
        this.fold ||
        this.$slots.formButton
      );
    },

    printObj() {
      return {
        id: "w-form",
        popTitle: this.printTitle
      };
    }
  },

  watch: {
    model: {
      immediate: true,
      handler(newV, oldV) {
        this.formModel = newV;
      }
    }
  },

  props: {
    // origin
    value: Object,
    rules: Object,
    inline: Boolean,
    labelPosition: String,
    labelWidth: String,
    hideRequiredAsterisk: Boolean,
    showMessage: { type: Boolean, default: true },
    inlineMessage: Boolean,
    statusIcon: Boolean,
    validateOnRuleChange: { type: Boolean, default: true },
    size: String,
    disabled: Boolean,

    // custom
    model: { type: Array, required: true },

    mock: Boolean,
    scopedMock: Boolean,
    query: Boolean,
    reset: Boolean,
    print: Boolean,
    fold: Boolean,

    printTitle: { type: String, default: "walnut-admin" },

    span: Number,
    gutter: Number,

    countToFold: { type: Number, default: 3 },
    defaultFold: Boolean
  },

  methods: {
    init() {
      if (this.defaultFold) {
        this.hidden = true;
        this.formModel = this.model.slice(0, this.countToFold);
      }
    },

    onMock() {
      const result = mockData(this.formModel);
      this.$emit("input", result);
    },

    onScopedMock() {
      const result = mockData(this.formModel.filter(i => i.mock));
      this.$emit("input", result);
    },

    onQuery() {
      this.$emit("query");
    },

    onReset() {
      this.resetFields();
      this.$emit("input", {});
      this.$emit("reset");
    },

    onToggleFold() {
      this.hidden = !this.hidden;

      if (!this.hidden) {
        this.formModel = this.model;
      } else {
        this.formModel = this.model.slice(0, this.countToFold);
      }
    },

    onEnterKeyup() {
      this.$emit("keyup");
    },

    showItem(item, TYPE) {
      return item.wType === TYPE && !item.slot;
    },

    showSlot(item) {
      return item.slot && this.$slots[item.prop];
    },

    calcShow(item) {
      const isShow = item.show === undefined ? true : item.show;
      return isShow;
    },

    validate(callback) {
      this.$refs.form.validate(valid => {
        callback(valid);
      });
    },

    resetFields() {
      this.$refs.form.resetFields();
    },

    clearValidate(props) {
      this.$refs.form.clearValidate(props);
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