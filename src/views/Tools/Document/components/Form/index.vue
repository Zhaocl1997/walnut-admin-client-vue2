<template>
  <div>
    <p>w-form 当前绑定值：{{ form }}</p>
    <div style="width:80%;margin:auto;">
      <el-slider v-model="gutter"></el-slider>
    </div>

    <w-form
      :model="formModel"
      v-model="form"
      :gutter="gutter"
      :span="8"
      label-width="120px"
      mock
      query
      reset
      print
      fold
      default-fold
      popTitle="walnut-admin"
    >
      <div slot="formNumber">
        <p style="color:red;font-size:10px">数字表单项</p>
      </div>

      <w-input
        slot="formPass"
        v-model="form.formPass"
        type="password"
        placeholder="密码输入框"
        clearable
        show-pass-icon
      >
        <w-button
          slot="append"
          icon="el-icon-question"
          popover
          popover-title="提示"
          popover-content="密码中必须包含大小写字母、数字、特殊字符"
        ></w-button>
      </w-input>

      <w-button slot="formButton" @click="onCustomButton">自定义按钮1</w-button>
    </w-form>
  </div>
</template>

<script>
import wForm from "@/components/UI/Base/Form";
import wButton from "@/components/UI/Base/Button";
import wInput from "@/components/UI/Base/Input";

export default {
  name: "",

  components: { wButton, wInput, wForm },

  mixins: [],

  data() {
    return {
      gutter: 0,

      form: {
        formTagBase: ["标签1", "标签2", "标签3"]
      },

      // date
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      // select
      selectOptions: [
        {
          value: 1,
          label: "jack"
        },
        {
          value: 2,
          label: "tom"
        },
        {
          value: 3,
          label: "rose",
          disabled: true
        },
        {
          value: 4,
          label: "lucy"
        },
        {
          value: 5,
          label: "jimmy"
        },
        {
          value: 6,
          label: "chunk",
          disabled: true
        },
        {
          value: 7,
          label: "kim"
        },
        {
          value: 8,
          label: "gustvo"
        },
        {
          value: 9,
          label: "ermenchant"
        }
      ]
    };
  },

  computed: {
    formModel() {
      return [
        {
          wType: "Input",
          prop: "formNumber",
          label: "", // 数字表单项
          type: "number",
          step: 5,
          max: 30,
          min: 5,
          precision: 2,
          placeholder: "数字输入框",
          labelSlot: true
        },
        {
          wType: "Input",
          prop: "formTextarea",
          label: "文本域表单项",
          type: "textarea",
          rows: 3,
          showLimit: true,
          maxlength: 50,
          placeholder: "普通文本域",
          span: 16
        },
        {
          wType: "Slot",
          prop: "formPass",
          label: "密码表单项"
        },
        {
          wType: "Input",
          prop: "formPhone",
          label: "手机号表单项",
          placeholder: "手机号",
          type: "phone"
        },
        {
          wType: "Input",
          prop: "formEmail",
          label: "邮箱表单项",
          placeholder: "邮箱",
          type: "email"
        },
        {
          wType: "Input",
          prop: "formId",
          label: "身份证表单项",
          placeholder: "身份证",
          type: "id"
        },
        {
          wType: "Select",
          prop: "formSelect",
          label: "下拉框表单项",
          options: [
            {
              id: 1,
              name: "jack"
            },
            {
              id: 2,
              name: "tom"
            },
            {
              id: 3,
              name: "rose"
            }
          ],
          optionLabel: "name",
          optionValue: "id",
          multiple: false,
          draggable: true
        },

        // ==================================
        // ==============Select============
        // ==================================
        {
          wType: "Divider",
          title: "Select",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Select",
          prop: "formSelectBase",
          label: "下拉框-基本",
          options: this.selectOptions,
          clearable: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleArray",
          label: "下拉框-多选-数组",
          options: this.selectOptions,
          clearable: true,
          multiple: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleString",
          label: "下拉框-多选-字符串",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          valueFormat: ","
        },
        {
          wType: "Select",
          prop: "formSelectMultipleCollapse",
          label: "下拉框-多选-坍塌",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          collapse: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleDraggable",
          label: "下拉框-多选-可拖拽",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          draggable: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleObject",
          label: "下拉框-多选-绑定对象",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          valueKey: "value"
        },

        // ==================================
        // ==============DateTime============
        // ==================================
        {
          wType: "Divider",
          title: "DateTime",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Date",
          prop: "formDateTimeBase",
          label: "日期时间-基本",
          type: "datetime"
        },
        {
          wType: "Date",
          prop: "formDateTimeDefaultTime",
          label: "日期时间-带默认时间",
          type: "datetime",
          defaultTime: "12:00:00"
        },
        {
          wType: "Date",
          prop: "formDateTimeRange",
          label: "日期时间-区间",
          type: "datetimerange",
          defaultTime: ["08:00:00", "12:00:00"]
        },

        // ==================================
        // ==============Date============
        // ==================================
        {
          wType: "Divider",
          title: "Date",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Date",
          prop: "formDateBase",
          label: "日期-基本"
        },
        {
          wType: "Date",
          prop: "formDatePickerOptions",
          label: "日期-带选项",
          pickerOptions: this.pickerOptions
        },
        {
          wType: "Date",
          prop: "formDateWeek",
          label: "日期-周",
          type: "week",
          format: "yyyy 第 WW 周"
        },
        {
          wType: "Date",
          prop: "formDateMonth",
          label: "日期-月",
          type: "month",
          format: "yyyy 年 M 月"
        },
        {
          wType: "Date",
          prop: "formDateYear",
          label: "日期-年",
          type: "year",
          format: "yyyy 年"
        },
        {
          wType: "Date",
          prop: "formDateMultiple",
          label: "日期-多个时间",
          type: "dates"
        },
        {
          wType: "Date",
          prop: "formDateBaseRange",
          label: "日期-基本区间",
          type: "daterange"
        },
        {
          wType: "Date",
          prop: "formDateMonthRange",
          label: "日期-月份区间",
          type: "monthrange"
        },

        // ==================================
        // ==============Time============
        // ==================================
        {
          wType: "Divider",
          title: "Time",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Time",
          prop: "formTimePicker",
          label: "时间-picker"
        },
        {
          wType: "Time",
          prop: "formTimeSelect",
          label: "时间-select",
          type: "select"
        },
        {
          wType: "Time",
          prop: "formTimeSelectRange",
          label: "时间-区间",
          isRange: true,
          arrowControl: true
        },

        // ==================================
        // ==============Switch============
        // ==================================
        {
          wType: "Divider",
          title: "Switch",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Switch",
          prop: "formSwitchBase",
          label: "开关-基本",
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchText",
          label: "开关-显示文字",
          activeText: "按月付费",
          inactiveText: "按年付费",
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchValue",
          label: "开关-自定义值",
          activeValue: 0,
          inactiveValue: 100,
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchColor",
          label: "开关-自定义颜色",
          activeColor: "#13ce66",
          inactiveColor: "#ff4949",
          span: 12
        },

        // ==================================
        // ==============Tag============
        // ==================================
        {
          wType: "Divider",
          title: "Tag",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Tag",
          prop: "formTagBase",
          label: "标签-基本",
          span: 12
        },
        {
          wType: "Tag",
          prop: "formTagChangeable",
          label: "标签-可增删",
          closable: true,
          addable: true,
          span: 12,
          effect: "dark"
        },
        {
          wType: "Tag",
          prop: "formTagDraggable",
          label: "标签-可拖拽",
          closable: true,
          addable: true,
          draggable: true,
          span: 12,
          effect: "light"
        },
        {
          wType: "Tag",
          prop: "formTagString",
          label: "标签-字符串",
          valueFormat: ",",
          closable: true,
          addable: true,
          draggable: true,
          span: 12,
          effect: "plain"
        },

        // ==================================
        // ==============Radio============
        // ==================================
        {
          wType: "Divider",
          title: "Radio",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Radio",
          prop: "formRadioBase",
          label: "单选-基本",
          options: [
            {
              value: true,
              label: "是"
            },
            {
              value: false,
              label: "否"
            }
          ]
        },
        {
          wType: "Radio",
          prop: "formRadioMultiple",
          label: "单选-多选项",
          span: 16,
          options: [
            {
              value: 1,
              label: "A"
            },
            {
              value: 2,
              label: "B"
            },
            {
              value: 3,
              label: "C"
            },
            {
              value: 4,
              label: "D"
            }
          ]
        },

        // ==================================
        // ==============Checkbox============
        // ==================================
        {
          wType: "Divider",
          title: "Checkbox",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Checkbox",
          prop: "formCheckboxBase",
          label: "多选-基本",
          labelText: "记住密码"
        },
        {
          wType: "Checkbox",
          prop: "formCheckboxMultipleArray",
          label: "多选-数组",
          multiple: true,
          options: [
            {
              value: 1,
              label: "A"
            },
            {
              value: 2,
              label: "B"
            },
            {
              value: 3,
              label: "C"
            },
            {
              value: 4,
              label: "D"
            }
          ]
        },
        {
          wType: "Checkbox",
          prop: "formCheckboxMultipleString",
          label: "多选-字符串",
          multiple: true,
          valueFormat: ",",
          options: [
            {
              value: 1,
              label: "A"
            },
            {
              value: 2,
              label: "B"
            },
            {
              value: 3,
              label: "C"
            },
            {
              value: 4,
              label: "D"
            }
          ]
        }
      ];
    }
  },

  watch: {},

  props: {},

  methods: {
    onCustomButton() {
      this.$message.success("自定义按钮");
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