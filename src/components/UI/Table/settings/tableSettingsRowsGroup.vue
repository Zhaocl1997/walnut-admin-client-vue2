<template>
  <div v-if="h.length !== 0">
    <el-divider v-if="type !== TABLE_GROUP_TYPE.LEFT" />

    <span class="w-table__setting-group-title">
      <slot />
    </span>
  </div>

  <div :class="`${className} u-relative`">
    <ul>
      <li
        v-for="item in h"
        :key="item.prop"
        @click.stop.prevent="onToggleVisible(item.prop)"
      >
        <div :id="item.prop" class="u-pointer column-item">
          <div class="u-move u-float-left w-table__setting-icon">
            <w-icon icon="drag" />
          </div>

          <div class="u-one-line u-inline-block" style="max-width: 110px">
            <el-checkbox v-model="item.visible" :disabled="item.disabled">
              <span :title="item.label">{{ item.label }}</span>
            </el-checkbox>
          </div>

          <div class="w-table__setting-fix w-table__setting-icon u-float-right">
            <el-tooltip content="不固定" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  v-if="type !== TABLE_GROUP_TYPE.COMMON"
                  icon="vamo"
                  @click.stop="onSetCommon(item)"
                />
              </div>
            </el-tooltip>

            <el-tooltip content="固定在列首" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  v-if="type !== TABLE_GROUP_TYPE.LEFT"
                  icon="vato"
                  @click.stop="onSetLeftFixed(item)"
                />
              </div>
            </el-tooltip>

            <el-tooltip content="固定在列尾" :open-delay="200">
              <div class="u-inline">
                <w-icon
                  v-if="type !== TABLE_GROUP_TYPE.RIGHT"
                  icon="vabo"
                  @click.stop="onSetRightFixed(item)"
                />
              </div>
            </el-tooltip>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  import {
    ref,
    reactive,
    computed,
    defineComponent,
    toRaw,
    watch,
    onMounted,
    toRefs,
    nextTick,
  } from 'vue'

  import { TABLE_GROUP_TYPE } from '../constant'

  export default defineComponent({
    name: 'WTableSettingsRowsGroup',

    props: {
      /**
       * @description table header group type，left/common/right
       */
      type: String,

      /**
       * @description table header
       */
      group: Array,
    },

    emits: ['update:group'],

    setup(props, { attrs, emit }) {
      const state = reactive({
        h: [],
      })

      watch(
        () => props.group,
        (val) => {
          if (props.type === TABLE_GROUP_TYPE.COMMON) {
            state.h = val.filter((i) => !i.fixed)
          } else {
            state.h = val.filter((i) => i.fixed === props.type)
          }
        },
        {
          deep: true,
          immediate: true,
        }
      )

      const className = computed(() => {
        return `w-table__setting-group-${props.type}`
      })

      const onToggleVisible = (prop) => {
        const index = props.group.findIndex((i) => i.prop === prop)

        // eslint-disable-next-line
        props.group.splice(index, 1, {
          ...props.group[index],
          visible: !props.group[index].visible,
        })
      }

      const onSetLeftFixed = (item) => {
        const index = props.group.findIndex((i) => i.prop === item.prop)

        // eslint-disable-next-line
        props.group.splice(index, 1)

        // eslint-disable-next-line
        props.group.unshift({ ...item, fixed: TABLE_GROUP_TYPE.LEFT })
      }

      const onSetRightFixed = (item) => {
        const index = props.group.findIndex((i) => i.prop === item.prop)

        // eslint-disable-next-line
        props.group.splice(index, 1)

        // eslint-disable-next-line
        props.group.push({ ...item, fixed: TABLE_GROUP_TYPE.RIGHT })
      }

      const omit = (obj, uselessKeys) => {
        return Object.keys(obj).reduce(
          (prev, key) =>
            uselessKeys.includes(key)
              ? { ...prev }
              : { ...prev, [key]: obj[key] },
          {}
        )
      }

      const onSetCommon = (item) => {
        const index = props.group.findIndex((i) => i.prop === item.prop)

        // eslint-disable-next-line
        props.group.splice(index, 1)

        // eslint-disable-next-line
        props.group.unshift(omit(item, 'fixed'))
      }

      const calcDeviation = () => {
        if (props.type === TABLE_GROUP_TYPE.COMMON) {
          return props.group.filter((i) => i.fixed === TABLE_GROUP_TYPE.LEFT)
            .length
        }

        if (props.type === TABLE_GROUP_TYPE.LEFT) {
          return 0
        }

        if (props.type === TABLE_GROUP_TYPE.RIGHT) {
          return props.group.filter((i) => i.fixed !== TABLE_GROUP_TYPE.RIGHT)
            .length
        }
      }

      const onSetDrag = () => {
        const target = document.querySelector(`.${className.value} ul`)

        new Sortable(target, {
          animation: 180,
          delay: 0,
          ghostClass: 'sortable-ghost',
          onEnd: (e) => {
            const d = calcDeviation()
            const oldItem = props.group[e.oldIndex + d]

            // eslint-disable-next-line
            props.group.splice(e.oldIndex + d, 1)

            // eslint-disable-next-line
            props.group.splice(e.newIndex + d, 0, oldItem)
          },
        })
      }

      onMounted(() => {
        onSetDrag()
      })

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
        TABLE_GROUP_TYPE,
        className,

        onToggleVisible,
        onSetLeftFixed,
        onSetRightFixed,
        onSetCommon,

        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../../../assets/style/index.scss';

  .w-table__setting-group-title {
    color: grey;
  }

  .w-table__setting-fix {
    display: none;
  }

  .w-table__setting-icon {
    margin-top: 3px;
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
