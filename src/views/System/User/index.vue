<template>
  <div>
    <el-card class="mb10">
      <w-action-box
        :number="selected.length"
        @create="onCreate"
        @update="onUpdate"
        @delete="onDelete"
        @import="onImport"
        @export="onExport"
      ></w-action-box>
    </el-card>

    <el-card>
      <w-table
        :tableData="tableData"
        :tableHeader="tableHeader"
        :pageSize.sync="queryFormData.pageSize"
        :pageNum.sync="queryFormData.pageNum"
        :total="total"
        :selection-change="onSelectionChange"
        :listFunc="getTableData"
        v-loading="loading"
        hasIndex
        hasSelect
      ></w-table>
    </el-card>

    <w-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogTitle="dialogTitle"
      footer
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
    >
      <w-form
        ref="userForm"
        :model="dialogFormModel"
        :rules="dialogFormRules"
        v-model="dialogFormData"
        :span="24"
        label-width="80px"
        mock
      >
        <w-input
          slot="password"
          v-model="dialogFormData.password"
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
      </w-form>
    </w-dialog>
  </div>
</template>

<script>
import wInput from "@/components/UI/Input";
import wButton from "@/components/UI/Button";
import wTable from "@/components/UI/Table";
import wForm from "@/components/UI/Form";
import wDialog from "@/components/UI/Dialog";
import wActionBox from "@/components/UI/ActionBox";

import {
  userIndex,
  userCreate,
  userRead,
  userUpdate,
  userDelete
} from "@/api/system/user";

import { roleIndex } from "@/api/system/role";

import { format } from "@/utils/time";

export default {
  name: "User",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wInput, wButton, wTable, wForm, wDialog, wActionBox },

  mixins: [],

  data() {
    return {
      format: undefined,

      queryFormData: {
        pageNum: 1,
        pageSize: 10
      },

      tableData: [],
      total: 0,
      loading: false,
      selected: [],

      roleOptions: [],

      dialogVisible: false,
      dialogTitle: "",
      dialogFormData: {},
      dialogFormRules: {
        name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: ["blur"]
          }
          // {
          //   min: 3,
          //   max: 12,
          //   message: "昵称长度在3到12位",
          //   trigger: ["blur"]
          // }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur"] }
          // { min: 9, max: 16, message: "密码长度在9到16位", trigger: ["blur","change"] }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" }
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: "请输入正确的邮箱",
          //   trigger: "change"
          // }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["blur"]
          }
          // {
          //   pattern: /^[1][2-9][0-9]{9}$/,
          //   message: "请输入正确的手机号码",
          //   trigger: ["blur"]
          // }
        ],
        role: [
          {
            required: true,
            message: "请选择角色 ",
            trigger: ["blur"]
          }
        ]
      }
    };
  },

  computed: {
    tableHeader() {
      return [
        {
          label: "用户名",
          prop: "name",
          width: "100px"
        },
        {
          label: "性别",
          prop: "gender",
          width: "100px"
        },
        {
          label: "角色",
          prop: "role",
          width: "100px",
          formatter: row => row.role.name
        },
        {
          label: "状态",
          prop: "status",
          width: "100px"
        },
        {
          label: "创建时间",
          prop: "createdAt",
          width: "100px",
          formatter: row => this.format(row.createdAt)
        },
        {
          label: "修改时间",
          prop: "updatedAt",
          width: "100px",
          formatter: row => this.format(row.updatedAt)
        }
      ];
    },
    dialogFormModel() {
      return [
        {
          wType: "Input",
          prop: "name",
          label: "昵称",
          placeholder: "请输入用户名"
        },
        {
          wType: "Input",
          prop: "password",
          label: "密码",
          placeholder: "请输入密码",
          type: "password",
          slot: true
        },
        {
          wType: "Input",
          prop: "email",
          label: "邮箱",
          placeholder: "请输入邮箱",
          type: "email"
        },
        {
          wType: "Input",
          prop: "phone",
          label: "手机号",
          placeholder: "请输入手机号",
          type: "phone"
        },
        {
          wType: "Select",
          prop: "role",
          label: "角色",
          placeholder: "请选择角色",
          options: this.roleOptions,
          optionLabel: "describe",
          optionValue: "_id"
        }
      ];
    }
  },

  watch: {},

  props: {},

  methods: {
    init() {
      this.getTableData();
      this.format = format;

      roleIndex().then(res => {
        this.roleOptions = res.data;
      });
    },

    onCreate() {
      this.dialogVisible = true;
      this.dialogTitle = "新增用户";
    },

    onUpdate() {
      this.dialogVisible = true;
      this.dialogTitle = "编辑用户";
    },

    onDelete() {
      userDelete({ _id: this.selected[0]._id }).then(res => {
        this.$message.success("删除成功");
        this.getTableData();
      });
    },

    onImport() {},

    onExport() {},

    async getTableData() {
      this.loading = true;
      const result = await userIndex();
      this.tableData = result.data;
      this.total = result.total;
      this.loading = false;
    },

    onSelectionChange(v) {
      this.selected = v;
    },

    onDialogConfirm() {
      this.$refs.userForm.$children[0].validate(valid => {
        if (valid) {
          if (this.dialogFormData._id) {
            console.log("update");
          } else {
            userCreate(this.dialogFormData).then(res => {
              this.$message.success("添加成功");
              this.onDialogCancel();
              this.getTableData();
            });
          }
        }
      });
    },

    onDialogCancel() {
      this.dialogVisible = false;
      this.dialogTitle = "";
      this.dialogFormData = {};
      this.$refs.userForm.$children[0].clearValidate();
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