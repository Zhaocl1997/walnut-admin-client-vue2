<template>
  <el-card>
    <template #header>
      <span>集成表格</span>

      <el-form inline>
        <el-space>
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

          <el-form-item label="操作">
            <el-switch v-model="hasAction" />
          </el-form-item>

          <el-form-item label="设置">
            <el-switch v-model="hasSettings" />
          </el-form-item>

          <el-form-item label="分页">
            <el-switch v-model="hasPage" />
          </el-form-item>

          <el-form-item label="斑马纹">
            <el-switch v-model="stripe" />
          </el-form-item>

          <el-form-item label="边框">
            <el-switch v-model="border" />
          </el-form-item>

          <el-form-item label="加载">
            <el-switch v-model="loading" />
          </el-form-item>
        </el-space>
      </el-form>

      <div>单选/多选 绑定值：【{{ tableValue }}】</div>
      <div>pageSize 绑定值：【{{ pageSize }}】</div>
      <div>pageNum 绑定值：【{{ pageNum }}】</div>
      <div>header 绑定值：</div>
      <div>
        <w-JSON :value="getTableHeader" />
      </div>
    </template>

    <w-table
      v-model="tableValue"
      v-model:headers="getTableHeader"
      v-model:pageSize="pageSize"
      v-model:pageNum="pageNum"
      table-title="Table Title"
      table-help="Table Help"
      :data="tableData"
      :total="total"
      :loading="loading"
      :list-func="getDataList"
      :has-index="hasIndex"
      :has-select="hasSelect"
      :has-expand="hasExpand"
      :has-action="hasAction"
      :has-settings="hasSettings"
      :has-page="hasPage"
      :single="single"
      :multiple="multiple"
      :stripe="stripe"
      :border="border"
      @cell-change="onCellChange"
      @sort-change="onSortChange"
    >
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
    </w-table>
  </el-card>

  <br />
</template>

<script>
  import { ElMessage } from 'element-plus'
  import wTable from '/@/components/UI/Table/index.vue'
  import wJSON from '/@/components/Help/JSON/index.vue'
  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'
  import { reactive, defineComponent, onMounted, toRefs } from 'vue'

  import { listUser } from '/@/mock/user.js'

  export default defineComponent({
    name: 'TableDemo',

    components: { wTable, wJSON, wLocalePicker },

    setup() {
      const state = reactive({
        title: 'table扩展',

        hasIndex: false,
        hasSelect: true,
        hasExpand: false,
        hasAction: false,
        hasSettings: false,
        hasPage: false,

        single: false,
        multiple: false,

        stripe: false,
        border: false,

        loading: false,

        search: '',
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

      const onTableSearch = () => {
        table.tableData = table.tableData.filter(
          (data) =>
            !state.search ||
            data.family.mom.toLowerCase().includes(state.search.toLowerCase())
        )
      }

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
          sortable: 'custom',
        },
        {
          label: '年龄',
          prop: 'age',
          width: '200px',
          formatter: ({ age }) => `${age}岁`,
          editable: true,
          editableSlot: true,
        },
        {
          label: '省份',
          prop: 'province',
          width: '100px',
          filters: [
            { text: '北京', value: '北京' },
            { text: '河南省', value: '河南省' },
            { text: '广东省', value: '广东省' },
            { text: '黑龙江省', value: '黑龙江省' },
          ],
          filterPlacement: 'bottom-end',
          filterMethod: onTableFilter,
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
          slot: true,
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
          headerSlot: true,
        },
      ]

      const getDataList = () => {
        state.loading = true
        const result = listUser(queryFormData)
        table.tableData = result.data
        table.total = result.total
        setTimeout(() => {
          state.loading = false
        }, 2000)
      }

      const onCellChange = (state) => {
        state.loadStart()
        setTimeout(() => {
          state.row[state.prop] = state.newValue
          state.loadEnd()
          ElMessage.success('更新成功')
        }, 2000)
      }

      const onSortChange = ({ column, prop, order }) => {
        console.log({ column, prop, order })
      }

      onMounted(() => {
        getDataList()
      })

      return {
        getDataList,
        onCellChange,
        onSortChange,
        onTableSearch,

        ...toRefs(state),
        ...toRefs(queryFormData),
        ...toRefs(table),

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
