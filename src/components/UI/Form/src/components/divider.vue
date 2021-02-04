<template>
  <el-divider content-position="left">
    <el-space>
      <w-title>{{ item.title }}</w-title>
      <w-arrow
        v-if="item.fold === true || item.fold === false"
        style="margin-top: 2px"
        :active="item.fold"
        @click="toggle"
      ></w-arrow>
    </el-space>
  </el-divider>
</template>

<script>
  import { defineComponent } from 'vue'
  import wTitle from '/@/components/Help/Title/index.vue'
  import wArrow from '/@/components/Help/Arrow/index.vue'

  export default defineComponent({
    name: 'WFormDivider',

    components: {
      wTitle,
      wArrow,
    },

    props: {
      item: Object,
      toggle: Function,
    },

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
