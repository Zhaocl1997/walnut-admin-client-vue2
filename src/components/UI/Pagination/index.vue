<template>
  <el-pagination
    class="wPagination"
    v-bind="getBindValue"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  >
    <slot />
  </el-pagination>
</template>

<script>
  import { ElPagination } from 'element-plus'
  import { ref, reactive, computed, defineComponent, nextTick } from 'vue'

  import scrollTo from './scroll-to'

  export default defineComponent({
    name: 'WPagination',

    inheritAttrs: false,

    props: {
      ...ElPagination.props,

      background: { type: Boolean, default: true },
      autoScroll: { type: Boolean, default: true },

      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper, slot',
      },
    },

    emits: ['change', 'update:pageSize', 'update:currentPage'],

    setup(props, { attrs, emit }) {
      let n = ref(1)
      let s = ref(10)

      const onSizeChange = (val) => {
        emit('change', { pageNum: n.value, pageSize: val })
        emit('update:pageSize', val)
        s.value = val

        if (props.autoScroll) {
          scrollTo(0, 800)
        }
      }

      const onCurrentChange = (val) => {
        emit('change', { pageNum: val, pageSize: s.value })
        emit('update:currentPage', val)
        n.value = val

        if (props.autoScroll) {
          scrollTo(0, 800)
        }
      }

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      return {
        getBindValue,
        onSizeChange,
        onCurrentChange,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .wPagination {
    position: relative;
    height: 25px;
    margin-bottom: 10px;
    margin-top: 15px;
    padding: 0 20px !important;
  }
</style>
