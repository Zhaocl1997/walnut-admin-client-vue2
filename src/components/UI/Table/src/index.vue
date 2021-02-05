<template>
  <div class="w-table">
    <w-table-loading>
      <w-table-header></w-table-header>

      <el-table v-bind="getBindValue">
        <template #empty>
          <w-table-empty>
            <slot name="empty"></slot>
          </w-table-empty>
        </template>

        <w-table-columns>
          <template #expand="{ expand }">
            <slot name="expand" :expand="expand"></slot>
          </template>

          <template #action="{ action }">
            <slot name="action" :action="action"></slot>
          </template>
        </w-table-columns>

        <template v-for="(item, index) in tableHeader">
          <el-table-column
            v-if="item.visible"
            :key="index.toString() + item.prop"
            v-bind="item"
            :column-key="index.toString() + item.prop"
            :align="item.align ? item.align : 'center'"
            :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
          >
            <!-- header slot -->
            <template v-if="item.headerSlot || item.editable" #header="scope">
              <div v-if="item.headerSlot">
                <slot :name="`${item.prop}-headerSlot`" />
              </div>

              <div v-if="item.editable">
                <el-space size="mini">
                  <span>{{ scope.column.label }}</span>
                  <i class="el-icon-edit-outline"></i>
                </el-space>
              </div>
            </template>

            <!-- custom slot -->
            <template v-if="item.slot" #default="props">
              <slot :name="item.prop" :props="props" />
            </template>

            <!-- editable column -->
            <template v-if="item.editable" #default="props">
              <w-table-editable-cell
                :item="item"
                :row="props.row"
                @cell-change="onCellChange"
              >
                <template #default>
                  <slot
                    :name="`${item.prop}-editableSlot`"
                    :props="props"
                  ></slot>
                </template>
              </w-table-editable-cell>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <w-pagination
        v-if="hasPage"
        v-model:currentPage="pageNum"
        v-model:pageSize="pageSize"
        class="u-float-right"
        :total="+tableTotal"
        @change="onPaginationChange"
      ></w-pagination>
    </w-table-loading>
  </div>
</template>

<script>
  import {
    computed,
    defineComponent,
    onMounted,
    unref,
    ref,
    nextTick,
  } from 'vue'

  import wTableProps from './props'
  import wTableComponents from './components'

  import { useTableContext } from './hooks/useTableContext'
  import { useTableHeader } from './hooks/useTableHeader'
  import { useTablePage } from './hooks/useTablePage'
  import { useTableData } from './hooks/useTableData'

  export default defineComponent({
    name: 'WTable',

    components: wTableComponents,

    inheritAttrs: false,

    props: wTableProps,

    emits: [
      'update:headers',
      'update:modelValue',
      'update:pageNum',
      'update:pageSize',
      'cell-change',
      'page-change',
      'register',
    ],

    setup(props, { attrs, emit }) {
      const insideProps = ref()

      const getProps = computed(() => {
        return { ...props, ...unref(insideProps) }
      })

      const { setContextProps, setContextMethods } = useTableContext()
      const { onFormatTableHeader, tableHeader } = useTableHeader(props, emit)
      const { pageNum, pageSize, apiFnPageParams } = useTablePage(props)
      const { tableData, tableTotal, onInitTableData } = useTableData(
        props,
        apiFnPageParams
      )

      onMounted(() => {
        onFormatTableHeader()
        onInitTableData()
      })

      // single
      const onCurrentChange = (val) => {
        if (props.single) {
          emit('update:modelValue', val)
        }
      }

      // multiple
      const onSelectionChange = (val) => {
        if (props.multiple) {
          emit('update:modelValue', val)
        }
      }

      // cell change
      const onCellChange = (val) => {
        emit('cell-change', val)
      }

      // page change
      const onPaginationChange = ({ pageNum, pageSize }) => {
        emit('update:pageNum', pageNum)
        emit('update:pageSize', pageSize)
        emit('page-change')
      }

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...unref(getProps),
          highlightCurrentRow: props.single,
          onCurrentChange,
          onSelectionChange,
        }
      })

      // set props
      setContextProps(props)

      // set methods
      const tableMethods = {
        setProps: (newProps) => {
          insideProps.value = { ...unref(insideProps), ...newProps }
        },
      }
      setContextMethods(tableMethods)

      // use hook
      // emit('register', { ...tableMethods, ...unref(getBindValue) })

      return {
        tableHeader,

        pageNum,
        pageSize,
        tableTotal,

        getBindValue,
        onCellChange,
        onPaginationChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
