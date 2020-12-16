<template>
  <span class="w-table__setting-group-title">
    <slot />
  </span>

  <div :class="`${className} u-relative`">
    <ul>
      <li
        v-for="(item, index) in group"
        :key="index.toString() + item.prop"
        @click.stop.prevent="onToggleVisible(index)"
      >
        <div
          :id="item.prop"
          class="u-pointer column-item"
          @mouseover="onMouseOver($event, item, index)"
          @mouseleave="onMouseLeave($event, item, index)"
        >
          <div class="u-move u-float-left">
            <w-icon icon="drag"></w-icon>
          </div>

          <div class="u-one-line u-inline-block" style="max-width:100px;">
            <el-checkbox v-model="item.visible" :disabled="item.disabled">
              <span :title="item.label">{{ item.label }}</span>
            </el-checkbox>
          </div>

          <!-- <div class="u-float-right" style="margin-top:4px;" v-show="item.showFixedIcon">
            <el-tooltip content="不固定">
              <w-icon
                v-if="type !== TABLE_GROUP_TYPE.COMMON"
                icon="vamo"
                @click.stop="onSetCommon($event, item, index)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列首">
              <w-icon
                v-if="type !== TABLE_GROUP_TYPE.LEFT"
                icon="vato"
                @click.stop="onSetStart($event, item, index)"
              ></w-icon>
            </el-tooltip>

            <el-tooltip content="固定在列尾">
              <w-icon
                v-if="type !== TABLE_GROUP_TYPE.RIGHT"
                icon="vabo"
                @click.stop="onSetEnd($event, item, index)"
              ></w-icon>
            </el-tooltip>
          </div>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, computed, defineComponent, toRaw, watch } from "vue";

export default defineComponent({
  name: "wTableSettingGroup",

  props: {
    /**
     * @description table header group type，left/common/right
     */
    type: String,

    /**
     * @description table header
     */
    group: Array
  },

  emits: ["update:group"],

  setup(props, { attrs, emit }) {
    const TABLE_GROUP_TYPE = {
      LEFT: "left",
      COMMON: "common",
      RIGHT: "right"
    };

    const className = computed(() => {
      return `w-table__setting-group-${props.type}`;
    });

    const onToggleVisible = index => {
      props.group.splice(index, 1, {
        ...props.group[index],
        visible: !props.group[index].visible
      });
    };

    const onMouseOver = () => {};
    const onMouseLeave = () => {};

    const onSetStart = () => {};
    const onSetEnd = () => {};
    const onSetCommon = () => {};

    const onSetDrag = () => {};

    return {
      className,
      TABLE_GROUP_TYPE,

      onToggleVisible,
      onMouseOver,
      onMouseLeave,
      onSetStart,
      onSetEnd,
      onSetCommon
    };
  }
});
</script>

<style lang='scss' scoped>
@import "../../../../assets/style/index.scss";

.w-table__setting-group-title {
  // margin-left: 15px;
  // padding-right: 5px;
  // color: grey;
  // font-size: 0.9rem;
  // line-height: 30px;
}

.column-item:hover {
  background: rgba(240, 248, 255, 0.8);
}

.w-table__setting-group-common,
.w-table__setting-group-left,
.w-table__setting-group-right {
  @include scrollBar;

  font-size: 16px;
  list-style: none;
  margin: 0;

  max-height: 200px;
  overflow-y: auto;
}
</style>