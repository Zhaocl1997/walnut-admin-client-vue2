<template>
  <div v-if="getShouldShowHeaders.length !== 0">
    <el-divider v-if="type !== TABLE_GROUP_TYPE.LEFT" />

    <span class="w-table__setting-group-title">
      <slot />
    </span>
  </div>

  <div :class="`${getClassName} u-relative`">
    <ul>
      <li
        v-for="item in getShouldShowHeaders"
        :key="item.prop"
        @click.stop.prevent="onToggleVisible(item.prop)"
      >
        <div :id="item.prop" class="u-pointer column-item">
          <div class="u-move u-float-left w-table__setting-icon">
            <w-icon icon="drag" />
          </div>

          <div class="u-one-line u-inline-block column-item-content">
            <el-checkbox v-model="item.visible" :disabled="item.disabled">
              <span :title="`${item.label}(宽: ${item.width})`"
                >{{ item.label }}({{ item.width }})</span
              >
            </el-checkbox>
          </div>

          <div class="w-table__setting-fix w-table__setting-icon u-float-right">
            <el-tooltip
              :content="t('component.table.settings.fixUnset')"
              :open-delay="200"
            >
              <div class="u-inline">
                <w-icon
                  v-if="type !== TABLE_GROUP_TYPE.COMMON"
                  icon="vamo"
                  @click.stop="onSetCommon(item)"
                />
              </div>
            </el-tooltip>

            <el-tooltip
              :content="t('component.table.settings.fixLeft')"
              :open-delay="200"
            >
              <div class="u-inline">
                <w-icon
                  v-if="type !== TABLE_GROUP_TYPE.LEFT"
                  icon="vato"
                  @click.stop="onSetLeftFixed(item)"
                />
              </div>
            </el-tooltip>

            <el-tooltip
              :content="t('component.table.settings.fixRight')"
              :open-delay="200"
            >
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
  import { computed, defineComponent, onMounted, unref } from 'vue'
  import { omit } from 'easy-fns-ts'
  import hooks from '/@/hooks'

  import { TABLE_GROUP_TYPE } from '/@/components/UI/Table/src/types'
  import { useTableContext } from '/@/components/UI/Table/src/hooks/useTableContext'

  export default defineComponent({
    name: 'WTableSettingsRowsGroup',

    props: {
      /**
       * @description table header group type，left/common/right
       */
      type: String,
    },

    setup(props) {
      const { useI18n } = hooks
      const { t } = useI18n()

      const { getContextProps } = useTableContext()
      const { headers } = getContextProps()

      const getHeaders = computed(() => unref(headers))

      const getShouldShowHeaders = computed(() => {
        if (props.type === TABLE_GROUP_TYPE.COMMON) {
          return getHeaders.value.filter((i) => !i.fixed)
        } else {
          return getHeaders.value.filter((i) => i.fixed === props.type)
        }
      })

      const getClassName = computed(() => {
        return `w-table__setting-group-${props.type}`
      })

      const onToggleVisible = (prop) => {
        const index = getHeaders.value.findIndex((i) => i.prop === prop)

        getHeaders.value.splice(index, 1, {
          ...getHeaders.value[index],
          visible: !getHeaders.value[index].visible,
        })
      }

      const onSetLeftFixed = (item) => {
        const index = getHeaders.value.findIndex((i) => i.prop === item.prop)

        getHeaders.value.splice(index, 1)
        getHeaders.value.unshift({ ...item, fixed: TABLE_GROUP_TYPE.LEFT })
      }

      const onSetRightFixed = (item) => {
        const index = getHeaders.value.findIndex((i) => i.prop === item.prop)

        getHeaders.value.splice(index, 1)
        getHeaders.value.push({ ...item, fixed: TABLE_GROUP_TYPE.RIGHT })
      }

      const onSetCommon = (item) => {
        const index = getHeaders.value.findIndex((i) => i.prop === item.prop)

        getHeaders.value.splice(index, 1)
        getHeaders.value.unshift(omit(item, 'fixed'))
      }

      const calcDeviation = () => {
        if (props.type === TABLE_GROUP_TYPE.COMMON) {
          return getHeaders.value.filter(
            (i) => i.fixed === TABLE_GROUP_TYPE.LEFT
          ).length
        }

        if (props.type === TABLE_GROUP_TYPE.LEFT) {
          return 0
        }

        if (props.type === TABLE_GROUP_TYPE.RIGHT) {
          return getHeaders.value.filter(
            (i) => i.fixed !== TABLE_GROUP_TYPE.RIGHT
          ).length
        }
      }

      const onSetDrag = () => {
        const target = document.querySelector(`.${getClassName.value} ul`)

        new Sortable(target, {
          animation: 180,
          delay: 0,
          // TODO more flexable
          // group: 'name123',
          ghostClass: 'sortable-ghost',
          onEnd: (e) => {
            const d = calcDeviation()
            const oldItem = getHeaders.value[e.oldIndex + d]

            getHeaders.value.splice(e.oldIndex + d, 1)
            getHeaders.value.splice(e.newIndex + d, 0, oldItem)
          },
        })
      }

      onMounted(() => {
        onSetDrag()
      })

      return {
        t,

        TABLE_GROUP_TYPE,

        getShouldShowHeaders,
        getClassName,

        onToggleVisible,
        onSetLeftFixed,
        onSetRightFixed,
        onSetCommon,
      }
    },
  })
</script>

<style lang="scss" scoped>
  /* stylelint-disable */
  /* TODO */
  @import '../../../../../../../../assets/style/index.scss';

  .w-table__setting-group-title {
    color: grey;
  }

  .w-table__setting-fix {
    display: none;
  }

  .w-table__setting-icon {
    margin-top: 3px;
  }

  .column-item {
    &:hover {
      background: rgba(240, 248, 255, 0.8);

      .w-table__setting-fix {
        display: initial;
      }
    }

    &-content {
      max-width: 110px;
    }
  }

  .w-table__setting-group-common,
  .w-table__setting-group-left,
  .w-table__setting-group-right {
    list-style: none;
    max-height: 200px;
    margin: 0;
    overflow-y: auto;
    font-size: 16px;

    @include scrollBar;
  }

  .sortable-ghost {
    color: #fff !important;
    background: #42b983 !important;
    opacity: 0.8;
  }
</style>
