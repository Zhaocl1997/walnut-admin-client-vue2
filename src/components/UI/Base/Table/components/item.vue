<template>
  <div>
    <span class="table-settings__title">
      <slot />
    </span>

    <div :class="className + ' u-relative'">
      <ul>
        <li
          v-for="(item, index) in header"
          :key="index.toString() + item.prop"
          @click.stop.prevent="onClick($event, item, index)"
        >
          <div
            :id="item.prop"
            class="u-pointer column-item"
            @mouseover="onMouseOver($event, item, index)"
            @mouseleave="onMouseLeave($event, item, index)"
          >
            <div class="u-move u-float-left" style="margin-top:3px;">
              <w-icon icon="draggable"></w-icon>
            </div>

            <div class="u-one-line u-inline-block" style="max-width:100px;">
              <el-checkbox v-model="item.visible" :disabled="item.disabled">
                <span :title="item.label">{{ item.label }}</span>
              </el-checkbox>
            </div>

            <div class="u-float-right" style="margin-top:4px;" v-show="item.showFixedIcon">
              <el-tooltip content="不固定">
                <w-icon
                  v-if="type !== TABLE_COL_TYPE.COMMON"
                  icon="vertical-align-middl"
                  @click.stop="onSetCommon($event, item, index)"
                ></w-icon>
              </el-tooltip>

              <el-tooltip content="固定在列首">
                <w-icon
                  v-if="type !== TABLE_COL_TYPE.LEFT"
                  icon="vertical-align-top"
                  @click.stop="onSetStart($event, item, index)"
                ></w-icon>
              </el-tooltip>

              <el-tooltip content="固定在列尾">
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

    <el-divider></el-divider>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { TABLE_COL_TYPE } from "@/utils/constant";

export default {
  name: "wTableSettingsItem",

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
    // stateless
    onMouseOver(evt, item, index) {
      this.header[index].showFixedIcon = true;
    },

    onMouseLeave(evt, item, index) {
      this.header[index].showFixedIcon = false;
    },

    // stateful
    onSetDrag() {
      const target = document.querySelector(`.${this.className} ul`);

      Sortable.create(target, {
        animation: 180,
        delay: 0,
        onEnd: e => {
          const oldItem = this.header[e.oldIndex];
          this.header.splice(e.oldIndex, 1);
          this.header.splice(e.newIndex, 0, oldItem);

          this.$emit("update:header", this.header);
        }
      });
    },

    onClick(evt, item, index) {
      this.header[index].visible = !this.header[index].visible;
      this.$emit("update:header", this.header);
    },

    onSetStart(evt, item, index) {
      this.$set(this.header, index, {
        ...this.header[index],
        fixed: TABLE_COL_TYPE.LEFT
      });
      this.$emit("update:header", this.header);
    },

    onSetEnd(evt, item, index) {
      this.$set(this.header, index, {
        ...this.header[index],
        fixed: TABLE_COL_TYPE.RIGHT
      });
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
@import "~@/assets/styles/main.scss";

.el-divider--horizontal {
  margin: 5px 0;
}

.table-settings__title {
  margin-left: 15px;
  padding-right: 5px;
  color: grey;
  font-size: 0.9rem;
  line-height: 30px;
}

.column-item:hover {
  background: rgba(240, 248, 255, 0.8);
}

.table-header__main-common,
.table-header__main-left,
.table-header__main-right {
  @include scrollbar;

  font-size: 16px;
  list-style: none;
  margin: 0;

  max-height: 200px;
  overflow-y: auto;
}
</style>