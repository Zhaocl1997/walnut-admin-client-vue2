<template>
  <div class="w-table">
    <!-- settings -->
    <w-table-settings v-model="operatedHeader" :listFunc="listFunc"></w-table-settings>

    <!-- main -->
    <el-table v-if="flag" v-bind="getBindValue">
      <!-- select -->
      <el-table-column
        v-if="hasSelect"
        type="selection"
        width="50"
        align="center"
        fixed="left"
        key="select"
        :selectable="selectable"
        :reserveSelection="reserveSelection"
      ></el-table-column>

      <!-- index -->
      <el-table-column
        v-if="hasIndex"
        label="序号"
        type="index"
        width="50"
        align="center"
        fixed="left"
        key="index"
      >
        <template #default="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <!-- expand -->
      <el-table-column
        v-if="hasExpand"
        type="expand"
        width="50"
        align="center"
        fixed="left"
        key="expand"
      >
        <template #default="props">
          <slot name="expand" :expand="props"></slot>
        </template>
      </el-table-column>

      <!-- base -->
      <template v-for="(item, index) in visibleHeaders" :key="item.id">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :type="item.type"
          :min-width="item.width ? item.width : '100px'"
          :fixed="item.fixed"
          :formatter="item.formatter"
          :row-key="item.id"
          :column-key="item.id"
          :align="item.align ? item.align : 'center'"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
          :sortable="item.sortable ? 'custom' : false"
          :sort-orders="['ascending', 'descending']"
        >
          <template #default="scope">
            <!-- custom slot -->
            <slot v-if="item.slot" :row="scope.row" :index="scope.$index" :name="item.prop"></slot>

            <!-- format -->
            <span v-else-if="item.formatter">{{ item.formatter(scope.row, scope.column) }}</span>

            <!-- normal -->
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- page -->
    <w-pagination class="u-float-right" :total="+total" @change="onPageChange"></w-pagination>
  </div>
</template>

<script lang='ts'>
import { ElTable } from "element-plus";
import {
  reactive,
  computed,
  defineComponent,
  onMounted,
  watch,
  toRefs,
  nextTick
} from "vue";

import wTableSettings from "./settings/index.vue";
import wPagination from "../Pagination/index.vue";

import { genString } from "easy-fns-ts/dist/esm";

export default defineComponent({
  name: "wTable",

  inheritAttrs: false,

  props: {
    ...ElTable.props,

    /**
     * @description table header column
     */
    headers: Array,

    hasSelect: Boolean,
    hasIndex: Boolean,
    hasExpand: Boolean,

    selectable: Function,
    reserveSelection: Boolean,

    total: Number,
    pageNum: Number,
    pageSize: Number,

    listFunc: Function
  },

  components: { wTableSettings, wPagination },

  setup(props, { attrs, emit }) {
    const state = reactive({
      operatedHeader: [],
      visibleHeaders: [],
      flag: false
    });

    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    watch(
      () => state.operatedHeader,
      val => {
        state.flag = false;
        state.visibleHeaders.length = 0;

        nextTick(() => {
          state.visibleHeaders = val.filter(i => i.visible === true);
          state.flag = true;
        });

        emit("update:headers", val);
      },
      {
        immediate: true,
        deep: true
      }
    );

    const init = () => {
      props.headers.map(i => {
        state.operatedHeader.push({
          ...i,
          visible: i.visible === false ? false : true, // checkbox
          id: genString(8)
        });
      });
    };

    onMounted(() => {
      init();
    });

    const onPageChange = value => {
      emit("update:pageNum", value.pageNum);
      emit("update:pageSize", value.pageSize);

      props.listFunc();
    };

    return {
      getBindValue,
      onPageChange,

      ...toRefs(state)
    };
  }
});
</script>

<style lang='scss' scoped>
.w-table {
  background-color: #ffffff;
  margin: 10px;

  &:not(:root):fullscreen {
    padding: 20px;
  }
}
</style>