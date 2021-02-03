<template>
  <el-card>
    <template #header>
      <span>高级表格</span>

      <w-form
        v-model="baseTableStateData"
        :schema="baseTableStateSchemas"
        label-width="auto"
        compact
        :span="8"
      >
        <template #headers>
          <w-JSON :value="tableHeader" />
        </template>
      </w-form>
    </template>

    <w-table
      v-model:headers="tableHeader"
      table-title="API Table"
      table-help="API Table"
      :api-fn="listUser"
      v-bind="baseTableStateData"
    >
      <!-- 自定义空数据显示内容 -->
      <template v-if="baseTableStateData.emptyType" #empty>
        <span>自定义空数据显示内容</span>
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
        <el-input size="mini" placeholder="输入关键字搜索" />
      </template>
    </w-table>
  </el-card>

  <br />
</template>

<script>
  import { defineComponent, reactive } from 'vue'
  import wForm from '/@/components/UI/Form'
  import wTable from '/@/components/UI/Table/index.vue'
  import wJSON from '/@/components/Help/JSON/index.vue'

  import { listUser } from '/@/mock/user.js'
  import { baseTableStateSchemas } from './schemas'
  import { tableHeader } from './headers'

  export default defineComponent({
    name: 'APITableDemo',

    components: { wForm, wTable, wJSON },

    setup() {
      const baseTableStateData = reactive({
        single: false,
        multiple: false,

        hasIndex: false,
        hasSelect: false,
        hasExpand: false,
        hasAction: false,

        stripe: false,
        border: false,

        loading: false,
        loadingType: 'default',
        empty: false,
        emptyType: false,
      })

      return {
        baseTableStateData,
        baseTableStateSchemas,

        listUser,
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
