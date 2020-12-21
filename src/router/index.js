import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '',
    name: 'Layout',
    component: () => import('../components/Layout/index.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'demo',
        name: 'Demo',
        component: () => import('../views/demo/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
