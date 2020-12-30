<template>
  <div class="w-table">
    <el-skeleton :loading="loading" :count="10" animated>
      <!-- template -->
      <template #template>
        <el-skeleton-item style="height: 24px; margin: 10px" />
      </template>

      <!-- content -->
      <template #default>
        <w-title v-if="hasTitle" class="u-float-left">{{ title }}</w-title>

        <w-table-settings
          v-if="hasSettings"
          v-model="modelHeaders"
          :list-func="listFunc"
          @density="onDensityChange"
        />

        <el-table v-bind="getBindValue">
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
            :label="t('component.table.action')"
            min-width="100"
            align="center"
            fixed="right"
          >
            <template #default="props">
              <span>123</span>
            </template>
          </el-table-column>

          <template
            v-for="(item, index) in modelHeaders"
            :key="item.prop + index"
          >
            <el-table-column
              v-if="item.visible"
              v-bind="item"
              :row-key="item.prop + index"
              :column-key="item.prop + index"
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
          class="u-float-right"
          :total="+total"
          :current-page="+pageNum"
          :page-size="+pageSize"
          @change="onPageChange"
        />
      </template>
    </el-skeleton>
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
  } from 'vue'

  import wTitle from '../Title/index.vue'
  import wPagination from '../Pagination/index.vue'
  import wTableSettings from './settings/index.vue'
  import wTableEditableCell from './editableCell.vue'
  import { wTableProps } from './props'
  import { useI18n } from '/@/hooks/useI18n.js'

  export default defineComponent({
    name: 'WTable',

    components: { wTitle, wPagination, wTableSettings, wTableEditableCell },

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
      const { t } = useI18n()
      const state = reactive({
        modelHeaders: [],
        rowStyle: {},
      })

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

      const onTableHeader = () => {
        props.headers.map((item, index) => {
          state.modelHeaders.splice(index, 1, {
            ...item,
            visible: item.visible === false ? false : true, // checkbox
          })
        })
      }

      const onPageChange = (value) => {
        emit('update:pageNum', value.pageNum)
        emit('update:pageSize', value.pageSize)

        props.listFunc()
      }

      const onDensityChange = (command) => {
        switch (command) {
          case '0':
            state.rowStyle = { height: '40px' }
            break

          case '1':
            state.rowStyle = { height: '60px' }
            break

          case '2':
            state.rowStyle = { height: '80px' }
            break

          default:
            break
        }
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
          rowStyle: state.rowStyle,
          highlightCurrentRow: props.single,
          onCurrentChange,
          onSelectionChange,
        }
      })

      onMounted(() => {
        onTableHeader()
      })

      return {
        t,

        getBindValue,
        onPageChange,
        onDensityChange,
        onCellChange,

        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-table {
    background-color: #ffffff;
    margin: 10px;

    &:not(:root):fullscreen {
      padding: 20px;
    }
  }
</style>
