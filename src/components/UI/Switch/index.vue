<template>
  <el-switch v-bind="getBindValue"></el-switch>
</template>

<script>
  import { ref, reactive, defineComponent, computed } from 'vue'
  import { ElSwitch } from 'element-plus'

  export default defineComponent({
    name: 'WSwitch',

    inheritAttrs: false,

    props: {
      ...ElSwitch.props,
    },

    setup(props, { attrs }) {
      const getBindValue = computed(() => {
        return {
          ...attrs,
          ...props,
        }
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
