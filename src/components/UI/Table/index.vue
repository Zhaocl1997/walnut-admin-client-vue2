<template>
  <div class="ui-table">
    <!-- 右边table设置区域 -->
    <div class="mb8" style="float:right;" v-if="showSettings">
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新" placement="top">
        <w-icon icon="sync" class="table-settings-icon" @click="listFunc"></w-icon>
      </el-tooltip>

      <!-- 列 -->
      <el-tooltip effect="dark" content="列设置" placement="top">
        <el-popover placement="bottom" trigger="click" popper-class="table-settings">
          <span class="table-header-info" v-if="header.find(i => i.fixed === 'left')">固定在左侧</span>
          <ul class="table-header-left">
            <li v-for="item in header.filter(i => i.fixed === 'left')" :key="item.prop">
              <w-icon icon="fixed-left"></w-icon>
              <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
            </li>
          </ul>

          <el-divider v-if="header.find(i => i.fixed === 'left')"></el-divider>

          <span class="table-header-info">
            不固定
            <w-button class="reset-button" type="text" @click="onReset">重置</w-button>
          </span>

          <ul class="table-header">
            <li v-for="item in header.filter(i => !i.fixed)" :key="item.prop">
              <w-icon
                :icon="item.disabled ? 'lock' : 'drag'"
                :style="item.disabled ? 'cursor:initial;font-size:11px;vertical-align:baseline;' : 'cursor:move;font-size:12px;margin-top:1px;'"
              ></w-icon>
              <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
            </li>
          </ul>

          <el-divider v-if="header.find(i => i.fixed === 'right')"></el-divider>

          <span class="table-header-info" v-if="header.find(i => i.fixed === 'right')">固定在右侧</span>
          <ul class="table-header-right">
            <li v-for="item in header.filter(i => i.fixed === 'right')" :key="item.prop">
              <w-icon icon="fixed-right"></w-icon>
              <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
            </li>
          </ul>

          <w-icon slot="reference" icon="setting" class="table-settings-icon"></w-icon>
        </el-popover>
      </el-tooltip>

      <!-- 全屏 -->
      <el-tooltip effect="dark" content="全屏" placement="top">
        <w-screenfull class="table-settings-icon" />
      </el-tooltip>

      <!-- 密度 -->
      <el-tooltip effect="dark" content="密度" placement="top">
        <el-dropdown @command="onDensity" trigger="click">
          <w-icon icon="vertical-align-middl" class="table-settings-icon"></w-icon>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0" key="0">紧凑</el-dropdown-item>
            <el-dropdown-item command="1" key="1">中等</el-dropdown-item>
            <el-dropdown-item command="2" key="2">宽裕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </div>

    <div>
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
        :rowStyle="cRowStyle"
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
        @selection-change="selectFunc"
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
            v-if="item.show"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :type="item.type"
            :min-width="item.width"
            :fixed="item.fixed"
            :formatter="item.formatter"
            :row-key="index.toString()"
            :column-key="index.toString()"
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
        :hidden="!page"
        :total="total"
        :page.sync="myPageNum"
        :limit.sync="myPageSize"
        @pagination="listFunc"
      ></w-pagination>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import wButton from "../Button";
import wScreenfull from "../Screenfull";
import wPagination from "../Pagination";

import { deepClone } from "@/utils";

export default {
  name: "wTable",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: { wButton, wScreenfull, wPagination },

  mixins: [],

  data() {
    return {
      header: [], // 表头
      deviation: 0, // index和select带来的偏差
      fixedDeviation: 0, // fixed left 带来的偏差
      rowHeight: "",
      cachedHeader: []
    };
  },

  computed: {
    cRowStyle() {
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
    }
  },

  watch: {
    tableHeader(newV) {
      if (newV) {
        this.header = newV;
      }
    }
  },

  props: {
    // custom
    value: Array,
    showSettings: { type: Boolean, default: true },

    hasSelect: Boolean,
    hasIndex: Boolean,

    page: { type: Boolean, default: true },
    pageNum: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    total: { type: Number, required: true },

    rowSort: { type: Boolean, default: true },
    colSort: { type: Boolean, default: true },

    tableHeader: { type: Array, required: true },
    tableData: { type: Array, required: true },
    tableName: String,

    selectable: Function,
    reserveSelection: Boolean,

    listFunc: { type: Function, required: true },
    selectFunc: { type: Function, default: () => {} },
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
          show: i.show === false ? false : true // 是否显示列的标识
        });
      });

      this.header = temp;

      this.cachedHeader = Object.freeze(deepClone(temp));

      this.$emit("update:tableHeader", this.header);

      // 计算偏差
      if (this.hasSelect) {
        this.deviation += 1;
      }

      if (this.hasIndex) {
        this.deviation += 1;
      }

      for (let i = 0; i < this.header.length; i++) {
        const e = this.header[i];
        if (e.fixed && e.fixed === "left") {
          this.fixedDeviation += 1;
        }
      }
    },

    // 行拖拽
    rowDrop() {
      const wrapperTr = document.querySelector(".el-table__body-wrapper tbody");

      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const currRow = this.tableData.splice(e.oldIndex, 1)[0];
          this.tableData.splice(e.newIndex, 0, currRow);
        }
      });
    },

    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector(".el-table__header-wrapper tr");

      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const oldItem = this.header[e.oldIndex - this.deviation];
          this.header.splice(e.oldIndex - this.deviation, 1);
          this.header.splice(e.newIndex - this.deviation, 0, oldItem);

          this.$emit("update:tableHeader", this.header);
        }
      });
    },

    // 配置项列拖拽
    settingsDrop() {
      const wrapperTr = document.querySelector(".table-header");

      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const oldItem = this.header[e.oldIndex + this.deviation];
          this.header.splice(e.oldIndex + this.deviation, 1);
          this.header.splice(e.newIndex + this.deviation, 0, oldItem);

          this.$emit("update:tableHeader", this.header);
        }
      });
    },

    // 密度
    onDensity(v) {
      switch (v) {
        case "0":
          this.rowHeight = { height: "20px" };
          break;

        case "1":
          this.rowHeight = { height: "40px" };
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

    if (this.rowSort) {
      this.rowDrop();
    }

    if (this.colSort) {
      this.columnDrop();
      this.settingsDrop();
    }
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

<style lang="scss">
.table-settings-icon {
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  vertical-align: baseline;
}

.table-settings {
  &.el-popover--plain {
    padding: 0;
  }

  .el-divider--horizontal {
    margin: 5px 0;
  }
}

.table-header-info {
  margin-left: 25px;
  color: grey;
  font-size: 0.9rem;
  line-height: 30px;
}

.table-header {
  padding-left: 20px;
  font-size: 16px;
  list-style: none;
  margin: 0;

  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
.table-header-left {
  list-style: none;
  margin: 0;
  margin-left: -18px;
}
.table-header-right {
  list-style: none;
  margin: 0;
  margin-left: -18px;
}
</style>