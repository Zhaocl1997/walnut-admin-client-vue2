<template>
  <div class="w-table">
    <!-- table设置 -->
    <div class="u-mb8 u-float-right" v-if="showSettings">
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新" placement="top">
        <w-icon icon="sync" class="table-settings__icon" @click="listFunc"></w-icon>
      </el-tooltip>

      <!-- 列 -->
      <el-tooltip content="列设置" placement="top">
        <el-popover placement="bottom" trigger="click" popper-class="table-settings__popover">
          <w-icon slot="reference" icon="setting" class="table-settings__icon"></w-icon>

          <template v-if="hasFixedLeft">
            <w-table-settings-item :header.sync="leftHeader" type="left">
              <i class="el-icon-info"></i>固定在左侧
            </w-table-settings-item>
          </template>

          <w-table-settings-item :header.sync="commonHeader" type="common">
            <i class="el-icon-info"></i>不固定
            <el-checkbox
              style="margin-right:5px;"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>

            <w-button size="mini" type="text" @click="onReset">重置</w-button>
          </w-table-settings-item>

          <template v-if="hasFixedRight">
            <w-table-settings-item :header.sync="rightHeader" type="right">
              <i class="el-icon-info"></i>固定在右侧
            </w-table-settings-item>
          </template>
        </el-popover>
      </el-tooltip>

      <!-- 全屏 -->
      <el-tooltip effect="dark" content="全屏" placement="top">
        <w-screenfull target=".w-table" class="table-settings__icon" />
      </el-tooltip>

      <!-- 密度 -->
      <el-tooltip effect="dark" content="密度" placement="top">
        <el-dropdown @command="onDensity" trigger="click">
          <div>
            <w-icon icon="vertical-align-middl" class="table-settings__icon"></w-icon>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0" key="0">紧凑</el-dropdown-item>
            <el-dropdown-item command="1" key="1">中等</el-dropdown-item>
            <el-dropdown-item command="2" key="2">宽裕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </div>

    <el-table
      ref="table"
      :data="tableData"
      :size="size"
      :height="height"
      :maxHeight="maxHeight"
      :fit="fit"
      :stripe="stripe"
      :border="border"
      :rowKey="rowKey"
      :showHeader="showHeader"
      :showSummary="showSummary"
      :sumText="sumText"
      :summaryMethod="summaryMethod"
      :rowClassName="rowClassName"
      :rowStyle="selfRowStyle"
      :cellClassName="cellClassName"
      :cellStyle="cellStyle"
      :headerRowClassName="headerRowClassName"
      :headerRowStyle="headerRowStyle"
      :headerCellClassName="headerCellClassName"
      :headerCellStyle="headerCellStyle"
      :highlightCurrentRow="highlightCurrentRow"
      :currentRowKey="currentRowKey"
      :emptyText="emptyText"
      :expandRowKeys="expandRowKeys"
      :defaultExpandAll="defaultExpandAll"
      :defaultSort="defaultSort"
      :tooltipEffect="tooltipEffect"
      :spanMethod="spanMethod"
      :selectOnIndeterminate="selectOnIndeterminate"
      :indent="indent"
      :treeProps="treeProps"
      :lazy="lazy"
      :load="load"
      @sort-change="sortFuc"
      @selection-change="selectionChange"
    >
      <!-- 多选 -->
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

      <!-- 序号 -->
      <el-table-column
        v-if="hasIndex"
        label="序号"
        type="index"
        width="50"
        align="center"
        fixed="left"
        key="index"
      >
        <template slot-scope="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <template v-for="(item, index) in header">
        <!-- 普通列和自定义列 -->
        <el-table-column
          v-if="item.visible"
          :key="index.toString() + item.prop"
          :label="item.label"
          :prop="item.prop"
          :type="item.type"
          :min-width="item.width"
          :fixed="item.fixed"
          :formatter="item.formatter"
          :row-key="index.toString() + item.prop"
          :column-key="index.toString() + item.prop"
          :align="item.align ? item.align : 'center'"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : true"
          :sortable="item.sortable ? 'custom' : false"
          :sort-orders="['ascending', 'descending']"
        >
          <template slot-scope="scope">
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

    <!-- 分页 -->
    <w-pagination
      class="u-float-right"
      v-if="page"
      :total="total"
      :page.sync="myPageNum"
      :limit.sync="myPageSize"
      @pagination="listFunc"
    ></w-pagination>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import wButton from "../Button";
import wScreenfull from "../../Others/Screenfull";
import wPagination from "../Pagination";
import wTableSettingsItem from "./components/item";

import { deepClone, curryConcat } from "easy-fns/lib/utils";
import { TABLE_COL_TYPE } from "../utils/constant";

export default {
  name: "wTable",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {
    wButton,
    wScreenfull,
    wPagination,
    wTableSettingsItem
  },

  mixins: [],

  data() {
    return {
      TABLE_COL_TYPE: TABLE_COL_TYPE,

      // 渲染的表头
      header: [],

      // 列高
      rowHeight: {},

      // 重置时的缓存头部
      cachedHeader: [],

      // 全选/半选
      isIndeterminate: false,
      checkAll: true
    };
  },

  computed: {
    selfRowStyle() {
      return this.rowHeight ? this.rowHeight : this.rowStyle;
    },

    myPageNum: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit("update:pageNum", val);
      }
    },

    myPageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      }
    },

    hasFixedLeft() {
      return !!this.leftHeader.length;
    },

    hasFixedRight() {
      return !!this.rightHeader.length;
    },

    leftHeader: {
      get() {
        return this.header.filter(i => i.fixed === TABLE_COL_TYPE.LEFT);
      },
      set(newV) {
        this.header = curryConcat(newV)(this.commonHeader)(
          this.rightHeader
        ).toString();
      }
    },

    commonHeader: {
      get() {
        return this.header.filter(i => !i.fixed);
      },
      set(newV) {
        this.header = curryConcat(this.leftHeader)(newV)(
          this.rightHeader
        ).toString();
      }
    },

    rightHeader: {
      get() {
        return this.header.filter(i => i.fixed === TABLE_COL_TYPE.RIGHT);
      },
      set(newV) {
        this.header = curryConcat(this.leftHeader)(this.commonHeader)(
          newV
        ).toString();
      }
    }
  },

  watch: {
    header(newV) {
      if (newV) {
        this.handleNewValue(newV);
        this.$emit("update:tableHeader", newV);
      }
    }
  },

  props: {
    // custom
    showSettings: { type: Boolean, default: true },

    hasSelect: Boolean,
    hasIndex: Boolean,

    page: { type: Boolean, default: true },
    pageNum: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    total: { type: Number, required: true },

    rowSort: Boolean,
    colSort: Boolean,

    tableHeader: { type: Array, required: true },
    tableData: { type: Array, required: true },
    tableName: String,

    selectable: Function,
    reserveSelection: Boolean,

    listFunc: { type: Function, required: true },
    selectionChange: { type: Function, default: () => {} },
    sortFuc: { type: Function, default: () => {} },

    // origin
    size: String,

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: { type: Boolean, default: true },

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: "hasChildren",
          children: "children"
        };
      }
    },

    lazy: Boolean,

    load: Function
  },

  methods: {
    // 初始化
    init() {
      const temp = [];

      this.tableHeader.map(i => {
        temp.push({
          ...i,
          visible: i.visible === false ? false : true, // checkbox
          showFixedIcon: false // hover
        });
      });

      this.header = temp;

      this.cachedHeader = Object.freeze(deepClone(temp));

      this.$emit("update:tableHeader", this.header);
    },

    // 全选/全不选
    handleCheckAllChange(val) {
      this.header.map((item, index, arr) => {
        this.$set(arr, index, { ...item, visible: val });
      });
    },

    // 半选
    handleNewValue(v) {
      const visibleItems = v.filter(i => i.visible);

      if (Array.isArray(visibleItems) && visibleItems.length !== 0) {
        if (visibleItems.length === this.header.length) {
          this.isIndeterminate = false;
          this.checkAll = true;
        } else {
          this.isIndeterminate = true;
          this.checkAll = false;
        }
      } else {
        this.isIndeterminate = false;
        this.checkAll = false;
      }
    },

    // 密度
    onDensity(v) {
      switch (v) {
        case "0":
          this.rowHeight = { height: "40px" };
          break;

        case "1":
          this.rowHeight = { height: "60px" };
          break;

        case "2":
          this.rowHeight = { height: "80px" };
          break;

        default:
          break;
      }
    },

    // 重置
    onReset() {
      this.header = deepClone(this.cachedHeader);
    }
  },

  created() {},

  mounted() {
    this.init();
  },

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style lang="scss" scoped>
.w-table {
  background-color: #ffffff;

  &:not(:root):fullscreen {
    padding: 20px;
  }
}
.table-settings__icon {
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  vertical-align: baseline;
}

.table-settings__popover {
  min-width: 200px;

  &.el-popover--plain {
    padding: 0;
  }
}
</style>
