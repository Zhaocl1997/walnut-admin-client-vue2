<template>
  <div id="aside-container">
    <el-aside width="200px">
      <w-aside-menu :menus="menus"></w-aside-menu>
    </el-aside>
  </div>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import wAsideMenu from './src/components/menu.vue'

  export default defineComponent({
    name: 'TheAside',

    components: { wAsideMenu },

    setup() {
      const { getters } = useStore()
      const menus = computed(() => getters.menus)

      return {
        menus,
      }
    },
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
