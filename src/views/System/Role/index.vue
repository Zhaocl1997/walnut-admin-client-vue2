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
        ref="roleForm"
        :model="dialogFormModel"
        :rules="dialogFormRules"
        v-model="dialogFormData"
        :span="24"
        label-width="80px"
      >
        <template slot="menu">
          <w-checkbox
            v-model="menuTreeSetting"
            multiple
            :options="checkboxOptions"
            @change="onCheckBoxChange"
          ></w-checkbox>

          <div style="border:1px solid lightgrey;">
            <w-tree
              ref="wTree"
              multiple
              v-model="dialogFormData.menu"
              :data="this.treeOptions"
              :props="treeProps"
              :check-strictly="treeCheck"
            ></w-tree>
          </div>
        </template>
      </w-form>
    </w-dialog>
  </div>
</template>

<script>
import wInput from "@/components/UI/Base/Input";
import wButton from "@/components/UI/Base/Button";
import wTable from "@/components/UI/Base/Table";
import wForm from "@/components/UI/Base/Form";
import wDialog from "@/components/UI/Base/Dialog";
import wTree from "@/components/UI/Base/Tree";
import wCheckbox from "@/components/UI/Base/Checkbox";

import wActionBox from "@/components/UI/Advanced/ActionBox";

import {
  roleIndex,
  roleCreate,
  roleRead,
  roleUpdate,
  roleDelete
} from "@/api/system/role";

import { menuOptions } from "@/api/system/menu";
import { arrToTree, format } from "easy-fns/lib/Time";

export default {
  name: "Role",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {
    wInput,
    wButton,
    wTable,
    wForm,
    wDialog,
    wTree,
    wCheckbox,
    wActionBox
  },

  mixins: [],

  data() {
    return {
      rootId: "",
      treeOptions: [],
      treeProps: {
        id: "_id",
        label: "title",
        children: "children"
      },

      menuTreeSetting: [],

      queryFormData: {
        pageNum: 1,
        pageSize: 10
      },

      tableData: [],
      total: 0,
      loading: false,
      selected: [],

      dialogVisible: false,
      dialogTitle: "",
      dialogFormData: {
        order: 0,
        status: true,
        menu: []
      },
      dialogFormRules: {},

      checkboxOptions: [
        {
          value: "0",
          label: "展开/折叠"
        },
        {
          value: "1",
          label: "全选/全不选"
        },
        {
          value: "2",
          label: "父子联动"
        }
      ]
    };
  },

  computed: {
    treeCheck() {
      return this.menuTreeSetting.includes("2");
    },

    tableHeader() {
      return [
        {
          label: "角色名称",
          prop: "name",
          width: "100px"
        },
        {
          label: "权限字符",
          prop: "permissionCharacter",
          width: "100px"
        },
        {
          label: "备注",
          prop: "remark",
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
          formatter: row => row.menu.length - 1 + "项权限"
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
          prop: "permissionCharacter",
          label: "权限字符",
          placeholder: "请输入权限字符"
        },
        {
          wType: "Input",
          prop: "order",
          label: "显示顺序",
          placeholder: "",
          type: "number"
        },
        {
          wType: "Radio",
          prop: "status",
          label: "角色状态",
          options: [
            {
              value: true,
              label: "正常"
            },
            {
              value: false,
              label: "停用"
            }
          ]
        },
        {
          wType: "Slot",
          prop: "menu",
          label: "角色权限"
        },
        {
          wType: "Input",
          prop: "remark",
          label: "备注",
          placeholder: "请输入备注",
          type: "textarea"
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
        this.treeOptions = res.data.children;
        this.rootId = res.data._id;
      });
    },

    onCreate() {
      this.dialogVisible = true;
      this.dialogTitle = "新增用户";
    },

    onUpdate() {
      this.dialogVisible = true;
      this.dialogTitle = "编辑用户";

      roleRead({ _id: this.selected[0] }).then(res => {
        this.dialogFormData = res.data;
      });
    },

    onDelete() {
      roleDelete({ _id: this.selected }).then(res => {
        this.$message.success("删除成功");
        this.getTableData();
      });
    },

    onImport() {},

    onExport() {},

    async getTableData() {
      this.loading = true;
      const res = await roleIndex();
      this.tableData = res.data;
      this.total = res.total;
      this.loading = false;
    },

    onSelectionChange(v) {
      this.selected = v.map(item => item._id);
    },

    onDialogConfirm() {
      this.$refs.roleForm.$children[0].validate(valid => {
        if (valid) {
          if (this.dialogFormData._id) {
            this.dialogFormData.menu.push(this.rootId);
            roleUpdate(this.dialogFormData).then(res => {
              this.$message.success("编辑成功");
              this.onDialogCancel();
              this.getTableData();
            });
          } else {
            this.dialogFormData.menu.push(this.rootId);
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
      this.dialogFormData = {
        order: 0,
        status: true,
        menu: []
      };
      this.$refs.roleForm.$children[0].clearValidate();
    },

    onCheckBoxChange(val) {
      if (val.includes("0")) {
        this.$refs.wTree.expandAll(true);
      } else {
        this.$refs.wTree.expandAll(false);
      }

      if (val.includes("1")) {
        this.$refs.wTree.checkAll(true);
      } else {
        this.$refs.wTree.checkAll(false);
      }
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