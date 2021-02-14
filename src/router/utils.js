'use strict'

import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'

import { getPermissionMenus } from '/@/api/auth'
import ParentLayout from '../components/Layout/TheParent/index.vue'
import { notFoundRoute } from './constant'

/**
 * @description Resolve `catalog` component with self name.
 */
export const resolveParentComponent = (name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        ...ParentLayout,
        name,
      })
    })
}

/**
 * @description Generate keep-alive component name lists based on `menu` list.
 */
export const createKeepAliveRouteNameList = (menus) => {
  const nameList = menus
    .filter((i) => i.type === 'menu' && i.cache)
    .map((i) => i.name)

  return nameList
}

/**
 * @description Get menu list, build and order into tree structure. Here is where we request for a list of menus based on permissions.
 */
export const createDynamicMenus = async () => {
  const res = await getPermissionMenus()

  // filter menus not visible aside
  const visibleMenus = res.filter((i) => i.show)

  // generate keep-alive route name lists
  const keepAliveRouteNames = createKeepAliveRouteNameList(res)

  const menus = orderTree(arrToTree(visibleMenus, { id: '_id' }))[0].children

  return {
    menus,
    keepAliveRouteNames,
  }
}

/**
 * @description Generate routes based on menus.
 */
export const createDynamicRoutes = (menus) => {
  const routes = formatTree(menus, {
    format: (node) => {
      if (node.type === 'catalog') {
        return {
          path: node.path,
          name: node.name,
          component: resolveParentComponent(node.name),
        }
      }

      if (node.type === 'menu' && node.component) {
        return {
          path: node.path,
          name: node.name,
          component: () =>
            import(/* @vite-ignore */ `/@/views/${node.component}.vue`),
          meta: {
            cache: node.cache,
          },
        }
      }
    },
  })

  // push 404 page at the end
  routes.push(notFoundRoute)

  return routes
}

/**
 * @description Entry for menu state data, include `menus`/`routes`/`keepAliveRouteNames`.
 */
export const createDynamicPermissions = async () => {
  const { menus, keepAliveRouteNames } = await createDynamicMenus()

  const routes = createDynamicRoutes(menus)

  return {
    menus,
    keepAliveRouteNames,
    routes,
  }
}
