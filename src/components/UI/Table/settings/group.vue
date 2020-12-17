<template>
  <div v-if="h.length !== 0">
    <el-divider v-if="type !== TABLE_GROUP_TYPE.LEFT || type !== TABLE_GROUP_TYPE.COMMON || h.find(i => i.fixed !== 'left')"></el-divider>

    <span class="w-table__setting-group-title">
      <slot />
    </span>
  </div>

  <div :class="`${className} u-relative`">
    <ul>
      <li v-for="(item, index) in h" :key="item.id" @click.stop.prevent="onToggleVisible(item.id)">
        <div :id="item.prop" class="u-pointer column-item">
          <div class="u-move u-float-left">
            <w-icon icon="drag"></w-icon>
          </div>

          <div class="u-one-line u-inline-block" style="max-width:100px;">
            <el-checkbox v-model="item.visible" :disabled="item.disabled">
              <span :title="item.label">{{ item.label }}</span>
            </el-checkbox>
          </div>

          <div class="w-table__setting-fix u-float-right">
            <el-tooltip content="不固定" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  icon="vamo"
                  v-if="type !== TABLE_GROUP_TYPE.COMMON"
                  @click.stop="onSetCommon(item)"
                ></w-icon>
              </div>
            </el-tooltip>

            <el-tooltip content="固定在列首" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  icon="vato"
                  v-if="type !== TABLE_GROUP_TYPE.LEFT"
                  @click.stop="onSetLeftFixed(item)"
                ></w-icon>
              </div>
            </el-tooltip>

            <el-tooltip content="固定在列尾" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  icon="vabo"
                  v-if="type !== TABLE_GROUP_TYPE.RIGHT"
                  @click.stop="onSetRightFixed(item)"
                ></w-icon>
              </div>
            </el-tooltip>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Sortable from "sortablejs";
import {
  ref,
  reactive,
  computed,
  defineComponent,
  toRaw,
  watch,
  onMounted,
  toRefs,
  nextTick
} from "vue";

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

    const state = reactive({
      h: []
    });

    watch(
      () => props.group,
      val => {
        if (props.type === TABLE_GROUP_TYPE.COMMON) {
          state.h = val.filter(i => !i.fixed);
        } else {
          state.h = val.filter(i => i.fixed === props.type);
        }
      },
      {
        deep: true
      }
    );

    const className = computed(() => {
      return `w-table__setting-group-${props.type}`;
    });

    const onToggleVisible = id => {
      const index = props.group.findIndex(i => i.id === id);

      props.group.splice(index, 1, {
        ...props.group[index],
        visible: !props.group[index].visible
      });
    };

    const onSetLeftFixed = item => {
      const index = props.group.findIndex(i => i.id === item.id);

      props.group.splice(index, 1);
      props.group.unshift({ ...item, fixed: TABLE_GROUP_TYPE.LEFT });
    };

    const onSetRightFixed = item => {
      const index = props.group.findIndex(i => i.id === item.id);

      props.group.splice(index, 1);
      props.group.push({ ...item, fixed: TABLE_GROUP_TYPE.RIGHT });
    };

    const onSetCommon = item => {
      const index = props.group.findIndex(i => i.id === item.id);

      props.group.splice(index, 1);
      props.group.unshift({ ...item, fixed: "" });
    };

    const onSetDrag = () => {
      const target = document.querySelector(`.${className.value} ul`);

      new Sortable(target, {
        animation: 180,
        delay: 0,
        ghostClass: "sortable-ghost",
        onEnd: e => {
          const oldItem = props.group[e.oldIndex];
          props.group.splice(e.oldIndex, 1);
          props.group.splice(e.newIndex, 0, oldItem);
        }
      });
    };

    // watch(
    //   () => props.group,
    //   value => {
    //     onSetDrag();
    //   },
    //   {
    //     deep: true
    //   }
    // );

    return {
      className,
      TABLE_GROUP_TYPE,

      onToggleVisible,

      ...toRefs(state),

      onSetLeftFixed,
      onSetRightFixed,
      onSetCommon
    };
  }
});
</script>

<style lang='scss' scoped>
@import "../../../../assets/style/index.scss";

.w-table__setting-group-title {
  color: grey;

  span {
    padding-right: 2px;
    letter-spacing: 0;
  }
}

.w-table__setting-fix {
  display: none;
}

.column-item:hover {
  background: rgba(240, 248, 255, 0.8);

  .w-table__setting-fix {
    display: initial;
  }
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

.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>