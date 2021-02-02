<template>
  <el-slider v-bind="getBindValue"></el-slider>
</template>

<script>
  import { ref, reactive, defineComponent, computed } from 'vue'
  import { ElSlider } from 'element-plus'

  export default defineComponent({
    name: 'WSlider',

    inheritAttrs: false,

    props: {
      ...ElSlider.props,
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
