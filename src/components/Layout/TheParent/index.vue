<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive v-if="getOpenKeepAlive" :include="getKeepAliveInclude">
          <component :is="Component" v-bind="getKey(Component, route)" />
        </keep-alive>
        <component :is="Component" v-else v-bind="getKey(Component, route)" />
      </transition>
    </template>
  </router-view>
</template>

<script>
  import { defineComponent, computed, toRaw } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    parentView: true,

    setup() {
      const store = useStore()

      const getKeepAliveInclude = computed(() => {
        // TODO getters
        return store.state.menu.keepAliveRouteNames
      })

      const getOpenKeepAlive = computed(() => {
        return true
      })

      const getKey = (comp, route) => {
        return comp.type.parentView ? {} : { key: route.fullPath }
      }

      return {
        getKeepAliveInclude,
        getOpenKeepAlive,
        getKey,
      }
    },
  })
</script>
