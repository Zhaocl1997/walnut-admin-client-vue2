
'use strict'

import VueRouter from 'vue-router'

import router from '@/router'
import { routes as constantRoutes } from '@/router'

import { getUserInfo } from '@/api/system/user'
import { getUserMenu } from '@/api/system/menu'

const routes = {
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        getUserMenu().then(({ data }) => {
          const accessedRoutes = filterAsyncRouter(data)

          // push 到layout children下
          accessedRoutes.map(i => {
            constantRoutes[4].children.push(i)
          })

          // 404
          constantRoutes.push({ path: '*', redirect: '/404', hidden: true })

          // 重写路由
          router.options.routes = constantRoutes;
          router.matcher = new VueRouter({ mode: "history" }).matcher;
          router.addRoutes(constantRoutes);

          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }
  }
}

// 路由懒加载
const loadView = view => {
  return resolve => require([`@/views/${view}.vue`], resolve)
}

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = asyncRouterMap => {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      route.component = loadView(route.component)
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export default routes
