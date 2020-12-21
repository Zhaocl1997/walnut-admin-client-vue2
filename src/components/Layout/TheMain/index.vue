<template>
  <div id="main-container">
    <router-view />
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "TheMain",

  components: {},

  setup() {}
});
</script>

<style lang='scss' scoped>
#main-container {
  height: auto;
  width: 80%;

  margin-top: 40px;
  position: absolute;
  flex: 1 1 auto;
  min-height: 0;

  background-color: #e9eef3;

  &.fixed {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>