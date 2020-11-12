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
      <div slot="formInputNumber">
        <p style="color:red;font-size:10px">数字</p>
      </div>

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
          value: "1",
          label: "jack"
        },
        {
          value: "2",
          label: "tom"
        },
        {
          value: "3",
          label: "rose",
          disabled: true
        },
        {
          value: "4",
          label: "lucy"
        },
        {
          value: "5",
          label: "jimmy"
        },
        {
          value: "6",
          label: "chunk",
          disabled: true
        },
        {
          value: "7",
          label: "kim"
        },
        {
          value: "8",
          label: "gustvo"
        },
        {
          value: "9",
          label: "ermenchant"
        }
      ]
    };
  },

  computed: {
    formModel() {
      return [
        // ==================================
        // ==============Input============
        // ==================================
        {
          wType: "Divider",
          title: "Input",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Input",
          prop: "formInputBase",
          label: "基本",
          placeholder: "基本",
          tooltip: true,
          clearable: true
        },
        {
          wType: "Input",
          prop: "formInputTextarea",
          label: "文本域",
          placeholder: "默认禁止输入了['<', '>', '|', '=']这几个特殊符号",
          type: "textarea",
          span: 16,
          rows: 5,
          showLimit: true,
          maxlength: 50
        },

        // ======================================
        // ==============Input Number============
        // ======================================
        {
          wType: "Divider",
          title: "Input Number",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Input",
          prop: "formInputNumber",
          label: "",
          labelSlot: true,
          type: "number",
          step: 5,
          max: 30,
          min: 5,
          precision: 4,
          span: 12,
          placeholder: "数字"
        },

        // ======================================
        // ==============Input Type============
        // ======================================
        {
          wType: "Divider",
          title: "Input Type",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Input",
          prop: "formInputPassword",
          label: "密码",
          placeholder: "密码",
          type: "password",
          clearable: true,
          showPassIcon: true
        },
        {
          wType: "Input",
          prop: "formInputPhone",
          label: "手机号",
          placeholder: "手机号",
          clearable: true,
          type: "phone"
        },
        {
          wType: "Input",
          prop: "formInputEmail",
          label: "邮箱",
          placeholder: "邮箱",
          clearable: true,
          type: "email"
        },
        {
          wType: "Input",
          prop: "formInputId",
          label: "身份证号",
          placeholder: "身份证号",
          clearable: true,
          type: "id"
        },
        {
          wType: "Input",
          prop: "formInputIP",
          label: "IP地址",
          placeholder: "IP地址",
          clearable: true,
          type: "ip"
        },
        {
          wType: "Input",
          prop: "formInputMacAddress",
          label: "mac地址",
          placeholder: "mac地址",
          clearable: true,
          type: "macAddress"
        },

        // ======================================
        // ==============Input Single Type============
        // ======================================
        {
          wType: "Divider",
          title: "Input Single Type",
          span: 24,
          contentPosition: "left"
        },
        {
          wType: "Input",
          prop: "formInputLetter",
          label: "字母",
          placeholder: "字母",
          clearable: true,
          type: "letter"
        },
        {
          wType: "Input",
          prop: "formInputChinese",
          label: "汉字",
          placeholder: "汉字",
          clearable: true,
          type: "chinese"
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
          label: "基本",
          options: this.selectOptions,
          clearable: true
        },
        {
          wType: "Select",
          prop: "formSelectObject",
          label: "单选-绑定对象",
          options: this.selectOptions,
          clearable: true,
          valueKey: "value"
        },
        {
          wType: "Select",
          prop: "formSelectMultipleArray",
          label: "多选-数组",
          options: this.selectOptions,
          clearable: true,
          multiple: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleString",
          label: "多选-字符串",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          valueFormat: ","
        },
        {
          wType: "Select",
          prop: "formSelectMultipleCollapse",
          label: "多选-坍塌",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          collapse: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleDraggable",
          label: "多选-可拖拽",
          options: this.selectOptions,
          clearable: true,
          multiple: true,
          draggable: true
        },
        {
          wType: "Select",
          prop: "formSelectMultipleObject",
          label: "多选-绑定对象",
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
          label: "基本",
          type: "datetime"
        },
        {
          wType: "Date",
          prop: "formDateTimeDefaultTime",
          label: "带默认时间",
          type: "datetime",
          defaultTime: "12:00:00"
        },
        {
          wType: "Date",
          prop: "formDateTimeRange",
          label: "区间",
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
          label: "基本"
        },
        {
          wType: "Date",
          prop: "formDatePickerOptions",
          label: "带选项",
          pickerOptions: this.pickerOptions
        },
        {
          wType: "Date",
          prop: "formDateWeek",
          label: "周",
          type: "week",
          format: "yyyy 第 WW 周"
        },
        {
          wType: "Date",
          prop: "formDateMonth",
          label: "月",
          type: "month",
          format: "yyyy 年 M 月"
        },
        {
          wType: "Date",
          prop: "formDateYear",
          label: "年",
          type: "year",
          format: "yyyy 年"
        },
        {
          wType: "Date",
          prop: "formDateMultiple",
          label: "多个时间",
          type: "dates"
        },
        {
          wType: "Date",
          prop: "formDateBaseRange",
          label: "基本区间",
          type: "daterange"
        },
        {
          wType: "Date",
          prop: "formDateMonthRange",
          label: "月份区间",
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
          label: "picker"
        },
        {
          wType: "Time",
          prop: "formTimeSelect",
          label: "select",
          type: "select"
        },
        {
          wType: "Time",
          prop: "formTimeSelectRange",
          label: "区间",
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
          label: "基本",
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchText",
          label: "显示文字",
          activeText: "按月付费",
          inactiveText: "按年付费",
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchValue",
          label: "自定义值",
          activeValue: 0,
          inactiveValue: 100,
          span: 12
        },
        {
          wType: "Switch",
          prop: "formSwitchColor",
          label: "自定义颜色",
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
          label: "基本",
          span: 12
        },
        {
          wType: "Tag",
          prop: "formTagChangeable",
          label: "可增删",
          closable: true,
          addable: true,
          span: 12,
          effect: "dark"
        },
        {
          wType: "Tag",
          prop: "formTagDraggable",
          label: "可拖拽",
          closable: true,
          addable: true,
          draggable: true,
          span: 12,
          effect: "light"
        },
        {
          wType: "Tag",
          prop: "formTagString",
          label: "字符串",
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
          label: "基本",
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
          label: "多选项",
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
          label: "基本",
          labelText: "记住密码"
        },
        {
          wType: "Checkbox",
          prop: "formCheckboxMultipleArray",
          label: "数组",
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
          label: "字符串",
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