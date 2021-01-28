<template>
  <div id="aside-container">
    <el-aside>asideasideaside</el-aside>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TheAside',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped>
  #aside-container {
    position: absolute;
    top: 50px;
    width: 200px;
    height: calc(100% - 50px);
    background-color: #d3dce6;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
</style>
