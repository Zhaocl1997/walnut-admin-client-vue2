<template>
  <div class="w-table">
    <!-- 右边table设置区域 -->
    <div class="mb8" style="float:right;" v-if="showSettings">
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新" placement="top">
        <w-icon icon="sync" class="table-settings__icon" @click="listFunc"></w-icon>
      </el-tooltip>

      <!-- 列 -->
      <el-tooltip effect="dark" content="列设置" placement="top">
        <el-popover placement="bottom" trigger="click" popper-class="table-settings__popover">
          <!-- 左侧固定 -->
          <template v-if="hasFixedLeft">
            <span class="table-header__info">固定在左侧</span>

            <ul>
              <li v-for="item in leftFixedHeader" :key="item.prop">
                <w-icon icon="verticalright"></w-icon>
                <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
              </li>
            </ul>

            <el-divider></el-divider>
          </template>

          <!-- 正常项 -->
          <span class="table-header__info">
            不固定
            <w-button class="reset-button" type="text" @click="onReset">重置</w-button>
          </span>

          <ul class="table-header__main">
            <li v-for="item in commonHeader" :key="item.prop">
              <w-icon icon="drag"></w-icon>
              <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
            </li>
          </ul>

          <template v-if="hasFixedRight">
            <el-divider></el-divider>

            <span class="table-header__info">固定在右侧</span>
            <ul>
              <li v-for="item in rightFixedHeader" :key="item.prop">
                <w-icon icon="verticalleft"></w-icon>
                <el-checkbox v-model="item.show" :disabled="item.disabled">{{ item.label }}</el-checkbox>
              </li>
            </ul>
          </template>

          <w-icon slot="reference" icon="setting" class="table-settings__icon"></w-icon>
        </el-popover>
      </el-tooltip>

      <!-- 全屏 -->
      <el-tooltip effect="dark" content="全屏" placement="top">
        <w-screenfull class="table-settings__icon" />
      </el-tooltip>

      <!-- 密度 -->
      <el-tooltip effect="dark" content="密度" placement="top">
        <el-dropdown @command="onDensity" trigger="click">
          <w-icon icon="vertical-align-middl" class="table-settings__icon"></w-icon>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0" key="0">紧凑</el-dropdown-item>
            <el-dropdown-item command="1" key="1">中等</el-dropdown-item>
            <el-dropdown-item command="2" key="2">宽裕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>
    </div>

    <div class="w-table">
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
        v-if="page"
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
      header: [],
      deviation: 0, // fixed left 带来的偏差
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
    },
    hasFixedLeft() {
      return this.header.find(i => i.fixed === "left");
    },
    hasFixedRight() {
      return this.header.find(i => i.fixed === "right");
    },
    leftFixedHeader() {
      return this.header.filter(i => i.fixed === "left");
    },
    rightFixedHeader() {
      return this.header.filter(i => i.fixed === "right");
    },
    commonHeader() {
      return this.header.filter(i => !i.fixed);
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

      // fixed left +1
      // fixed right no change
      for (let i = 0; i < this.header.length; i++) {
        const e = this.header[i];
        if (e.fixed && e.fixed === "left") {
          this.deviation += 1;
        }
      }
    },

    // 行拖拽
    rowDrop() {
      const target = document.querySelector(".el-table__body-wrapper tbody");

      Sortable.create(target, {
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
      const target = document.querySelector(".el-table__header-wrapper tr");

      Sortable.create(target, {
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
    setDrop() {
      const target = document.querySelector(".table-header__main");
      console.log(target);

      Sortable.create(target, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const oldItem = this.header[e.oldIndex + this.deviation];
          this.header.splice(e.oldIndex + this.deviation, 1);
          this.header.splice(e.newIndex + this.deviation, 0, oldItem);

          this.$emit("update:tableHeader", this.header);

          this.$nextTick(() => {
            this.$refs.table.doLayout();
          });
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
    }

    if (this.showSettings) {
      this.setDrop();
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

<style lang="scss" scoped>
.w-table {
  .table-settings__icon {
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    vertical-align: baseline;
  }
}

.table-settings__popover {
  min-width: 200px;

  &.el-popover--plain {
    padding: 0;
  }

  .el-divider--horizontal {
    margin: 5px 0;
  }

  .table-header__info {
    margin-left: 25px;
    color: grey;
    font-size: 0.9rem;
    line-height: 30px;
  }

  .table-header__main {
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
}
</style>