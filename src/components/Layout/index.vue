<template>
  <div id="layout">
    <TheHeader></TheHeader>

    <TheAside></TheAside>

    <el-container style="margin-left:200px;">
      <TheTab></TheTab>

      <TheMain></TheMain>

      <TheFooter></TheFooter>
    </el-container>
  </div>
</template>

<script lang='ts'>
import TheAside from "./TheAside/index.vue";
import TheFooter from "./TheFooter/index.vue";
import TheHeader from "./TheHeader/index.vue";
import TheLogo from "./TheLogo/index.vue";
import TheMain from "./TheMain/index.vue";
import TheTab from "./TheTab/index.vue";

import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  name: "Layout",

  components: {
    TheAside,
    TheFooter,
    TheHeader,
    TheLogo,
    TheMain,
    TheTab
  },

  setup() {}
});
</script>

<style lang='scss' scoped>
#layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background: whitesmoke;
  flex-direction: column;
}
</style>