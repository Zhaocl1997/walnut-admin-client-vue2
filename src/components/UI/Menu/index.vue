<template>
  <el-menu v-bind="getBindValue"></el-menu>
</template>

<script>
  import { ref, reactive, computed, defineComponent } from 'vue'
  import { wMenuProps } from './props'

  export default defineComponent({
    name: 'WMenu',

    inheritAttrs: false,

    props: wMenuProps,

    emits: [],

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
