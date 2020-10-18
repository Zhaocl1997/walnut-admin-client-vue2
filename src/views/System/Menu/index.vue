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
        row-key="_id"
      >
        <template slot="action">
          <w-button type="text" size="mini" icon="el-icon-edit" class="u-mr10">修改</w-button>
          <w-button type="text" size="mini" icon="el-icon-plus" class="u-mr10">新增</w-button>
          <w-button type="text" size="mini" icon="el-icon-delete">删除</w-button>
        </template>
      </w-table>
    </el-card>

    <w-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogTitle="dialogTitle"
      footer
      width="40%"
      top="4vh"
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
    >
      <w-form
        ref="menuForm"
        :model="dialogFormModel"
        :rules="dialogFormRules"
        v-model="dialogFormData"
        :span="24"
        :gutter="20"
        label-width="80px"
      >
        <template slot="icon" slot-scope="scope">
          <w-icon :icon="scope.row.icon"></w-icon>
        </template>
      </w-form>
    </w-dialog>
  </div>
</template>

<script>
import wButton from "@/components/UI/Base/Button";
import wTable from "@/components/UI/Base/Table";
import wForm from "@/components/UI/Base/Form";
import wDialog from "@/components/UI/Base/Dialog";

import wActionBox from "@/components/UI/Advanced/ActionBox";

import {
  userIndex,
  userCreate,
  userRead,
  userUpdate,
  userDelete
} from "@/api/system/user";

import {
  menuOptions,
  menuIndex,
  menuCreate,
  menuRead,
  menuUpdate,
  menuDelete
} from "@/api/system/menu";

import { format } from "@/utils/time";
import { arrToTree } from "@/utils/tree";

export default {
  name: "User",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wButton, wTable, wForm, wDialog, wActionBox },

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
      dialogFormData: {
        type: "catalog",
        order: 0,
        external: false,
        show: true,
        status: true
      },
      dialogFormRules: {}
    };
  },

  computed: {
    tableHeader() {
      return [
        {
          label: "菜单名称",
          prop: "title",
          width: "100px"
        },
        {
          label: "图标",
          prop: "icon",
          width: "80px",
          slot: true
        },
        {
          label: "组件路径",
          prop: "path",
          width: "100px"
        },
        {
          label: "状态",
          prop: "status",
          width: "100px"
        },
        {
          label: "创建时间",
          prop: "createdAt",
          width: "180px",
          formatter: row => this.format(row.createdAt)
        },
        {
          label: "修改时间",
          prop: "updatedAt",
          width: "180px",
          formatter: row => this.format(row.updatedAt)
        },
        {
          label: "操作",
          prop: "action",
          width: "180px",
          slot: true
        }
      ];
    },

    dialogFormModel() {
      return [
        {
          wType: "TreeSelect",
          prop: "parentId",
          label: "上级菜单",
          data: this.menuOptions,
          placeholder: "请选择上级菜单",
          treeProps: {
            id: "_id",
            label: "title",
            children: "children"
          }
        },
        {
          wType: "Radio",
          prop: "type",
          label: "菜单类型",
          options: [
            {
              value: "catalog",
              label: "目录"
            },
            {
              value: "menu",
              label: "菜单"
            },
            {
              value: "button",
              label: "按钮"
            }
          ]
        },
        {
          wType: "IconSelect",
          prop: "icon",
          label: "菜单图标",
          span: 12
        },
        {
          wType: "Input",
          prop: "title",
          label: "菜单名称",
          placeholder: "请输入菜单名称",
          span: 12
        },
        {
          wType: "Input",
          prop: "location",
          label: "路由地址",
          placeholder: "请输入路由地址",
          span: 12
        },
        {
          wType: "Input",
          prop: "order",
          label: "显示排序",
          placeholder: "请输入显示排序",
          type: "number",
          span: 12
        },
        {
          wType: "Radio",
          prop: "external",
          label: "是否外链",
          options: [
            {
              value: true,
              label: "是"
            },
            {
              value: false,
              label: "否"
            }
          ],
          span: 12
        },
        {
          wType: "Radio",
          prop: "show",
          label: "显示状态",
          options: [
            {
              value: true,
              label: "显示"
            },
            {
              value: false,
              label: "隐藏"
            }
          ],
          span: 12
        },
        {
          wType: "Radio",
          prop: "status",
          label: "菜单状态",
          options: [
            {
              value: true,
              label: "正常"
            },
            {
              value: false,
              label: "停用"
            }
          ],
          span: 12
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
        const data = arrToTree(res.data, "5f8c3a3dfd35c823ac00ef1e", true, {
          id: "_id",
          parentId: "parentId",
          children: "children"
        });

        this.menuOptions = [data];
      });
    },

    onCreate() {
      this.dialogVisible = true;
      this.dialogTitle = "新增菜单";
    },

    onUpdate() {
      this.dialogVisible = true;
      this.dialogTitle = "编辑菜单";

      userRead({ _id: this.selected[0]._id }).then(res => {
        this.dialogFormData = res.data;
      });
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
      const result = await menuIndex();

      const data = arrToTree(result.data, "5f8c3a3dfd35c823ac00ef1e", true, {
        id: "_id",
        parentId: "parentId",
        children: "children"
      });

      console.log(data);

      this.tableData = [data];
      this.total = result.total;
      this.loading = false;
    },

    onSelectionChange(v) {
      this.selected = v;
    },

    onDialogConfirm() {
      this.$refs.menuForm.$children[0].validate(valid => {
        if (valid) {
          if (this.dialogFormData._id) {
            menuUpdate(this.dialogFormData).then(res => {
              this.$message.success("编辑成功");
              this.onDialogCancel();
              this.getTableData();
            });
          } else {
            menuCreate(this.dialogFormData).then(res => {
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
      this.$refs.menuForm.$children[0].clearValidate();
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