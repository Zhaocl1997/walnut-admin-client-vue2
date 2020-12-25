<template>
  <div class="w-table">
    <el-skeleton :loading="loading" :count="1" animated>
      <!-- template -->
      <template #template>
        <el-skeleton-item style="height: 24px; margin: 10px" />
      </template>

      <!-- content -->
      <template #default>
        <!-- settings -->
        <w-table-settings
          v-if="showSettings"
          v-model="modelHeaders"
          :list-func="listFunc"
          @density="onDensityChange"
        />

        <!-- main -->
        <el-table v-bind="getBindValue">
          <!-- select -->
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

          <!-- index -->
          <el-table-column
            v-if="hasIndex"
            key="index"
            label="序号"
            type="index"
            width="50"
            align="center"
            fixed="left"
          >
            <template #default="scope">
              <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>

          <!-- expand -->
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

          <!-- base -->
          <template
            v-for="(item, index) in modelHeaders"
            :key="item.prop + index"
          >
            <el-table-column
              v-if="item.visible"
              v-bind="item"
              :min-width="item.width ? item.width : '100px'"
              :row-key="item.prop + index"
              :column-key="item.prop + index"
              :align="item.align ? item.align : 'center'"
              :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
              :sortable="item.sortable ? 'custom' : false"
              :sort-orders="['ascending', 'descending']"
            >
              <!-- header slot -->
              <template v-if="item.headerSlot" #header>
                <slot :name="`${item.prop}-headerSlot`" />
              </template>

              <!-- custom slot -->
              <template v-if="item.slot" #default="props">
                <slot :name="item.prop" :props="props" />
              </template>

              <!-- editable column -->
              <template v-if="item.editable" #default="props">
                <el-space>
                  <template v-if="!item.showColumn || !props.row.showRow">
                    <el-space size="mini">
                      <span v-if="item.formatter">{{
                        item.formatter(props.row)
                      }}</span>
                      <span v-else>{{ props.row[item.prop] }}</span>
                      <i
                        class="el-icon-edit u-pointer"
                        @click="onToggleEditableCell(props, index)"
                      ></i>
                    </el-space>
                  </template>

                  <template v-else>
                    <el-space size="mini">
                      <!-- editable custom slot -->
                      <template v-if="item.editableSlot">
                        <slot
                          :name="`${item.prop}-editableSlot`"
                          :props="props"
                        ></slot>
                      </template>

                      <!-- editable column default input -->
                      <template v-else>
                        <el-input
                          v-model="props.row[item.prop]"
                          size="small"
                          @keyup.enter="onEditableCellSave(props, index)"
                        ></el-input>
                      </template>

                      <i
                        class="el-icon-check u-pointer"
                        @click="onEditableCellSave(props, index)"
                      ></i>
                    </el-space>
                  </template>
                </el-space>
              </template>
            </el-table-column>
          </template>
        </el-table>

        <!-- page -->
        <w-pagination
          v-if="showPage"
          class="u-float-right"
          :total="+total"
          :currentPage="+pageNum"
          :pageSize="+pageSize"
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
    unref,
  } from 'vue'

  import wTableSettings from './settings/index.vue'
  import wPagination from '../Pagination/index.vue'
  import { wTableProps } from './props'

  export default defineComponent({
    name: 'wTable',

    components: { wTableSettings, wPagination },

    inheritAttrs: false,

    props: wTableProps,

    emits: [
      'update:headers',
      'update:pageNum',
      'update:pageSize',
      'update:modelValue',
      'cellChange',
    ],

    setup(props, { attrs, emit }) {
      const state = reactive({
        modelHeaders: [],
        tableData: [],
        rowStyle: {},
        editable: false
      })

      // watch(
      //   () => props.headers,
      //   (val) => {
      //     nextTick(() => {
      //       onTableHeader()
      //     })
      //   },
      //   {
      //     deep: true,
      //     immediate: true,
      //   }
      // )

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

      watch(
        () => props.data,
        (val) => {
          state.tableData.length === 0
          console.log(state.tableData);
          
          val.map((item, index) => {
            state.tableData.splice(index, 1, {
              ...item,
              showRow: false, // showRow
            })
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
            showColumn: false, // showColumn
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

      const onToggleEditableCell = (prop, index) => {
        state.modelHeaders.splice(index, 1, {
          ...state.modelHeaders[index],
          showColumn: !state.modelHeaders[index].showColumn,
        })

        state.tableData.splice(prop.$index, 1, {
          ...state.tableData[prop.$index],
          showRow: !state.tableData[prop.$index].showRow,
        })
      }

      const onEditableCellSave = (prop, index) => {
        emit('cellChange', prop.row)

        onToggleEditableCell(prop, index)
      }

      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
          data: state.tableData,
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
        getBindValue,
        onPageChange,
        onDensityChange,
        onToggleEditableCell,
        onEditableCellSave,

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
