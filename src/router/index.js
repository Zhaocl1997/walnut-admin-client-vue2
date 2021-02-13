'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import { createRouterGuard } from './guard'
import { AuthRoute, RootRoute } from './constant'

const routes = [AuthRoute, RootRoute]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

export default router

export const setupRouter = (app) => {
  app.use(router)
  createRouterGuard(router)
}
