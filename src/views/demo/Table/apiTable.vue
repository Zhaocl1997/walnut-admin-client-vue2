<template>
  <el-card>
    <template #header>
      <span>高级表格</span>
    </template>

    <w-table
      v-model:headers="getTableHeader"
      table-title="API Table"
      table-help="API Table"
      :api-fn="listUser"
    >
    </w-table>
  </el-card>

  <br />
</template>

<script>
  import { formatTime } from 'easy-fns-ts'

  import wTable from '/@/components/UI/Table/index.vue'
  import { defineComponent } from 'vue'

  import { listUser } from '/@/mock/user.js'

  export default defineComponent({
    name: 'APITableDemo',

    components: { wTable },

    setup() {
      const getTableHeader = [
        {
          label: '姓名',
          prop: 'name',
          width: '200px',
          editable: true,
        },
        {
          label: '性别',
          prop: 'sex',
          width: '80px',
          // sortable: 'custom',
        },
        {
          label: '年龄',
          prop: 'age',
          width: '200px',
          formatter: ({ age }) => `${age}岁`,
          // editable: true,
          // editableSlot: true,
        },
        {
          label: '省份',
          prop: 'province',
          width: '100px',
          // filters: [
          //   { text: '北京', value: '北京' },
          //   { text: '河南省', value: '河南省' },
          //   { text: '广东省', value: '广东省' },
          //   { text: '黑龙江省', value: '黑龙江省' },
          // ],
          // filterPlacement: 'bottom-end',
          // filterMethod: onTableFilter,
        },
        {
          label: '城市',
          prop: 'city',
          width: '100px',
        },
        {
          label: '区县',
          prop: 'country',
          width: '100px',
        },
        {
          label: '个人网址',
          prop: 'site',
          width: '100px',
        },
        {
          label: '状态',
          prop: 'status',
          width: '100px',
          // slot: true,
        },
        {
          label: '创建日期',
          prop: 'createAt',
          width: '100px',
        },
        {
          label: '父亲姓名',
          prop: 'family.dad',
          width: '150px',
        },
        {
          label: '母亲姓名',
          prop: 'family.mom',
          width: '150px',
          // headerSlot: true,
        },
      ]

      return {
        listUser,
        getTableHeader,
      }
    },
  })
</script>

<style lang="scss" scoped>
  /* stylelint-disable */
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
