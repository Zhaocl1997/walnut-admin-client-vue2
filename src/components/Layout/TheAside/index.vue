<template>
  <div id="aside-container">
    <el-aside width="200px">
      <w-aside-menu :menus="menus"></w-aside-menu>
    </el-aside>
  </div>
</template>

<script>
  import { ref, defineComponent, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { arrToTree, orderTree, formatTree, log } from 'easy-fns-ts'
  import { getPermissionMenus } from '/@/api/auth'
  import wAsideMenu from './src/components/menu.vue'

  export default defineComponent({
    name: 'TheAside',

    components: { wAsideMenu },

    setup() {
      const { addRoute } = useRouter()
      const menus = ref([])

      const init = async () => {
        const res = await getPermissionMenus()
        menus.value = orderTree(arrToTree(res, { id: '_id' }))[0].children
        const ft = formatTree(menus.value, {
          format: (node) => {
            if (node.type === 'catalog') {
              return {
                path: node.path,
                name: node.name,
                component: () =>
                  import(/* @vite-ignore */ `/@/views/Empty.vue`),
              }
            }

            if (node.type === 'menu' && node.component) {
              return {
                path: node.path,
                name: node.name,
                component: () =>
                  import(/* @vite-ignore */ `/@/views/${node.component}.vue`),
              }
            }
          },
        })

        ft.forEach((route) => {
          addRoute('Layout', route)
        })
      }

      onMounted(() => {
        init()
      })

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
