
'use strict'

import VueRouter from 'vue-router'

import router from '@/router'
import { routes as constantRoutes } from '@/router'

import { getUserInfo } from '@/api/system/user'
import { getUserMenu } from '@/api/system/menu'
import Layout from '@/layout/index'

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
      console.log(123);

      return new Promise(resolve => {
        getUserMenu().then(({ data }) => {
          const accessedRoutes = genRouters(data)

          accessedRoutes.map(i => {
            constantRoutes[4].children.push(i)
          })

          // constantRoutes.push({ path: '*', redirect: '/404', hidden: true })

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

const rootId = '5f8c3a3dfd35c823ac00ef1e'

const loadView = view => {
  return resolve => require([`@/views/${view}.vue`], resolve)
}

const genRouters = menus => {

  const gen = (data, pid) => {
    const ret = []
    let temp = []

    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId == pid) {
        let obj = data[i];

        temp = gen(data, data[i]._id);

        if (temp.length > 0) {
          obj.children = temp;
        }
        console.log(obj.component);

        if (obj.component) {
          ret.push({
            path: obj.path,
            name: obj.name,
            component: loadView(obj.component),
            children: obj.children,
            meta: {
              title: obj.title,
              icon: obj.icon,
              // hidden: obj.show
            }
          });
        } else {
          ret.push({
            path: obj.path,
            name: obj.name,
            children: obj.children,
            meta: {
              title: obj.title,
              icon: obj.icon,
              // hidden: obj.show
            }
          });
        }


      }
    }

    return ret
  }

  return gen(menus, rootId)
}

export default routes
