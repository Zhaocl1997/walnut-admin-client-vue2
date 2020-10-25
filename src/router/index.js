
'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Layout from '@/layout/index'

Vue.use(VueRouter)


/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
 *   roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
 *   title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
 *   icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
 *   breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
 * }
 */

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // {
  //   path: '/redirect',
  //   // component: Layout,
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import(/* webpackChunkName: "signup" */ '../views/Redirect/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Auth/Signin.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Auth/Signup.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/Error/404.vue')
  },
  {
    path: '',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Console/index.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
