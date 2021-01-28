<template>
  <el-card>
    <template #header>
      <span>高级表格</span>
    </template>

    <w-table
      v-model:headers="getTableHeader"
      table-title="API Table"
      table-help="API Table"
      :api-fn="listMenu"
    >
    </w-table>
  </el-card>

  <br />
</template>

<script>
  import { ElMessage } from 'element-plus'
  import { formatTime } from 'easy-fns-ts'

  import wTable from '/@/components/UI/Table/index.vue'
  import { defineComponent } from 'vue'

  import { listMenu } from '/@/api/system/menu'

  export default defineComponent({
    name: 'APITableDemo',

    components: { wTable },

    setup() {
      const getTableHeader = [
        {
          label: '菜单名称',
          prop: 'title',
          width: '200px',
          align: 'left',
          disabled: true,
        },
        {
          label: '类型',
          prop: 'type',
          width: '80px',
        },
        {
          label: '图标',
          prop: 'icon',
          width: '80px',
        },
        {
          label: '显示顺序',
          prop: 'order',
          width: '80px',
        },
        {
          label: '是否显示',
          prop: 'show',
          width: '100px',
        },
        {
          label: '是否启用',
          prop: 'status',
          width: '100px',
        },
        {
          label: '创建时间',
          prop: 'createdAt',
          width: '200px',
          formatter: (row) => formatTime(row.createdAt),
        },
        {
          label: '修改时间',
          prop: 'updatedAt',
          width: '200px',
          formatter: (row) => formatTime(row.updatedAt),
        },
      ]

      return {
        listMenu,
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
