<template>
  <div id="footer-container">
    <el-footer>footerfooterfooter</el-footer>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",

  components: {},

  setup() {}
});
</script>

<style lang='scss' scoped>
#footer-container {
  background-color: #b3c0d1;
  margin-left: 200px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 20px;
  line-height: 20px;
  width: 100%;
}
</style>