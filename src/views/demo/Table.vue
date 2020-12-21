<template>
  <el-card>
    <template #header>
      <span>综合</span>

      <el-form inline>
        <el-form-item label="单选">
          <el-switch v-model="single" />
        </el-form-item>

        <el-form-item label="多选">
          <el-switch v-model="multiple" />
        </el-form-item>

        <el-form-item label="索引">
          <el-switch v-model="hasIndex" />
        </el-form-item>

        <el-form-item label="多选">
          <el-switch v-model="hasSelect" />
        </el-form-item>

        <el-form-item label="展开">
          <el-switch v-model="hasExpand" />
        </el-form-item>

        <el-form-item label="设置">
          <el-switch v-model="showSettings" />
        </el-form-item>

        <el-form-item label="分页">
          <el-switch v-model="showPage" />
        </el-form-item>
      </el-form>

      <div>单选/多选 绑定值：【{{ tableValue }}】</div>
      <div>pageSize 绑定值：【{{ pageSize }}】</div>
      <div>pageNum 绑定值：【{{ pageNum }}】</div>
      <div>header 绑定值</div>
      <div>
        <w-JSON v-model="tableHeader" />
      </div>
    </template>

    <w-table
      v-model="tableValue"
      v-model:headers="tableHeader"
      v-model:pageSize="pageSize"
      v-model:pageNum="pageNum"
      :data="tableData"
      :total="total"
      :list-func="getDataList"
      :has-index="hasIndex"
      :has-select="hasSelect"
      :has-expand="hasExpand"
      :show-settings="showSettings"
      :show-page="showPage"
      :single="single"
      :multiple="multiple"
    >
      <template #expand="{ expand }">
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
        >
          <el-form-item label="用户姓名">
            <span>{{ expand.row.name }}</span>
          </el-form-item>

          <el-form-item label="年龄">
            <span>{{ expand.row.age }}</span>
          </el-form-item>

          <el-form-item label="性别">
            <span>{{ expand.row.sex }}</span>
          </el-form-item>

          <el-form-item label="城市">
            <span>{{ expand.row.city }}</span>
          </el-form-item>

          <el-form-item label="描述">
            <span>{{ expand.row.description }}</span>
          </el-form-item>
        </el-form>
      </template>

      <template #status="{ props }">
        <el-switch v-model="props.row.status" />
      </template>
    </w-table>
  </el-card>

  <br>
</template>

<script>
import wTable from "/@/components/UI/Table/index.vue";
import wJSON from "/@/components/Others/JSON/index.vue";
import {
  ref,
  reactive,
  computed,
  defineComponent,
  onMounted,
  toRef,
  toRefs,
  watch
} from "vue";

import { listUser } from "/@/mock/user.js";

export default defineComponent({
  name: "TableDemo",

  components: { wTable, wJSON },

  setup() {
    const state = reactive({
      hasIndex: false,
      hasSelect: false,
      hasExpand: false,
      showSettings: false,
      showPage: false,

      single: false,
      multiple: false
    });

    const queryFormData = reactive({
      pageNum: 1,
      pageSize: 10
    });

    const table = reactive({
      total: 0,
      tableData: [],
      tableValue: undefined
    });

    const tableHeader = [
      {
        label: "姓名",
        prop: "name",
        width: "100px"
      },
      {
        label: "性别",
        prop: "sex",
        width: "50px"
      },
      {
        label: "年龄",
        prop: "age",
        width: "100px",
        formatter: ({ age }) => `${age}岁`
      },
      {
        label: "省份",
        prop: "province",
        width: "100px"
      },
      {
        label: "城市",
        prop: "city",
        width: "100px"
      },
      {
        label: "区县",
        prop: "country",
        width: "100px"
      },
      {
        label: "个人网址",
        prop: "site",
        width: "100px"
      },
      {
        label: "状态",
        prop: "status",
        width: "100px",
        slot: true
      },
      {
        label: "创建日期",
        prop: "createAt",
        width: "100px"
      },
      {
        label: "父亲姓名",
        prop: "family.dad",
        width: "100px"
      },
      {
        label: "母亲姓名",
        prop: "family.mom",
        width: "100px"
      }
    ];

    const getDataList = () => {
      const result = listUser(queryFormData);
      table.tableData = result.data;
      table.total = result.total;
    };

    onMounted(() => {
      getDataList();
    });

    return {
      getDataList,

      ...toRefs(queryFormData),
      ...toRefs(table),
      ...toRefs(state),

      tableHeader
    };
  }
});
</script>

<style lang='scss' scoped>
.demo-table-expand:deep() {
  font-size: 0;

  label {
    width: 90px;
    color: #99a9bf;
  }

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>