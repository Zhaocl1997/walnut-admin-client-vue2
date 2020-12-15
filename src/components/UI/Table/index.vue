<template>
  <!-- settings -->
  <w-table-settings :listFunc="listFunc"></w-table-settings>

  <!-- main -->
  <el-table v-bind="getBindValue">
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
    <template v-for="(item, index) in columns" :key="index.toString() + item.prop">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :type="item.type"
        :min-width="item.width ? item.width : '100px'"
        :fixed="item.fixed"
        :formatter="item.formatter"
        :row-key="index.toString() + item.prop"
        :column-key="index.toString() + item.prop"
        :align="item.align ? item.align : 'center'"
        :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
        :sortable="item.sortable ? 'custom' : false"
        :sort-orders="['ascending', 'descending']"
      >
        <template #default="scope">
          <!-- 自定义列 -->
          <slot v-if="item.slot" :row="scope.row" :index="scope.$index" :name="item.prop"></slot>

          <!-- format列 -->
          <span v-else-if="item.formatter">{{ item.formatter(scope.row, scope.column) }}</span>

          <!-- 正常列 -->
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <w-pagination class="u-float-right" :total="+total" @change="onPageChange"></w-pagination>
</template>

<script lang='ts'>
import { ElTable } from "element-plus";
import { ref, reactive, computed, defineComponent } from "vue";

import wTableSettings from "./settings/index.vue";
import wPagination from "../Pagination/index.vue";

export default defineComponent({
  name: "wTable",

  inheritAttrs: false,

  props: {
    ...ElTable.props,

    columns: Array,

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
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    const onPageChange = value => {
      emit("update:pageNum", value.pageNum);
      emit("update:pageSize", value.pageSize);

      props.listFunc();
    };

    return {
      getBindValue,
      onPageChange
    };
  }
});
</script>

<style lang='scss' scoped>
</style>