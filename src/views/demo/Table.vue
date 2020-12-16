<template>
  <el-card>
    <template #header>
      <span>综合</span>
      <div>header绑定值</div>
      <div>
        <w-JSON :content="tableHeader"></w-JSON>
      </div>
    </template>

    <w-table
      :data="tableData"
      v-model:headers="tableHeader"
      :total="total"
      :listFunc="getDataList"
      has-index
      has-select
      has-expand
      v-model:pageSize="queryFormData.pageSize"
      v-model:pageNum="queryFormData.pageNum"
    >
      <template #expand="{ expand }">
        <el-form label-position="left" inline class="demo-table-expand">
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
    </w-table>
  </el-card>

  <br />
</template>

<script lang='ts'>
import wTable from "/@/components/UI/Table/index.vue";
import wJSON from "/@/components/Others/JSON/index.vue";
import { ref, reactive, computed, defineComponent, onMounted } from "vue";

import { listUser } from "/@/mock/user.js";

export default defineComponent({
  name: "TableDemo",

  components: { wTable, wJSON },

  setup() {
    const queryFormData = reactive({
      pageNum: 1,
      pageSize: 10
    });

    const tableData = ref([]);
    const total = ref(0);

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
        width: "100px"
      },
      {
        label: "创建日期",
        prop: "createAt",
        width: "100px"
      }
    ];

    const getDataList = () => {
      const result = listUser(queryFormData);
      tableData.value = result.data;
      total.value = result.total;
    };

    onMounted(() => {
      getDataList();
    });

    return {
      tableData,
      tableHeader,
      total,

      getDataList,
      queryFormData
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