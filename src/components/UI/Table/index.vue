<template>
  <div class="w-table">
    <w-table-loading>
      <w-table-header></w-table-header>

      <el-table v-bind="getBindValue">
        <!-- empty -->
        <template #empty>
          <w-table-empty></w-table-empty>
        </template>

        <el-table-column
          v-if="hasSelect"
          key="select"
          type="selection"
          width="50"
          align="center"
          fixed="left"
          :selectable="selectable"
          :reserve-selection="reserveSelection"
        />

        <el-table-column
          v-if="hasIndex"
          key="index"
          :label="t('component.table.index')"
          type="index"
          width="60"
          align="center"
          fixed="left"
          :index="index"
        >
          <template #default="scope">
            <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="hasExpand"
          key="expand"
          type="expand"
          width="50"
          align="center"
          fixed="left"
        >
          <template #default="props">
            <slot name="expand" :expand="props" />
          </template>
        </el-table-column>

        <el-table-column
          v-if="hasAction"
          key="action"
          :label="t('component.table.operation')"
          min-width="100"
          align="center"
          fixed="right"
        >
          <template #default="props">
            <slot name="action" :action="props" />
          </template>
        </el-table-column>

        <template v-for="(item, index) in modelHeaders">
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
        class="u-float-right"
        :total="+total"
        :current-page="+pageNum"
        :page-size="+pageSize"
        @change="onPageChange"
      ></w-pagination
    ></w-table-loading>
  </div>
</template>

<script>
  import {
    reactive,
    computed,
    defineComponent,
    onMounted,
    watch,
    toRefs,
    nextTick,
    unref,
  } from 'vue'
  import hooks from '/@/hooks'

  import wTableHeader from './components/header/index.vue'

  import wPagination from '../Pagination/index.vue'

  import wTableLoading from './components/state/loading/index.vue'
  import wTableEmpty from './components/state/empty/index.vue'

  import wTableEditableCell from './components/editableCell/index.vue'
  import { wTableProps } from './props'
  import { useTableContext } from './hooks/useTableContext'

  export default defineComponent({
    name: 'WTable',

    components: {
      wTableHeader,

      wPagination,

      wTableLoading,
      wTableEmpty,

      wTableEditableCell,
    },

    inheritAttrs: false,

    props: wTableProps,

    emits: [
      'update:headers',
      'update:pageNum',
      'update:pageSize',
      'update:modelValue',
      'cell-change',
    ],

    setup(props, { attrs, emit }) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const state = reactive({
        modelHeaders: [],
        selfProps: {},
      })

      const { setContextProps, setContextMethods } = useTableContext()

      // handle headers
      const onTableHeader = () => {
        props.headers.map((item, index) => {
          state.modelHeaders.splice(index, 1, {
            ...item,
            visible: item.visible === false ? false : true, // checkbox
          })
        })
      }

      onMounted(() => {
        onTableHeader()
      })

      // set props
      setContextProps(unref({ ...props, headers: state.modelHeaders }))

      // set methods
      const tableMethods = {
        setProps: (newProps) => {
          state.selfProps = { ...unref(state.selfProps), ...newProps }
        },
      }
      setContextMethods(tableMethods)

      // v-model:headers
      watch(
        () => state.modelHeaders,
        (val) => {
          nextTick(() => {
            emit('update:headers', val)
          })
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const onPageChange = (value) => {
        emit('update:pageNum', value.pageNum)
        emit('update:pageSize', value.pageSize)

        props.listFunc()
      }

      const onCurrentChange = (val) => {
        if (props.single) {
          emit('update:modelValue', val)
        }
      }

      const onSelectionChange = (val) => {
        if (props.multiple) {
          emit('update:modelValue', val)
        }
      }

      const onCellChange = (val) => {
        emit('cell-change', val)
      }

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          ...unref(state.selfProps),
          highlightCurrentRow: props.single,
          onCurrentChange,
          onSelectionChange,
        }
      })

      return {
        t,

        getBindValue,
        onPageChange,
        onCellChange,

        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped></style>
