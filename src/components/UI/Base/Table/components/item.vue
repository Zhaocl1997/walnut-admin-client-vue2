<template>
  <div :class="className">
    <ul>
      <li v-for="item in groupHeader" :key="item.prop" @click.stop.prevent="onClick($event, item)">
        <div
          class="u-pointer"
          @mouseover="onMouseOver($event, item)"
          @mouseleave="onMouseLeave($event, item)"
          :id="item.prop"
        >
          <w-icon icon="draggable" style="cursor:move;float:left;margin-top:3px;"></w-icon>

          <el-checkbox v-model="item.show" :disabled="item.disabled">
            <span class="u-one-line" style="max-width:150px;padding-right:20px;">{{ item.label }}</span>
          </el-checkbox>

          <div style="float:right;" v-show="item.visible">
            <el-tooltip content="不固定" placement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.COMMON"
                icon="vertical-align-middl"
                @click.stop="onSetCommon($event, item)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列首" placement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.LEFT"
                icon="vertical-align-top"
                @click.stop="onSetStart($event, item)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列尾" plalcement="top">
              <w-icon
                v-if="type !== TABLE_COL_TYPE.RIGHT"
                icon="vertical-align-botto"
                @click.stop="onSetEnd($event, item)"
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
    },
    groupHeader() {
      this.$emit("update:header", this.header);

      if (
        this.type === TABLE_COL_TYPE.LEFT ||
        this.type === TABLE_COL_TYPE.RIGHT
      ) {
        return this.header.filter(i => i.fixed == this.type);
      } else {
        return this.header.filter(i => !i.fixed);
      }
    }
  },

  watch: {},

  props: {
    type: String,
    header: Array
  },

  methods: {
    calcDeviation() {
      let ret = 0;

      switch (this.type) {
        case TABLE_COL_TYPE.LEFT:
          ret = 0;
          break;

        case TABLE_COL_TYPE.COMMON:
          this.header.map(i => {
            if (i.fixed && i.fixed === TABLE_COL_TYPE.LEFT) {
              ret += 1;
            }
          });
          break;

        case TABLE_COL_TYPE.RIGHT:
          this.header.map(i => {
            if (i.fixed !== TABLE_COL_TYPE.RIGHT) {
              ret += 1;
            }
          });
          break;

        default:
          break;
      }

      return ret;
    },

    onSetDrag() {
      const target = document.querySelector(`.${this.className} ul`);

      Sortable.create(target, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const d = this.calcDeviation();

          const oldItem = this.header[e.oldIndex + d];
          this.header.splice(e.oldIndex + d, 1);
          this.header.splice(e.newIndex + d, 0, oldItem);
        }
      });
    },

    findItemIndex(item) {
      const index = this.header.findIndex(i => i.prop === item.prop);
      return index;
    },

    onClick(evt, item) {
      const index = this.findItemIndex(item);

      this.$set(this.header, index, {
        ...this.header[index],
        show: !this.header[index].show
      });
    },

    onMouseOver(evt, item) {
      const index = this.findItemIndex(item);

      const target = document.getElementById(item.prop);
      target.style.backgroundColor = "rgba(240,248,255,.8)";

      this.$set(this.header, index, {
        ...this.header[index],
        visible: true
      });
    },

    onMouseLeave(evt, item) {
      const index = this.findItemIndex(item);

      const target = document.getElementById(item.prop);
      target.style.backgroundColor = "";

      this.$set(this.header, index, {
        ...this.header[index],
        visible: false
      });
    },

    onSetStart(evt, item) {
      const index = this.findItemIndex(item);

      this.$set(this.header, index, {
        ...this.header[index],
        fixed: TABLE_COL_TYPE.LEFT
      });
    },

    onSetEnd(evt, item) {
      const index = this.findItemIndex(item);

      this.$set(this.header, index, {
        ...this.header[index],
        fixed: TABLE_COL_TYPE.RIGHT
      });
    },

    onSetCommon(evt, item) {
      const index = this.findItemIndex(item);

      delete this.header[index].fixed;

      this.$set(this.header, index, {
        ...this.header[index]
      });
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