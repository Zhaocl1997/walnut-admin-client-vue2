<template>
  <div>
    <w-form
      v-model="queryFormData"
      :schemas="getQueryFormSchema"
      label-width="50px"
      :span="8"
      compact
      query
    ></w-form>

    <w-table
      v-model:headers="headers"
      :data="data"
      :total="total"
      row-key="_id"
      :expand-row-keys="[rootId]"
      border
      has-action
      has-buttons
      @create="onCreate"
    >
      <template #action="{ action }">
        <el-button size="small" type="text" @click="onCreate(action.row._id)"
          >新增</el-button
        >
        <el-button
          size="small"
          type="text"
          :disabled="action.row._id === rootId"
          @click="onUpdate(action.row._id)"
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除吗？"
          icon="el-icon-info"
          icon-color="red"
          @confirm="onDelete(action.row._id)"
        >
          <template #reference>
            <el-button
              size="small"
              type="text"
              :disabled="action.row._id === rootId"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </w-table>

    <w-dialog @hook="register" @confirm="onConfirm" @cancel="onCancel">
      <w-form
        v-model="formData"
        :schemas="getFormSchema"
        label-width="100px"
        mock
        :span="12"
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
  import wTable from '/@/components/UI/Table'
  import wForm from '/@/components/UI/Form'
  import wDialog, { useDialog } from '/@/components/UI/Dialog'
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
      const [register, { openDialog, closeDialog }] = useDialog()

      const rootId = ref()

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
        formData: {
          type: 'catalog',
          external: false,
          internal: false,
          cache: false,
        },
      })

      const menuType = computed(() => dialogState.formData.type)

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
            helpMessage: '浏览器地址栏里的地址',
          },
          {
            wType: 'Input',
            prop: 'name',
            label: '路由名称',
            placeholder: '路由名称',
            clearable: true,
            modelModifiers: {
              capitalize: true,
            },
            helpMessage:
              '对应route里的name字段，也是keep-alive的关键，需要唯一',
          },
          {
            wType: 'Input',
            prop: 'component',
            label: '组件路径',
            placeholder: '组件路径',
            clearable: true,
            disabled: menuType.value === 'catalog',
            helpMessage: '菜单类型时生效，是文件在views下的路径，不需要vue后缀',
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
            helpMessage: '左侧菜单显示文字',
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
        rootId.value = orderTree(treeData)[0]._id
      }

      const onCreate = (id) => {
        if (typeof id === 'string') {
          dialogState.formData.pid = id
        }
        nextTick(() => {
          openDialog({
            title: '新增菜单',
          })
        })
      }

      const onUpdate = async (id) => {
        const res = await readMenu(id)
        dialogState.formData = res
        nextTick(() => {
          openDialog({
            title: '编辑菜单',
          })
        })
      }

      const onDelete = async (id) => {
        await deleteMenu(id)
        ElMessage.success('成功')
        await onList()
      }

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
        dialogState.formData = {
          type: 'catalog',
          external: false,
          internal: false,
          cache: false,
        }

        closeDialog()
      }

      onMounted(() => {
        onList()
      })

      return {
        rootId,

        register,

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
