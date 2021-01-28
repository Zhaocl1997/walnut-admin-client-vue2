<template>
  <div id="header-container">
    <el-header
      >headerheaderheader
      <router-link to="/demo" class="u-mr10">demo</router-link>
      <router-link to="/menu" class="u-mr10">menu</router-link>
      <router-link to="/auth" class="u-mr10">auth</router-link>
    </el-header>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TheHeader',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped>
  #header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background-color: #b3c0d1;

    &.fixed {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
