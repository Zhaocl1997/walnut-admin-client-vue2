<template>
  <div :class="className">
    <ul>
      <li
        v-for="(item, index) in targetHeader"
        :key="item.prop"
        @click.stop.prevent="onClick(index)"
      >
        <div class="pointer" @mouseover="onMouseOver(index)" @mouseleave="onMouseLeave(index)">
          <w-icon icon="draggable" style="cursor:move;"></w-icon>

          <el-checkbox v-model="item.show" :disabled="item.disabled">
            <span class="one-line" style="max-width:150px;padding-right:20px;">{{ item.label }}</span>
          </el-checkbox>

          <div style="float:right;" v-show="item.visible">
            <el-tooltip content="不固定" placement="top">
              <w-icon v-if="!type" icon="vertical-align-middl" @click.stop="onReset(index)"></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列首" placement="top">
              <w-icon
                v-if="type !== 'left'"
                icon="vertical-align-top"
                @click.stop="onSetStart(index)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列尾" plalcement="top">
              <w-icon
                v-if="type !== 'right'"
                icon="vertical-align-botto"
                @click.stop="onSetEnd(index)"
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
    return {};
  },

  computed: {
    className() {
      return `table-header__main-${this.type}`;
    },
    targetHeader: {
      get() {
        if (this.type) {
          return this.header.filter(i => i.fixed == this.type);
        } else {
          return this.header.filter(i => !i.fixed);
        }
      },
      set(newV) {
        this.$emit("update:header", newV);
      }
    },
    leftDeviation() {
      let ret = 0;
      this.header.map(i => {
        if (i.fixed && i.fixed === "left") {
          ret += 1;
        }
      });
      return ret;
    },
    commonDeviation() {
      let ret = 0;
      this.header.map(i => {
        if (!i.fixed) {
          ret += 1;
        }
      });
      return ret;
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
    onClick(i) {
      let index;
      switch (this.type) {
        case "left":
          index = i;
          break;

        case "right":
          index = i + this.leftDeviation + this.commonDeviation;
          break;

        default:
          index = i + this.leftDeviation;
          break;
      }
      this.header[index].show = !this.header[index].show;
      // this.$emit("change", this.header[i]);
    },
    onSetStart(i) {
      this.header[i].fixed = "left";
      // this.$emit("change", this.header[i]);
    },
    onSetEnd(i) {
      this.header[i].fixed = "right";
      // this.$emit("change", this.header[i]);
    },
    onReset(i) {
      this.header[i].fixed = "";
      // this.$emit("change", this.header[i]);
    },
    onMouseOver(i) {
      this.header[i].visible = true;
    },
    onMouseLeave(i) {
      this.header[i].visible = false;
    }
  },

  created() {},

  mounted() {
    this.onSetDrag();
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
.table-header__main,
.table-header__main-left,
.table-header__main-right {
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
</style>