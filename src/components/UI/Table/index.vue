<template>
  <el-table v-bind="getBindValue">
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

  <w-pagination class="u-float-right" :total="total"></w-pagination>
</template>

<script lang='ts'>
import { ElTable } from "element-plus";
import { ref, reactive, computed, defineComponent } from "vue";
import wPagination from "../Pagination/index.vue";

export default defineComponent({
  name: "wTable",

  inheritAttrs: false,

  props: {
    ...ElTable.props,

    columns: Array,

    total: [String, Number]
  },

  components: { wPagination },

  setup(props, { attrs }) {
    const getBindValue = computed(() => {
      return { ...attrs, ...props };
    });

    return {
      getBindValue
    };
  }
});
</script>

<style lang='scss' scoped>
</style>