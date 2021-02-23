<template>
  <div>
    <el-card>
      <template #header>
        <span>集成表格</span>

        <w-form
          v-model="baseTableStateData"
          :schemas="baseTableStateSchemas"
          label-width="auto"
          compact
          :span="8"
        >
          <template #headers>
            <w-JSON :value="tableHeader" />
          </template>
        </w-form>

        <div>单选/多选 绑定值：【{{ tableValue }}】</div>
        <div>pageSize 绑定值：【{{ pageSize }}】</div>
        <div>pageNum 绑定值：【{{ pageNum }}】</div>
      </template>

      <w-table
        v-model="tableValue"
        v-model:headers="tableHeader"
        v-model:pageSize="pageSize"
        v-model:pageNum="pageNum"
        v-bind="baseTableStateData"
        :table-title="baseTableStateData.hasTitle ? 'Table Title' : ''"
        :table-help="'Table Help'"
        :data="baseTableStateData.empty ? [] : tableData"
        :total="total"
        @cell-change="onCellChange"
        @sort-change="onSortChange"
        @page-change="onPageChange"
      >
        <!-- 自定义空数据显示内容 -->
        <template v-if="baseTableStateData.emptyType" #empty>
          <p>自定义空数据显示内容</p>
          <p>自定义空数据显示内容</p>
          <p>自定义空数据显示内容</p>
        </template>

        <!-- expand 列 -->
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

        <!-- action 列 -->
        <template #action="{ action }">
          <el-button size="small" type="text">新增</el-button>
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </template>

        <!-- 自定义列 -->
        <template #status="{ props }">
          <el-switch v-model="props.row.status" />
        </template>

        <!-- 自定义编辑插槽 -->
        <template #age-editableSlot="{ props }">
          <el-input-number v-model="props.row.age" size="mini" />
        </template>

        <!-- 自定义头部插槽 -->
        <template #family.mom-headerSlot="{ props }">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @input="onTableSearch"
            @keyup.enter="onTableSearch"
          />
        </template>

        <template #family.mom="{ props }">
          <span>123123</span>
        </template>
      </w-table>
    </el-card>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import { reactive, defineComponent, onMounted, toRefs } from 'vue'

  import wTable from '/@/components/UI/Table'
  import wForm from '/@/components/UI/Form'
  import wJSON from '/@/components/Help/JSON/index.vue'

  import { listUser } from '/@/mock/user.js'

  import { baseTableStateSchemas } from './schemas'
  import { tableHeader } from './headers'

  export default defineComponent({
    name: 'BaseTable',

    components: { wTable, wForm, wJSON },

    setup() {
      const baseTableStateData = reactive({
        single: false,
        multiple: false,

        hasButtons: false,
        hasIndex: false,
        hasSelect: false,
        hasExpand: false,
        hasAction: false,

        stripe: false,
        border: false,

        hasTitle: false,
        hasSettings: false,
        hasPage: true,

        loading: false,
        loadingType: 'default',
        empty: false,
        emptyType: false,
      })

      const queryFormData = reactive({
        pageNum: 1,
        pageSize: 10,
      })

      const table = reactive({
        total: 0,
        tableData: [],
        tableValue: undefined,
      })

      const onTableFilter = (value, row, column) => {
        const property = column['property']
        return row[property] === value
      }

      const getDataList = () => {
        baseTableStateData.loading = true
        const result = listUser(queryFormData)
        table.tableData = result.data
        table.total = result.total
        setTimeout(() => {
          baseTableStateData.loading = false
        }, 2000)
      }

      const onCellChange = (val) => {
        val.loadStart()
        setTimeout(() => {
          val.row[val.prop] = val.newValue
          val.loadEnd()
          ElMessage.success('更新成功')
        }, 2000)
      }

      const onSortChange = ({ column, prop, order }) => {
        console.log({ column, prop, order })
      }

      const onPageChange = () => {
        getDataList()
      }

      const onTableSearch = () => {
        table.tableData = table.tableData.filter(
          (data) =>
            !search ||
            data.family.mom.toLowerCase().includes(search.toLowerCase())
        )
      }

      onMounted(() => {
        getDataList()
      })

      return {
        getDataList,
        onCellChange,
        onSortChange,
        onPageChange,
        onTableSearch,

        ...toRefs(queryFormData),
        ...toRefs(table),

        baseTableStateData,
        baseTableStateSchemas,

        tableHeader,
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
