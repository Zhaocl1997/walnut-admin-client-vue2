<template>
  <div id="main-container">
    <router-view />
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TheMain',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped>
  #main-container {
    position: absolute;
    flex: 1 1 auto;
    width: 80%;
    height: auto;
    min-height: 0;
    padding: 20px;
    margin-top: 40px;
    background-color: #e9eef3;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
