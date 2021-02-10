import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth/index.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue'),
  // },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../components/Layout/index.vue'),
    children: [
      // {
      //   path: 'index',
      //   name: 'Index',
      //   component: () => import('../views/Home.vue'),
      // },
      // {
      //   path: 'system',
      //   name: 'System',
      //   component: () => import('../views/Empty.vue'),
      //   children: [
      //     {
      //       path: 'user',
      //       name: 'User',
      //       component: () => import('../views/system/user/index.vue'),
      //     },
      //   ]
      // },
      // {
      //   path: 'demo',
      //   name: 'Demo',
      //   component: () => import('../views/demo/index.vue'),
      // },
      // {
      //   path: 'menu',
      //   name: 'Menu',
      //   component: () => import('../views/system/menu/index.vue'),
      // },
    ],
  },
  {
    path: '/:path(.*)*',
    name: '404',
    component: () => import('../views/Error/404/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

export default router

export const setupRouter = (app) => {
  app.use(router)
}
