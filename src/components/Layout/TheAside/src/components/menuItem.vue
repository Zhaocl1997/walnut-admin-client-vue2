<template>
  <el-submenu v-if="hasChildren" :key="item.path" :index="item.name">
    <template #title>
      <i :class="item.icon || 'el-icon-location'" />
      <span>{{ item.title }}</span>
    </template>

    <el-menu-item-group>
      <w-aside-menu-item
        v-for="item in childrenLists"
        :key="item.path"
        :index="item.name"
        :item="item"
      ></w-aside-menu-item>
    </el-menu-item-group>
  </el-submenu>

  <el-menu-item v-else :key="item.path" :index="item.name">
    <i :class="item.icon || 'el-icon-setting'" />
    <template #title>
      {{ item.title }}
    </template>
  </el-menu-item>
</template>

<script>
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    name: 'WAsideMenuItem',

    props: {
      item: {
        type: Object,
        default: () => {},
      },
    },

    setup(props) {
      const hasChildren = computed(() => {
        return props.item.children && props.item.children.length > 0
      })

      const childrenLists = computed(() => {
        return props.item.children
      })

      return {
        hasChildren,
        childrenLists,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
