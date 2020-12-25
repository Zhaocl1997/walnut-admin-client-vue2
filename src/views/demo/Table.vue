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

          <el-form-item label="设置">
            <el-switch v-model="showSettings" />
          </el-form-item>

          <el-form-item label="分页">
            <el-switch v-model="showPage" />
          </el-form-item>

          <el-form-item label="斑马纹">
            <el-switch v-model="stripe" />
          </el-form-item>

          <el-form-item label="边框">
            <el-switch v-model="border" />
          </el-form-item>
        </el-space>
      </el-form>

      <div>单选/多选 绑定值：【{{ tableValue }}】</div>
      <div>pageSize 绑定值：【{{ pageSize }}】</div>
      <div>pageNum 绑定值：【{{ pageNum }}】</div>
      <div>header 绑定值：</div>
      <div>
        <w-JSON v-model="getTableHeader" />
      </div>
    </template>

    <w-table
      v-model="tableValue"
      v-model:headers="getTableHeader"
      v-model:pageSize="pageSize"
      v-model:pageNum="pageNum"
      :data="tableData"
      :total="total"
      :loading="loading"
      :list-func="getDataList"
      :has-index="hasIndex"
      :has-select="hasSelect"
      :has-expand="hasExpand"
      :show-settings="showSettings"
      :show-page="showPage"
      :single="single"
      :multiple="multiple"
      :stripe="stripe"
      :border="border"
      @cell-change="onCellChange"
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
        <el-input-number size="mini" v-model="props.row.age" />
      </template>

      <!-- 自定义头部插槽 -->
      <template #family.mom-headerSlot="{ props }">
        <el-input
          v-model="search"
          @input="onTableSearch"
          @keyup.enter="onTableSearch"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
    </w-table>
  </el-card>

  <br />
</template>

<script>
  import wTable from '/@/components/UI/Table/index.vue'
  import wJSON from '/@/components/Others/JSON/index.vue'
  import {
    ref,
    reactive,
    computed,
    defineComponent,
    onMounted,
    toRef,
    toRefs,
    watch,
    toRaw,
  } from 'vue'

  import { listUser } from '/@/mock/user.js'

  export default defineComponent({
    name: 'TableDemo',

    components: { wTable, wJSON },

    setup() {
      const state = reactive({
        hasIndex: false,
        hasSelect: false,
        hasExpand: false,
        showSettings: false,
        showPage: false,

        single: false,
        multiple: false,

        stripe: false,
        border: false,

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
        loading: false,
      })

      const onTableFilter = (value, row, column) => {
        const property = column['property']
        return row[property] === value
      }

      const onTableSearch = () => {
        table.tableData.length === 0
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
          width: '50px',
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
        table.loading = true
        const result = listUser(queryFormData)
        table.tableData = result.data
        table.total = result.total
        setTimeout(() => {
          table.loading = false
        }, 2000)
      }

      const onCellChange = (row) => {
        console.log(row)
      }

      onMounted(() => {
        getDataList()
      })

      return {
        getDataList,
        onCellChange,
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
