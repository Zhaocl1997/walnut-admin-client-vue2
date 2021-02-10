<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="false"
      class="el-menu-vertical-demo"
      @select="onChange"
    >
      <w-aside-menu-item
        v-for="item in menus"
        :key="item.path"
        :index="item.name"
        :item="item"
      ></w-aside-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import wAsideMenuItem from './menuItem.vue'

  export default defineComponent({
    name: 'WAsideMenu',

    components: { wAsideMenuItem },

    props: {
      menus: Array,
    },

    setup(props) {
      const route = useRoute()
      const router = useRouter()

      const activeMenu = computed(() => {
        if (route.meta.activeMenu) return route.meta.activeMenu
        return route.path
      })

      const onChange = (index, indexPath) => {
        router.push({ name: index })
      }

      return {
        activeMenu,
        onChange,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
