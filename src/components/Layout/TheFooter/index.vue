<template>
  <div id="footer-container">
    <el-footer>footerfooterfooter</el-footer>
  </div>
</template>

<script>
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'TheFooter',

    components: {},

    setup() {},
  })
</script>

<style lang="scss" scoped>
  #footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    margin-left: 200px;
    line-height: 20px;
    background-color: #b3c0d1;
  }
</style>
