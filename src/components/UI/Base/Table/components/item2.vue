<template>
  <div :class="className" style="position:relative;">
    <ul>
      <li
        v-for="(item, index) in header"
        :key="index.toString() + item.prop"
        @click.stop.prevent="onClick($event, item, index)"
      >
        <div
          :id="item.prop"
          class="column-item u-pointer"
          @mouseover.self="onMouseOver($event, item, index)"
          @mouseleave.self="onMouseLeave($event, item, index)"
        >
          <div style="cursor:move;float:left;margin-top:3px;">
            <w-icon icon="draggable"></w-icon>
          </div>

          <div class="u-one-line" style="max-width:100px;display:inline-block;">
            <el-checkbox v-model="item.visible" :disabled="item.disabled">
              <span :title="item.label">{{ item.label }}</span>
            </el-checkbox>
          </div>

          <div style="float:right;margin-top:4px;" v-show="item.showFixedIcon">
            <el-tooltip content="不固定" placement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.COMMON"
                icon="vertical-align-middl"
                @click.stop="onSetCommon($event, item, index)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列首" placement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.LEFT"
                icon="vertical-align-top"
                @click.stop="onSetStart($event, item, index)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列尾" plalcement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.RIGHT"
                icon="vertical-align-botto"
                @click.stop="onSetEnd($event, item, index)"
              ></w-icon>
            </el-tooltip>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { TABLE_COL_TYPE } from "@/utils/constant";

export default {
  name: "wTableColumnItem",

  inject: [],

  provide() {},

  model: {
    event: "",
    prop: ""
  },

  components: {},

  mixins: [],

  data() {
    return {
      TABLE_COL_TYPE: TABLE_COL_TYPE
    };
  },

  computed: {
    className() {
      return `table-header__main-${this.type}`;
    }
  },

  watch: {},

  props: {
    type: String,
    header: Array
  },

  methods: {
    onSetDrag() {
      const target = document.querySelector(`.${this.className} ul`);

      Sortable.create(target, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const oldItem = this.header[e.oldIndex];
          this.header.splice(e.oldIndex, 1);
          this.header.splice(e.newIndex, 0, oldItem);
        }
      });
    },

    onClick(evt, item, index) {
      this.header[index].visible = !this.header[index].visible;
      this.$emit("update:header", this.header);
    },

    onMouseOver(evt, item, index) {
      this.header[index].showFixedIcon = true;
      this.$emit("update:header", this.header);
    },

    onMouseLeave(evt, item, index) {
      this.header[index].showFixedIcon = false;
      this.$emit("update:header", this.header);
    },

    onSetStart(evt, item, index) {
      this.header[index].fixed = TABLE_COL_TYPE.LEFT;
      this.$emit("update:header", this.header);
    },

    onSetEnd(evt, item, index) {
      this.header[index].fixed = TABLE_COL_TYPE.RIGHT;
      this.$emit("update:header", this.header);
    },

    onSetCommon(evt, item, index) {
      delete this.header[index].fixed;
      this.$emit("update:header", this.header);
    }
  },

  created() {},

  mounted() {
    this.$nextTick(() => {
      this.onSetDrag();
    });
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
.column-item:hover {
  background: rgba(240, 248, 255, 0.8);
}

.table-header__main-common {
  font-size: 16px;
  list-style: none;
  margin: 0;

  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
</style>