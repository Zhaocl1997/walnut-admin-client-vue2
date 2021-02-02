<template>
  <div>
    <w-form
      v-model="queryFormData"
      :schema="getQueryFormSchema"
      label-width="50px"
      :span="8"
      compact
      query
    ></w-form>

    <el-button @click="onCreate">Create</el-button>

    <w-table
      v-model:headers="headers"
      v-model:pageSize="queryData.pageSize"
      v-model:pageNum="queryData.pageNum"
      :data="data"
      :total="total"
      row-key="_id"
      border
      has-page
      has-action
    >
      <template #action="{ action }">
        <el-button size="small" type="text" @click="onCreate(action.row._id)"
          >新增</el-button
        >
        <el-button size="small" type="text" @click="onUpdate(action.row._id)"
          >编辑</el-button
        >
        <el-button size="small" type="text" @click="onDelete(action.row._id)"
          >删除</el-button
        >
      </template>
    </w-table>

    <w-dialog
      v-model="visible"
      :title="title"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <w-form
        v-model="formData"
        :schema="getFormSchema"
        label-width="100px"
        mock
      ></w-form>
    </w-dialog>
  </div>
</template>

<script>
  import {
    ref,
    reactive,
    defineComponent,
    onMounted,
    toRefs,
    computed,
    nextTick,
  } from 'vue'
  import { formatTime, arrToTree, orderTree } from 'easy-fns-ts'
  import wTable from '/@/components/UI/Table/index.vue'
  import wForm from '/@/components/UI/Form'
  import wDialog from '/@/components/UI/Dialog/index.vue'
  import {
    listMenu,
    createMenu,
    readMenu,
    updateMenu,
    deleteMenu,
  } from '/@/api/system/menu'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    name: 'Menu',

    components: { wTable, wForm, wDialog },

    setup() {
      const formState = reactive({
        queryFormData: {},
        getQueryFormSchema: [
          {
            wType: 'Input',
            prop: 'formInputBase',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBase1',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBase2',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBase3',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBase4',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'formInputBase5',
            label: '基本',
            placeholder: '基本',
            clearable: true,
          },
        ],
      })

      const tableState = reactive({
        headers: [
          {
            label: '菜单名称',
            prop: 'title',
            width: '200px',
            align: 'left',
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
        ],

        data: [],
        total: 0,
        loading: false,
      })

      const queryState = reactive({
        queryData: {
          pageNum: 1,
          pageSize: 10,
        },
      })

      const dialogState = reactive({
        visible: false,
        title: '',

        formData: {
          type: 'catalog',
          external: false,
          internal: false,
          cache: false,
        },
      })

      const getFormSchema = computed(() => {
        return [
          {
            wType: 'Divider',
            title: '基本信息',
          },
          {
            wType: 'Input',
            prop: 'pid',
            label: '上级菜单/目录',
            placeholder: '上级菜单/目录',
            clearable: true,
          },
          {
            wType: 'Radio',
            prop: 'type',
            label: '菜单类型',
            options: [
              {
                value: 'catalog',
                label: '目录',
              },
              {
                value: 'menu',
                label: '菜单',
              },
              {
                value: 'element',
                label: '元素',
              },
            ],
          },

          {
            wType: 'Divider',
            title: '路由信息',
          },
          {
            wType: 'Input',
            prop: 'path',
            label: '路由地址',
            placeholder: '路由地址',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'name',
            label: '路由名称',
            placeholder: '路由名称',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'component',
            label: '组件路径',
            placeholder: '组件路径',
            clearable: true,
          },

          {
            wType: 'Divider',
            title: '元信息',
          },
          {
            wType: 'Input',
            prop: 'title',
            label: '菜单名称',
            placeholder: '菜单名称',
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'icon',
            label: '图标',
            placeholder: '图标',
            clearable: true,
          },
          {
            wType: 'InputNumber',
            prop: 'order',
            label: '顺序',
            placeholder: '顺序',
            clearable: true,
          },
          {
            wType: 'Radio',
            prop: 'external',
            label: '是否外链',
            options: [
              {
                value: true,
                label: '是',
              },
              {
                value: false,
                label: '否',
              },
            ],
          },
          {
            wType: 'Radio',
            prop: 'external',
            label: '是否内链',
            options: [
              {
                value: true,
                label: '是',
              },
              {
                value: false,
                label: '否',
              },
            ],
          },
          {
            wType: 'Input',
            prop: 'url',
            label: '地址',
            placeholder: '地址',
            clearable: true,
          },
          {
            wType: 'Radio',
            prop: 'show',
            label: '显示状态',
            options: [
              {
                value: true,
                label: '显示',
              },
              {
                value: false,
                label: '隐藏',
              },
            ],
          },
          {
            wType: 'Radio',
            prop: 'cache',
            label: '是否缓存',
            options: [
              {
                value: true,
                label: '缓存',
              },
              {
                value: false,
                label: '不缓存',
              },
            ],
          },
          {
            wType: 'Radio',
            prop: 'status',
            label: '菜单状态',
            options: [
              {
                value: true,
                label: '正常',
              },
              {
                value: false,
                label: '停用',
              },
            ],
          },
        ]
      })

      const onList = async () => {
        const res = await listMenu()
        const treeData = arrToTree(res.data, {
          id: '_id',
        })

        tableState.data = orderTree(treeData)
        tableState.total = res.total
      }

      const onCreate = (id) => {
        if (typeof id === 'string') {
          dialogState.formData.pid = id
        }
        nextTick(() => {
          dialogState.title = '新增菜单'
          dialogState.visible = true
        })
      }

      const onUpdate = async (id) => {
        const res = await readMenu(id)
        dialogState.formData = res
        nextTick(() => {
          dialogState.title = '编辑菜单'
          dialogState.visible = true
        })
      }

      const onDelete = (id) => {}

      const onConfirm = async () => {
        if (dialogState.formData._id) {
          await updateMenu(dialogState.formData)
          ElMessage.success('成功')
        } else {
          await createMenu(dialogState.formData)
          ElMessage.success('成功')
        }

        onCancel()
        onList()
      }

      const onCancel = () => {
        dialogState.title = ''
        dialogState.visible = false
        dialogState.formData = {
          type: 'catalog',
          external: false,
          internal: false,
          cache: false,
        }
      }

      onMounted(() => {
        onList()
      })

      return {
        onCreate,
        onUpdate,
        onDelete,

        getFormSchema,
        onConfirm,
        onCancel,

        ...toRefs(tableState),
        ...toRefs(queryState),
        ...toRefs(dialogState),
        ...toRefs(formState),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
