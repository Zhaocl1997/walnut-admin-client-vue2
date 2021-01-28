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
  import { ref, reactive, computed, defineComponent, nextTick } from 'vue'
  import { wPaginationProps } from './props'

  import scrollTo from './scroll-to'

  export default defineComponent({
    name: 'WPagination',

    inheritAttrs: false,

    props: wPaginationProps,

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
    padding: 0 20px !important;
    margin-top: 15px;
    margin-bottom: 10px;
  }
</style>
