<template>
  <div class="center-show">
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

      formModel: [
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
          wType: "Input",
          prop: "formPass",
          label: "密码表单项",
          type: "password",
          slot: true
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
          wType: "Date",
          prop: "formDate",
          label: "日期表单项",
          type: "date"
        },
        {
          wType: "Date",
          prop: "formDateTime",
          label: "日期时间表单项",
          type: "datetime"
        },
        {
          wType: "Time",
          prop: "formTime",
          label: "时间表单项",
          type: "picker",
          valueFormat: "HH:mm:ss"
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
        {
          wType: "Switch",
          prop: "formSwitch",
          label: "开关表单项"
        },
        {
          wType: "Tag",
          prop: "formTag",
          label: "标签表单项",
          type: "success",
          effect: "dark",
          closable: true,
          addable: true,
          draggable: true,
          valueFormat: ",",
          span: 24
        },
        {
          wType: "Checkbox",
          prop: "formCheckbox",
          label: "勾选框表单项",
          text: "记住密码"
        }
      ],
      form: {}
    };
  },

  computed: {},

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