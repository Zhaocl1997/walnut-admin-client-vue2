<template>
  <el-input-number v-bind="getBindValue" />
</template>

<script>
  import { ElInputNumber } from 'element-plus'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WInputNumber',

    inheritAttrs: false,

    props: {
      ...ElInputNumber.props,
    },

    setup(props, { attrs, emit }) {
      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
