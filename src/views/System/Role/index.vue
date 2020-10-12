<template>
  <div>
    <el-card class="u-mb10">
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
      ></w-form>
    </w-dialog>
  </div>
</template>

<script>
import wInput from "@/components/UI/Base/Input";
import wButton from "@/components/UI/Base/Button";
import wTable from "@/components/UI/Base/Table";
import wForm from "@/components/UI/Base/Form";
import wDialog from "@/components/UI/Base/Dialog";

import wActionBox from "@/components/UI/Advanced/ActionBox";

import {
  roleIndex,
  roleCreate,
  roleRead,
  roleUpdate,
  roleDelete
} from "@/api/system/role";

import { menuOptions } from "@/api/system/menu";

import { format } from "@/utils/time";

export default {
  name: "Role",

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
      queryFormData: {
        pageNum: 1,
        pageSize: 10
      },

      tableData: [],
      total: 0,
      loading: false,
      selected: [],

      menuOptions: [],

      dialogVisible: false,
      dialogTitle: "",
      dialogFormData: {},
      dialogFormRules: {}
    };
  },

  computed: {
    tableHeader() {
      return [
        {
          label: "角色名称",
          prop: "name",
          width: "100px"
        },
        {
          label: "角色描述",
          prop: "describe",
          width: "100px"
        },
        {
          label: "用户数量",
          prop: "userCount",
          width: "100px",
          formatter: row => row.userCount + "个用户"
        },
        {
          label: "角色权限",
          prop: "menu",
          width: "100px",
          formatter: row => row.menu.length + "项权限"
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
          label: "角色名称",
          placeholder: "请输入角色名称"
        },
        {
          wType: "Input",
          prop: "describe",
          label: "角色描述",
          placeholder: "请输入角色描述"
        },
        {
          wType: "Tree",
          prop: "menu",
          label: "角色权限",
          placeholder: "请输入角色权限",
          data: this.menuOptions,
          nodeKey: "_id",
          props: {
            children: "subs",
            label: "title"
          },
          multiple: true
        }
      ];
    },
    format() {
      return format;
    }
  },

  watch: {},

  props: {},

  methods: {
    init() {
      this.getTableData();

      menuOptions().then(res => {
        this.menuOptions = res.data;
      });
    },

    onCreate() {
      this.dialogVisible = true;
      this.dialogTitle = "新增用户";
    },

    onUpdate() {
      this.dialogVisible = true;
      this.dialogTitle = "编辑用户";

      roleRead({ _id: this.selected[0]._id }).then(res => {
        this.dialogFormData = res.data;
      });
    },

    onDelete() {
      roleDelete({ _id: this.selected[0]._id }).then(res => {
        this.$message.success("删除成功");
        this.getTableData();
      });
    },

    onImport() {},

    onExport() {},

    async getTableData() {
      this.loading = true;
      const result = await roleIndex();
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
            roleUpdate(this.dialogFormData).then(res => {
              this.$message.success("编辑成功");
              this.onDialogCancel();
              this.getTableData();
            });
          } else {
            roleCreate(this.dialogFormData).then(res => {
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