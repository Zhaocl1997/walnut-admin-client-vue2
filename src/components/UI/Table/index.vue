<template>
  <div class="w-table">
    <!-- settings -->
    <w-table-settings
      v-show="showSettings"
      v-model="modelHeaders"
      :list-func="listFunc"
      @density="onDensityChange"
    />

    <!-- main -->
    <el-table v-if="flag" v-bind="getBindValue">
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
      <template v-for="item in visibleHeaders" :key="item.prop">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :type="item.type"
          :min-width="item.width ? item.width : '100px'"
          :fixed="item.fixed"
          :formatter="item.formatter"
          :column-key="item.prop"
          :align="item.align ? item.align : 'center'"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
          :sortable="item.sortable ? 'custom' : false"
          :sort-orders="['ascending', 'descending']"
        >
          <template v-if="item.slot" #default="props">
            <!-- custom slot -->
            <slot :name="item.prop" :props="props" />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- page -->
    <w-pagination
      v-show="showPage"
      class="u-float-right"
      :total="+total"
      @change="onPageChange"
    />
  </div>

  <br />

  <!-- <el-table :data="data">
    <div>
      <template v-for="(item, index) in visibleHeaders" :key="item.prop">
        <div>
          <el-table-column v-bind="item"></el-table-column>
        </div>
      </template>
    </div>
  </el-table>-->
</template>

<script>
  import { ElTable } from 'element-plus'
  import {
    reactive,
    computed,
    defineComponent,
    onMounted,
    watch,
    toRefs,
    nextTick,
  } from 'vue'

  import wTableSettings from './settings/index.vue'
  import wPagination from '../Pagination/index.vue'

  export default defineComponent({
    name: 'WTable',

    components: { wTableSettings, wPagination },

    inheritAttrs: false,

    props: {
      ...ElTable.props,

      /**
       * @description single/multiple v-model value
       */
      modelValue: [Array, Object],

      /**
       * @description table header column
       */
      headers: Array,

      /**
       * @description has select column
       */
      hasSelect: Boolean,
      hasIndex: Boolean,
      hasExpand: Boolean,

      showSettings: Boolean,
      showPage: Boolean,

      single: Boolean,
      multiple: Boolean,

      selectable: Function,
      reserveSelection: Boolean,

      total: Number,
      pageNum: { type: Number, default: 1 },
      pageSize: { type: Number, default: 10 },

      listFunc: Function,
    },

    emits: [
      'update:headers',
      'update:pageNum',
      'update:pageSize',
      'update:modelValue',
    ],

    setup(props, { attrs, emit }) {
      const state = reactive({
        modelHeaders: [],
        visibleHeaders: [],

        rowStyle: {},

        flag: false,
      })

      watch(
        () => state.modelHeaders,
        (val) => {
          state.flag = false
          state.visibleHeaders.length = 0

          nextTick(() => {
            state.visibleHeaders = val.filter((i) => i.visible === true)
            state.flag = true
          })

          emit('update:headers', val)
        },
        {
          immediate: true,
          deep: true,
        }
      )

      watch(
        [() => props.hasSelect, () => props.hasIndex, () => props.hasExpand],
        (val) => {
          state.flag = false

          nextTick(() => {
            state.flag = true
          })
        }
      )

      const init = () => {
        props.headers.map((i) => {
          state.modelHeaders.push({
            ...i,
            visible: i.visible === false ? false : true, // checkbox
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

      onMounted(() => {
        init()
      })

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

      return {
        getBindValue,
        onPageChange,
        onDensityChange,

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
