<template>
  <div id="w-layout">
    <TheHeader />

    <TheAside />

    <el-container style="margin-left: 200px">
      <TheTab />

      <TheMain />

      <TheFooter />
    </el-container>
  </div>

  <el-backtop target="#w-layout"></el-backtop>
</template>

<script>
  import TheAside from './TheAside/index.vue'
  import TheFooter from './TheFooter/index.vue'
  import TheHeader from './TheHeader/index.vue'
  import TheLogo from './TheLogo/index.vue'
  import TheMain from './TheMain/index.vue'
  import TheTab from './TheTab/index.vue'

  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'Layout',

    components: {
      TheAside,
      TheFooter,
      TheHeader,
      TheLogo,
      TheMain,
      TheTab,
    },

    setup() {},
  })
</script>

<style lang="scss" scoped>
  #w-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: whitesmoke;
  }
</style>
