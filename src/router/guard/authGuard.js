'use strict'

import store from '/@/store'
import { getToken } from '/@/utils/auth'
import { authPath, rootName } from '../constant'

const whiteLists = [authPath]

export const createAuthGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    // Paths in `whiteLists` will enter directly
    if (whiteLists.includes(to.path)) {
      next()
      return false
    }

    const token = getToken()

    // if not login, next to auth page and return
    if (!token) {
      const redirectData = {
        path: authPath,
        replace: true,
      }

      next(redirectData)
      return false
    }

    // if already has routes, next and return
    if (store.state.menu.menus.length !== 0) {
      next()
      return false
    }

    // create routes and add to `router`
    const routes = await store.dispatch('menu/buildAccessableRoutes')
    routes.forEach((route) => {
      router.addRoute(rootName, route)
    })

    // refresh the page, router will not be found, need to redirect
    const redirectPath = from.query.redirect || to.path
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    next(nextData)
  })
}
