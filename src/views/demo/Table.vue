<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ }}】</span>
    </template>

    <w-table :data="data" :columns="columns"></w-table>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>斑马纹，当前绑定值：【{{ }}】</span>
    </template>

    <w-table :data="data" :columns="columns" stripe></w-table>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>边框，当前绑定值：【{{ }}】</span>
    </template>

    <w-table :data="data" :columns="columns" border></w-table>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>综合，当前绑定值：【{{ }}】</span>
    </template>

    <w-table :data="userData" :columns="userColumns" :total="userTotal"></w-table>
  </el-card>

  <br />
</template>

<script lang='ts'>
import wTable from "/@/components/UI/Table/index.vue";
import { ref, reactive, computed, defineComponent, onMounted } from "vue";

import { listUser } from "/@/mock/user.js";

export default defineComponent({
  name: "TableDemo",

  components: { wTable },

  setup() {
    const data = [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }
    ];

    const columns = [
      {
        label: "日期",
        prop: "date"
      },
      {
        label: "姓名",
        prop: "name"
      },
      {
        label: "地址",
        prop: "address"
      }
    ];

    const userData = ref([]);
    const userTotal = ref(0);

    const userColumns = [
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
        width: "100px"
      },
      {
        label: "出生年月",
        prop: "birth",
        width: "100px"
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
      }
    ];

    onMounted(() => {
      const result = listUser({ pageNum: 1, pageSize: 10 });
      userData.value = result.data;
      userTotal.value = result.total;
    });

    return {
      data,
      columns,

      userData,
      userTotal,

      userColumns
    };
  }
});
</script>

<style lang='scss' scoped>
</style>