<template>
  <el-date-picker v-bind="getBindValue" />
</template>

<script>
  import { ElDatePicker } from 'element-plus'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WDatePicker',

    props: {
      ...ElDatePicker.props,
    },

    setup(props, { attrs }) {
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
