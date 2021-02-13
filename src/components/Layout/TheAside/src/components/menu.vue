<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :default-active="activeMenu" :collapse="false" @select="onChange">
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

    props: { menus: Array },

    setup() {
      const route = useRoute()
      const router = useRouter()

      const activeMenu = computed(() => {
        if (route.name) return route.name
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
